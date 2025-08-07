import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    console.log('Creating admin user...');
    
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

    console.log('✅ Admin user created successfully!');
    console.log('📱 Phone: 966500000000');
    console.log('🔑 Password: admin123');
    console.log('👤 User ID:', admin.id);
  } catch (error: any) {
    if (error.code === 'P2002') {
      console.log('⚠️ Admin user already exists');
    } else {
      console.error('❌ Error creating admin:', error);
    }
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
