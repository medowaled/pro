import { NextResponse, NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
        console.log('No token found in cookies');
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        console.log('Verifying token:', token.substring(0, 20) + '...');
        const verifiedToken = await verifyAuth(token);
        console.log('Token verified successfully:', verifiedToken);
        
        return NextResponse.json({ 
            user: { 
                id: verifiedToken.id, 
                name: verifiedToken.name, 
                role: verifiedToken.role 
            } 
        });
    } catch (err) {
        console.error('Token verification failed:', err);
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
}
