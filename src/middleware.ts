import { AnyNull } from './../node_modules/.prisma/client/index.d';
import { NextResponse, type NextRequest } from 'next/server';
import { verifyAuth } from './lib/auth';

export async function middleware(request: NextRequest) {
    try {
        const token = request.cookies.get('token')?.value;
        const { pathname } = request.nextUrl;

        const verifiedToken = token && (await verifyAuth(token).catch((err: any) => {
            console.error('Token verification failed:', err);    
            return null;
        }));

        // Allow access to public course introduction pages
        if (pathname.startsWith('/courses/')) {
            return NextResponse.next();
        }

        // Allow access to homepage for everyone (no automatic redirect)
        if (pathname === '/') {
            return NextResponse.next();
        }

        if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
            // Redirect logged in users to their dashboard
            if (verifiedToken) {
                if (verifiedToken.role === 'ADMIN') {
                    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
                } else {
                    return NextResponse.redirect(new URL('/user/my-courses', request.url));
                }
            }
            return NextResponse.next();
        }
        
        if (pathname.startsWith('/admin') || pathname.startsWith('/user')) {
            if (!verifiedToken) {
                const redirectUrl = new URL('/login', request.url);
                redirectUrl.searchParams.set('redirect', pathname); // Pass the original path
                return NextResponse.redirect(redirectUrl);
            }

            if (pathname.startsWith('/admin') && verifiedToken.role !== 'ADMIN') {
                return NextResponse.redirect(new URL('/', request.url));
            }

            if (pathname.startsWith('/user') && verifiedToken.role !== 'STUDENT') {
                return NextResponse.redirect(new URL('/admin/dashboard', request.url));
            }
        }
        
        return NextResponse.next();
    } catch (error) {
        console.error('Middleware error:', error);
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: ['/admin/:path*', '/user/:path*', '/login', '/register', '/courses/:id'],
};
