import { Suspense } from "react";
import { UserAuthForm } from "@/components/user-auth-form";

const AuthContent = () => (
  <div className="w-full max-w-sm">
    <UserAuthForm
      defaultCallback="/dashboard/profile"
      portal="admin"
      enableSignup={false}
    />
  </div>
);

const AuthFallback = () => (
  <div className="w-full max-w-sm rounded-lg border border-dashed border-gray-200 bg-white/40 p-6 text-center text-sm text-gray-500 shadow-sm">
    Preparing administrator sign-in…
  </div>
);

export default function AdminAuthPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-secondary p-6 md:p-10">
      <Suspense fallback={<AuthFallback />}>
        <AuthContent />
      </Suspense>
    </div>
  );
}
