"use client"

import type React from "react"
import AdminSidebar from "@/components/admin/admin-sidebar"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useApi } from "@/hooks/use-api"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { apiCall } = useApi()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    async function checkVerification() {
      try {
        const response = await apiCall<any>("/admin/salon")
        if (response.success && response.data) {
          if (!response.data.isVerified) {
            router.replace("/verification-pending")
            return
          }
        }
      } catch (e) {
        // Optionally handle error
      } finally {
        setChecking(false)
      }
    }
    checkVerification()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (checking) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
