// app/api/auth/me/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { isTokenBlacklisted } from '@/lib/tokenBlacklist';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  // Always return no-cache headers
  const noCacheHeaders = {
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    Pragma: 'no-cache',
    Expires: '0',
  };

  if (!token) {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401, headers: noCacheHeaders }
    );
  }

  if (await isTokenBlacklisted(token)) {
    // ensure async
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401, headers: noCacheHeaders }
    );
  }

  try {
    const verifiedToken = await verifyAuth(token);
    return NextResponse.json(
      {
        user: {
          id: verifiedToken.id as string,
          name: verifiedToken.name as string,
          role: verifiedToken.role as string,
        },
      },
      { headers: noCacheHeaders }
    );
  } catch {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401, headers: noCacheHeaders }
    );
  }
}
