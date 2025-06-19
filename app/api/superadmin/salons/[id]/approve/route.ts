import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const updated = await prisma.salon.update({
      where: { id },
      data: { isVerified: true }
    })
    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    console.error('Superadmin approve salon error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 