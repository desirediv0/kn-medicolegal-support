"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { signIn, getSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const buildRedirectTarget = (target, fallback) => {
  if (!target) return fallback;
  if (target.startsWith("http://") || target.startsWith("https://")) {
    return target;
  }
  if (target.startsWith("/")) {
    return target;
  }
  return `/${target}`;
};

export function UserAuthForm({
  className,
  defaultCallback = "/user",
  portal = "user",
  enableSignup = true,
  ...props
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackParam = searchParams.get("callbackUrl");
  const modeParam = searchParams.get("mode");
  const redirectTarget = buildRedirectTarget(callbackParam, defaultCallback);

  const [mode, setMode] = useState(modeParam === "register" ? "signup" : "login");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [signupData, setSignupData] = useState(null);
  const [resendTimer, setResendTimer] = useState(0);
  const [resendLoading, setResendLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // Timer effect for resend OTP
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  // Password strength checker
  const checkPasswordStrength = (password) => {
    if (!password) return "";
    let score = 0;
    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    switch (score) {
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const email = e.target.email?.value;
    const password = e.target.password?.value;
    const confirm = e.target.confirmPassword?.value;
    const name = e.target.name?.value;
    const phone = e.target.phone?.value;

    if (!email) {
      setError("Email is required");
      toast.error("Email is required");
      return;
    }

    if (mode !== "forgot" && !password) {
      setError("Password is required");
      toast.error("Password is required");
      return;
    }

    if (mode === "signup" && !enableSignup) {
      setError("Account creation is not available in this portal");
      toast.error("Account creation is not available in this portal");
      setLoading(false);
      setMode("login");
      return;
    }

    if (mode === "signup" && password.length < 6) {
      setError("Password must be at least 6 characters");
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (mode === "signup" && password !== confirm) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    if (mode === "signup" && enableSignup) {
      // Validate Name
      if (!name || name.trim() === "") {
        setError("Name is required");
        toast.error("Name is required");
        return;
      }

      // Validate Phone
      if (!phone || phone.trim() === "") {
        setError("Phone number is required");
        toast.error("Phone number is required");
        return;
      }
      // Basic phone validation - at least 10 digits
      const phoneDigits = phone.replace(/\D/g, "");
      if (phoneDigits.length < 10) {
        setError("Please enter a valid phone number (at least 10 digits)");
        toast.error("Please enter a valid phone number (at least 10 digits)");
        return;
      }
    }

    setLoading(true);
    try {
      if (mode === "login") {
        // First check login credentials with our API for proper error messages
        const checkResponse = await fetch("/api/auth/login-check", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            password,
            portal,
          }),
        });

        const checkData = await checkResponse.json();

        if (!checkResponse.ok) {
          // Handle specific error codes
          if (checkData.code === "EMAIL_NOT_FOUND") {
            setError("No account found with this email");
            toast.error("No account found with this email");
            return;
          }
          
          if (checkData.code === "INVALID_PASSWORD") {
            setError("Incorrect password");
            toast.error("Incorrect password");
            return;
          }
          
          // Handle unverified email - send OTP and show verification UI
          if (checkData.code === "EMAIL_NOT_VERIFIED") {
            const unverifiedEmail = checkData.email || email.trim().toLowerCase();
            
            // Send OTP for verification
            const otpResponse = await fetch("/api/otp/send", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: unverifiedEmail, type: "verify" }),
            });

            if (!otpResponse.ok) {
              const data = await otpResponse.json();
              throw new Error(data.error || "Failed to send verification OTP");
            }

            // Set signup data for verification flow (password needed for auto-login after verify)
            setSignupData({ email: unverifiedEmail, password, isVerification: true });
            setOtpSent(true);
            setResendTimer(60);
            setError("");
            toast.info("Please verify your email. OTP sent to your email!");
            return;
          }
          
          throw new Error(checkData.error || "Login failed");
        }

        // Now do actual NextAuth signIn
        const result = await signIn("credentials", {
          email: email.trim().toLowerCase(),
          password,
          redirect: false,
          callbackUrl: redirectTarget,
          portal,
        });

        if (result?.error) {
          throw new Error(result.error);
        }

        toast.success("Logged in successfully!");

        // Wait a bit for session to be available
        await new Promise(resolve => setTimeout(resolve, 200));

        try {
          const session = await getSession();
          const role = session?.user?.role;

          if (role === "ADMIN") {
            router.replace("/dashboard");
          } else {
            // Redirect to user dashboard instead of questions page
            router.replace("/user/dashboard");
          }
        } catch {
          // Fallback redirect
          router.replace("/user/dashboard");
        }
      } else if (mode === "signup") {
        // Step 1: First register the user (emailVerified will be null)
        const registerRes = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name, phone }),
        });

        if (!registerRes.ok) {
          const data = await registerRes.json();
          throw new Error(data.error || "Failed to create account");
        }

        // Step 2: Send OTP for email verification
        const otpRes = await fetch("/api/otp/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, type: "verify" }),
        });

        if (!otpRes.ok) {
          const data = await otpRes.json();
          throw new Error(data.error || "Failed to send OTP");
        }

        setSignupData({ email, password, name, phone, isVerification: true });
        setOtpSent(true);
        setResendTimer(60);
        toast.success("Account created! OTP sent to your email for verification.");
      } else if (mode === "forgot") {
        // Send OTP for password reset
        const response = await fetch("/api/otp/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, type: "reset" }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to send reset OTP");
        }

        setSignupData({ email, isPasswordReset: true });
        setOtpSent(true);
        setResendTimer(60);
        toast.success("OTP sent to your email for password reset!");
      }
    } catch (err) {
      console.error(err);
      const message = err?.message || "Something went wrong!";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!signupData?.email || resendTimer > 0 || resendLoading) {
      return;
    }

    setResendLoading(true);
    try {
      const response = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: signupData.email, resend: true }),
      });

      if (!response.ok) {
        const data = await response.json();
        if (response.status === 429 && data.cooldownSeconds) {
          setResendTimer(data.cooldownSeconds);
          throw new Error(data.error || "Please wait before resending");
        }
        throw new Error(data.error || "Failed to resend OTP");
      }

      setResendTimer(60); // Reset timer to 60 seconds
      setOtp(""); // Clear current OTP input
      toast.success("OTP resent to your email!");
    } catch (err) {
      console.error(err);
      const message = err?.message || "Failed to resend OTP";
      toast.error(message);
    } finally {
      setResendLoading(false);
    }
  };

  const handleOtpVerify = async () => {
    console.log("=== handleOtpVerify called ===");
    console.log("OTP:", otp);
    console.log("signupData:", signupData);
    
    if (otp.length !== 6) {
      toast.error("Please enter 6-digit OTP");
      return;
    }
    if (!signupData?.email) {
      toast.error("Start the process again");
      setOtpSent(false);
      setOtp("");
      return;
    }
    setLoading(true);
    try {
      console.log("Calling OTP verify API...");
      const verifyRes = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: signupData.email.trim().toLowerCase(), otp }),
      });

      console.log("OTP verify response status:", verifyRes.status);
      
      if (!verifyRes.ok) {
        const data = await verifyRes.json();
        console.log("OTP verify failed:", data);
        throw new Error(data.error || "Invalid OTP");
      }

      console.log("OTP verified successfully!");
      console.log("signupData.isPasswordReset:", signupData.isPasswordReset);
      console.log("signupData.isVerification:", signupData.isVerification);

      // Case 1: Password Reset Flow
      if (signupData.isPasswordReset) {
        setOtpVerified(true);
        toast.success("OTP verified! Now set your new password.");
        return;
      }

      // Case 2: Existing user verification (from login)
      if (signupData.isVerification) {
        console.log("Calling verify-email API...");
        // Just mark email as verified via API
        const verifyEmailRes = await fetch("/api/auth/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: signupData.email.trim().toLowerCase() }),
        });

        if (!verifyEmailRes.ok) {
          const data = await verifyEmailRes.json();
          throw new Error(data.error || "Failed to verify email");
        }

        setOtpVerified(true);
        toast.success("Email verified successfully!");

        // Auto login
        const loginRes = await signIn("credentials", {
          email: signupData.email.trim().toLowerCase(),
          password: signupData.password,
          redirect: false,
          callbackUrl: redirectTarget,
          portal: "user",
        });

        if (loginRes?.error) {
          throw new Error(loginRes.error || "Unable to sign you in");
        }

        const session = await getSession();
        const role = session?.user?.role;
        router.replace(role === "ADMIN" ? "/dashboard" : "/user/dashboard");
        setSignupData(null);
        setOtp("");
        return;
      }

      // Case 3: New signup flow - register account
      console.log("=== REGISTERING NEW USER ===");
      console.log("Calling register API with:", signupData);
      
      const registerRes = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });

      console.log("Register response status:", registerRes.status);

      if (!registerRes.ok) {
        const data = await registerRes.json();
        console.log("Register failed:", data);
        throw new Error(data.error || "Failed to create account");
      }

      console.log("User registered successfully!");
      setOtpVerified(true);
      toast.success("OTP verified successfully! Account created.");

      const loginRes = await signIn("credentials", {
        email: signupData.email.trim().toLowerCase(),
        password: signupData.password,
        redirect: false,
        callbackUrl: redirectTarget,
        portal: "user",
      });

      if (loginRes?.error) {
        throw new Error(loginRes.error || "Unable to sign you in");
      }

      const session = await getSession();
      const role = session?.user?.role;
      // Redirect to dashboard after registration
      router.replace(role === "ADMIN" ? "/dashboard" : "/user/dashboard");
      setSignupData(null);
      setOtp("");
    } catch (err) {
      console.error("Error in handleOtpVerify:", err);
      const message = err?.message || "Invalid OTP, please try again";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const changeMode = (newMode) => {
    if (loading) return;
    if (newMode === "signup" && !enableSignup) return;
    setMode(newMode);
    setError("");
    setPasswordStrength("");
    setOtpSent(false);
    setOtpVerified(false);
    setResendTimer(0);
    setOtp("");
    setOtp("");
    setSignupData(null);
    setNewPassword("");
    setConfirmNewPassword("");
  };

  const handlePasswordReset = async () => {
    if (!newPassword || !confirmNewPassword) {
      setError("Please fill in both password fields");
      toast.error("Please fill in both password fields");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    if (!signupData?.email) {
      setError("Session expired. Please try again.");
      toast.error("Session expired. Please try again.");
      changeMode("forgot");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: signupData.email.trim().toLowerCase(),
          newPassword,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to reset password");
      }

      toast.success("Password reset successfully! Please login.");
      changeMode("login");
    } catch (err) {
      console.error(err);
      const message = err?.message || "Failed to reset password";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-3", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>
            {mode === "login" && "Login to your account"}
            {mode === "signup" && enableSignup && "Create a new account"}
            {mode === "forgot" && "Reset your password"}
          </CardTitle>
          <CardDescription>
            {mode === "login" && "Enter your email to login"}
            {mode === "signup" &&
              enableSignup &&
              "Enter your details to create your account"}
            {mode === "forgot" && "Enter your email to reset your password"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {!otpSent ? (
            // Normal Login/Signup Form
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                {mode === "signup" && enableSignup && (
                  <Field>
                    <FieldLabel htmlFor="name">
                      Name <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      required
                      disabled={loading}
                    />
                  </Field>
                )}

                <Field>
                  <FieldLabel htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    disabled={loading}
                  />
                </Field>

                {(mode === "signup" || mode === "login") && (
                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">
                        Password <span className="text-red-500">*</span>
                      </FieldLabel>
                      {mode === "login" && (
                        <button
                          type="button"
                          onClick={() => changeMode("forgot")}
                          disabled={loading}
                          className={cn(
                            "ml-auto inline-block text-sm underline-offset-4 hover:underline",
                            loading && "opacity-50 cursor-not-allowed"
                          )}
                        >
                          Forgot Password?
                        </button>
                      )}
                    </div>

                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        required
                        disabled={loading}
                        onChange={(e) =>
                          mode === "signup"
                            ? setPasswordStrength(
                              checkPasswordStrength(e.target.value)
                            )
                            : null
                        }
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={loading}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>

                    {mode === "signup" && enableSignup && passwordStrength && (
                      <p
                        className={cn(
                          "text-sm mt-1 font-medium",
                          passwordStrength === "Weak" && "text-red-500",
                          passwordStrength === "Fair" && "text-yellow-500",
                          passwordStrength === "Good" && "text-blue-500",
                          passwordStrength === "Strong" && "text-green-600"
                        )}
                      >
                        Password strength: {passwordStrength}
                      </p>
                    )}
                  </Field>
                )}

                {mode === "signup" && enableSignup && (
                  <Field>
                    <FieldLabel htmlFor="confirmPassword">
                      Confirm Password <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      required
                      disabled={loading}
                    />
                  </Field>
                )}

                {mode === "signup" && enableSignup && (
                  <Field>
                    <FieldLabel htmlFor="phone">
                      Phone Number <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      required
                      disabled={loading}
                    />
                    <FieldDescription className="text-xs text-gray-500">
                      Required for account verification and support
                    </FieldDescription>
                  </Field>
                )}

                {error && (
                  <p className="text-red-500 text-sm text-center mt-2">
                    {error}
                  </p>
                )}

                <Field>
                  <Button
                    type="submit"
                    className="w-full mt-1"
                    disabled={loading}
                  >
                    {loading
                      ? "Processing..."
                      : mode === "login"
                        ? "Login"
                        : "Sign Up"}
                  </Button>

                  <FieldDescription className="text-center mt-4">
                    {mode === "login" && enableSignup ? (
                      <>
                        Don&apos;t have an account?{" "}
                        <button
                          type="button"
                          onClick={() => changeMode("signup")}
                          className="underline underline-offset-4"
                        >
                          Sign up
                        </button>
                      </>
                    ) : enableSignup && mode !== "login" ? (
                      <>
                        Already have an account?{" "}
                        <button
                          type="button"
                          onClick={() => changeMode("login")}
                          className="underline underline-offset-4"
                        >
                          Login
                        </button>
                      </>
                    ) : (
                      mode === "login" && (
                        <span className="text-gray-500">
                          Need an account? Contact the administrator.
                        </span>
                      )
                    )}
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          ) : !otpVerified ? (
            // OTP Verification UI
            <div className="flex flex-col items-center gap-4">
              <p className="text-sm text-gray-600">
                Enter the 6-digit OTP sent to your email
              </p>

              <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                onChange={(val) => setOtp(val)}
              >
                <InputOTPGroup>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <InputOTPSlot key={i} index={i} />
                  ))}
                </InputOTPGroup>
              </InputOTP>

              <Button
                onClick={handleOtpVerify}
                disabled={loading || otp.length !== 6}
                className="w-full"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>

              <div className="flex flex-col items-center gap-2 w-full">
                <button
                  onClick={handleResendOtp}
                  disabled={resendTimer > 0 || resendLoading || loading}
                  className={cn(
                    "text-sm underline",
                    resendTimer > 0 || resendLoading || loading
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-blue-600 hover:text-blue-700"
                  )}
                >
                  {resendLoading
                    ? "Sending..."
                    : resendTimer > 0
                      ? `Resend OTP in ${resendTimer}s`
                      : "Resend OTP"}
                </button>

                <button
                  onClick={() => {
                    setOtpSent(false);
                    setOtp("");
                    setResendTimer(0);
                  }}
                  className="text-sm text-gray-500 underline"
                >
                  Edit Email
                </button>
              </div>
            </div>
          ) : signupData?.isPasswordReset ? (
            // Password Reset Form After OTP Verification
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-center">
                Set New Password
              </h3>
              <Field>
                <FieldLabel htmlFor="newPassword">
                  New Password <span className="text-red-500">*</span>
                </FieldLabel>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </Field>
              <Field>
                <FieldLabel htmlFor="confirmNewPassword">
                  Confirm New Password <span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  id="confirmNewPassword"
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  disabled={loading}
                />
              </Field>
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              <Button
                onClick={handlePasswordReset}
                disabled={loading || !newPassword || !confirmNewPassword}
                className="w-full"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </Button>
              <button
                onClick={() => changeMode("login")}
                className="text-sm text-gray-500 underline text-center"
              >
                Back to Login
              </button>
            </div>
          ) : (
            // Success Message After OTP
            <div className="text-center py-6">
              <h3 className="text-lg font-semibold text-green-600">
                🎉 Account Created!
              </h3>
              <p className="text-gray-600 mt-2">
                Your email has been verified successfully.
              </p>
              <Button className="mt-4" onClick={() => changeMode("login")}>
                Go to Login
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
