
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth';
import bcrypt from 'bcrypt';
import { z } from 'zod';

const studentUpdateSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phone: z.string().regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/),
  password: z.string().min(8).optional().or(z.literal('')),
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
        const student = await prisma.user.findUnique({
            where: { id, role: 'STUDENT' },
             select: {
                id: true,
                firstName: true,
                lastName: true,
                phone: true,
            }
        });

        if (!student) {
            return NextResponse.json({ message: 'لم يتم العثور على الطالب.' }, { status: 404 });
        }

        return NextResponse.json(student);

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'حدث خطأ أثناء جلب بيانات الطالب.' }, { status: 500 });
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
        const parsed = studentUpdateSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ message: parsed.error.message }, { status: 400 });
        }

        const { firstName, lastName, phone, password } = parsed.data;

        const updateData: any = {
            firstName,
            lastName,
            phone,
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

        const updatedStudent = await prisma.user.update({
            where: { id },
            data: updateData
        });

        const { password: _, ...result } = updatedStudent;
        return NextResponse.json(result, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'حدث خطأ أثناء تحديث بيانات الطالب.' }, { status: 500 });
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

        // أولاً، احذف التسجيلات المرتبطة بالطالب
        await prisma.enrollment.deleteMany({
            where: {
                userId: id,
            },
        });

        // ثم احذف الطالب (المستخدم)
        await prisma.user.delete({
            where: {
                id: id,
            },
        });

        return NextResponse.json({ message: 'تم حذف الطالب بنجاح.' }, { status: 200 });

    } catch (error: any) {
        console.error(error);
        if (error.code === 'P2025') { // Prisma's record not found error
             return NextResponse.json({ message: 'لم يتم العثور على الطالب.' }, { status: 404 });
        }
        return NextResponse.json({ message: 'حدث خطأ أثناء حذف الطالب.' }, { status: 500 });
    }
}