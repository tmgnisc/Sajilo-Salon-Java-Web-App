import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const notifications = await prisma.notification.findMany({
      where: { userId: decoded.userId },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      success: true,
      data: notifications
    })

  } catch (error) {
    console.error('Notifications fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const body = await request.json()
    const { action, notificationId } = body

    if (action === 'markAsRead' && notificationId) {
      // Mark specific notification as read
      await prisma.notification.updateMany({
        where: {
          id: notificationId,
          userId: decoded.userId
        },
        data: { isRead: true }
      })
    } else if (action === 'markAllAsRead') {
      // Mark all notifications as read
      await prisma.notification.updateMany({
        where: { userId: decoded.userId },
        data: { isRead: true }
      })
    } else if (action === 'delete' && notificationId) {
      // Delete specific notification
      await prisma.notification.deleteMany({
        where: {
          id: notificationId,
          userId: decoded.userId
        }
      })
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: 'Notification updated successfully'
    })

  } catch (error) {
    console.error('Notification update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 