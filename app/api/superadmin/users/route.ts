import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // Optionally, add superadmin auth check here
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        isVerified: true,
        isActive: true,
        createdAt: true,
        avatar: true
      },
      orderBy: { createdAt: 'desc' }
    })
    
    return NextResponse.json({ success: true, data: users })
  } catch (error) {
    console.error('Superadmin fetch users error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 