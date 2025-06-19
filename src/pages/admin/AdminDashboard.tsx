import { TrendingUp, Calendar, DollarSign, Users, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"

const recentBookings = [
  { id: 1, customer: "Priya Sharma", service: "Hair Cut & Style", time: "10:30 AM", status: "confirmed" },
  { id: 2, customer: "Rahul Patel", service: "Facial Treatment", time: "2:00 PM", status: "pending" },
  { id: 3, customer: "Anita Singh", service: "Manicure", time: "4:30 PM", status: "completed" },
  { id: 4, customer: "Vikram Kumar", service: "Hair Color", time: "11:00 AM", status: "confirmed" },
]

export default function AdminDashboard() {
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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening at your salon.</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-rose-500 hover:from-purple-700 hover:to-rose-600">
          <RefreshCw className="h-4 w-4 mr-2" />
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
                <p className="text-2xl font-bold">₹3,28,000</p>
                <p className="text-sm text-purple-200">+12% from last month</p>
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
                <p className="text-2xl font-bold">1,285</p>
                <p className="text-sm text-rose-200">+8% from last month</p>
              </div>
              <Calendar className="h-8 w-8 text-rose-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-r from-amber-500 to-amber-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-100">New Customers</p>
                <p className="text-2xl font-bold">342</p>
                <p className="text-sm text-amber-200">+15% from last month</p>
              </div>
              <Users className="h-8 w-8 text-amber-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100">Growth Rate</p>
                <p className="text-2xl font-bold">23.5%</p>
                <p className="text-sm text-emerald-200">+3% from last month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-emerald-200" />
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
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{booking.customer}</p>
                    <p className="text-sm text-gray-600">{booking.service}</p>
                    <p className="text-xs text-gray-500">{booking.time}</p>
                  </div>
                  <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-20 flex-col border-purple-200 text-purple-600 hover:bg-purple-50">
                <Calendar className="h-6 w-6 mb-2" />
                View Bookings
              </Button>
              <Button variant="outline" className="h-20 flex-col border-rose-200 text-rose-600 hover:bg-rose-50">
                <DollarSign className="h-6 w-6 mb-2" />
                Transactions
              </Button>
              <Button variant="outline" className="h-20 flex-col border-amber-200 text-amber-600 hover:bg-amber-50">
                <Users className="h-6 w-6 mb-2" />
                Customers
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col border-emerald-200 text-emerald-600 hover:bg-emerald-50"
              >
                <TrendingUp className="h-6 w-6 mb-2" />
                Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
