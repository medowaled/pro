import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "تم تسجيل الخروج بنجاح" });
  
  // Clear the token cookie with all necessary options
  res.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax", // Changed from "strict" to "lax" for better compatibility
    path: "/",
    expires: new Date(0),
    maxAge: 0,
  });

  // Add cache control headers
  res.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.headers.set('Pragma', 'no-cache');
  res.headers.set('Expires', '0');

  return res;
}
