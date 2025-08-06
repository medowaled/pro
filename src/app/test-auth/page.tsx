"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestAuthPage() {
  const { user, isLoading, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>جاري التحقق من حالة تسجيل الدخول...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>حالة تسجيل الدخول</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {user ? (
            <>
              <div className="space-y-2">
                <p><strong>اسم المستخدم:</strong> {user.name}</p>
                <p><strong>الرقم التعريفي:</strong> {user.id}</p>
                <p><strong>نوع الحساب:</strong> {user.role}</p>
              </div>
              <div className="space-y-2">
                <Button 
                  onClick={() => window.location.href = user.role === 'ADMIN' ? '/admin/dashboard' : '/user/my-courses'}
                  className="w-full"
                >
                  الذهاب إلى لوحة التحكم
                </Button>
                <Button 
                  onClick={logout}
                  variant="destructive"
                  className="w-full"
                >
                  تسجيل الخروج
                </Button>
              </div>
            </>
          ) : (
            <>
              <p>لم يتم تسجيل الدخول</p>
              <Button 
                onClick={() => window.location.href = '/login'}
                className="w-full"
              >
                تسجيل الدخول
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
