const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function seedBookings() {
  try {
    // Get a customer user
    const user = await prisma.user.findFirst({
      where: { role: 'CUSTOMER' }
    })

    if (!user) {
      console.log('No customer user found. Please create a user first.')
      return
    }

    // Get or create a salon
    let salon = await prisma.salon.findFirst()
    if (!salon) {
      salon = await prisma.salon.create({
        data: {
          name: 'Glamour Studio',
          type: 'BEAUTY_SALON',
          address: '123 Beauty Street, Mumbai',
          description: 'Premium beauty salon offering hair and makeup services',
          isVerified: true,
          ownerId: user.id
        }
      })
    }

    // Get or create services
    let service1 = await prisma.service.findFirst({
      where: { name: 'Hair Cut & Style' }
    })
    if (!service1) {
      service1 = await prisma.service.create({
        data: {
          name: 'Hair Cut & Style',
          description: 'Professional hair cutting and styling service',
          price: 800,
          duration: 60,
          salonId: salon.id
        }
      })
    }

    let service2 = await prisma.service.findFirst({
      where: { name: 'Facial Treatment' }
    })
    if (!service2) {
      service2 = await prisma.service.create({
        data: {
          name: 'Facial Treatment',
          description: 'Rejuvenating facial treatment',
          price: 1200,
          duration: 90,
          salonId: salon.id
        }
      })
    }

    // Create sample bookings
    const bookings = [
      {
        userId: user.id,
        salonId: salon.id,
        date: new Date('2024-01-15'),
        time: '10:30',
        status: 'CONFIRMED',
        totalAmount: 800,
        services: {
          create: [
            {
              price: 800,
              serviceId: service1.id
            }
          ]
        }
      },
      {
        userId: user.id,
        salonId: salon.id,
        date: new Date('2024-01-20'),
        time: '14:00',
        status: 'COMPLETED',
        totalAmount: 1200,
        services: {
          create: [
            {
              price: 1200,
              serviceId: service2.id
            }
          ]
        }
      },
      {
        userId: user.id,
        salonId: salon.id,
        date: new Date('2024-01-25'),
        time: '16:00',
        status: 'PENDING',
        totalAmount: 800,
        services: {
          create: [
            {
              price: 800,
              serviceId: service1.id
            }
          ]
        }
      }
    ]

    for (const booking of bookings) {
      await prisma.booking.create({
        data: booking
      })
    }

    console.log('Sample bookings created successfully!')
  } catch (error) {
    console.error('Error seeding bookings:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seedBookings() 