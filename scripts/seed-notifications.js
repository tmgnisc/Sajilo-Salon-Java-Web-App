const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function seedNotifications() {
  try {
    // Get a user to create notifications for
    const user = await prisma.user.findFirst({
      where: { role: 'CUSTOMER' }
    })

    if (!user) {
      console.log('No customer user found. Please create a user first.')
      return
    }

    // Create sample notifications
    const notifications = [
      {
        userId: user.id,
        type: 'BOOKING',
        title: 'Booking Confirmed',
        message: 'Your appointment at Glamour Studio has been confirmed for Jan 15, 2024 at 10:30 AM',
        isRead: false
      },
      {
        userId: user.id,
        type: 'REMINDER',
        title: 'Appointment Reminder',
        message: 'Your appointment at Bliss Spa is tomorrow at 2:00 PM. Don\'t forget!',
        isRead: false
      },
      {
        userId: user.id,
        type: 'REVIEW',
        title: 'Rate Your Experience',
        message: 'How was your recent visit to Style Hub? Share your feedback and help others.',
        isRead: true
      },
      {
        userId: user.id,
        type: 'OFFER',
        title: 'Special Offer',
        message: '20% off on your next booking! Use code BEAUTY20. Valid until end of month.',
        isRead: true
      }
    ]

    for (const notification of notifications) {
      await prisma.notification.create({
        data: notification
      })
    }

    console.log('Sample notifications created successfully!')
  } catch (error) {
    console.error('Error seeding notifications:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seedNotifications() 