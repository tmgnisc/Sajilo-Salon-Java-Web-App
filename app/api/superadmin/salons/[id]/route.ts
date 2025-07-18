import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const salon = await prisma.salon.findUnique({
      where: { id },
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
    return NextResponse.json({ success: true, data: salon })
  } catch (error) {
    console.error('Superadmin fetch salon details error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 