import { verifyAuth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { z } from 'zod';

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


export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
     try {
        const { id } = await params;
        let course: any = await prisma.course.findUnique({
            where: { id },
        });

        if (!course) {
            course = await prisma.staticCourse.findUnique({ where: { courseId: id }})
            if (!course)
            return NextResponse.json({ message: 'لم يتم العثور على الدورة.' }, { status: 404 });
        }

        return NextResponse.json(course);

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'حدث خطأ أثناء جلب بيانات الدورة.' }, { status: 500 });
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
        const parsed = courseSchema.safeParse(body);

        if(!parsed.success) {
            return NextResponse.json({ message: parsed.error.message }, { status: 400 });
        }

        const { title, description, price, category, instructorId, videoUrl, imageBase64, content, featured } = parsed.data;

        const updatedCourse = await prisma.course.update({
            where: { id },
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

        return NextResponse.json(updatedCourse, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'حدث خطأ أثناء تحديث الدورة.' }, { status: 500 });
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

        // First, delete enrollments associated with the course
        await prisma.enrollment.deleteMany({
            where: {
                courseId: id,
            },
        });

        // Then, delete the course itself
        await prisma.course.delete({
            where: {
                id: id,
            },
        });

        return NextResponse.json({ message: 'تم حذف الدورة بنجاح.' }, { status: 200 });

    } catch (error: any) {
        console.error(error);
        if (error.code === 'P2025') { // Prisma's record not found error
             return NextResponse.json({ message: 'لم يتم العثور على الدورة.' }, { status: 404 });
        }
        return NextResponse.json({ message: 'حدث خطأ أثناء حذف الدورة.' }, { status: 500 });
    }
}
