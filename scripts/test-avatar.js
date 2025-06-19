const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function testAvatar() {
  try {
    // Get a user to check if avatar field exists
    const user = await prisma.user.findFirst({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        avatar: true
      }
    })

    if (user) {
      console.log('User found:', {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        avatar: user.avatar || 'No avatar set'
      })
      console.log('✅ Avatar field is working correctly!')
    } else {
      console.log('No users found in database')
    }
  } catch (error) {
    console.error('Error testing avatar:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testAvatar() 