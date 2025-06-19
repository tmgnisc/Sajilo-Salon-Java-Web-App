"use client"

import { useState } from "react"
import { Bell, Check, X, Calendar, Star, Gift } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

export function UserNotifications() {
  const { toast } = useToast()
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "booking",
      title: "Booking Confirmed",
      message: "Your appointment at Glamour Studio has been confirmed for Jan 15, 2024 at 10:30 AM",
      time: "2 hours ago",
      read: false,
      icon: Calendar,
    },
    {
      id: 2,
      type: "reminder",
      title: "Appointment Reminder",
      message: "Your appointment at Bliss Spa is tomorrow at 2:00 PM. Don't forget!",
      time: "1 day ago",
      read: false,
      icon: Bell,
    },
    {
      id: 3,
      type: "review",
      title: "Rate Your Experience",
      message: "How was your recent visit to Style Hub? Share your feedback and help others.",
      time: "3 days ago",
      read: true,
      icon: Star,
    },
    {
      id: 4,
      type: "offer",
      title: "Special Offer",
      message: "20% off on your next booking! Use code BEAUTY20. Valid until end of month.",
      time: "1 week ago",
      read: true,
      icon: Gift,
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
      case "reminder":
        return "bg-purple-100 text-purple-700"
      case "review":
        return "bg-amber-100 text-amber-700"
      case "offer":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
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
