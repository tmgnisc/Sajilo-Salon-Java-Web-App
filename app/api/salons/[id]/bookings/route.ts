import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date') // ISO string
    if (!date) {
      return NextResponse.json({ error: 'Date is required' }, { status: 400 })
    }
    const start = new Date(date)
    start.setHours(0, 0, 0, 0)
    const end = new Date(date)
    end.setHours(23, 59, 59, 999)
    const bookings = await prisma.booking.findMany({
      where: {
        salonId: id,
        date: {
          gte: start,
          lte: end
        }
      },
      select: {
        time: true
      }
    })
    return NextResponse.json({ success: true, data: bookings })
  } catch (error) {
    console.error('Fetch salon bookings error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 