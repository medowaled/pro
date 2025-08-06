"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function LogoutButton() {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      // Set flag to prevent auto-login
      sessionStorage.setItem('justLoggedOut', 'true');
      localStorage.setItem('justLoggedOut', 'true');

      // Call logout API
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include", // ضروري ليمسح الكوكي من HttpOnly
      });

      if (response.ok) {
        console.log("✅ Logout successful");
        
        // Show success message
        toast({
          title: "تم تسجيل الخروج بنجاح",
          description: "تم تسجيل خروجك من الحساب بنجاح.",
        });

        // Clear all storage except logout flag
        const justLoggedOut = sessionStorage.getItem('justLoggedOut');
        sessionStorage.clear();
        localStorage.clear();
        
        // Restore logout flag
        if (justLoggedOut) {
          sessionStorage.setItem('justLoggedOut', justLoggedOut);
          localStorage.setItem('justLoggedOut', justLoggedOut);
        }

        // Redirect to login page
        router.push("/login");
      } else {
        console.error("❌ Logout failed");
        toast({
          title: "خطأ في تسجيل الخروج",
          description: "حدث خطأ أثناء تسجيل الخروج. حاول مرة أخرى.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("❌ Logout error:", error);
      toast({
        title: "خطأ في تسجيل الخروج",
        description: "حدث خطأ أثناء تسجيل الخروج. حاول مرة أخرى.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button 
      variant="destructive" 
      onClick={handleLogout}
      className="font-headline"
    >
      <LogOut className="h-4 w-4 mr-2" />
      تسجيل الخروج
    </Button>
  );
}
