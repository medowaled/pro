import prisma from './prisma';
import { staticGradeLevels } from './static-courses';

export async function seedStaticCourses() {
  try {
    console.log('Seeding static courses...');
    
    for (const staticCourse of staticGradeLevels) {
      // Check if course already exists
      const existingCourse = await prisma.staticCourse.findUnique({
        where: { courseId: staticCourse.id }
      });

      if (!existingCourse) {
        await prisma.staticCourse.create({
          data: {
            courseId: staticCourse.id,
            title: staticCourse.title,
            description: staticCourse.description,
            price: staticCourse.price,
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
        console.log(`Created static course: ${staticCourse.title}`);
      } else {
        console.log(`Static course already exists: ${staticCourse.title}`);
      }
    }
    
    console.log('Static courses seeding completed!');
  } catch (error) {
    console.error('Error seeding static courses:', error);
    throw error;
  }
}

export async function getStaticCoursesFromDB() {
  try {
    const staticCourses = await prisma.staticCourse.findMany({
      orderBy: { createdAt: 'asc' }
    });
    return staticCourses;
  } catch (error) {
    console.error('Error fetching static courses from DB:', error);
    return [];
  }
}

export async function getStaticCourseByIdFromDB(courseId: string) {
  try {
    const staticCourse = await prisma.staticCourse.findUnique({
      where: { courseId: courseId }
    });
    return staticCourse;
  } catch (error) {
    console.error('Error fetching static course from DB:', error);
    return null;
  }
} 