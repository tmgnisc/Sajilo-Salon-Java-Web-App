"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Calendar,
  Scissors,
  CreditCard,
  DollarSign,
  Tags,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Calendar, label: "Bookings", href: "/admin/bookings", badge: 5 },
  { icon: Scissors, label: "Services", href: "/admin/services" },
  { icon: CreditCard, label: "Transactions", href: "/admin/transactions" },
  { icon: DollarSign, label: "Payments", href: "/admin/payments" },
  { icon: Tags, label: "Categories", href: "/admin/categories" },
  { icon: Bell, label: "Notifications", href: "/admin/notifications", badge: 3 },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
]

export function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"}`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-rose-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-rose-500 bg-clip-text text-transparent">
                Sajilo Admin
              </span>
            </div>
          )}
          <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)} className="h-8 w-8">
            {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-gradient-to-r from-purple-600 to-rose-500 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {!isCollapsed && (
                      <>
                        <span className="flex-1">{item.label}</span>
                        {item.badge && (
                          <Badge className={`${isActive ? "bg-white/20 text-white" : "bg-purple-100 text-purple-700"}`}>
                            {item.badge}
                          </Badge>
                        )}
                      </>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          {!isCollapsed && (
            <div className="mb-4 p-3 bg-gradient-to-r from-purple-50 to-rose-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">Glamour Studio</p>
              <p className="text-xs text-gray-600">Premium Salon</p>
            </div>
          )}
          <Button variant="ghost" className="w-full justify-start text-red-600 hover:bg-red-50">
            <LogOut className="h-5 w-5 mr-3" />
            {!isCollapsed && "Logout"}
          </Button>
        </div>
      </div>
    </div>
  )
}
