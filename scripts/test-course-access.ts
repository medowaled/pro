#!/usr/bin/env tsx

import prisma from '../src/lib/prisma';

async function testCourseAccess() {
  console.log('🧪 Testing course access...\n');
  
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
    
    // Get static course
    const staticCourse = await prisma.staticCourse.findFirst();
    
    if (!staticCourse) {
      console.log('❌ No static course found in database');
      return;
    }
    
    console.log(`📚 Found static course: ${staticCourse.title} (CourseID: ${staticCourse.courseId}, DB ID: ${staticCourse.id})`);
    
    // Check static enrollment
    const staticEnrollment = await prisma.staticEnrollment.findFirst({
      where: {
        userId: student.id,
        courseId: staticCourse.id,
      }
    });
    
    if (staticEnrollment) {
      console.log('✅ Static enrollment found');
      console.log(`📊 Enrollment details:`, staticEnrollment);
    } else {
      console.log('❌ No static enrollment found');
    }
    
    // Check regular enrollment
    const regularEnrollment = await prisma.enrollment.findFirst({
      where: {
        userId: student.id,
        courseId: staticCourse.courseId, // This should be the course ID from URL
      }
    });
    
    if (regularEnrollment) {
      console.log('✅ Regular enrollment found');
      console.log(`📊 Enrollment details:`, regularEnrollment);
    } else {
      console.log('❌ No regular enrollment found');
    }
    
    // Simulate API call to get enrolled courses
    const staticEnrollments = await prisma.staticEnrollment.findMany({
      where: { userId: student.id },
      include: { course: true }
    });
    
    console.log('\n📋 Static enrollments for student:');
    staticEnrollments.forEach(enrollment => {
      console.log(`  - Course ID: ${enrollment.course.courseId}, Title: ${enrollment.course.title}`);
    });
    
    // Check if the course ID from URL matches any enrolled course
    const courseIdFromURL = staticCourse.courseId; // This would be the ID from URL
    const isEnrolled = staticEnrollments.some(enrollment => enrollment.course.courseId === courseIdFromURL);
    
    console.log(`\n🔍 Checking enrollment for course ID: ${courseIdFromURL}`);
    console.log(`✅ Is enrolled: ${isEnrolled}`);
    
  } catch (error) {
    console.error('❌ Error testing course access:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testCourseAccess(); 