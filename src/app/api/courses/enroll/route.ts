import { verifyAuth } from '@/lib/auth';
import { getStaticCourseByIdFromDB } from '@/lib/db-seeder';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const token = request.cookies.get('token');
        const verifiedToken = token && (await verifyAuth(token.value).catch(() => null));

        if (!verifiedToken) {
            return NextResponse.json({ message: 'غير مصرح لك بالوصول.' }, { status: 401 });
        }

        const body = await request.json();
        const { courseId } = body;

        if (!courseId) {
            return NextResponse.json({ message: 'معرف الدورة مطلوب.' }, { status: 400 });
        }

        const userId = verifiedToken.id;

        // Check if it's a static course
        const staticCourse = await getStaticCourseByIdFromDB(courseId);
        
        if (staticCourse) {
            // Check if already enrolled in static course
            const existingStaticEnrollment = await prisma.staticEnrollment.findUnique({
                where: {
                    userId_courseId: {
                        userId: userId,
                        courseId: courseId
                    }
                }
            });

            if (existingStaticEnrollment) {
                return NextResponse.json({ message: 'أنت مسجل بالفعل في هذه الدورة.' }, { status: 400 });
            }

            // Create static enrollment
            const staticEnrollment = await prisma.staticEnrollment.create({
                data: {
                    userId: userId,
                    courseId: courseId
                }
            });
            
            return NextResponse.json({ 
                message: 'تم التسجيل في الدورة بنجاح.',
                courseId: courseId,
                courseTitle: staticCourse.title,
                enrollmentId: staticEnrollment.id
            }, { status: 200 });

        } else {
            // Handle regular course enrollment
            try {
                const existingEnrollment = await prisma.enrollment.findUnique({
                    where: {
                        userId_courseId: {
                            userId: userId,
                            courseId: courseId
                        }
                    }
                });

                if (existingEnrollment) {
                    return NextResponse.json({ message: 'أنت مسجل بالفعل في هذه الدورة.' }, { status: 400 });
                }

                const enrollment = await prisma.enrollment.create({
                    data: {
                        userId: userId,
                        courseId: courseId
                    }
                });

                return NextResponse.json({ 
                    message: 'تم التسجيل في الدورة بنجاح.',
                    courseId: courseId,
                    enrollmentId: enrollment.id
                }, { status: 200 });

            } catch (error) {
                console.error('Regular enrollment error:', error);
                return NextResponse.json({ message: 'حدث خطأ أثناء التسجيل في الدورة.' }, { status: 500 });
            }
        }

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'حدث خطأ أثناء التسجيل في الدورة.' }, { status: 500 });
    }
}