import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['error', 'warn'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// إضافة دالة لإعادة إنشاء الاتصال في حالة حدوث خطأ
export const resetPrismaConnection = () => {
  if (globalForPrisma.prisma) {
    globalForPrisma.prisma.$disconnect();
    globalForPrisma.prisma = undefined;
  }
  return new PrismaClient({
    log: ['error', 'warn'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });
};

export default prisma;
