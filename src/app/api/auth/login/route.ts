import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { getJwtSecretKey } from "@/lib/auth";

const loginSchema = z.object({
  phone: z.string(),
  password: z.string().min(8),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.errors.map(e => e.message).join(", ") },
        { status: 400 }
      );
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

    const payload = {
      id: user.id,
      role: user.role,
      name: `${user.firstName} ${user.lastName}`,
    };

    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(getJwtSecretKey());

    const res = NextResponse.json({
      message: "تم تسجيل الدخول بنجاح",
      user: payload,
    });

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (err) {
    console.error("Login Error:", err);
    return NextResponse.json(
      { message: "حدث خطأ غير متوقع في الخادم." },
      { status: 500 }
    );
  }
}
