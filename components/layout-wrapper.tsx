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
  const isBookingPage = pathname === '/customer/booking'
  
  return (
    <>
      {!isAdminRoute && !isBookingPage && <CustomerNavbar />}
      <main className={isAdminRoute || isBookingPage ? "" : "min-h-screen"}>
        {children}
      </main>
      {!isAdminRoute && !isBookingPage && <CustomerFooter />}
    </>
  )
} 