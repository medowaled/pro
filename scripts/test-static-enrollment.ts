#!/usr/bin/env tsx

import prisma from '../src/lib/prisma';

async function testStaticEnrollment() {
  console.log('🧪 Testing static enrollment...\n');
  
  try {
    // Get first student
    const student = await prisma.user.findFirst({
      where: { role: 'STUDENT' }
    });
    
    if (!student) {
      console.log('❌ No student found in database');
      return;
    }
    
    console.log(`👤 Found student: ${student.firstName} ${student.lastName} (ID: ${student.id})`);
    
    // Get first static course
    const staticCourse = await prisma.staticCourse.findFirst();
    
    if (!staticCourse) {
      console.log('❌ No static course found in database');
      return;
    }
    
    console.log(`📚 Found static course: ${staticCourse.title} (CourseID: ${staticCourse.courseId}, DB ID: ${staticCourse.id})`);
    
    // Check if enrollment already exists
    const existingEnrollment = await prisma.staticEnrollment.findFirst({
      where: {
        userId: student.id,
        courseId: staticCourse.id,
      }
    });
    
    if (existingEnrollment) {
      console.log('✅ Static enrollment already exists');
      console.log(`📊 Enrollment details:`, existingEnrollment);
    } else {
      console.log('❌ No static enrollment found');
      
      // Create static enrollment
      const newEnrollment = await prisma.staticEnrollment.create({
        data: {
          userId: student.id,
          courseId: staticCourse.id,
        }
      });
      
      console.log('✅ Static enrollment created successfully');
      console.log(`📊 New enrollment details:`, newEnrollment);
    }
    
    // List all static enrollments
    const allStaticEnrollments = await prisma.staticEnrollment.findMany({
      include: {
        user: true,
        course: true
      }
    });
    
    console.log('\n📋 All static enrollments:');
    allStaticEnrollments.forEach(enrollment => {
      console.log(`  - ${enrollment.user.firstName} ${enrollment.user.lastName} -> ${enrollment.course.title}`);
    });
    
  } catch (error) {
    console.error('❌ Error testing static enrollment:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testStaticEnrollment(); 