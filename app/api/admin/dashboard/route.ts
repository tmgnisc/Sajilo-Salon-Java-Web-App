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

    // Verify user is a salon owner
    if (decoded.role !== 'SALON_OWNER') {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    // Get salon information
    const salon = await prisma.salon.findUnique({
      where: { ownerId: decoded.userId },
      include: {
        services: true,
        bookings: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true
              }
            },
            services: {
              include: {
                service: true
              }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    })

    if (!salon) {
      return NextResponse.json({ error: 'Salon not found' }, { status: 404 })
    }

    // Calculate stats
    const totalBookings = await prisma.booking.count({
      where: { salonId: salon.id }
    })

    const completedBookings = await prisma.booking.count({
      where: { 
        salonId: salon.id,
        status: 'COMPLETED'
      }
    })

    const totalRevenue = await prisma.booking.aggregate({
      where: { 
        salonId: salon.id,
        status: 'COMPLETED'
      },
      _sum: { totalAmount: true }
    })

    const pendingBookings = await prisma.booking.count({
      where: { 
        salonId: salon.id,
        status: 'PENDING'
      }
    })

    // Get recent bookings
    const recentBookings = await prisma.booking.findMany({
      where: { salonId: salon.id },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true
          }
        },
        services: {
          include: {
            service: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 5
    })

    // Get monthly revenue data (last 6 months)
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const monthlyRevenue = await prisma.booking.groupBy({
      by: ['createdAt'],
      where: {
        salonId: salon.id,
        status: 'COMPLETED',
        createdAt: {
          gte: sixMonthsAgo
        }
      },
      _sum: { totalAmount: true }
    })

    // Process monthly data
    const monthlyData = []
    for (let i = 5; i >= 0; i--) {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      const monthName = date.toLocaleDateString('en-US', { month: 'short' })
      
      const monthRevenue = monthlyRevenue
        .filter(item => {
          const itemDate = new Date(item.createdAt)
          return itemDate.getMonth() === date.getMonth() && 
                 itemDate.getFullYear() === date.getFullYear()
        })
        .reduce((sum, item) => sum + (item._sum.totalAmount || 0), 0)

      monthlyData.push({
        month: monthName,
        revenue: monthRevenue,
        bookings: 0 // You can add booking count logic here
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        salon: {
          id: salon.id,
          name: salon.name,
          type: salon.type,
          address: salon.address,
          description: salon.description,
          imageUrl: salon.imageUrl,
          isVerified: salon.isVerified
        },
        stats: {
          totalBookings,
          completedBookings,
          pendingBookings,
          totalRevenue: totalRevenue._sum.totalAmount || 0,
          totalServices: salon.services.length
        },
        recentBookings: recentBookings.map(booking => ({
          id: booking.id,
          customer: `${booking.user.firstName} ${booking.user.lastName}`,
          service: booking.services[0]?.service.name || 'Multiple Services',
          time: booking.time,
          date: booking.date,
          status: booking.status.toLowerCase(),
          totalAmount: booking.totalAmount
        })),
        monthlyData
      }
    })

  } catch (error) {
    console.error('Dashboard fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 