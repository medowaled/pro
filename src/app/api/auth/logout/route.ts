import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ 
    message: "تم تسجيل الخروج بنجاح",
    success: true 
  });

  // Clear the token cookie with proper settings
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(0), // مسح الكوكي فعليًا
    maxAge: 0,
  });

  // Add cache control headers to prevent caching
  response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');

  return response;
}
