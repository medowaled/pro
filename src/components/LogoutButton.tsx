"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function LogoutButton() {
  const { logout } = useAuth();
  const { toast } = useToast();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return; // Prevent multiple clicks
    
    try {
      setIsLoggingOut(true);
      
      // Call logout function from AuthContext
      await logout();
      
      // Show success message
      toast({
        title: "تم تسجيل الخروج بنجاح",
        description: "تم تسجيل خروجك بنجاح. شكراً لاستخدامك منصتنا!",
      });
      
      // Use router.push instead of window.location for better navigation
      // This prevents potential issues with the authentication state
      setTimeout(() => {
        window.location.href = '/';
      }, 100);
      
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "خطأ في تسجيل الخروج",
        description: "حدث خطأ أثناء تسجيل الخروج. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
      // Even if there's an error, redirect to homepage
      setTimeout(() => {
        window.location.href = '/';
      }, 100);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      variant="ghost"
      disabled={isLoggingOut}
      className="text-red-600 hover:text-red-700 hover:bg-red-50"
    >
      <LogOut className="h-4 w-4 mr-2" />
      {isLoggingOut ? "جاري الخروج..." : "تسجيل الخروج"}
    </Button>
  );
}
