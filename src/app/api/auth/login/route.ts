import { NextResponse } from "next/server";
import { z } from "zod";
import prisma, { resetPrismaConnection } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { getJwtSecretKey } from "@/lib/auth";

const loginSchema = z.object({
  phone: z
    .string()
    .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, {
      message: "رقم الهاتف المدخل غير صالح. يرجى إدخال رقم صحيح.",
    }),
  password: z.string().min(8, {
    message: "كلمة المرور يجب أن لا تقل عن 8 أحرف.",
  }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      const errorMessages = parsed.error.errors
        .map((e) => e.message)
        .join("\n");
      console.error('Login validation error:', errorMessages);
      return NextResponse.json({ message: errorMessages }, { status: 400 });
    }

    const { phone, password } = parsed.data;

    // محاولة العثور على المستخدم مع إعادة المحاولة في حالة حدوث خطأ
    let user;
    try {
      user = await prisma.user.findUnique({ where: { phone } });
    } catch (dbError: any) {
      console.error('Database error:', dbError);
      
      // إذا كان الخطأ يتعلق بـ prepared statement، قم بإعادة إنشاء الاتصال
      if (dbError.message && dbError.message.includes('prepared statement')) {
        console.log('Recreating Prisma connection due to prepared statement error');
        const newPrisma = resetPrismaConnection();
        try {
          user = await newPrisma.user.findUnique({ where: { phone } });
        } catch (retryError) {
          console.error('Retry failed:', retryError);
          return NextResponse.json(
            { message: "حدث خطأ في قاعدة البيانات. يرجى المحاولة مرة أخرى." },
            { status: 500 }
          );
        }
      } else {
        return NextResponse.json(
          { message: "حدث خطأ في قاعدة البيانات. يرجى المحاولة مرة أخرى." },
          { status: 500 }
        );
      }
    }

    if (!user) {
      console.error("❌ User not found for phone:", phone);
      return NextResponse.json(
        { message: "رقم الهاتف أو كلمة المرور غير صحيحة." },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.error("❌ Invalid password for user:", phone);
      return NextResponse.json(
        { message: "رقم الهاتف أو كلمة المرور غير صحيحة." },
        { status: 401 }
      );
    }

    // إضافة فحص إضافي للتأكد من وجود الحقول
    const userPayload = {
      id: user.id,
      role: user.role,
      name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'مستخدم',
    };

    const token = await new SignJWT(userPayload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(new TextEncoder().encode(getJwtSecretKey()));

    const res = NextResponse.json({
      message: "تم تسجيل الدخول بنجاح",
      user: userPayload,
    });

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return res;
  } catch (error) {
    console.error('Unexpected error in login API:', error);
    return NextResponse.json(
      { message: "حدث خطأ غير متوقع في الخادم. يرجى المحاولة مرة أخرى." },
      { status: 500 }
    );
  }
}