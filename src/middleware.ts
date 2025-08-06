import { NextResponse, type NextRequest } from 'next/server';
import { verifyAuth } from './lib/auth';

interface TokenPayload {
  id: string;
  role: string;
  name: string;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  const publicPaths = ['/', '/courses', '/about', '/login', '/register'];
  const isPublicPage = publicPaths.includes(pathname) || pathname.startsWith('/courses/');

  try {
    if (!token) {
      if (isPublicPage) return NextResponse.next();

      const redirectUrl = new URL('/login', request.url);
      redirectUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(redirectUrl);
    }

    let verifiedToken: TokenPayload | null = null;
    try {
      const payload = await verifyAuth(token);
      verifiedToken = payload as unknown as TokenPayload;
    } catch (err) {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.set("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        expires: new Date(0),
        maxAge: 0,
      });
      return response;
    }

    if (isPublicPage) {
      if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
        if (verifiedToken) {
          if (verifiedToken.role === 'ADMIN') {
            return NextResponse.redirect(new URL('/admin/dashboard', request.url));
          } else {
            return NextResponse.redirect(new URL('/user/my-courses', request.url));
          }
        }
      }
      return NextResponse.next();
    }

    // صفحات محمية
    if (pathname.startsWith('/admin')) {
      if (verifiedToken.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/user/my-courses', request.url));
      }
    }

    if (pathname.startsWith('/user')) {
      if (verifiedToken.role !== 'STUDENT') {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
    }

    return NextResponse.next();

  } catch (error) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: new Date(0),
      maxAge: 0,
    });
    return response;
  }
}

export const config = {
    matcher: ['/admin/:path*', '/user/:path*', '/login', '/register', '/courses/:id', '/courses', '/about'],
};
