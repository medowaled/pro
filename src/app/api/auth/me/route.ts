import { NextResponse, NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const verifiedToken = await verifyAuth(token) as any;
        
        // Return user data with proper structure
        return NextResponse.json({ 
            user: { 
                id: verifiedToken.id, 
                name: verifiedToken.name, 
                role: verifiedToken.role 
            } 
        });
    } catch (err) {
        console.error('Token verification failed:', err);
        
        // Clear invalid token
        const response = NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        response.cookies.set("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            expires: new Date(0),
        });
        
        return response;
    }
}
