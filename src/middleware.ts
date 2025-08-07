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

        console.log('🔍 Middleware checking:', pathname, 'Token exists:', !!token);

        // معالجة طلب تسجيل الخروج أولاً (يجب أن يكون في البداية)
        if (pathname.startsWith('/logout')) {
            console.log('🚪 Handling logout request');
            const response = NextResponse.redirect(new URL('/', request.url));
            response.cookies.delete("token");
            return response;
        }

        // السماح بالوصول إلى الصفحات العامة للجميع
        if (pathname === '/' || pathname === '/about' || pathname === '/courses' || pathname.startsWith('/courses/')) {
            return NextResponse.next();
        }

        // السماح بالوصول إلى صفحات التسجيل والدخول
        if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
            return NextResponse.next();
        }

        // للطرق المحمية، التحقق من المصادقة
        if (pathname.startsWith('/admin') || pathname.startsWith('/user')) {
            if (!token) {
                console.log('❌ No token, redirecting to login');
                const redirectUrl = new URL('/login', request.url);
                redirectUrl.searchParams.set('redirect', pathname);
                return NextResponse.redirect(redirectUrl);
            }

            let verifiedToken: TokenPayload | null = null;
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
                // مسح التوكن غير الصالح وإعادة التوجيه لتسجيل الدخول
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

            // التأكد من توجيه المستخدمين إلى لوحة التحكم المناسبة لهم
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
        // مسح التوكن وإعادة التوجيه لتسجيل الدخول عند أي خطأ
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
    matcher: [
        '/logout', // تم إضافته في البداية
        '/admin/:path*', 
        '/user/:path*', 
        '/login', 
        '/register', 
        '/courses/:id', 
        '/courses', 
        '/about'
    ],
};