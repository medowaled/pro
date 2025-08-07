'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
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

// Global logout state to prevent auto-login
let isLoggedOut = false;
let logoutTimestamp = 0;
const LOGOUT_COOLDOWN = 10 * 60 * 1000; // 10 minutes cooldown

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const checkUser = useCallback(async () => {
    // Don't check if user just logged out
    if (isLoggedOut) {
      const now = Date.now();
      if (now - logoutTimestamp < LOGOUT_COOLDOWN) {
        setUser(null);
        setIsLoading(false);
        return;
      } else {
        // Reset logout state after cooldown
        isLoggedOut = false;
      }
    }

    setIsLoading(true);
    try {
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
  }, []);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  const login = async (phone: string, password: string): Promise<User> => {
    try {
      // Reset logout state when logging in
      isLoggedOut = false;
      logoutTimestamp = 0;

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
      isLoggedOut = true;
      logoutTimestamp = Date.now();
      
      // Clear user state immediately
      setUser(null);
      
      // Clear all storage
      sessionStorage.clear();
      localStorage.clear();
      
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
      isLoggedOut = true;
      logoutTimestamp = Date.now();
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
