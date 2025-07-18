"use server"
import { prisma } from "@/lib/db"

export async function createBooking({
  userId,
  salonId,
  serviceIds,
  date,
  time,
  totalAmount,
  notes
}: {
  userId: string
  salonId: string
  serviceIds: string[]
  date: string
  time: string
  totalAmount: number
  notes?: string
}) {
  try {
    const booking = await prisma.booking.create({
      data: {
        userId,
        salonId,
        date: new Date(date),
        time,
        totalAmount,
        notes,
        services: {
          create: serviceIds.map((serviceId) => ({
            service: { connect: { id: serviceId } },
            price: 0 // You can set the price here if needed
          }))
        }
      },
      include: {
        services: true
      }
    })
    return { success: true, data: booking }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
} 