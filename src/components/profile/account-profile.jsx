"use client";

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";
import imageCompression from "browser-image-compression";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Loader2, UploadCloud, RefreshCw } from "lucide-react";

const AVATAR_OPTIONS = {
  maxSizeMB: 1,
  maxWidthOrHeight: 512,
  useWebWorker: true,
};

const OTP_COOLDOWN_SECONDS = 60;

const initialPasswordForm = {
  newPassword: "",
  confirmPassword: "",
  otp: "",
};

export function AccountProfile({ heading, description, showRole = false }) {
  const { data: session, status, update } = useSession();
  const [profileLoading, setProfileLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "" });
  const [avatarPreview, setAvatarPreview] = useState("");
  const [passwordForm, setPasswordForm] = useState(initialPasswordForm);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCooldown, setOtpCooldown] = useState(0);
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const fileInputRef = useRef(null);

  const initials = useMemo(() => {
    if (!form.name) return "U";
    return form.name
      .split(" ")
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
  }, [form.name]);

  useEffect(() => {
    let interval;
    if (otpCooldown > 0) {
      interval = setInterval(() => {
        setOtpCooldown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [otpCooldown]);

  const loadProfile = useCallback(async () => {
    if (status !== "authenticated") return;
    setProfileLoading(true);
    try {
      const res = await fetch("/api/profile", { cache: "no-store" });
      if (!res.ok) {
        throw new Error("Failed to load profile");
      }
      const data = await res.json();
      const user = data.user ?? {};
      setProfile(user);
      setForm({
        name: user.name ?? "",
        phone: user.phone ?? "",
      });
      setAvatarPreview(user.image ?? "");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Unable to load profile");
    } finally {
      setProfileLoading(false);
    }
  }, [status]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const hasProfileChanges = useMemo(() => {
    if (!profile) return false;
    return (
      (form.name ?? "") !== (profile.name ?? "") ||
      (form.phone ?? "") !== (profile.phone ?? "")
    );
  }, [form, profile]);

  const handleProfileSave = async () => {
    if (!hasProfileChanges) {
      toast.info("No changes to save");
      return;
    }
    setSavingProfile(true);
    try {
      const payload = {};
      if ((form.name ?? "") !== (profile?.name ?? "")) {
        payload.name = form.name;
      }
      if ((form.phone ?? "") !== (profile?.phone ?? "")) {
        payload.phone = form.phone;
      }

      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to update profile");
      }

      const data = await res.json();
      setProfile((prev) => ({ ...(prev ?? {}), ...(data.user ?? {}) }));
      toast.success("Profile updated");
      if (data?.user) {
        await update?.({
          name: data.user.name ?? undefined,
          image: data.user.image ?? null,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Unable to update profile");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleAvatarUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image should be under 2 MB");
      return;
    }

    setAvatarUploading(true);
    try {
      const compressed = await imageCompression(file, AVATAR_OPTIONS);
      const normalised = new File([compressed], file.name, {
        type: compressed.type,
      });

      const formData = new FormData();
      formData.append("file", normalised);
      formData.append("fileName", normalised.name);

      const uploadRes = await fetch("/api/uploads", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        const data = await uploadRes.json().catch(() => ({}));
        throw new Error(data.error || "Failed to upload image");
      }

      const uploadData = await uploadRes.json();

      const patchRes = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: uploadData.url }),
      });

      if (!patchRes.ok) {
        const data = await patchRes.json().catch(() => ({}));
        throw new Error(data.error || "Failed to save avatar");
      }

      const updated = await patchRes.json();
      const nextImage = updated?.user?.image ?? uploadData.url;
      setAvatarPreview(nextImage);
      setProfile((prev) => ({
        ...(prev ?? {}),
        ...(updated.user ?? {}),
      }));
      toast.success("Profile picture updated");
      await update?.({
        image: nextImage,
        name: updated?.user?.name ?? undefined,
      });
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Unable to update picture");
    } finally {
      setAvatarUploading(false);
      event.target.value = "";
    }
  };

  const handleSendOtp = async () => {
    setSendingOtp(true);
    try {
      const res = await fetch("/api/account/password/request-otp", {
        method: "POST",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send OTP");
      }
      toast.success("OTP sent to your email");
      setOtpSent(true);
      setOtpCooldown(OTP_COOLDOWN_SECONDS);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Unable to send OTP");
    } finally {
      setSendingOtp(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (passwordForm.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (passwordForm.otp.length !== 6) {
      toast.error("Enter the 6-digit OTP");
      return;
    }

    setUpdatingPassword(true);
    try {
      const res = await fetch("/api/account/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newPassword: passwordForm.newPassword,
          otp: passwordForm.otp,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to update password");
      }

      toast.success("Password updated successfully");
      setPasswordForm(initialPasswordForm);
      setOtpSent(false);
      setOtpCooldown(0);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Unable to update password");
    } finally {
      setUpdatingPassword(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">{heading}</h1>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {profileLoading ? (
            <div className="flex items-center gap-2 text-gray-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading profile…
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Avatar className="h-20 w-20">
                  {avatarPreview ? (
                    <AvatarImage
                      src={avatarPreview}
                      alt={form.name || "Avatar"}
                    />
                  ) : null}
                  <AvatarFallback>{initials || "U"}</AvatarFallback>
                </Avatar>
                <div className="flex flex-1 flex-col gap-2">
                  <Label className="text-xs uppercase text-gray-500">
                    Profile picture
                  </Label>
                  <p className="text-xs text-gray-500">
                    Upload a clear square image under 2 MB.
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={avatarUploading}
                    >
                      {avatarUploading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Uploading…
                        </>
                      ) : (
                        <>
                          <UploadCloud className="h-4 w-4" />
                          Upload new photo
                        </>
                      )}
                    </Button>
                    {avatarPreview ? (
                      <Button
                        type="button"
                        variant="ghost"
                        className="text-red-500 hover:text-red-600"
                        onClick={async () => {
                          if (!profile?.image) return;
                          setAvatarUploading(true);
                          try {
                            const res = await fetch("/api/profile", {
                              method: "PATCH",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ image: "" }),
                            });
                            if (!res.ok) {
                              const data = await res.json().catch(() => ({}));
                              throw new Error(
                                data.error || "Failed to remove image"
                              );
                            }
                            const updated = await res.json();
                            setAvatarPreview(updated?.user?.image ?? "");
                            setProfile((prev) => ({
                              ...(prev ?? {}),
                              ...(updated.user ?? { image: null }),
                            }));
                            toast.success("Profile picture removed");
                            await update?.({
                              image: updated?.user?.image ?? null,
                              name: updated?.user?.name ?? undefined,
                            });
                          } catch (error) {
                            console.error(error);
                            toast.error(
                              error.message || "Unable to remove picture"
                            );
                          } finally {
                            setAvatarUploading(false);
                          }
                        }}
                        disabled={avatarUploading}
                      >
                        Remove
                      </Button>
                    ) : null}
                  </div>
                  <input
                    id="profile-avatar-input"
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="profile-name">Full name</Label>
                  <Input
                    id="profile-name"
                    value={form.name}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        name: event.target.value,
                      }))
                    }
                    placeholder="Your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profile-phone">Phone number</Label>
                  <Input
                    id="profile-phone"
                    value={form.phone}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        phone: event.target.value,
                      }))
                    }
                    placeholder="+91 90000 00000"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={profile?.email ?? ""} disabled />
                  <p className="text-xs text-gray-500">
                    Email changes are disabled. Contact support to update.
                  </p>
                </div>
                {showRole ? (
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Input value={profile?.role ?? ""} disabled />
                  </div>
                ) : null}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  type="button"
                  onClick={handleProfileSave}
                  disabled={savingProfile || !hasProfileChanges}
                  className="w-full sm:w-auto"
                >
                  {savingProfile ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving…
                    </>
                  ) : (
                    "Save changes"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    if (profile) {
                      setForm({
                        name: profile.name ?? "",
                        phone: profile.phone ?? "",
                      });
                    }
                  }}
                  disabled={savingProfile || !hasProfileChanges}
                  className="w-full sm:w-auto"
                >
                  Reset
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
            Password changes require a verification code sent to your registered
            email address.
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="new-password">New password</Label>
              <Input
                id="new-password"
                type="password"
                value={passwordForm.newPassword}
                onChange={(event) =>
                  setPasswordForm((prev) => ({
                    ...prev,
                    newPassword: event.target.value,
                  }))
                }
                placeholder="At least 8 characters"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(event) =>
                  setPasswordForm((prev) => ({
                    ...prev,
                    confirmPassword: event.target.value,
                  }))
                }
                placeholder="Re-type new password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="otp">Email OTP</Label>
              <Input
                id="otp"
                inputMode="numeric"
                value={passwordForm.otp}
                maxLength={6}
                onChange={(event) => {
                  const onlyDigits = event.target.value.replace(/\D/g, "");
                  setPasswordForm((prev) => ({
                    ...prev,
                    otp: onlyDigits,
                  }));
                }}
                placeholder="Enter 6-digit code"
              />
            </div>
            <div className="flex items-end">
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
                onClick={handleSendOtp}
                disabled={sendingOtp || otpCooldown > 0}
              >
                {sendingOtp ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : otpCooldown > 0 ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Resend in {otpCooldown}s
                  </>
                ) : (
                  "Send OTP"
                )}
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              type="button"
              onClick={handlePasswordUpdate}
              disabled={updatingPassword || !otpSent}
              className="w-full sm:w-auto"
            >
              {updatingPassword ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating…
                </>
              ) : (
                "Update password"
              )}
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full sm:w-auto"
              onClick={() => {
                setPasswordForm(initialPasswordForm);
                setOtpSent(false);
                setOtpCooldown(0);
              }}
              disabled={updatingPassword}
            >
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
