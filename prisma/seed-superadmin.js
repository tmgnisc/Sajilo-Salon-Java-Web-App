const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@gmail.com';
  const plainPassword = 'admin123';
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const existing = await prisma.user.findUnique({ where: { email } });

  if (!existing) {
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName: 'Super',
        lastName: 'Admin',
        phone: '0000000000',
        role: 'SUPERADMIN',
        isVerified: true,
        isActive: true,
      },
    });
    console.log('Superadmin user created.');
  } else {
    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        role: 'SUPERADMIN',
        isVerified: true,
        isActive: true,
      },
    });
    console.log('Superadmin user password updated.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 