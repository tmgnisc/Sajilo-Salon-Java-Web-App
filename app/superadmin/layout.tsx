import React from "react"

export default function SuperadminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* You can add a SuperadminSidebar here later */}
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
} 