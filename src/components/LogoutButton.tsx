"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useState } from "react";

export default function LogoutButton() {
  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return; // Prevent multiple clicks
    
    try {
      setIsLoggingOut(true);
      
      // Clear all storage immediately
      sessionStorage.clear();
      localStorage.clear();
      
      // Call logout API
      const response = await fetch('/api/auth/logout', { 
        method: 'POST',
        credentials: 'include',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      });
      
      if (!response.ok) {
        console.error('Logout API failed');
      }
      
      // Force immediate redirect to homepage
      window.location.replace('/');
      
    } catch (error) {
      console.error('Logout error:', error);
      // Even if there's an error, redirect to homepage
      window.location.replace('/');
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
