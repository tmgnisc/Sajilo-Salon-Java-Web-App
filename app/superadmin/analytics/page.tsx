"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Building2, 
  DollarSign, 
  Calendar,
  ArrowUp,
  ArrowDown,
  Activity,
  Target,
  PieChart
} from "lucide-react"

interface AnalyticsData {
  revenue: {
    current: number
    previous: number
    growth: number
  }
  users: {
    current: number
    previous: number
    growth: number
  }
  salons: {
    current: number
    previous: number
    growth: number
  }
  bookings: {
    current: number
    previous: number
    growth: number
  }
  monthlyData: {
    month: string
    revenue: number
    users: number
    salons: number
  }[]
  topSalons: {
    name: string
    revenue: number
    bookings: number
  }[]
}

export default function SuperadminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading analytics data
    setTimeout(() => {
      setData({
        revenue: {
          current: 125000,
          previous: 98000,
          growth: 27.6
        },
        users: {
          current: 2847,
          previous: 2156,
          growth: 32.1
        },
        salons: {
          current: 156,
          previous: 142,
          growth: 9.9
        },
        bookings: {
          current: 1247,
          previous: 892,
          growth: 39.8
        },
        monthlyData: [
          { month: 'Jan', revenue: 85000, users: 1800, salons: 120 },
          { month: 'Feb', revenue: 92000, users: 1950, salons: 125 },
          { month: 'Mar', revenue: 98000, users: 2156, salons: 142 },
          { month: 'Apr', revenue: 125000, users: 2847, salons: 156 }
        ],
        topSalons: [
          { name: 'Beauty Haven Salon', revenue: 15000, bookings: 89 },
          { name: 'Glamour Studio', revenue: 12800, bookings: 76 },
          { name: 'Elite Hair & Beauty', revenue: 11200, bookings: 65 },
          { name: 'Royal Spa', revenue: 9800, bookings: 54 },
          { name: 'Modern Cuts', revenue: 8900, bookings: 48 }
        ]
      })
      setLoading(false)
    }, 1000)
  }, [])

  const getGrowthIcon = (growth: number) => {
    if (growth > 0) {
      return <ArrowUp className="h-4 w-4 text-green-500" />
    }
    return <ArrowDown className="h-4 w-4 text-red-500" />
  }

  const getGrowthColor = (growth: number) => {
    if (growth > 0) {
      return 'text-green-600'
    }
    return 'text-red-600'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <BarChart3 className="h-8 w-8 animate-pulse mx-auto mb-4 text-indigo-600" />
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">Platform insights and performance metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Last 30 Days
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
            <Activity className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">
              ${data.revenue.current.toLocaleString()}
            </div>
            <div className="flex items-center mt-2">
              {getGrowthIcon(data.revenue.growth)}
              <span className={`text-sm font-medium ml-1 ${getGrowthColor(data.revenue.growth)}`}>
                +{data.revenue.growth}%
              </span>
              <span className="text-xs text-gray-500 ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">
              {data.users.current.toLocaleString()}
            </div>
            <div className="flex items-center mt-2">
              {getGrowthIcon(data.users.growth)}
              <span className={`text-sm font-medium ml-1 ${getGrowthColor(data.users.growth)}`}>
                +{data.users.growth}%
              </span>
              <span className="text-xs text-gray-500 ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Active Salons</CardTitle>
            <Building2 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              {data.salons.current}
            </div>
            <div className="flex items-center mt-2">
              {getGrowthIcon(data.salons.growth)}
              <span className={`text-sm font-medium ml-1 ${getGrowthColor(data.salons.growth)}`}>
                +{data.salons.growth}%
              </span>
              <span className="text-xs text-gray-500 ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-orange-50 to-amber-50 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">
              {data.bookings.current.toLocaleString()}
            </div>
            <div className="flex items-center mt-2">
              {getGrowthIcon(data.bookings.growth)}
              <span className={`text-sm font-medium ml-1 ${getGrowthColor(data.bookings.growth)}`}>
                +{data.bookings.growth}%
              </span>
              <span className="text-xs text-gray-500 ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-indigo-600" />
              Monthly Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.monthlyData.map((month, index) => (
                <div key={month.month} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-semibold text-indigo-600">{month.month}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Revenue</p>
                      <p className="text-xs text-gray-500">{month.users} users, {month.salons} salons</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">${month.revenue.toLocaleString()}</p>
                    <div className="w-20 h-2 bg-gray-200 rounded-full mt-1">
                      <div 
                        className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                        style={{ width: `${(month.revenue / Math.max(...data.monthlyData.map(m => m.revenue))) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Salons */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-indigo-600" />
              Top Performing Salons
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.topSalons.map((salon, index) => (
                <div key={salon.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{salon.name}</p>
                      <p className="text-xs text-gray-500">{salon.bookings} bookings</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">${salon.revenue.toLocaleString()}</p>
                    <Badge className="text-xs bg-green-100 text-green-800">
                      Top Performer
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Health */}
      <Card className="border-0 bg-gradient-to-r from-indigo-50 to-purple-50 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-indigo-900">
            <Activity className="h-5 w-5" />
            Platform Health Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-900">98.5%</div>
              <p className="text-sm text-indigo-700">Uptime</p>
              <div className="w-full h-2 bg-indigo-200 rounded-full mt-2">
                <div className="h-2 bg-green-500 rounded-full" style={{ width: '98.5%' }}></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-900">2.3s</div>
              <p className="text-sm text-indigo-700">Avg Response Time</p>
              <div className="w-full h-2 bg-indigo-200 rounded-full mt-2">
                <div className="h-2 bg-blue-500 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-900">1,247</div>
              <p className="text-sm text-indigo-700">Active Sessions</p>
              <div className="w-full h-2 bg-indigo-200 rounded-full mt-2">
                <div className="h-2 bg-purple-500 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-900">99.2%</div>
              <p className="text-sm text-indigo-700">Success Rate</p>
              <div className="w-full h-2 bg-indigo-200 rounded-full mt-2">
                <div className="h-2 bg-green-500 rounded-full" style={{ width: '99.2%' }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 