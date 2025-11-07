"use client"

import { useState } from "react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"

export function UserAuthForm({ className, ...props }) {
    const [mode, setMode] = useState("login")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [passwordStrength, setPasswordStrength] = useState("")
    const [otpSent, setOtpSent] = useState(false)
    const [otp, setOtp] = useState("")
    const [otpVerified, setOtpVerified] = useState(false)

    // Password strength checker
    const checkPasswordStrength = (password) => {
        if (!password) return ""
        let score = 0
        if (password.length >= 6) score++
        if (/[A-Z]/.test(password)) score++
        if (/[0-9]/.test(password)) score++
        if (/[^A-Za-z0-9]/.test(password)) score++
        switch (score) {
            case 1:
                return "Weak"
            case 2:
                return "Fair"
            case 3:
                return "Good"
            case 4:
                return "Strong"
            default:
                return ""
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        const email = e.target.email?.value
        const password = e.target.password?.value
        const confirm = e.target.confirmPassword?.value

        if (!email) {
            setError("Email is required")
            toast.error("Email is required")
            return
        }

        if (mode !== "forgot" && !password) {
            setError("Password is required")
            toast.error("Password is required")
            return
        }

        if (mode === "signup" && password.length < 6) {
            setError("Password must be at least 6 characters")
            toast.error("Password must be at least 6 characters")
            return
        }

        if (mode === "signup" && password !== confirm) {
            setError("Passwords do not match")
            toast.error("Passwords do not match")
            return
        }

        setLoading(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))

            if (mode === "login") {
                toast.success("Logged in successfully!")
                console.log("Login:", { email, password })
            } else if (mode === "signup") {
                // OTP send step
                setOtpSent(true)
                toast.success("OTP sent to your email!")
                console.log("OTP sent to:", email)
            } else if (mode === "forgot") {
                toast.success("Password reset link sent!")
            }
        } catch (err) {
            toast.error("Something went wrong!")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleOtpVerify = async () => {
        if (otp.length !== 6) {
            toast.error("Please enter 6-digit OTP")
            return
        }
        setLoading(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            // Here you can verify OTP with your backend API
            setOtpVerified(true)
            toast.success("OTP verified successfully! Account created.")
            console.log("Verified OTP:", otp)
        } catch {
            toast.error("Invalid OTP, please try again")
        } finally {
            setLoading(false)
        }
    }

    const changeMode = (newMode) => {
        if (loading) return
        setMode(newMode)
        setError("")
        setPasswordStrength("")
        setOtpSent(false)
        setOtpVerified(false)
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>
                        {mode === "login" && "Login to your account"}
                        {mode === "signup" && "Create a new account"}
                        {mode === "forgot" && "Reset your password"}
                    </CardTitle>
                    <CardDescription>
                        {mode === "login" && "Enter your email to login"}
                        {mode === "signup" && "Enter your details to create your account"}
                        {mode === "forgot" && "Enter your email to reset your password"}
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {!otpSent ? (
                        // Normal Login/Signup Form
                        <form onSubmit={handleSubmit}>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="email">Email</FieldLabel>
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
                                            <FieldLabel htmlFor="password">Password</FieldLabel>
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
                                                        ? setPasswordStrength(checkPasswordStrength(e.target.value))
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

                                        {mode === "signup" && passwordStrength && (
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

                                {mode === "signup" && (
                                    <Field>
                                        <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
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

                                {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

                                <Field>
                                    <Button type="submit" className="w-full mt-2" disabled={loading}>
                                        {loading ? "Processing..." : mode === "login" ? "Login" : "Sign Up"}
                                    </Button>

                                    <FieldDescription className="text-center mt-4">
                                        {mode === "login" ? (
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
                                        ) : (
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

                            <Button onClick={handleOtpVerify} disabled={loading || otp.length !== 6}>
                                {loading ? "Verifying..." : "Verify OTP"}
                            </Button>

                            <button
                                onClick={() => {
                                    setOtpSent(false)
                                    setOtp("")
                                }}
                                className="text-sm text-gray-500 underline"
                            >
                                Edit Email
                            </button>
                        </div>
                    ) : (
                        // Success Message After OTP
                        <div className="text-center py-6">
                            <h3 className="text-lg font-semibold text-green-600">🎉 Account Created!</h3>
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
    )
}
