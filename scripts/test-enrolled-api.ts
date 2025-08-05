#!/usr/bin/env tsx

import prisma from '../src/lib/prisma';

async function testEnrolledAPI() {
  console.log('🧪 Testing enrolled courses API...\n');
  
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
    
    // Simulate the API call to get enrolled courses
    const staticEnrollments = await prisma.staticEnrollment.findMany({
      where: { userId: student.id },
      include: { course: true }
    });
    
    console.log('\n📋 Static enrollments from database:');
    staticEnrollments.forEach(enrollment => {
      console.log(`  - Course ID: ${enrollment.course.courseId}, Title: ${enrollment.course.title}`);
    });
    
    // Simulate the API response format
    const enrolledStaticCourses = staticEnrollments.map(enrollment => {
      const units = (enrollment.course.units as any[]) || [];
      return {
        id: enrollment.course.courseId, // This is what the API returns
        title: enrollment.course.title,
        instructor: enrollment.course.instructor,
        description: enrollment.course.description,
        imageBase64: enrollment.course.imageBase64,
        videoUrl: units[0]?.videoUrl || null,
        price: 'مدفوع',
        category: enrollment.course.category,
        instructorId: enrollment.course.instructorId,
        gradient: enrollment.course.gradient,
        shadowColor: enrollment.course.shadowColor,
        rating: enrollment.course.rating,
        students: enrollment.course.students,
        lessons: enrollment.course.lessons,
        content: units.map((unit: any, index: number) => ({
          id: `${enrollment.course.courseId}-unit-${index + 1}`,
          type: 'video' as const,
          title: unit.title,
          duration: unit.duration,
          url: unit.videoUrl,
        })),
        featured: enrollment.course.featured,
      };
    });
    
    console.log('\n📋 Enrolled courses from API simulation:');
    enrolledStaticCourses.forEach(course => {
      console.log(`  - ID: ${course.id}, Title: ${course.title}`);
      console.log(`    Video URL: ${course.videoUrl}`);
      console.log(`    Content items: ${course.content.length}`);
    });
    
    // Test the enrollment check logic
    const courseIdFromURL = 'grade-1'; // This would be the ID from URL
    const enrollmentStatus = enrolledStaticCourses.some((c: any) => c.id === courseIdFromURL);
    
    console.log(`\n🔍 Testing enrollment check for course ID: ${courseIdFromURL}`);
    console.log(`✅ Is enrolled: ${enrollmentStatus}`);
    
    if (enrollmentStatus) {
      const course = enrolledStaticCourses.find((c: any) => c.id === courseIdFromURL);
      console.log(`📹 First video URL: ${course?.videoUrl}`);
    }
    
  } catch (error) {
    console.error('❌ Error testing enrolled API:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testEnrolledAPI(); 