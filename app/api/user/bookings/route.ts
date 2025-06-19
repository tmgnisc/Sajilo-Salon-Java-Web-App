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

    const bookings = await prisma.booking.findMany({
      where: { userId: decoded.userId },
      include: {
        salon: {
          select: {
            id: true,
            name: true,
            address: true,
            type: true,
            isVerified: true
          }
        },
        services: {
          include: {
            service: {
              select: {
                id: true,
                name: true,
                price: true,
                duration: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      success: true,
      data: bookings
    })

  } catch (error) {
    console.error('Bookings fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const bookingId = searchParams.get('id')

    if (!bookingId) {
      return NextResponse.json({ error: 'Booking ID is required' }, { status: 400 })
    }

    // Check if booking belongs to user
    const booking = await prisma.booking.findFirst({
      where: {
        id: bookingId,
        userId: decoded.userId
      }
    })

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    // Check if booking can be cancelled (not completed or already cancelled)
    if (booking.status === 'COMPLETED' || booking.status === 'CANCELLED') {
      return NextResponse.json({ error: 'Booking cannot be cancelled' }, { status: 400 })
    }

    // Update booking status to cancelled
    await prisma.booking.update({
      where: { id: bookingId },
      data: { status: 'CANCELLED' }
    })

    return NextResponse.json({
      success: true,
      message: 'Booking cancelled successfully'
    })

  } catch (error) {
    console.error('Booking cancellation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 