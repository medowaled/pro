'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function TestClearPage() {
  const { user, isLoading } = useAuth();
  const [isClearing, setIsClearing] = useState(false);
  const [message, setMessage] = useState('');

  const clearCookies = async () => {
    setIsClearing(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/auth/clear-cookies');
      const data = await response.json();
      setMessage(data.message);
      
      // إعادة تحميل الصفحة بعد حذف الكوكيز
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (error) {
      setMessage('حدث خطأ أثناء حذف الكوكيز');
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">اختبار حذف الكوكيز</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="mb-2">الحالة الحالية:</p>
            {isLoading ? (
              <p className="text-blue-600">جاري التحقق...</p>
            ) : user ? (
              <div>
                <p className="text-green-600">مستخدم مسجل دخول:</p>
                <p className="font-bold">{user.name}</p>
                <p className="text-sm text-gray-600">الدور: {user.role}</p>
              </div>
            ) : (
              <p className="text-red-600">لا يوجد مستخدم مسجل دخول</p>
            )}
          </div>
          
          <Button 
            onClick={clearCookies} 
            disabled={isClearing}
            className="w-full"
            variant="destructive"
          >
            {isClearing ? 'جاري الحذف...' : 'حذف جميع الكوكيز'}
          </Button>
          
          {message && (
            <div className="text-center p-2 bg-green-100 text-green-800 rounded">
              {message}
            </div>
          )}
          
          <div className="text-center">
            <Link href="/" className="text-blue-600 hover:underline">
              العودة للصفحة الرئيسية
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
