// app/api/logout/route.ts
import { NextResponse } from 'next/server';
import { blacklistToken } from '@/lib/tokenBlacklist';

export async function POST(request: Request) {
  const token = request.headers.get('cookie')?.match(/token=([^;]+)/)?.[1];

  if (token) {
    blacklistToken(token);
  }

  const response = NextResponse.json(
    { success: true },
    {
      headers: {
        'Cache-Control':
          'no-store, no-cache, must-revalidate, proxy-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    }
  );

  const cookiesToClear = [
    'token',
    'auth',
    'session',
    'userId',
    'jwt',
    'next-auth.session-token',
    '__Secure-next-auth.session-token',
    'csrf',
    'csrf-token',
    'session-token',
    'access-token',
    'refresh-token',
    'auth-token',
    'bearer-token',
    'api-token',
    'user-token',
    'login-token',
    'secure-token',
  ];

  cookiesToClear.forEach((cookieName) => {
    response.cookies.set(cookieName, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      expires: new Date(0),
    });
  });

  return response;
}
