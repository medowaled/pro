import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth';
import bcrypt from 'bcrypt';
import { z } from 'zod';


const instructorUpdateSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phone: z.string().regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/),
  password: z.string().min(8).optional().or(z.literal('')),
  specialty: z.string().min(3),
});


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

        const { id } = params;
        const instructor = await prisma.user.findUnique({
            where: { id, role: 'ADMIN' },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                phone: true,
                specialty: true,
            }
        });

        if (!instructor) {
            return NextResponse.json({ message: 'لم يتم العثور على المدرب.' }, { status: 404 });
        }

        return NextResponse.json(instructor);

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'حدث خطأ أثناء جلب بيانات المدرب.' }, { status: 500 });
    }
}


export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
     try {
        const token = request.headers.get('cookie')?.split('; ').find(c => c.startsWith('token='))?.split('=')[1];
        const verifiedToken = token && (await verifyAuth(token).catch(() => null));
        if (!verifiedToken || verifiedToken.role !== 'ADMIN') {
            return NextResponse.json({ message: 'غير مصرح لك بالوصول.' }, { status: 401 });
        }
        
        const { id } = params;
        const body = await request.json();
        const parsed = instructorUpdateSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ message: parsed.error.message }, { status: 400 });
        }

        const { firstName, lastName, phone, password, specialty } = parsed.data;

        const updateData: any = {
            firstName,
            lastName,
            phone,
            specialty,
        };

        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }
        
        const existingUserWithPhone = await prisma.user.findFirst({
            where: {
                phone: phone,
                id: { not: id }
            }
        });

        if (existingUserWithPhone) {
            return NextResponse.json({ message: 'رقم الهاتف مستخدم بالفعل من قبل مستخدم آخر.' }, { status: 409 });
        }

        const updatedInstructor = await prisma.user.update({
            where: { id },
            data: updateData
        });
        
        const { password: _, ...result } = updatedInstructor;
        return NextResponse.json(result, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'حدث خطأ أثناء تحديث بيانات المدرب.' }, { status: 500 });
    }
}


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

        const { id } = params;

        // You might want to handle what happens to courses taught by this instructor.
        // For this example, we'll prevent deletion if they have courses.
        const instructor = await prisma.user.findUnique({
            where: { id },
            include: {
                _count: {
                    select: { courses: true }
                }
            }
        });

        if (!instructor) {
             return NextResponse.json({ message: 'لم يتم العثور على المدرب.' }, { status: 404 });
        }
        
        if (instructor._count.courses > 0) {
            return NextResponse.json({ message: 'لا يمكن حذف المدرب لأنه مسؤول عن دورات حالية. يرجى إعادة تعيين الدورات لمدرب آخر أولاً.' }, { status: 400 });
        }
        

        await prisma.user.delete({
            where: {
                id: id,
            },
        });

        return NextResponse.json({ message: 'تم حذف المدرب بنجاح.' }, { status: 200 });

    } catch (error: any) {
        console.error(error);
        if (error.code === 'P2025') {
             return NextResponse.json({ message: 'لم يتم العثور على المدرب.' }, { status: 404 });
        }
        return NextResponse.json({ message: 'حدث خطأ أثناء حذف المدرب.' }, { status: 500 });
    }
}
