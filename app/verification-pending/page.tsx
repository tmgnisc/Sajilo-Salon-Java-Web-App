"use client"

import { CheckCircle, Clock } from "lucide-react"
import Link from "next/link"

export default function VerificationPendingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
      <Clock className="h-16 w-16 text-yellow-500 mb-4" />
      <h1 className="text-2xl font-bold mb-2 text-gray-900">Verification Pending</h1>
      <p className="text-gray-700 mb-4 text-center max-w-md">
        Thank you for registering your salon! Your account is currently pending approval by our superadmin team. You will receive an email notification once your salon is verified and you can access the admin dashboard.
      </p>
      <Link href="/" className="text-purple-600 hover:text-purple-700 font-medium">
        Back to Home
      </Link>
    </div>
  )
} 