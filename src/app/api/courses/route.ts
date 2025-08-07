
import { verifyAuth } from '@/lib/auth';
import { getStaticCoursesFromDB } from '@/lib/db-seeder';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Cache for static courses
let staticCoursesCache: any[] = [];
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const contentSchema = z.object({
  id: z.string().optional(),
  type: z.enum(['video', 'article', 'quiz']),
  title: z.string(),
  duration: z.string().optional(),
  url: z.string().url().optional().or(z.literal('')),
});

const courseSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  price: z.string().min(1),
  category: z.string().min(2),
  instructorId: z.string(),
  videoUrl: z.string().url().optional().or(z.literal('')),
  imageBase64: z.string().optional(),
  content: z.array(contentSchema).optional(),
  featured: z.boolean().optional(),
});

interface StaticCourseUnit {
  title: string;
  videoUrl: string;
  duration?: string;
  description?: string;
}

interface StaticCourse {
  id: string;
  courseId: string;
  title: string;
  description: string;
  price: string;
  category: string;
  instructor: string;
  instructorId: string;
  rating: string;
  students: string;
  lessons: string;
  gradient: string;
  shadowColor: string;
  imageBase64?: string | null;
  units: StaticCourseUnit[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Helper function to get cached static courses
async function getCachedStaticCourses() {
  const now = Date.now();
  if (staticCoursesCache.length > 0 && (now - cacheTimestamp) < CACHE_DURATION) {
    return staticCoursesCache;
  }
  
  const courses = await getStaticCoursesFromDB();
  staticCoursesCache = courses;
  cacheTimestamp = now;
  return courses;
}

export async function POST(request: Request) {
    try {
        const token = request.headers.get('cookie')?.split('; ').find(c => c.startsWith('token='))?.split('=')[1];
        const verifiedToken = token && (await verifyAuth(token).catch(() => null));
        if (!verifiedToken || verifiedToken.role !== 'ADMIN') {
            return NextResponse.json({ message: 'غير مصرح لك بالوصول.' }, { status: 401 });
        }

        const body = await request.json();
        const parsed = courseSchema.safeParse(body);

        if(!parsed.success) {
            console.error("Course validation error:", parsed.error);
            return NextResponse.json({ message: parsed.error.message }, { status: 400 });
        }
        
        const { title, description, price, category, instructorId, videoUrl, imageBase64, content, featured } = parsed.data;

        const newCourse = await prisma.course.create({
            data: {
                title,
                description,
                price,
                category,
                instructorId,
                videoUrl: videoUrl || null,
                imageBase64: imageBase64 || null,
                content: content || [],
                featured: featured || false,
            }
        });

        // Clear cache when new course is created
        staticCoursesCache = [];
        cacheTimestamp = 0;

        return NextResponse.json(newCourse, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'حدث خطأ أثناء إنشاء الدورة.' }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const enrolled = searchParams.get('enrolled');
    
    try {
        if (featured === 'true') {
            // Return cached static courses as featured courses
            const staticCourses = await getCachedStaticCourses();
            const formattedStaticCourses = staticCourses.map((course: any) => {
                const units = (course.units as unknown) as StaticCourseUnit[] || [];
                return {
                    id: course.courseId,
                    title: course.title,
                    instructor: course.instructor,
                    description: course.description,
                    imageBase64: course.imageBase64,
                    videoUrl: units[0]?.videoUrl || null,
                    price: course.price,
                    category: course.category,
                    instructorId: course.instructorId,
                    content: units.map((unit: StaticCourseUnit, index: number) => ({
                        id: `${course.courseId}-unit-${index + 1}`,
                        type: 'video' as const,
                        title: unit.title,
                        duration: unit.duration,
                        url: unit.videoUrl,
                    })),
                    featured: course.featured,
                };
            });
            
            return NextResponse.json(formattedStaticCourses, {
                headers: {
                    'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
                },
            });
        }
    
        if (enrolled === 'true') {
            const token = request.cookies.get('token');
            const verifiedToken = token && (await verifyAuth(token.value).catch(() => null));

            if (!verifiedToken) {
                 return NextResponse.json({ message: 'غير مصرح لك بالوصول.' }, { status: 401 });
            }

            const userId = verifiedToken.id;

            // Get database enrollments for regular courses with optimized query
            const [enrollments, staticEnrollments] = await Promise.all([
                prisma.enrollment.findMany({
                    where: { userId: userId },
                    include: {
                        course: {
                            include: {
                                instructor: {
                                    select: {
                                        firstName: true,
                                        lastName: true,
                                    }
                                }
                            }
                        }
                    }
                }),
                prisma.staticEnrollment.findMany({
                    where: { userId: userId },
                    include: {
                        course: true
                    }
                })
            ]);

            const enrolledCourses = enrollments.map(enrollment => ({
                ...enrollment.course,
                instructor: `${enrollment.course.instructor.firstName} ${enrollment.course.instructor.lastName}`,
                price: 'مدفوع'
            }));

            const enrolledStaticCourses = staticEnrollments.map(enrollment => {
                const units = (enrollment.course.units as unknown) as StaticCourseUnit[] || [];
                return {
                    id: enrollment.course.courseId,
                    title: enrollment.course.title,
                    instructor: enrollment.course.instructor,
                    description: enrollment.course.description,
                    imageBase64: enrollment.course.imageBase64,
                    videoUrl: units[0]?.videoUrl || null,
                    price: 'مدفوع',
                    category: enrollment.course.category,
                    instructorId: enrollment.course.instructorId,
                    content: units.map((unit: StaticCourseUnit, index: number) => ({
                        id: `${enrollment.course.courseId}-unit-${index + 1}`,
                        type: 'video' as const,
                        title: unit.title,
                        duration: unit.duration,
                        url: unit.videoUrl,
                    })),
                    featured: enrollment.course.featured,
                };
            });

            const allEnrolledCourses = [...enrolledCourses, ...enrolledStaticCourses];
            
            return NextResponse.json(allEnrolledCourses, {
                headers: {
                    'Cache-Control': 'private, max-age=60, stale-while-revalidate=120',
                },
            });
        }

        // Get all courses with optimized query
        const courses = await prisma.course.findMany({
            include: {
                instructor: {
                    select: {
                        firstName: true,
                        lastName: true,
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        const formattedCourses = courses.map(course => ({
            ...course,
            instructor: `${course.instructor.firstName} ${course.instructor.lastName}`,
        }));

        return NextResponse.json(formattedCourses, {
            headers: {
                'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
            },
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'حدث خطأ أثناء جلب الدورات.' }, { status: 500 });
    }
}