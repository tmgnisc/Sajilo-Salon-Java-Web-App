"use client"

import { useState } from "react"
import { Search, Filter, Calendar, Clock, Check, X, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

const bookingsData = [
  {
    id: 1,
    customer: { name: "Priya Sharma", email: "priya@example.com", phone: "+91 98765 43210" },
    service: "Hair Cut & Style",
    date: "2024-01-15",
    time: "10:30 AM",
    duration: 60,
    price: 800,
    status: "confirmed",
  },
  {
    id: 2,
    customer: { name: "Rahul Patel", email: "rahul@example.com", phone: "+91 87654 32109" },
    service: "Facial Treatment",
    date: "2024-01-15",
    time: "2:00 PM",
    duration: 90,
    price: 1200,
    status: "pending",
  },
  {
    id: 3,
    customer: { name: "Anita Singh", email: "anita@example.com", phone: "+91 76543 21098" },
    service: "Manicure & Pedicure",
    date: "2024-01-16",
    time: "4:30 PM",
    duration: 120,
    price: 600,
    status: "completed",
  },
  {
    id: 4,
    customer: { name: "Vikram Kumar", email: "vikram@example.com", phone: "+91 65432 10987" },
    service: "Hair Color",
    date: "2024-01-17",
    time: "11:00 AM",
    duration: 180,
    price: 2500,
    status: "confirmed",
  },
  {
    id: 5,
    customer: { name: "Sneha Reddy", email: "sneha@example.com", phone: "+91 54321 09876" },
    service: "Bridal Makeup",
    date: "2024-01-18",
    time: "9:00 AM",
    duration: 240,
    price: 5000,
    status: "cancelled",
  },
]

export function BookingsManagement() {
  const { toast } = useToast()
  const [bookings, setBookings] = useState(bookingsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedBooking, setSelectedBooking] = useState<any>(null)

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const updateBookingStatus = (bookingId: number, newStatus: string) => {
    setBookings(bookings.map((booking) => (booking.id === bookingId ? { ...booking, status: newStatus } : booking)))
    toast({
      title: "Booking Updated",
      description: `Booking status changed to ${newStatus}`,
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

  const getStatusCount = (status: string) => {
    return bookings.filter((booking) => booking.status === status).length
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bookings Management</h1>
          <p className="text-gray-600">Manage all your salon bookings</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-blue-100">Confirmed</p>
              <p className="text-2xl font-bold">{getStatusCount("confirmed")}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-yellow-100">Pending</p>
              <p className="text-2xl font-bold">{getStatusCount("pending")}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-green-100">Completed</p>
              <p className="text-2xl font-bold">{getStatusCount("completed")}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-red-100">Cancelled</p>
              <p className="text-2xl font-bold">{getStatusCount("cancelled")}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search by customer name or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card className="border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>All Bookings ({filteredBookings.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Service</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Date & Time</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Price</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{booking.customer.name}</p>
                        <p className="text-sm text-gray-500">{booking.customer.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{booking.service}</p>
                        <p className="text-sm text-gray-500">{booking.duration} minutes</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{booking.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{booking.time}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-purple-600">₹{booking.price}</span>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedBooking(booking)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Booking Details</DialogTitle>
                            </DialogHeader>
                            {selectedBooking && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium text-gray-700">Customer</label>
                                    <p className="text-gray-900">{selectedBooking.customer.name}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-700">Service</label>
                                    <p className="text-gray-900">{selectedBooking.service}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-700">Email</label>
                                    <p className="text-gray-900">{selectedBooking.customer.email}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-700">Phone</label>
                                    <p className="text-gray-900">{selectedBooking.customer.phone}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-700">Date</label>
                                    <p className="text-gray-900">{selectedBooking.date}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-700">Time</label>
                                    <p className="text-gray-900">{selectedBooking.time}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-700">Duration</label>
                                    <p className="text-gray-900">{selectedBooking.duration} minutes</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-700">Price</label>
                                    <p className="text-gray-900 font-semibold">₹{selectedBooking.price}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        {booking.status === "pending" && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateBookingStatus(booking.id, "confirmed")}
                              className="text-green-600 hover:bg-green-50"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateBookingStatus(booking.id, "cancelled")}
                              className="text-red-600 hover:bg-red-50"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}

                        {booking.status === "confirmed" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateBookingStatus(booking.id, "completed")}
                            className="text-blue-600 hover:bg-blue-50"
                          >
                            Complete
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
