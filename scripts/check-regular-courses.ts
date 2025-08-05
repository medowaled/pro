#!/usr/bin/env tsx

import prisma from '../src/lib/prisma';

async function checkRegularCourses() {
  console.log('🔍 Checking regular courses and enrollments...\n');
  
  try {
    // Check regular courses
    const regularCourses = await prisma.course.findMany({
      include: {
        instructor: true,
        enrollments: {
          include: {
            user: true
          }
        }
      }
    });
    
    console.log(`📊 Regular courses in database: ${regularCourses.length}`);
    
    if (regularCourses.length > 0) {
      console.log('\n📋 Regular courses:');
      regularCourses.forEach(course => {
        console.log(`  - ${course.title} (ID: ${course.id})`);
        console.log(`    Instructor: ${course.instructor.firstName} ${course.instructor.lastName}`);
        console.log(`    Enrollments: ${course.enrollments.length}`);
        course.enrollments.forEach(enrollment => {
          console.log(`      - ${enrollment.user.firstName} ${enrollment.user.lastName}`);
        });
      });
    } else {
      console.log('❌ No regular courses found');
    }
    
    // Check all enrollments
    const allEnrollments = await prisma.enrollment.findMany({
      include: {
        user: true,
        course: true
      }
    });
    
    console.log(`\n📊 Total enrollments: ${allEnrollments.length}`);
    
    if (allEnrollments.length > 0) {
      console.log('\n📋 All enrollments:');
      allEnrollments.forEach(enrollment => {
        console.log(`  - ${enrollment.user.firstName} ${enrollment.user.lastName} -> ${enrollment.course.title}`);
      });
    }
    
    console.log('\n✅ Database check completed successfully!');
    
  } catch (error) {
    console.error('❌ Database check failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkRegularCourses(); 