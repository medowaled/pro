import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL('/', request.url));

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
      secure: true,
      sameSite: 'strict',
      path: '/',
      expires: new Date(0),
    });
  });

  return response;
}
