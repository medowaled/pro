import { NextResponse, NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const verifiedToken = await verifyAuth(token);
        return NextResponse.json({ 
            user: { 
                id: verifiedToken.id, 
                name: verifiedToken.name, 
                role: verifiedToken.role 
            } 
        });
    } catch (err) {
        console.error('Token verification failed in /api/auth/me:', err);
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
}
