import { NextResponse } from "next/server";

export async function POST() {
  // Create response with redirect to login page
  const response = NextResponse.redirect('/login');
  
  // Clear ALL possible auth cookies
  const cookiesToClear = [
    "token",
    "auth", 
    "session",
    "user",
    "userId",
    "next-auth.session-token",
    "__Secure-next-auth.session-token",
    "csrf",
    "csrf-token",
    "session-token",
    "access-token",
    "refresh-token",
    "auth-token",
    "jwt",
    "jwt-token",
    "bearer-token",
    "api-token",
    "user-token",
    "login-token",
    "secure-token"
  ];

  // Clear each cookie with maximum security settings
  cookiesToClear.forEach(cookieName => {
    response.cookies.set(cookieName, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: new Date(0),
      maxAge: 0,
    });
  });

  // Add comprehensive cache control headers
  response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate, private, max-age=0');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');
  response.headers.set('Clear-Site-Data', '"cache", "cookies", "storage", "executionContexts"');

  return response;
}
