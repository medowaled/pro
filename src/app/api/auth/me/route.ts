// app/api/auth/me/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { isTokenBlacklisted } from '@/lib/tokenBlacklist';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  if (isTokenBlacklisted(token)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const verifiedToken = await verifyAuth(token);
    return NextResponse.json({
      user: {
        id: verifiedToken.id as string,
        name: verifiedToken.name as string,
        role: verifiedToken.role as string,
      },
    });
  } catch (err) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}
