import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const salons = await prisma.salon.findMany({
      where: { isVerified: true },
      select: {
        id: true,
        name: true,
        type: true,
        address: true,
        description: true,
        imageUrl: true,
        services: {
          select: {
            id: true,
            name: true,
            price: true,
            duration: true,
          }
        }
      }
    })

    return NextResponse.json({ success: true, data: salons })
  } catch (error) {
    console.error('Fetch salons error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 