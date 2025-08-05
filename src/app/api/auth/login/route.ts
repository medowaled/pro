import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import prisma from "@/lib/prisma";
import { getJwtSecretKey } from "@/lib/auth";

const loginSchema = z.object({
  phone: z.string().min(6, "رقم الهاتف مطلوب"),
  password: z.string().min(6, "كلمة المرور مطلوبة"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      const errorMessages = parsed.error.errors.map((e) => e.message).join("\n");
      return NextResponse.json({ message: errorMessages }, { status: 400 });
    }

    const { phone, password } = parsed.data;

    const user = await prisma.user.findFirst({ where: { phone } });

    if (!user) {
      return NextResponse.json(
        { message: "رقم الهاتف أو كلمة المرور غير صحيحة." },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "رقم الهاتف أو كلمة المرور غير صحيحة." },
        { status: 401 }
      );
    }

    const userPayload = {
      id: user.id,
      role: user.role,
      name: `${user.firstName} ${user.lastName}`,
    };

    const token = await new SignJWT(userPayload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(getJwtSecretKey());

    const response = NextResponse.json({
      message: "تم تسجيل الدخول بنجاح",
      user: userPayload,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return NextResponse.json(
      { message: "حدث خطأ غير متوقع في الخادم." },
      { status: 500 }
    );
  }
}
