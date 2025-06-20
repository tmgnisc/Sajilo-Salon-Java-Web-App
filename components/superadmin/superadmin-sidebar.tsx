"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Building,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/superadmin" },
  { icon: Building, label: "Salons", href: "/superadmin/salons" },
]

export default function SuperadminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
    router.push('/')
  }

  const getCurrentPath = () => {
    if (typeof window !== 'undefined') {
      return window.location.pathname
    }
    return '/superadmin'
  }

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
                Superadmin
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
              const isActive = getCurrentPath().startsWith(item.href)
              return (
                <Button
                  key={item.href}
                  variant="ghost"
                  className={`w-full justify-start h-auto p-3 ${
                    isActive
                      ? "bg-gradient-to-r from-purple-600 to-rose-500 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => router.push(item.href)}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="flex-1 ml-3 text-left">{item.label}</span>
                  )}
                </Button>
              )
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-600 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            {!isCollapsed && <span className="ml-3">Logout</span>}
          </Button>
        </div>
      </div>
    </div>
  )
} 