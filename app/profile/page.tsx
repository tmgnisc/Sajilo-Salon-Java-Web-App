import { UserProfile } from "@/components/customer/user-profile"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-rose-50">
      <div className="container mx-auto px-4 py-8">
        <UserProfile />
      </div>
    </div>
  )
} 