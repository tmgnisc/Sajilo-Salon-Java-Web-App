import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyToken } from '@/lib/auth'
import { uploadFile } from '@/lib/upload'

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

    // Check if the request has the correct content type
    const contentType = request.headers.get('content-type')
    if (!contentType || !contentType.includes('multipart/form-data')) {
      return NextResponse.json({ error: 'Invalid content type. Expected multipart/form-data' }, { status: 400 })
    }

    const formData = await request.formData()
    const file = formData.get('avatar') as File

    if (!file) {
      return NextResponse.json({ error: 'No image file provided' }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 })
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size must be less than 5MB' }, { status: 400 })
    }

    // Upload to Cloudinary
    const uploadResult = await uploadFile(file, 'avatars', `user_${decoded.userId}_`)

    if (!uploadResult.success) {
      return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 })
    }

    // Update user's avatar in database
    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: { avatar: uploadResult.url },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        avatar: true,
        role: true,
        isVerified: true,
        createdAt: true
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Avatar updated successfully',
      data: updatedUser
    })

  } catch (error) {
    console.error('Avatar upload error:', error)
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

    // Remove avatar from user
    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: { avatar: null },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        avatar: true,
        role: true,
        isVerified: true,
        createdAt: true
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Avatar removed successfully',
      data: updatedUser
    })

  } catch (error) {
    console.error('Avatar removal error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 