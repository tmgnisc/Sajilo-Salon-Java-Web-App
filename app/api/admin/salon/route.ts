import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyToken } from '@/lib/auth'
import { uploadFile } from '@/lib/upload'

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
        owner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            avatar: true
          }
        },
        documents: true
      }
    })

    if (!salon) {
      return NextResponse.json({ error: 'Salon not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: salon
    })

  } catch (error) {
    console.error('Salon fetch error:', error)
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

    const formData = await request.formData()
    
    // Get salon
    const salon = await prisma.salon.findUnique({
      where: { ownerId: decoded.userId }
    })

    if (!salon) {
      return NextResponse.json({ error: 'Salon not found' }, { status: 404 })
    }

    // Extract form data
    const name = formData.get('name') as string
    const type = formData.get('type') as string
    const address = formData.get('address') as string
    const description = formData.get('description') as string
    const openingHour = formData.get('openingHour') as string
    const closingHour = formData.get('closingHour') as string

    // Handle image upload
    let imageUrl = salon.imageUrl
    const imageFile = formData.get('image') as File
    if (imageFile && imageFile.size > 0) {
      const uploadResult = await uploadFile(imageFile, 'salons', 'salon_')
      if (uploadResult.success) {
        imageUrl = uploadResult.url
      }
    }

    // Update salon
    const updatedSalon = await prisma.salon.update({
      where: { id: salon.id },
      data: {
        name,
        type: type as any,
        address,
        description,
        imageUrl,
        openingHour,
        closingHour
      },
      include: {
        owner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            avatar: true
          }
        },
        documents: true
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Salon updated successfully',
      data: updatedSalon
    })

  } catch (error) {
    console.error('Salon update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 