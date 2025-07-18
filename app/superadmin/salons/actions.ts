"use server"
import { prisma } from "@/lib/db"

export async function getAllSalons() {
  return await prisma.salon.findMany({
    include: {
      owner: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          avatar: true,
        },
      },
      documents: true,
    },
    orderBy: { createdAt: "desc" },
  })
}

export async function getSalonById(id: string) {
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
          avatar: true,
        },
      },
      documents: true,
    },
  })
  if (!salon) throw new Error("Salon not found")
  return salon
}

export async function approveSalon(id: string) {
  const salon = await prisma.salon.update({
    where: { id },
    data: { isVerified: true },
  })
  return salon
}

export async function rejectSalon(id: string) {
  const salon = await prisma.salon.update({
    where: { id },
    data: { isVerified: false },
  })
  return salon
} 