
import { NextResponse, type NextRequest } from 'next/server';
import { verifyAuth } from './lib/auth';

interface TokenPayload {
    id: string;
    role: string;
    name: string;
}

export async function middleware(request: NextRequest) {
    try {
        const token = request.cookies.get('token')?.value;
        const { pathname } = request.nextUrl;



        // If no token, allow access to public pages only
        if (!token) {
            if (pathname.startsWith('/courses/') || pathname === '/courses' || pathname === '/about' || pathname === '/') {
                return NextResponse.next();
            }
            if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
                return NextResponse.next();
            }
            // Redirect to login for protected routes
            const redirectUrl = new URL('/login', request.url);
            redirectUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(redirectUrl);
        }

        let verifiedToken: TokenPayload | null = null;
        try {
            const payload = await verifyAuth(token);
            verifiedToken = payload as unknown as TokenPayload;

        } catch (err) {
            console.error('❌ Token verification failed:', err);
            // Clear invalid token and redirect to login
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

        // Allow access to public pages
        if (pathname.startsWith('/courses/') || pathname === '/courses' || pathname === '/about') {
            return NextResponse.next();
        }

        // Allow access to homepage for everyone
        if (pathname === '/') {
            return NextResponse.next();
        }

        // Handle login and register pages
        if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
            // If user is already logged in, redirect to appropriate dashboard
            if (verifiedToken) {

                
                // Add a small delay to prevent race conditions
                const response = NextResponse.next();
                response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
                
                if (verifiedToken.role === 'ADMIN') {
                    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
                } else {
                    return NextResponse.redirect(new URL('/user/my-courses', request.url));
                }
            }
            return NextResponse.next();
        }
        
        // Handle protected routes
        if (pathname.startsWith('/admin') || pathname.startsWith('/user')) {
            if (!verifiedToken) {

                const redirectUrl = new URL('/login', request.url);
                redirectUrl.searchParams.set('redirect', pathname);
                return NextResponse.redirect(redirectUrl);
            }

            // Ensure users are redirected to their appropriate dashboard
            if (pathname.startsWith('/admin') && verifiedToken.role !== 'ADMIN') {

                return NextResponse.redirect(new URL('/user/my-courses', request.url));
            }

            if (pathname.startsWith('/user') && verifiedToken.role !== 'STUDENT') {
                return NextResponse.redirect(new URL('/admin/dashboard', request.url));
            }
        }
        
        return NextResponse.next();
    } catch (error) {
        console.error('🔥 Middleware error:', error);
        // Clear token and redirect to login on any error
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