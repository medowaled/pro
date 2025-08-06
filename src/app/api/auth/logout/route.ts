import { NextResponse } from "next/server";

export async function POST() {
  // Clear all auth-related cookies
  const res = NextResponse.json({ message: "تم تسجيل الخروج بنجاح" });
  
  // Clear the main token cookie
  res.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(0),
  });

  // Also clear any other potential auth cookies
  res.cookies.set("auth", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(0),
  });

  return res;
}
