import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.user.findFirst({
      where: {
        role: 'ADMIN'
      }
    });

    if (existingAdmin) {
      console.log('Admin user already exists:', existingAdmin);
      return;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const admin = await prisma.user.create({
      data: {
        firstName: 'Admin',
        lastName: 'User',
        phone: '966500000000',
        password: hashedPassword,
        role: 'ADMIN',
        specialty: 'System Administrator'
      }
    });

    console.log('Admin user created successfully:', admin);
    console.log('Login credentials:');
    console.log('Phone: 966500000000');
    console.log('Password: admin123');
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
