"use client"

import { useState, useEffect } from "react"
import { Bell, CheckCircle, AlertCircle, Info, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useApi } from "@/hooks/use-api"

interface Notification {
  id: string
  title: string
  message: string
  type: string
  isRead: boolean
  createdAt: string
}

export default function NotificationsPage() {
  const { toast } = useToast()
  const { apiCall } = useApi()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      const response = await apiCall<Notification[]>('/user/notifications')
      if (response.success && response.data) {
        setNotifications(response.data)
      } else {
        console.error('Failed to fetch notifications:', response.error)
        setNotifications([])
      }
    } catch (error) {
      console.error('Error fetching notifications:', error)
      setNotifications([])
    } finally {
      setIsLoading(false)
    }
  }

  const markAsRead = async (notificationId: string) => {
    try {
      const response = await apiCall(`/user/notifications/${notificationId}/read`, {
        method: 'PUT'
      })
      
      if (response.success) {
        // Update the notification in the list
        setNotifications(prev => 
          prev.map(notif => 
            notif.id === notificationId 
              ? { ...notif, isRead: true }
              : notif
          )
        )
        toast({
          title: "Notification marked as read",
          description: "The notification has been marked as read.",
        })
      }
    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }

  const markAllAsRead = async () => {
    try {
      const response = await apiCall('/user/notifications/read-all', {
        method: 'PUT'
      })
      
      if (response.success) {
        setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })))
        toast({
          title: "All notifications marked as read",
          description: "All notifications have been marked as read.",
        })
      }
    } catch (error) {
      console.error('Error marking all notifications as read:', error)
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'BOOKING_CONFIRMATION':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'BOOKING_CANCELLATION':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'BOOKING_CONFIRMATION':
        return 'border-green-200 bg-green-50'
      case 'BOOKING_CANCELLATION':
        return 'border-red-200 bg-red-50'
      default:
        return 'border-blue-200 bg-blue-50'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-rose-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-rose-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-rose-500 rounded-lg flex items-center justify-center">
                <Bell className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
                <p className="text-gray-600">Stay updated with your salon activities</p>
              </div>
            </div>
            
            {notifications.some(n => !n.isRead) && (
              <Button
                onClick={markAllAsRead}
                variant="outline"
                className="border-purple-200 text-purple-700 hover:bg-purple-50"
              >
                Mark all as read
              </Button>
            )}
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {notifications.length === 0 ? (
              <Card className="border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Bell className="h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No notifications yet</h3>
                  <p className="text-gray-500 text-center">
                    You're all caught up! New notifications will appear here.
                  </p>
                </CardContent>
              </Card>
            ) : (
              notifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`border-0 bg-white/80 backdrop-blur-sm transition-all duration-200 hover:shadow-md ${
                    !notification.isRead ? 'ring-2 ring-purple-200' : ''
                  } ${getNotificationColor(notification.type)}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-gray-900">
                              {notification.title}
                            </h3>
                            {!notification.isRead && (
                              <Badge className="bg-purple-100 text-purple-700">
                                New
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-600 mb-2">{notification.message}</p>
                          <p className="text-sm text-gray-500">
                            {formatDate(notification.createdAt)}
                          </p>
                        </div>
                      </div>
                      
                      {!notification.isRead && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 