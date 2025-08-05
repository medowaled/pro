// This file is for demonstration purposes to show how to insert data.
// You can run this with `npx ts-node prisma/seed-examples.ts` after setting up ts-node.
// Note: This is not a production-ready seeding script.

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting DB seed...');

  // --- Create Admin (Instructor) ---
  const admin = await prisma.user.create({
    data: {
      firstName: 'أدمن',
      lastName: 'النظام',
      phone: '966587654321',
      password: 'password123', // Use a hashed password in a real app
      role: 'ADMIN',
      specialty: 'البرمجة والتطوير',
    },
  });
  console.log(`Created admin user: ${admin.firstName} ${admin.lastName} with ID: ${admin.id}`);

  // --- Create Student ---
  const student = await prisma.user.create({
    data: {
      firstName: 'علي',
      lastName: 'محمد',
      phone: '966512345678',
      password: 'password123', // Use a hashed password in a real app
      role: 'STUDENT',
    },
  });
  console.log(`Created student user: ${student.firstName} ${student.lastName} with ID: ${student.id}`);
  
  // --- Create Course ---
  const course = await prisma.course.create({
    data: {
      title: 'مقدمة في البرمجة بلغة بايثون',
      description: 'دورة شاملة لتعلم أساسيات البرمجة باستخدام لغة بايثون، مناسبة للمبتدئين.',
      imageUrl: 'https://placehold.co/600x400',
      dataAiHint: 'programming code',
      price: '99 ر.س',
      category: 'البرمجة',
      instructorId: admin.id, // Assign the admin as the instructor
    },
  });
  console.log(`Created course: "${course.title}" with ID: ${course.id}`);
  
  // --- Create Enrollment ---
  const enrollment = await prisma.enrollment.create({
    data: {
      userId: student.id,   // The student's ID
      courseId: course.id,  // The course's ID
    },
  });
  console.log(`Enrolled student ${student.firstName} in course "${course.title}".`);


  console.log('DB seed finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

/*
To run this file for seeding, you would typically need ts-node:
1. npm install -D ts-node
2. Add a "seed" script to your package.json: "seed": "prisma db seed"
3. Configure prisma.seed in package.json:
   "prisma": {
     "seed": "ts-node --compiler-options '{\\\"module\\\":\\\"CommonJS\\\"}' prisma/seed-examples.ts"
   }
4. Run `npx prisma db seed`
*/
