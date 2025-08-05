#!/usr/bin/env tsx

import prisma from '../src/lib/prisma';
import { seedStaticCourses } from '../src/lib/db-seeder';

async function checkDatabase() {
  console.log('🔍 Checking database status...\n');
  
  try {
    // Check if StaticCourse table exists and has data
    const staticCoursesCount = await prisma.staticCourse.count();
    console.log(`📊 Static courses in database: ${staticCoursesCount}`);
    
    if (staticCoursesCount === 0) {
      console.log('⚠️  No static courses found in database. Seeding...');
      await seedStaticCourses();
      console.log('✅ Static courses seeded successfully!');
    } else {
      console.log('✅ Static courses already exist in database');
    }
    
    // List all static courses
    const staticCourses = await prisma.staticCourse.findMany({
      select: {
        id: true,
        courseId: true,
        title: true,
        gradient: true,
        shadowColor: true,
      }
    });
    
    console.log('\n📋 Available static courses:');
    staticCourses.forEach(course => {
      console.log(`  - ${course.title} (ID: ${course.id}, CourseID: ${course.courseId})`);
    });
    
    // Check enrollments
    const enrollmentsCount = await prisma.enrollment.count();
    const staticEnrollmentsCount = await prisma.staticEnrollment.count();
    
    console.log(`\n📊 Enrollments: ${enrollmentsCount} regular, ${staticEnrollmentsCount} static`);
    
    console.log('\n✅ Database check completed successfully!');
    console.log('\n💡 If enrollment is still failing:');
    console.log('1. Make sure you\'re logged in as an admin');
    console.log('2. Check that the course ID matches exactly');
    console.log('3. Verify the student exists in the database');
    
  } catch (error) {
    console.error('❌ Database check failed:', error);
    console.log('\n🔧 Try running: npm run setup:db');
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase(); 