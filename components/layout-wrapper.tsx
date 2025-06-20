"use client"

import { usePathname } from "next/navigation"
import { CustomerNavbar } from "@/components/customer/navbar"
import { CustomerFooter } from "@/components/customer/footer"

interface LayoutWrapperProps {
  children: React.ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname()
  
  // Check if current path is admin route
  const isAdminRoute = pathname?.startsWith('/admin') || pathname?.startsWith('/superadmin')
  
  return (
    <>
      {!isAdminRoute && <CustomerNavbar />}
      <main className={isAdminRoute ? "" : "min-h-screen"}>
        {children}
      </main>
      {!isAdminRoute && <CustomerFooter />}
    </>
  )
} 