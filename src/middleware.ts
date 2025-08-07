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
        const { pathname, searchParams } = request.nextUrl;

        console.log('🔍 Middleware checking:', pathname, 'Token exists:', !!token);

        // 1. معالجة تسجيل الخروج أولاً (يجب أن يكون في البداية)
        if (pathname.startsWith('/logout')) {
            console.log('🚪 Handling logout request');
            const response = NextResponse.redirect(new URL('/', request.url));
            // طريقة أكثر فعالية لحذف الكوكي
            response.cookies.set({
                name: 'token',
                value: '',
                path: '/',
                expires: new Date(0),
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            });
            return response;
        }

        // 2. الصفحات العامة (مع تحسين تجربة المستخدم المصادق عليه)
        if (pathname === '/' || pathname === '/about' || pathname === '/courses' || pathname.startsWith('/courses/')) {
            if (token) {
                try {
                    const payload = await verifyAuth(token);
                    // إذا كان مسجل دخول، نعيد توجيهه حسب دوره
                    const dashboardUrl = payload.role === 'ADMIN'
                        ? '/admin/dashboard'
                        : '/user/my-courses';
                    return NextResponse.redirect(new URL(dashboardUrl, request.url));
                } catch (err) {
                    // إذا كان التوكن غير صالح، نمسحه ونستمر
                    const response = NextResponse.next();
                    response.cookies.delete('token');
                    return response;
                }
            }
            return NextResponse.next();
        }

        // 3. صفحات التسجيل والدخول (منع المستخدم المصادق عليه من الوصول)
        if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
            if (token) {
                try {
                    const payload = await verifyAuth(token);
                    // إذا كان مسجل دخول بالفعل، نعيد توجيهه
                    const dashboardUrl = payload.role === 'ADMIN'
                        ? '/admin/dashboard'
                        : '/user/my-courses';
                    return NextResponse.redirect(new URL(dashboardUrl, request.url));
                } catch (err) {
                    // إذا كان التوكن غير صالح، نمسحه ونستمر
                    const response = NextResponse.next();
                    response.cookies.delete('token');
                    return response;
                }
            }
            return NextResponse.next();
        }

        // 4. المسارات المحمية
        if (pathname.startsWith('/admin') || pathname.startsWith('/user')) {
            if (!token) {
                console.log('❌ No token, redirecting to login');
                const redirectUrl = new URL('/login', request.url);
                redirectUrl.searchParams.set('redirect', pathname);
                return NextResponse.redirect(redirectUrl);
            }

            let verifiedToken: TokenPayload;
            try {
                const payload = await verifyAuth(token);
                verifiedToken = {
                    id: payload.id as string,
                    role: payload.role as string,
                    name: payload.name as string
                };
                console.log('✅ Token verified for:', verifiedToken.role);
            } catch (err) {
                console.error('❌ Token verification failed:', err);
                const response = NextResponse.redirect(new URL('/login', request.url));
                response.cookies.delete('token');
                return response;
            }

            // التحقق من الصلاحيات
            if (pathname.startsWith('/admin') && verifiedToken.role !== 'ADMIN') {
                console.log('🔄 Non-admin trying to access admin area, redirecting');
                return NextResponse.redirect(new URL('/user/my-courses', request.url));
            }

            if (pathname.startsWith('/user') && verifiedToken.role !== 'STUDENT') {
                console.log('🔄 Non-student trying to access user area, redirecting');
                return NextResponse.redirect(new URL('/admin/dashboard', request.url));
            }
        }

        return NextResponse.next();
    } catch (error) {
        console.error('🔥 Middleware error:', error);
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('token');
        return response;
    }
}

export const config = {
    matcher: [
        '/logout',
        '/admin/:path*',
        '/user/:path*',
        '/login',
        '/register',
        '/courses/:path*',
        '/about'
    ],
};