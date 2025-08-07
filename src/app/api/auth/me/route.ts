import { NextResponse, NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const verifiedToken = await verifyAuth(token);
        
        // إضافة فحص إضافي للتأكد من وجود البيانات المطلوبة
        if (!verifiedToken.id || !verifiedToken.role) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }

        return NextResponse.json({ 
            user: { 
                id: verifiedToken.id, 
                name: verifiedToken.name || 'مستخدم', 
                role: verifiedToken.role 
            } 
        });
    } catch (err) {
        console.error('Token verification error:', err);
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
}