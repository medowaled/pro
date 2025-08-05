import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
    try {
        const students = await prisma.user.findMany({
            where: {
                role: 'STUDENT'
            },
            include: {
                _count: {
                    select: { enrollments: true }
                }
            }
        });

        const formattedStudents = students.map(student => ({
            id: student.id,
            name: `${student.firstName} ${student.lastName}`,
            phone: student.phone,
            enrolledDate: student.createdAt.toISOString().split('T')[0],
            courses: student._count.enrollments,
        }));

        return NextResponse.json(formattedStudents);
    } catch (error) {
        console.error("Failed to fetch students:", error);
        return NextResponse.json({ message: 'حدث خطأ أثناء جلب بيانات الطلاب.' }, { status: 500 });
    }
}
