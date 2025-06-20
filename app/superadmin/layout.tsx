import type React from "react"
import SuperadminSidebar from "@/components/superadmin/superadmin-sidebar"

export default function SuperadminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <SuperadminSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
} 