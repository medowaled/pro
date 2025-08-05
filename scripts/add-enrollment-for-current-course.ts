#!/usr/bin/env tsx

import prisma from '../src/lib/prisma';

async function addEnrollmentForCurrentCourse() {
  console.log('🧪 Adding enrollment for current course...\n');
  
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
    
    // The course ID from the URL
    const courseIdFromURL = 'cmdksjubx0001gsbwqds1eqpk';
    console.log(`📚 Course ID from URL: ${courseIdFromURL}`);
    
    // Check if this is a static course
    const staticCourse = await prisma.staticCourse.findFirst({
      where: { courseId: courseIdFromURL }
    });
    
    if (staticCourse) {
      console.log(`📚 Found static course: ${staticCourse.title}`);
      
      // Check if enrollment already exists
      const existingEnrollment = await prisma.staticEnrollment.findFirst({
        where: {
          userId: student.id,
          courseId: staticCourse.id,
        }
      });
      
      if (existingEnrollment) {
        console.log('✅ Static enrollment already exists');
      } else {
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
    } else {
      console.log('❌ Course not found in static courses');
      
      // Check if it's a regular course
      const regularCourse = await prisma.course.findUnique({
        where: { id: courseIdFromURL }
      });
      
      if (regularCourse) {
        console.log(`📚 Found regular course: ${regularCourse.title}`);
        
        // Check if enrollment already exists
        const existingEnrollment = await prisma.enrollment.findFirst({
          where: {
            userId: student.id,
            courseId: courseIdFromURL,
          }
        });
        
        if (existingEnrollment) {
          console.log('✅ Regular enrollment already exists');
        } else {
          // Create regular enrollment
          const newEnrollment = await prisma.enrollment.create({
            data: {
              userId: student.id,
              courseId: courseIdFromURL,
            }
          });
          
          console.log('✅ Regular enrollment created successfully');
          console.log(`📊 New enrollment details:`, newEnrollment);
        }
      } else {
        console.log('❌ Course not found in database');
      }
    }
    
  } catch (error) {
    console.error('❌ Error adding enrollment:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addEnrollmentForCurrentCourse(); 