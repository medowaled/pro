'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (phone: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check user authentication only once on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if user is in logout state
        const logoutTime = localStorage.getItem('logoutTime');
        if (logoutTime) {
          const timeDiff = Date.now() - parseInt(logoutTime);
          if (timeDiff < 24 * 60 * 60 * 1000) { // 24 hours
            console.log('🚫 User is in logout state, skipping auth check');
            setUser(null);
            setIsLoading(false);
            return;
          } else {
            localStorage.removeItem('logoutTime');
          }
        }

        const res = await fetch('/api/auth/me', {
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
          },
          credentials: 'include',
        });
        
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          console.log('✅ User authenticated:', data.user);
        } else {
          console.log('❌ User not authenticated');
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking user auth:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []); // Only run once on mount

  const login = async (phone: string, password: string): Promise<User> => {
    try {
      // Clear logout state when logging in
      localStorage.removeItem('logoutTime');

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'فشل تسجيل الدخول');
      }

      console.log('✅ Login successful, user data:', data.user);
      setUser(data.user);
      
      return data.user;
    } catch (error) {
      setUser(null);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      console.log("🔄 Starting logout process...");
      
      // Set logout state immediately
      localStorage.setItem('logoutTime', Date.now().toString());
      
      // Clear user state immediately
      setUser(null);
      
      // Clear all storage
      sessionStorage.clear();
      
      // Call logout API
      await fetch('/api/auth/logout', { 
        method: 'POST',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
        },
        credentials: 'include',
      });
      
      console.log("✅ Logout completed successfully");
      
    } catch (error) {
      console.error("❌ Logout failed", error);
      // Even if API fails, maintain logout state
      localStorage.setItem('logoutTime', Date.now().toString());
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
