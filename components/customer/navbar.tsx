"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Bell, Menu, X, User, LogOut, Settings, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { useApi } from "@/hooks/use-api"

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
}

interface Notification {
  id: string
  isRead: boolean
}

export function CustomerNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [notificationCount, setNotificationCount] = useState(0)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { apiCall } = useApi()

  useEffect(() => {
    // Check for user data in localStorage
    const userData = localStorage.getItem('user')
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    
    if (userData && token) {
      try {
        setUser(JSON.parse(userData))
        // Fetch notification count if user is logged in
        fetchNotificationCount()
      } catch (error) {
        console.error('Error parsing user data:', error)
        // Clear invalid data
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        sessionStorage.removeItem('token')
      }
    }
    setIsLoading(false)
  }, [])

  const fetchNotificationCount = async () => {
    try {
      const response = await apiCall<Notification[]>('/user/notifications')
      if (response.success && response.data) {
        const unreadCount = response.data.filter(notif => !notif.isRead).length
        setNotificationCount(unreadCount)
      }
    } catch (error) {
      console.error('Error fetching notification count:', error)
    }
  }

  const handleLogout = () => {
    // Clear all auth data
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
    
    // Reset user state
    setUser(null)
    setNotificationCount(0)
    
    // Redirect to home page
    router.push('/')
  }

  if (isLoading) {
    return (
      <nav className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-rose-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-rose-500 bg-clip-text text-transparent">
                Sajilo Salon
              </span>
            </Link>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-rose-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-rose-500 bg-clip-text text-transparent">
              Sajilo Salon
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/salons" className="text-gray-700 hover:text-purple-600 transition-colors">
              Find Salons
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-purple-600 transition-colors">
              Services
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-purple-600 transition-colors">
              About
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications - Only show when logged in */}
            {user && (
              <Link href="/notifications" className="relative">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {notificationCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-rose-500">
                      {notificationCount}
                    </Badge>
                  )}
                </Button>
              </Link>
            )}

            {/* User Menu - Only show when logged in */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2 border-b">
                    <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center">
                      <Settings className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/bookings" className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Booking History
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              /* Get Started Button - Only show when not logged in */
              <Button className="hidden md:flex bg-gradient-to-r from-purple-600 to-rose-500 hover:from-purple-700 hover:to-rose-600">
                <Link href="/auth">Get Started</Link>
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-purple-100">
            <div className="flex flex-col space-y-4">
              <Link href="/salons" className="text-gray-700 hover:text-purple-600 transition-colors">
                Find Salons
              </Link>
              <Link href="/services" className="text-gray-700 hover:text-purple-600 transition-colors">
                Services
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-purple-600 transition-colors">
                About
              </Link>
              
              {/* Mobile menu items based on auth status */}
              {user ? (
                <>
                  <Link href="/notifications" className="text-gray-700 hover:text-purple-600 transition-colors flex items-center">
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                    {notificationCount > 0 && (
                      <Badge className="ml-2 h-5 w-5 flex items-center justify-center p-0 bg-rose-500 text-xs">
                        {notificationCount}
                      </Badge>
                    )}
                  </Link>
                  <Link href="/profile" className="text-gray-700 hover:text-purple-600 transition-colors flex items-center">
                    <Settings className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                  <Link href="/bookings" className="text-gray-700 hover:text-purple-600 transition-colors flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Booking History
                  </Link>
                  <Button 
                    onClick={handleLogout} 
                    variant="ghost" 
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 w-full justify-start"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <Button className="bg-gradient-to-r from-purple-600 to-rose-500 hover:from-purple-700 hover:to-rose-600 w-full">
                  <Link href="/auth">Get Started</Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 