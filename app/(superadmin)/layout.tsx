import { ReactNode } from "react"
import SuperadminSidebar from "@/components/superadmin/superadmin-sidebar"

export default function SuperadminLayout({ children }: { children: ReactNode }) {
  // TODO: Add role-based protection here if needed
  return (
    <div className="flex h-screen bg-gray-50">
      <SuperadminSidebar />
      <main className="flex-1 overflow-auto p-6">
        {children}
      </main>
    </div>
  )
} 