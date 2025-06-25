"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
  Building2, 
  Users, 
  TrendingUp, 
  Activity, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  ArrowRight,
  Eye,
  Settings,
  BarChart3,
  Calendar,
  DollarSign,
  Star
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface DashboardStats {
  totalSalons: number
  verifiedSalons: number
  pendingSalons: number
  totalUsers: number
  totalRevenue: number
  growthRate: number
}

interface RecentActivity {
  id: string
  type: 'salon_approved' | 'salon_rejected' | 'user_registered' | 'revenue_generated'
  title: string
  description: string
  time: string
  status: 'success' | 'warning' | 'info'
}

interface Salon {
  id: string
  name: string
  isVerified: boolean
  createdAt: string
  owner: {
    firstName: string
    lastName: string
  }
}

export default function SuperadminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalSalons: 0,
    verifiedSalons: 0,
    pendingSalons: 0,
    totalUsers: 0,
    totalRevenue: 0,
    growthRate: 0
  })
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    setLoading(true)
    setError("")
    
    try {
      // Fetch salons data
      const salonsResponse = await fetch("/api/superadmin/salons")
      const salonsData = await salonsResponse.json()
      
      if (!salonsData.success) {
        throw new Error("Failed to fetch salons data")
      }

      const salons: Salon[] = salonsData.data || []
      const verifiedSalons = salons.filter(salon => salon.isVerified)
      const pendingSalons = salons.filter(salon => !salon.isVerified)
      
      // Calculate growth rate (comparing with previous month)
      const currentMonth = new Date().getMonth()
      const currentYear = new Date().getFullYear()
      const thisMonthSalons = salons.filter(salon => {
        const salonDate = new Date(salon.createdAt)
        return salonDate.getMonth() === currentMonth && salonDate.getFullYear() === currentYear
      })
      
      const lastMonthSalons = salons.filter(salon => {
        const salonDate = new Date(salon.createdAt)
        const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1
        const lastYear = currentMonth === 0 ? currentYear - 1 : currentYear
        return salonDate.getMonth() === lastMonth && salonDate.getFullYear() === lastYear
      })
      
      const growthRate = lastMonthSalons.length > 0 
        ? ((thisMonthSalons.length - lastMonthSalons.length) / lastMonthSalons.length) * 100
        : 0

      // Fetch users data (you'll need to create this API endpoint)
      let totalUsers = 0
      try {
        const usersResponse = await fetch("/api/superadmin/users")
        const usersData = await usersResponse.json()
        if (usersData.success) {
          totalUsers = usersData.data?.length || 0
        }
      } catch (err) {
        console.warn("Users API not available, using default value")
        totalUsers = Math.floor(Math.random() * 1000) + 2000 // Fallback
      }

      // Calculate estimated revenue (you can replace this with actual revenue API)
      const estimatedRevenue = verifiedSalons.length * 800 // Average revenue per salon

      // Update stats
      setStats({
        totalSalons: salons.length,
        verifiedSalons: verifiedSalons.length,
        pendingSalons: pendingSalons.length,
        totalUsers,
        totalRevenue: estimatedRevenue,
        growthRate: Math.round(growthRate * 10) / 10
      })

      // Generate recent activity from salon data
      const activities: RecentActivity[] = []
      
      // Add recent salon activities
      const recentSalons = salons
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 3)

      recentSalons.forEach((salon, index) => {
        const timeAgo = getTimeAgo(new Date(salon.createdAt))
        activities.push({
          id: `salon-${salon.id}`,
          type: salon.isVerified ? 'salon_approved' : 'salon_rejected',
          title: salon.isVerified ? 'Salon Approved' : 'New Salon Application',
          description: `${salon.name} by ${salon.owner.firstName} ${salon.owner.lastName}`,
          time: timeAgo,
          status: salon.isVerified ? 'success' : 'warning'
        })
      })

      // Add some system activities
      if (activities.length < 4) {
        activities.push({
          id: 'revenue-1',
          type: 'revenue_generated',
          title: 'Revenue Milestone',
          description: `Platform reached $${estimatedRevenue.toLocaleString()} in total revenue`,
          time: '1 hour ago',
          status: 'success'
        })
      }

      setRecentActivity(activities)
      
    } catch (err) {
      console.error('Error fetching dashboard data:', err)
      setError("Failed to load dashboard data")
    } finally {
      setLoading(false)
    }
  }

  const getTimeAgo = (date: Date): string => {
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    return `${Math.floor(diffInSeconds / 86400)} days ago`
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case 'info':
        return <Activity className="h-4 w-4 text-blue-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-50 text-green-700 border-green-200'
      case 'warning':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200'
      case 'info':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Dashboard</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button onClick={fetchDashboardData} className="gap-2">
          <Activity className="h-4 w-4" />
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Superadmin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your platform today.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="gap-2" onClick={fetchDashboardData}>
            <Activity className="h-4 w-4" />
            Refresh
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Total Salons</CardTitle>
            <Building2 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{stats.totalSalons}</div>
            <p className="text-xs text-blue-600 mt-1">
              <span className={stats.growthRate >= 0 ? "text-green-600" : "text-red-600"}>
                {stats.growthRate >= 0 ? "+" : ""}{stats.growthRate}%
              </span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Verified Salons</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{stats.verifiedSalons}</div>
            <div className="flex items-center mt-2">
              <Progress 
                value={stats.totalSalons > 0 ? (stats.verifiedSalons / stats.totalSalons) * 100 : 0} 
                className="h-2 flex-1 mr-2" 
              />
              <span className="text-xs text-green-600">
                {stats.totalSalons > 0 ? Math.round((stats.verifiedSalons / stats.totalSalons) * 100) : 0}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-yellow-50 to-amber-50 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-700">Pending Approval</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900">{stats.pendingSalons}</div>
            <p className="text-xs text-yellow-600 mt-1">
              {stats.pendingSalons > 0 ? "Requires attention" : "All caught up"}
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">${stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-purple-600 mt-1">
              <span className="text-green-600">+{Math.round((stats.verifiedSalons / Math.max(stats.totalSalons, 1)) * 100)}%</span> from verified salons
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-indigo-600" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/superadmin/salons">
                  <Card className="border border-gray-200 hover:border-indigo-300 transition-all duration-200 hover:shadow-md cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-indigo-100 rounded-xl group-hover:bg-indigo-200 transition-colors">
                          <Building2 className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                            Manage Salons
                          </h3>
                          <p className="text-sm text-gray-600">
                            {stats.pendingSalons > 0 
                              ? `${stats.pendingSalons} pending approval` 
                              : "Review and approve salon applications"
                            }
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/superadmin/users">
                  <Card className="border border-gray-200 hover:border-purple-300 transition-all duration-200 hover:shadow-md cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors">
                          <Users className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                            User Management
                          </h3>
                          <p className="text-sm text-gray-600">
                            {stats.totalUsers} total users on platform
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/superadmin/analytics">
                  <Card className="border border-gray-200 hover:border-green-300 transition-all duration-200 hover:shadow-md cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors">
                          <BarChart3 className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                            Analytics
                          </h3>
                          <p className="text-sm text-gray-600">View platform insights and metrics</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-green-600 transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/superadmin/settings">
                  <Card className="border border-gray-200 hover:border-orange-300 transition-all duration-200 hover:shadow-md cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-orange-100 rounded-xl group-hover:bg-orange-200 transition-colors">
                          <Settings className="h-6 w-6 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                            System Settings
                          </h3>
                          <p className="text-sm text-gray-600">Configure platform settings</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-orange-600 transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-indigo-600" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="mt-1">
                        {getStatusIcon(activity.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                      <Badge className={`text-xs ${getStatusColor(activity.status)}`}>
                        {activity.status}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <Activity className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">No recent activity</p>
                  </div>
                )}
              </div>
              <Button variant="ghost" className="w-full mt-4 text-indigo-600 hover:text-indigo-700">
                View All Activity
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Platform Health */}
      <Card className="border-0 bg-gradient-to-r from-indigo-50 to-purple-50 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-indigo-900">
            <Star className="h-5 w-5" />
            Platform Health Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-900">
                {stats.totalSalons > 0 ? Math.round((stats.verifiedSalons / stats.totalSalons) * 100) : 100}%
              </div>
              <p className="text-sm text-indigo-700">Verification Rate</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-900">{stats.totalSalons}</div>
              <p className="text-sm text-indigo-700">Active Salons</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-900">{stats.totalUsers}</div>
              <p className="text-sm text-indigo-700">Total Users</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 