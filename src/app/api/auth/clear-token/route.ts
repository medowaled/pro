import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "تم مسح التوكن بنجاح" });
  
  // Clear all possible auth cookies
  const cookiesToClear = [
    "token",
    "auth", 
    "session",
    "user",
    "userId",
    "next-auth.session-token",
    "__Secure-next-auth.session-token"
  ];

  cookiesToClear.forEach(cookieName => {
    res.cookies.set(cookieName, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(0),
      maxAge: 0,
    });
  });

  // Add cache control headers
  res.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.headers.set('Pragma', 'no-cache');
  res.headers.set('Expires', '0');

  return res;
}
