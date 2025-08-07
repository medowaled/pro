import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth';

// Get all enrollments for a specific course
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const token = request.headers.get('cookie')?.split('; ').find(c => c.startsWith('token='))?.split('=')[1];
        const verifiedToken = token && (await verifyAuth(token).catch(() => null));
        
        if (!verifiedToken || verifiedToken.role !== 'ADMIN') {
            return NextResponse.json({ message: 'غير مصرح لك بالوصول.' }, { status: 401 });
        }
        
        const courseId = params.id;
        
        const course = await prisma.course.findUnique({
            where: { id: courseId },
            select: { title: true }
        });

        if (!course) {
             return NextResponse.json({ message: 'لم يتم العثور على الدورة.' }, { status: 404 });
        }
        
        const enrollments = await prisma.enrollment.findMany({
            where: { courseId },
            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        phone: true,
                    }
                }
            }
        });

        const enrolledStudents = enrollments.map(e => ({
            enrollmentId: e.id,
            studentId: e.user.id,
            name: `${e.user.firstName} ${e.user.lastName}`,
            phone: e.user.phone
        }));

        return NextResponse.json({ courseTitle: course.title, students: enrolledStudents });

    } catch(error) {
        console.error(error);
        return NextResponse.json({ message: 'حدث خطأ أثناء جلب المسجلين.' }, { status: 500 });
    }
}


// Delete an enrollment (remove a student from a course)
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const token = request.headers.get('cookie')?.split('; ').find(c => c.startsWith('token='))?.split('=')[1];
        const verifiedToken = token && (await verifyAuth(token).catch(() => null));
        
        if (!verifiedToken || verifiedToken.role !== 'ADMIN') {
            return NextResponse.json({ message: 'غير مصرح لك بالوصول.' }, { status: 401 });
        }

        const enrollmentId = params.id;

        await prisma.enrollment.delete({
            where: {
                id: enrollmentId,
            },
        });

        return NextResponse.json({ message: 'تمت إزالة الطالب من الدورة بنجاح.' }, { status: 200 });

    } catch (error: any) {
        console.error(error);
        if (error.code === 'P2025') { // Prisma's record not found error
             return NextResponse.json({ message: 'لم يتم العثور على هذا التسجيل.' }, { status: 404 });
        }
        return NextResponse.json({ message: 'حدث خطأ أثناء إزالة الطالب.' }, { status: 500 });
    }
}