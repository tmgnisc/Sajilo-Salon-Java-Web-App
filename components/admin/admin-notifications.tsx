"use client"

import { useState } from "react"
import { Bell, Check, X, Calendar, Star, Gift, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

export function AdminNotifications() {
  const { toast } = useToast()
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "booking",
      title: "New Booking Received",
      message: "Priya Sharma has booked Hair Cut & Style for Jan 15, 2024 at 10:30 AM",
      time: "5 minutes ago",
      read: false,
      icon: Calendar,
      priority: "high",
    },
    {
      id: 2,
      type: "cancellation",
      title: "Booking Cancelled",
      message: "Rahul Patel cancelled his Facial Treatment appointment scheduled for today",
      time: "1 hour ago",
      read: false,
      icon: X,
      priority: "medium",
    },
    {
      id: 3,
      type: "review",
      title: "New Review Received",
      message: "Anita Singh left a 5-star review for your Manicure service",
      time: "2 hours ago",
      read: true,
      icon: Star,
      priority: "low",
    },
    {
      id: 4,
      type: "payment",
      title: "Payment Received",
      message: "Payment of ₹2,500 received for Hair Color service",
      time: "3 hours ago",
      read: true,
      icon: Gift,
      priority: "medium",
    },
    {
      id: 5,
      type: "system",
      title: "System Maintenance",
      message: "Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM",
      time: "1 day ago",
      read: false,
      icon: AlertCircle,
      priority: "high",
    },
  ])

  const markAsRead = (id: number) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
    toast({
      title: "Marked as read",
      description: "Notification has been marked as read",
    })
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })))
    toast({
      title: "All notifications marked as read",
      description: "All your notifications have been marked as read",
    })
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((notif) => notif.id !== id))
    toast({
      title: "Notification deleted",
      description: "The notification has been removed",
    })
  }

  const unreadCount = notifications.filter((notif) => !notif.read).length

  const getTypeColor = (type: string) => {
    switch (type) {
      case "booking":
        return "bg-blue-100 text-blue-700"
      case "cancellation":
        return "bg-red-100 text-red-700"
      case "review":
        return "bg-amber-100 text-amber-700"
      case "payment":
        return "bg-green-100 text-green-700"
      case "system":
        return "bg-purple-100 text-purple-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600">
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`
              : "All caught up!"}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button
            variant="outline"
            onClick={markAllAsRead}
            className="border-purple-200 text-purple-600 hover:bg-purple-50"
          >
            Mark All as Read
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-blue-100">Total</p>
              <p className="text-2xl font-bold">{notifications.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-red-100">Unread</p>
              <p className="text-2xl font-bold">{unreadCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-green-100">Read</p>
              <p className="text-2xl font-bold">{notifications.length - unreadCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-purple-100">High Priority</p>
              <p className="text-2xl font-bold">{notifications.filter((n) => n.priority === "high").length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <Card className="border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="h-5 w-5 mr-2" />
            All Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No notifications yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`border transition-all duration-200 ${
                    notification.read ? "border-gray-200 bg-white" : "border-purple-200 bg-purple-50/50"
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className={`p-2 rounded-full ${notification.read ? "bg-gray-100" : "bg-purple-100"}`}>
                          <notification.icon
                            className={`h-5 w-5 ${notification.read ? "text-gray-600" : "text-purple-600"}`}
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className={`font-semibold ${notification.read ? "text-gray-900" : "text-gray-900"}`}>
                              {notification.title}
                            </h3>
                            <Badge className={getTypeColor(notification.type)}>{notification.type}</Badge>
                            <div className={`w-2 h-2 rounded-full ${getPriorityColor(notification.priority)}`}></div>
                            {!notification.read && <div className="w-2 h-2 bg-purple-600 rounded-full"></div>}
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
                          <p className="text-xs text-gray-400">{notification.time}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="text-purple-600 hover:bg-purple-50"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
