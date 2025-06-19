"use client"

import { useState, useEffect } from "react"
import { Bell, Check, X, Calendar, Star, Gift, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useApi } from "@/hooks/use-api"

interface Notification {
  id: string
  type: string
  title: string
  message: string
  isRead: boolean
  createdAt: string
}

export function UserNotifications() {
  const { toast } = useToast()
  const { apiCall, loading, error } = useApi()
  const [notifications, setNotifications] = useState<Notification[]>([])

  // Fetch notifications on component mount
  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    const response = await apiCall<Notification[]>('/user/notifications')
    if (response.success && response.data) {
      setNotifications(response.data)
    }
  }

  const markAsRead = async (id: string) => {
    const response = await apiCall('/user/notifications', {
      method: 'PUT',
      body: JSON.stringify({ action: 'markAsRead', notificationId: id })
    })
    
    if (response.success) {
      setNotifications(notifications.map((notif) => 
        notif.id === id ? { ...notif, isRead: true } : notif
      ))
      toast({
        title: "Marked as read",
        description: "Notification has been marked as read",
      })
    } else {
      toast({
        title: "Failed",
        description: response.error || "Failed to mark as read",
        variant: "destructive"
      })
    }
  }

  const markAllAsRead = async () => {
    const response = await apiCall('/user/notifications', {
      method: 'PUT',
      body: JSON.stringify({ action: 'markAllAsRead' })
    })
    
    if (response.success) {
      setNotifications(notifications.map((notif) => ({ ...notif, isRead: true })))
      toast({
        title: "All notifications marked as read",
        description: "All your notifications have been marked as read",
      })
    } else {
      toast({
        title: "Failed",
        description: response.error || "Failed to mark all as read",
        variant: "destructive"
      })
    }
  }

  const deleteNotification = async (id: string) => {
    const response = await apiCall('/user/notifications', {
      method: 'PUT',
      body: JSON.stringify({ action: 'delete', notificationId: id })
    })
    
    if (response.success) {
      setNotifications(notifications.filter((notif) => notif.id !== id))
      toast({
        title: "Notification deleted",
        description: "The notification has been removed",
      })
    } else {
      toast({
        title: "Failed",
        description: response.error || "Failed to delete notification",
        variant: "destructive"
      })
    }
  }

  const unreadCount = notifications.filter((notif) => !notif.isRead).length

  const getTypeColor = (type: string) => {
    switch (type) {
      case "BOOKING":
        return "bg-blue-100 text-blue-700"
      case "REMINDER":
        return "bg-purple-100 text-purple-700"
      case "REVIEW":
        return "bg-amber-100 text-amber-700"
      case "OFFER":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "BOOKING":
        return Calendar
      case "REMINDER":
        return Bell
      case "REVIEW":
        return Star
      case "OFFER":
        return Gift
      default:
        return Bell
    }
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) {
      return 'Just now'
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`
    }
  }

  if (loading && notifications.length === 0) {
    return (
      <div className="max-w-4xl mx-auto flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading notifications...</span>
        </div>
      </div>
    )
  }

  if (error && notifications.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={fetchNotifications}>Retry</Button>
        </div>
      </div>
    )
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
              {notifications.map((notification) => {
                const IconComponent = getTypeIcon(notification.type)
                return (
                  <Card
                    key={notification.id}
                    className={`border transition-all duration-200 ${
                      notification.isRead ? "border-gray-200 bg-white" : "border-purple-200 bg-purple-50/50"
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className={`p-2 rounded-full ${notification.isRead ? "bg-gray-100" : "bg-purple-100"}`}>
                            <IconComponent
                              className={`h-5 w-5 ${notification.isRead ? "text-gray-600" : "text-purple-600"}`}
                            />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className={`font-semibold ${notification.isRead ? "text-gray-900" : "text-gray-900"}`}>
                                {notification.title}
                              </h3>
                              <Badge className={getTypeColor(notification.type)}>
                                {notification.type.charAt(0).toUpperCase() + notification.type.slice(1).toLowerCase()}
                              </Badge>
                              {!notification.isRead && <div className="w-2 h-2 bg-purple-600 rounded-full"></div>}
                            </div>
                            <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
                            <p className="text-xs text-gray-400">{formatTime(notification.createdAt)}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 ml-4">
                          {!notification.isRead && (
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
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
