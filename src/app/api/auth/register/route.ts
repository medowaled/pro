import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

const registerSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "الاسم الأول يجب أن يتكون من حرفين على الأقل." }),
  lastName: z
    .string()
    .min(2, { message: "اسم العائلة يجب أن يتكون من حرفين على الأقل." }),
  year: z.string().min(1, "يرجى اختيار السنة"),
  phone: z
    .string()
    .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, {
      message: "رقم الهاتف المدخل غير صالح. يرجى إدخال رقم صحيح.",
    }),
  password: z
    .string()
    .min(8, { message: "كلمة المرور يجب أن لا تقل عن 8 أحرف." }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      const errorMessages = parsed.error.errors
        .map((e) => e.message)
        .join("\n");
      return NextResponse.json({ message: errorMessages }, { status: 400 });
    }

    const { firstName, lastName, year, phone, password } = parsed.data;

    const existingUser = await prisma.user.findUnique({ where: { phone } });
    if (existingUser) {
      return NextResponse.json(
        { message: "هذا الرقم مسجل بالفعل." },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        phone,
        year,
        password: hashedPassword,
        role: "STUDENT",
      },
    });

    return NextResponse.json(
      { message: "تم إنشاء الحساب بنجاح!", user: { id: newUser.id } },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "حدث خطأ غير متوقع في الخادم." },
      { status: 500 },
    );
  }
} 