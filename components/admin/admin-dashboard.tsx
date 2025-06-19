"use client"

import { useState, useEffect } from "react"
import { TrendingUp, Calendar, DollarSign, Users, RefreshCw, Scissors, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useApi } from "@/hooks/use-api"
import { useToast } from "@/hooks/use-toast"

interface DashboardData {
  salon: {
    id: string
    name: string
    type: string
    address: string
    description: string | null
    imageUrl: string | null
    isVerified: boolean
  }
  stats: {
    totalBookings: number
    completedBookings: number
    pendingBookings: number
    totalRevenue: number
    totalServices: number
  }
  recentBookings: {
    id: string
    customer: string
    service: string
    time: string
    date: string
    status: string
    totalAmount: number
  }[]
  monthlyData: {
    month: string
    revenue: number
    bookings: number
  }[]
}

export function AdminDashboard() {
  const { apiCall, loading, error } = useApi()
  const { toast } = useToast()
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    const response = await apiCall<DashboardData>('/admin/dashboard')
    if (response.success && response.data) {
      setDashboardData(response.data)
    } else {
      toast({
        title: "Error",
        description: response.error || "Failed to load dashboard data",
        variant: "destructive"
      })
    }
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await fetchDashboardData()
    setIsRefreshing(false)
    toast({
      title: "Refreshed",
      description: "Dashboard data has been updated"
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-100 text-blue-700"
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      case "completed":
        return "bg-green-100 text-green-700"
      case "cancelled":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  if (loading && !dashboardData) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading dashboard...</span>
        </div>
      </div>
    )
  }

  if (error && !dashboardData) {
    return (
      <div className="p-6">
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={fetchDashboardData}>Retry</Button>
        </div>
      </div>
    )
  }

  if (!dashboardData) {
    return null
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening at {dashboardData.salon.name}.</p>
        </div>
        <Button 
          className="bg-gradient-to-r from-purple-600 to-rose-500 hover:from-purple-700 hover:to-rose-600"
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          {isRefreshing ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4 mr-2" />
          )}
          Refresh Data
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Total Revenue</p>
                <p className="text-2xl font-bold">₹{dashboardData.stats.totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-purple-200">From {dashboardData.stats.completedBookings} completed bookings</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-r from-rose-500 to-rose-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-rose-100">Total Bookings</p>
                <p className="text-2xl font-bold">{dashboardData.stats.totalBookings}</p>
                <p className="text-sm text-rose-200">{dashboardData.stats.pendingBookings} pending</p>
              </div>
              <Calendar className="h-8 w-8 text-rose-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-r from-amber-500 to-amber-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-100">Active Services</p>
                <p className="text-2xl font-bold">{dashboardData.stats.totalServices}</p>
                <p className="text-sm text-amber-200">Available for booking</p>
              </div>
              <Scissors className="h-8 w-8 text-amber-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100">Completion Rate</p>
                <p className="text-2xl font-bold">
                  {dashboardData.stats.totalBookings > 0 
                    ? Math.round((dashboardData.stats.completedBookings / dashboardData.stats.totalBookings) * 100)
                    : 0}%
                </p>
                <p className="text-sm text-emerald-200">Bookings completed</p>
              </div>
              <TrendingUp className="h-8 w-8 text-emerald-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Data Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Revenue Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.monthlyData.map((month, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{month.month}</p>
                    <p className="text-sm text-gray-600">{month.bookings} bookings</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-purple-600">₹{month.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Monthly Bookings Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.monthlyData.map((month, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{month.month}</p>
                    <p className="text-sm text-gray-600">Revenue: ₹{month.revenue.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-rose-600">{month.bookings}</p>
                    <p className="text-sm text-gray-500">bookings</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            {dashboardData.recentBookings.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No recent bookings</p>
              </div>
            ) : (
              <div className="space-y-4">
                {dashboardData.recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{booking.customer}</p>
                      <p className="text-sm text-gray-600">{booking.service}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(booking.date).toLocaleDateString()} at {booking.time}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                      <p className="text-sm font-medium text-gray-900 mt-1">₹{booking.totalAmount}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-20 flex-col border-purple-200 text-purple-600 hover:bg-purple-50"
                onClick={() => (window.location.href = "/admin/services")}
              >
                <Scissors className="h-6 w-6 mb-2" />
                Add Service
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col border-rose-200 text-rose-600 hover:bg-rose-50"
                onClick={() => (window.location.href = "/admin/bookings")}
              >
                <Calendar className="h-6 w-6 mb-2" />
                View Bookings
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col border-amber-200 text-amber-600 hover:bg-amber-50"
                onClick={() => (window.location.href = "/admin/transactions")}
              >
                <DollarSign className="h-6 w-6 mb-2" />
                Transactions
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                onClick={() => (window.location.href = "/admin/settings")}
              >
                <Users className="h-6 w-6 mb-2" />
                Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
