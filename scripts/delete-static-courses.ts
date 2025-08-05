#!/usr/bin/env tsx

import prisma from '../src/lib/prisma';

async function deleteStaticCourses() {
  console.log('🗑️  Deleting static courses...\n');
  
  try {
    // First, delete all static enrollments
    console.log('🗑️  Deleting static enrollments...');
    const deletedEnrollments = await prisma.staticEnrollment.deleteMany();
    console.log(`✅ Deleted ${deletedEnrollments.count} static enrollments`);
    
    // Then, delete all static courses
    console.log('🗑️  Deleting static courses...');
    const deletedCourses = await prisma.staticCourse.deleteMany();
    console.log(`✅ Deleted ${deletedCourses.count} static courses`);
    
    // Verify deletion
    const remainingStaticCourses = await prisma.staticCourse.count();
    const remainingStaticEnrollments = await prisma.staticEnrollment.count();
    
    console.log('\n📊 Verification:');
    console.log(`  - Remaining static courses: ${remainingStaticCourses}`);
    console.log(`  - Remaining static enrollments: ${remainingStaticEnrollments}`);
    
    if (remainingStaticCourses === 0 && remainingStaticEnrollments === 0) {
      console.log('\n✅ All static courses and enrollments deleted successfully!');
    } else {
      console.log('\n⚠️  Some static courses or enrollments still exist');
    }
    
  } catch (error) {
    console.error('❌ Error deleting static courses:', error);
  } finally {
    await prisma.$disconnect();
  }
}

deleteStaticCourses(); 