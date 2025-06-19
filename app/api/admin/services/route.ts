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

    // Get salon services
    const salon = await prisma.salon.findUnique({
      where: { ownerId: decoded.userId },
      include: {
        services: {
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!salon) {
      return NextResponse.json({ error: 'Salon not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: salon.services
    })

  } catch (error) {
    console.error('Services fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
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

    const body = await request.json()
    const { name, description, duration, price } = body

    // Get salon
    const salon = await prisma.salon.findUnique({
      where: { ownerId: decoded.userId }
    })

    if (!salon) {
      return NextResponse.json({ error: 'Salon not found' }, { status: 404 })
    }

    // Create service
    const service = await prisma.service.create({
      data: {
        name,
        description,
        duration: parseInt(duration),
        price: parseFloat(price),
        salonId: salon.id
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Service created successfully',
      data: service
    })

  } catch (error) {
    console.error('Service creation error:', error)
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

    // Verify user is a salon owner
    if (decoded.role !== 'SALON_OWNER') {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    const body = await request.json()
    const { id, name, description, duration, price, isActive } = body

    // Get salon
    const salon = await prisma.salon.findUnique({
      where: { ownerId: decoded.userId }
    })

    if (!salon) {
      return NextResponse.json({ error: 'Salon not found' }, { status: 404 })
    }

    // Verify service belongs to this salon
    const existingService = await prisma.service.findFirst({
      where: {
        id,
        salonId: salon.id
      }
    })

    if (!existingService) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }

    // Update service
    const service = await prisma.service.update({
      where: { id },
      data: {
        name,
        description,
        duration: parseInt(duration),
        price: parseFloat(price),
        isActive
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Service updated successfully',
      data: service
    })

  } catch (error) {
    console.error('Service update error:', error)
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

    // Verify user is a salon owner
    if (decoded.role !== 'SALON_OWNER') {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const serviceId = searchParams.get('id')

    if (!serviceId) {
      return NextResponse.json({ error: 'Service ID is required' }, { status: 400 })
    }

    // Get salon
    const salon = await prisma.salon.findUnique({
      where: { ownerId: decoded.userId }
    })

    if (!salon) {
      return NextResponse.json({ error: 'Salon not found' }, { status: 404 })
    }

    // Verify service belongs to this salon
    const existingService = await prisma.service.findFirst({
      where: {
        id: serviceId,
        salonId: salon.id
      }
    })

    if (!existingService) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }

    // Check if service has any bookings
    const hasBookings = await prisma.bookingService.findFirst({
      where: { serviceId }
    })

    if (hasBookings) {
      return NextResponse.json({ 
        error: 'Cannot delete service that has bookings. Please deactivate it instead.' 
      }, { status: 400 })
    }

    // Delete service
    await prisma.service.delete({
      where: { id: serviceId }
    })

    return NextResponse.json({
      success: true,
      message: 'Service deleted successfully'
    })

  } catch (error) {
    console.error('Service deletion error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 