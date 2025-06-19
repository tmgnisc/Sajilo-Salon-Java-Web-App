"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
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
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useApi } from "@/hooks/use-api"

interface SalonData {
  id: string
  name: string
  type: string
  address: string
  description: string | null
  imageUrl: string | null
  isVerified: boolean
  owner: {
    id: string
    firstName: string
    lastName: string
    email: string
    phone: string
    avatar: string | null
  }
}

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

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [salonData, setSalonData] = useState<SalonData | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { apiCall } = useApi()

  useEffect(() => {
    fetchSalonData()
  }, [])

  const fetchSalonData = async () => {
    try {
      const response = await apiCall<SalonData>('/admin/salon')
      if (response.success && response.data) {
        setSalonData(response.data)
      }
    } catch (error) {
      console.error('Error fetching salon data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    // Clear all auth data
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
    
    // Redirect to home page
    router.push('/')
  }

  const getCurrentPath = () => {
    if (typeof window !== 'undefined') {
      return window.location.pathname
    }
    return '/admin'
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
                    <>
                      <span className="flex-1 ml-3 text-left">{item.label}</span>
                      {item.badge && (
                        <Badge className={`${isActive ? "bg-white/20 text-white" : "bg-purple-100 text-purple-700"}`}>
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </Button>
              )
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          {!isCollapsed && (
            <div className="mb-4 p-3 bg-gradient-to-r from-purple-50 to-rose-50 rounded-lg">
              {loading ? (
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm text-gray-600">Loading...</span>
                </div>
              ) : salonData ? (
                <>
                  <p className="text-sm font-medium text-gray-900">{salonData.name}</p>
                  <p className="text-xs text-gray-600 capitalize">{salonData.type.replace('_', ' ').toLowerCase()}</p>
                </>
              ) : (
                <>
                  <p className="text-sm font-medium text-gray-900">Salon</p>
                  <p className="text-xs text-gray-600">Not loaded</p>
                </>
              )}
            </div>
          )}
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
