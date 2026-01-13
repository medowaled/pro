import { verifyAuth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const enrollmentSchema = z.object({
  studentId: z.string(),
  courseId: z.string(),
});

export async function POST(request: Request) {
    try {
        const token = request.headers.get('cookie')?.split('; ').find(c => c.startsWith('token='))?.split('=')[1];
        const verifiedToken = token && (await verifyAuth(token).catch(() => null));
        if (!verifiedToken || verifiedToken.role !== 'ADMIN') {
            return NextResponse.json({ message: 'غير مصرح لك بالوصول.' }, { status: 401 });
        }

        const body = await request.json();
        const parsed = enrollmentSchema.safeParse(body);

        if(!parsed.success) {
            return NextResponse.json({ message: parsed.error.message }, { status: 400 });
        }
        
        const { studentId, courseId } = parsed.data;
        
        console.log('Enrollment attempt:', { studentId, courseId });

        // First, check if it's a static course by looking in the database
        const staticCourseInDB = await prisma.staticCourse.findUnique({
            where: { courseId: courseId }
        });
        
        console.log('Static course found:', staticCourseInDB ? 'Yes' : 'No');
        
        if (staticCourseInDB) {
            // Handle static course enrollment
            const existingStaticEnrollment = await prisma.staticEnrollment.findFirst({
                where: {
                    userId: studentId,
                    courseId: staticCourseInDB.id, // Use the database ID, not courseId
                }
            });

            if (existingStaticEnrollment) {
                return NextResponse.json({ message: 'الطالب مسجل بالفعل في هذه الدورة.' }, { status: 409 });
            }

            const newStaticEnrollment = await prisma.staticEnrollment.create({
                data: {
                    userId: studentId,
                    courseId: staticCourseInDB.id, // Use the database ID
                }
            });

            console.log('Static enrollment created:', newStaticEnrollment);

            return NextResponse.json({
                ...newStaticEnrollment,
                courseTitle: staticCourseInDB.title,
                courseType: 'static'
            }, { status: 201 });
        } else {
            // Handle regular course enrollment
            const existingEnrollment = await prisma.enrollment.findFirst({
                where: {
                    userId: studentId,
                    courseId: courseId,
                }
            });

            if (existingEnrollment) {
                return NextResponse.json({ message: 'الطالب مسجل بالفعل في هذه الدورة.' }, { status: 409 });
            }

            const newEnrollment = await prisma.enrollment.create({
                data: {
                    userId: studentId,
                    courseId: courseId,
                }
            });

            console.log('Regular enrollment created:', newEnrollment);

            return NextResponse.json({
                ...newEnrollment,
                courseType: 'regular'
            }, { status: 201 });
        }

    } catch (error) {
        console.error('Enrollment error:', error);
        return NextResponse.json({ 
            message: 'حدث خطأ أثناء تسجيل الطالب.',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
