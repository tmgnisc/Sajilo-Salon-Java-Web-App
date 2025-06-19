import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    // Option 1: Set isVerified to false (if already false, no change)
    const updated = await prisma.salon.update({
      where: { id },
      data: { isVerified: false }
    })
    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    console.error('Superadmin reject salon error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 