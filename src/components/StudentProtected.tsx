"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface StudentProtectedProps {
  children: React.ReactNode;
}

export default function StudentProtected({ children }: StudentProtectedProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "STUDENT")) {
      console.log("❌ Non-student trying to access student area, redirecting");
      window.location.href = "/admin/dashboard";
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">جاري التحقق من الصلاحيات...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user || user.role !== "STUDENT") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <div className="mx-auto bg-destructive text-destructive-foreground w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <CardTitle className="font-headline text-2xl">غير مصرح لك بالوصول</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="font-body text-muted-foreground text-lg text-center">
              عذراً، هذه الصفحة متاحة للطلاب فقط.
              <br />
              سيتم توجيهك إلى لوحة التحكم الخاصة بك.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
