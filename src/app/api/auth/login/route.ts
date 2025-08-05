import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { getJwtSecretKey } from "@/lib/auth";

const loginSchema = z.object({
  phone: z.string(),
  password: z.string(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("🟡 Body:", body);

    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      console.log("🔴 Zod Validation Error:", parsed.error.flatten());
      return NextResponse.json(
        { message: "بيانات غير صالحة" },
        { status: 400 }
      );
    }

    const { phone, password } = parsed.data;
    console.log("📞 Phone:", phone);

    const user = await prisma.user.findFirst({ where: { phone } });
    if (!user) {
      console.log("🔴 User not found");
      return NextResponse.json(
        { message: "الرقم أو كلمة المرور خطأ" },
        { status: 401 }
      );
    }

    console.log("👤 User found:", user);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("🔴 Invalid password");
      return NextResponse.json(
        { message: "الرقم أو كلمة المرور خطأ" },
        { status: 401 }
      );
    }

    const payload = {
      id: user.id,
      role: user.role,
      name: `${user.firstName ?? ""} ${user.lastName ?? ""}`,
    };

    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(getJwtSecretKey());

    const response = NextResponse.json({
      message: "تم تسجيل الدخول بنجاح",
      user: payload,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    console.log("✅ Login successful, token set.");
    return response;
  } catch (error) {
    console.error("🔥 Login error:", error);
    return NextResponse.json(
      { message: "خطأ داخلي في السيرفر" },
      { status: 500 }
    );
  }
}
