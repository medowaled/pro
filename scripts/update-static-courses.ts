#!/usr/bin/env tsx

import prisma from '../src/lib/prisma';
import { staticGradeLevels } from '../src/lib/static-courses';

async function updateStaticCourses() {
  console.log('🔄 Updating static courses...');

  try {
    for (const staticCourse of staticGradeLevels) {
      // Check if course exists
      const existingCourse = await prisma.staticCourse.findUnique({
        where: { courseId: staticCourse.id }
      });

      // Convert price object to string
      const priceString = typeof staticCourse.price === 'string' 
        ? staticCourse.price 
        : `${staticCourse.price.monthly} / ${staticCourse.price.fullTerm}`;

      if (existingCourse) {
        // Update existing course
        await prisma.staticCourse.update({
          where: { courseId: staticCourse.id },
          data: {
            title: staticCourse.title,
            description: staticCourse.description,
            price: priceString,
            category: staticCourse.category,
            instructor: staticCourse.instructor,
            instructorId: staticCourse.instructorId,
            rating: staticCourse.rating,
            students: staticCourse.students,
            lessons: staticCourse.lessons,
            gradient: staticCourse.gradient,
            shadowColor: staticCourse.shadowColor,
            imageBase64: staticCourse.imageBase64,
            units: staticCourse.units.map(unit => ({
              ...unit,
              videoUrl: unit.videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ'
            })),
            featured: true
          }
        });
        console.log(`✅ Updated static course: ${staticCourse.title}`);
      } else {
        // Create new course
        await prisma.staticCourse.create({
          data: {
            courseId: staticCourse.id,
            title: staticCourse.title,
            description: staticCourse.description,
            price: priceString,
            category: staticCourse.category,
            instructor: staticCourse.instructor,
            instructorId: staticCourse.instructorId,
            rating: staticCourse.rating,
            students: staticCourse.students,
            lessons: staticCourse.lessons,
            gradient: staticCourse.gradient,
            shadowColor: staticCourse.shadowColor,
            imageBase64: staticCourse.imageBase64,
            units: staticCourse.units.map(unit => ({
              ...unit,
              videoUrl: unit.videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ'
            })),
            featured: true
          }
        });
        console.log(`✅ Created static course: ${staticCourse.title}`);
      }
    }

    console.log('✅ Static courses updated successfully!');
  } catch (error) {
    console.error('❌ Error updating static courses:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateStaticCourses(); 