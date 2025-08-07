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
      
      // Force a complete page reload to clear all state
      setTimeout(() => {
        // Clear sessionStorage but keep logout timestamp in localStorage
        sessionStorage.clear();
        
        // Force reload to login page
        window.location.href = '/login';
        window.location.reload();
      }, 1000);
      
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "خطأ في تسجيل الخروج",
        description: "حدث خطأ أثناء تسجيل الخروج. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
      // Even if there's an error, force reload
      setTimeout(() => {
        sessionStorage.clear();
        window.location.href = '/login';
        window.location.reload();
      }, 1000);
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
