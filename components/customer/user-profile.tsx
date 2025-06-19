"use client"

import { useState, useEffect } from "react"
import { User, Calendar, Clock, MapPin, Star, X, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useApi } from "@/hooks/use-api"

interface UserData {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string | null
  role: string
  isVerified: boolean
  createdAt: string
  salon?: {
    id: string
    name: string
    type: string
    address: string
    isVerified: boolean
  }
}

interface Booking {
  id: string
  date: string
  time: string
  status: string
  createdAt: string
  totalAmount: number
  salon: {
    id: string
    name: string
    address: string
    type: string
    isVerified: boolean
  }
  services: {
    id: string
    service: {
      id: string
      name: string
      price: number
      duration: number
    }
    price: number
  }[]
}

export function UserProfile() {
  const { toast } = useToast()
  const { apiCall, loading, error } = useApi()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [profileForm, setProfileForm] = useState({
    firstName: '',
    lastName: '',
    phone: ''
  })
  const [isUpdating, setIsUpdating] = useState(false)

  // Fetch user data and bookings on component mount
  useEffect(() => {
    fetchUserData()
    fetchBookings()
  }, [])

  const fetchUserData = async () => {
    const response = await apiCall<UserData>('/user/profile')
    if (response.success && response.data) {
      setUserData(response.data)
      setProfileForm({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        phone: response.data.phone || ''
      })
    }
  }

  const fetchBookings = async () => {
    const response = await apiCall<Booking[]>('/user/bookings')
    if (response.success && response.data) {
      setBookings(response.data)
    }
  }

  const handleProfileUpdate = async () => {
    setIsUpdating(true)
    const response = await apiCall<UserData>('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(profileForm)
    })
    
    if (response.success && response.data) {
      setUserData(response.data)
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      })
    } else {
      toast({
        title: "Update Failed",
        description: response.error || "Failed to update profile",
        variant: "destructive"
      })
    }
    setIsUpdating(false)
  }

  const cancelBooking = async (bookingId: string) => {
    const response = await apiCall(`/user/bookings?id=${bookingId}`, {
      method: 'DELETE'
    })
    
    if (response.success) {
      // Refresh bookings
      fetchBookings()
      toast({
        title: "Booking Cancelled",
        description: "Your booking has been successfully cancelled.",
      })
    } else {
      toast({
        title: "Cancellation Failed",
        description: response.error || "Failed to cancel booking",
        variant: "destructive"
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-blue-100 text-blue-700"
      case "COMPLETED":
        return "bg-green-100 text-green-700"
      case "PENDING":
        return "bg-purple-100 text-purple-700"
      case "CANCELLED":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatTime = (timeString: string) => {
    return timeString
  }

  if (loading && !userData) {
    return (
      <div className="max-w-4xl mx-auto flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading profile...</span>
        </div>
      </div>
    )
  }

  if (error && !userData) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={fetchUserData}>Retry</Button>
        </div>
      </div>
    )
  }

  if (!userData) {
    return null
  }

  const upcomingBookings = bookings.filter(b => b.status === 'PENDING' || b.status === 'CONFIRMED')
  const totalSpent = bookings
    .filter(b => b.status === 'COMPLETED')
    .reduce((total, booking) => total + booking.totalAmount, 0)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600">Manage your bookings and account settings</p>
      </div>

      <Tabs defaultValue="bookings" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          <TabsTrigger value="profile">Profile Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100">Total Bookings</p>
                    <p className="text-2xl font-bold">{bookings.length}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-r from-rose-500 to-rose-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-rose-100">Amount Spent</p>
                    <p className="text-2xl font-bold">₹{totalSpent}</p>
                  </div>
                  <Star className="h-8 w-8 text-rose-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-r from-amber-500 to-amber-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-amber-100">Upcoming</p>
                    <p className="text-2xl font-bold">{upcomingBookings.length}</p>
                  </div>
                  <Clock className="h-8 w-8 text-amber-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bookings List */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Booking History</CardTitle>
            </CardHeader>
            <CardContent>
              {bookings.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No bookings yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <Card key={booking.id} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-gray-900">{booking.salon.name}</h3>
                              <Badge className={getStatusColor(booking.status)}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1).toLowerCase()}
                              </Badge>
                            </div>

                            <p className="text-gray-600 mb-2">{booking.services[0].service.name}</p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2" />
                                {formatDate(booking.date)}
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2" />
                                {formatTime(booking.time)}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2" />
                                {booking.salon.address}
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-lg font-bold text-purple-600 mb-2">₹{booking.totalAmount}</p>
                            {(booking.status === 'PENDING' || booking.status === 'CONFIRMED') && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => cancelBooking(booking.id)}
                                className="text-red-600 border-red-200 hover:bg-red-50"
                              >
                                <X className="h-4 w-4 mr-1" />
                                Cancel
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-rose-500 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{userData.firstName} {userData.lastName}</h3>
                    <p className="text-gray-600">{userData.email}</p>
                    <p className="text-sm text-gray-500">Member since {formatDate(userData.createdAt)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      value={profileForm.firstName}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, firstName: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      value={profileForm.lastName}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, lastName: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={userData.email}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button 
                    onClick={handleProfileUpdate}
                    disabled={isUpdating}
                    className="bg-gradient-to-r from-purple-600 to-rose-500 hover:from-purple-700 hover:to-rose-600"
                  >
                    {isUpdating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
