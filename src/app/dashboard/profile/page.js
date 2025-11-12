import { AccountProfile } from "@/components/profile/account-profile";

export default function AdminProfile() {
  return (
    <div className="p-6">
      <AccountProfile
        heading="Admin Profile"
        description="Keep your administrator details up to date and manage account security."
        showRole
      />
    </div>
  );
}

