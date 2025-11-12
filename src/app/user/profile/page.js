import { AccountProfile } from "@/components/profile/account-profile";

export default function UserProfile() {
  return (
    <div className="p-6">
      <AccountProfile
        heading="My Profile"
        description="Update your personal details, profile picture, and secure your account."
      />
    </div>
  );
}
