"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Bell, Menu, X, User } from "lucide-react"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"

export default function CustomerNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [notificationCount] = useState(3)
  const navigate = useNavigate()

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-rose-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-rose-500 bg-clip-text text-transparent">
              Sajilo Salon
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/salons" className="text-gray-700 hover:text-purple-600 transition-colors">
              Find Salons
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-purple-600 transition-colors">
              Services
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-purple-600 transition-colors">
              About
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Link to="/notifications" className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-rose-500">
                    {notificationCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            <Button variant="ghost" size="icon" onClick={() => navigate("/profile")}>
              <User className="h-5 w-5" />
            </Button>

            {/* Become Partner Button */}
            <Button
              className="hidden md:flex bg-gradient-to-r from-purple-600 to-rose-500 hover:from-purple-700 hover:to-rose-600"
              onClick={() => navigate("/admin")}
            >
              Become a Partner
            </Button>

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
              <Link to="/salons" className="text-gray-700 hover:text-purple-600 transition-colors">
                Find Salons
              </Link>
              <Link to="/services" className="text-gray-700 hover:text-purple-600 transition-colors">
                Services
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-purple-600 transition-colors">
                About
              </Link>
              <Button
                className="bg-gradient-to-r from-purple-600 to-rose-500 hover:from-purple-700 hover:to-rose-600 w-full"
                onClick={() => navigate("/admin")}
              >
                Become a Partner
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
