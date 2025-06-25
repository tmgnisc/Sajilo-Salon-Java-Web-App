"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Building2,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  TrendingUp,
  Activity,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const menuItems = [
  { 
    icon: LayoutDashboard, 
    label: "Dashboard", 
    href: "/superadmin",
    description: "Overview & analytics"
  },
  { 
    icon: Building2, 
    label: "Salons", 
    href: "/superadmin/salons",
    description: "Manage all salons",
    badge: "New"
  },
  { 
    icon: Users, 
    label: "Users", 
    href: "/superadmin/users",
    description: "User management"
  },
  { 
    icon: Activity, 
    label: "Analytics", 
    href: "/superadmin/analytics",
    description: "Platform insights"
  },
  { 
    icon: Settings, 
    label: "Settings", 
    href: "/superadmin/settings",
    description: "System configuration"
  },
]

export default function SuperadminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
    router.push('/')
  }

  return (
    <div className={cn(
      "bg-white/80 backdrop-blur-xl border-r border-gray-200/50 transition-all duration-300 ease-in-out",
      "shadow-lg shadow-gray-900/5",
      isCollapsed ? "w-20" : "w-72"
    )}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Superadmin
                </h1>
                <p className="text-xs text-gray-500">Platform Control</p>
              </div>
            </div>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsCollapsed(!isCollapsed)} 
            className="h-9 w-9 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/superadmin" && pathname.startsWith(item.href))
            return (
              <Button
                key={item.href}
                variant="ghost"
                className={cn(
                  "w-full justify-start h-auto p-4 rounded-xl transition-all duration-200 group",
                  "hover:shadow-md hover:scale-[1.02]",
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-50/80"
                )}
                onClick={() => router.push(item.href)}
              >
                <div className="flex items-center w-full">
                  <div className={cn(
                    "p-2 rounded-lg transition-colors",
                    isActive 
                      ? "bg-white/20" 
                      : "bg-gray-100 group-hover:bg-gray-200"
                  )}>
                    <item.icon className="h-4 w-4" />
                  </div>
                  {!isCollapsed && (
                    <div className="flex-1 ml-3 text-left">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.label}</span>
                        {item.badge && (
                          <Badge className="text-xs bg-white/20 text-white border-0">
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      <p className={cn(
                        "text-xs mt-0.5",
                        isActive ? "text-white/80" : "text-gray-500"
                      )}>
                        {item.description}
                      </p>
                    </div>
                  )}
                </div>
              </Button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200/50">
          {!isCollapsed && (
            <div className="mb-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100/50">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Platform Status</p>
                  <p className="text-xs text-gray-600">All systems operational</p>
                </div>
              </div>
            </div>
          )}
          <Button 
            variant="ghost" 
            className={cn(
              "w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700",
              "rounded-xl p-4 transition-all duration-200"
            )}
            onClick={handleLogout}
          >
            <div className="p-2 rounded-lg bg-red-100">
              <LogOut className="h-4 w-4" />
            </div>
            {!isCollapsed && <span className="ml-3 font-medium">Logout</span>}
          </Button>
        </div>
      </div>
    </div>
  )
} 