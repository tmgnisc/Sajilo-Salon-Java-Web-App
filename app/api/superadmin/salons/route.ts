import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // Optionally, add superadmin auth check here
    const salons = await prisma.salon.findMany({
      include: {
        owner: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json({ success: true, data: salons })
  } catch (error) {
    console.error('Superadmin fetch salons error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 