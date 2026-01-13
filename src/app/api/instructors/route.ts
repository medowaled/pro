import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { verifyAuth } from '@/lib/auth';


const instructorSchema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    phone: z.string().regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/),
    password: z.string().min(8),
    specialty: z.string().min(3),
});

export async function POST(request: Request) {
    try {
        const token = request.headers.get('cookie')?.split('; ').find(c => c.startsWith('token='))?.split('=')[1];
        const verifiedToken = token && (await verifyAuth(token).catch(() => null));

        if (!verifiedToken || verifiedToken.role !== 'ADMIN') {
            return NextResponse.json({ message: 'غير مصرح لك بالوصول.' }, { status: 401 });
        }
        
        const body = await request.json();
        const parsed = instructorSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ message: parsed.error.message }, { status: 400 });
        }

        const { firstName, lastName, phone, password, specialty } = parsed.data;

        const existingUser = await prisma.user.findUnique({ where: { phone } });
        if (existingUser) {
            return NextResponse.json({ message: 'هذا الرقم مسجل بالفعل.' }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newInstructor = await prisma.user.create({
            data: {
                firstName,
                lastName,
                phone,
                password: hashedPassword,
                role: 'ADMIN', // Instructors are Admins
                specialty,
            },
        });

        const { password: _, ...result } = newInstructor;
        return NextResponse.json(result, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'حدث خطأ أثناء إنشاء حساب المدرب.' }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const instructors = await prisma.user.findMany({
            where: {
                role: 'ADMIN' // Assuming Admins are Instructors
            },
            include: {
                _count: {
                    select: { courses: true }
                }
            }
        });

        const formattedInstructors = instructors.map(instructor => ({
            id: instructor.id,
            name: `${instructor.firstName} ${instructor.lastName}`,
            specialty: instructor.specialty || 'متعدد التخصصات',
            coursesTaught: instructor._count.courses,
        }));

        return NextResponse.json(formattedInstructors);
    } catch(error) {
        console.error("Failed to fetch instructors:", error);
        return NextResponse.json({ message: 'حدث خطأ أثناء جلب بيانات المدربين.' }, { status: 500 });
    }
}
