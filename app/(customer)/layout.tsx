import type React from "react"
import { CustomerNavbar } from "@/components/customer/navbar"
import { CustomerFooter } from "@/components/customer/footer"

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-rose-50">
      <CustomerNavbar />
      <main>{children}</main>
      <CustomerFooter />
    </div>
  )
}
