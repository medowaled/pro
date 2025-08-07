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
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Cache for user data
let userCache: User | null = null;
let cacheTimestamp = 0;
const USER_CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const checkUser = useCallback(async () => {
    setIsLoading(true);
    try {
      // Check cache first
      const now = Date.now();
      if (userCache && (now - cacheTimestamp) < USER_CACHE_DURATION) {
        console.log('Using cached user data:', userCache);
        setUser(userCache);
        setIsLoading(false);
        return;
      }

      console.log('Checking user authentication...');
      const res = await fetch('/api/auth/me', {
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      
      if (res.ok) {
        const data = await res.json();
        console.log('User authenticated:', data.user);
        userCache = data.user;
        cacheTimestamp = now;
        setUser(data.user);
      } else {
        console.log('User not authenticated');
        setUser(null);
        userCache = null;
      }
    } catch (error) {
      console.error('Error checking user auth:', error);
      setUser(null);
      userCache = null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  // Add effect to log user state changes
  useEffect(() => {
    console.log('User state changed:', user);
  }, [user]);

  const login = async (phone: string, password: string): Promise<User> => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, password }),
    });

    const data = await response.json();

    console.log('DIAGNOSTIC: Full API response:', JSON.stringify(data, null, 2));

    if (!response.ok) {
      throw new Error(data.message || 'فشل تسجيل الدخول');
    }

    // --- DIAGNOSTIC LOGGING ---
    if (!data.user) {
      console.error('DIAGNOSTIC ERROR: data.user is missing from API response.');
      throw new Error('User data is missing from API response.');
    }
    if (!data.user.role) {
      console.error('DIAGNOSTIC ERROR: data.user.role is missing from API response.');
      console.log('DIAGNOSTIC: User object received:', JSON.stringify(data.user, null, 2));
      throw new Error('User role is missing from API response.');
    }
    console.log(`DIAGNOSTIC: User role is: ${data.user.role}`);
    // --- END DIAGNOSTIC LOGGING ---

    const targetUrl = data.user.role === 'ADMIN' ? '/admin/dashboard' : '/user/my-courses';
    console.log(`DIAGNOSTIC: Redirecting to: ${targetUrl}`);
    window.location.href = targetUrl;
    
    return new Promise(() => {});
  };

  const logout = async (): Promise<void> => {
    try {
      console.log("🔄 Starting logout process...");
      
      // Call logout API
      await fetch('/api/auth/logout', { 
        method: 'POST',
      });
      
    } catch (error) {
      console.error("❌ Logout failed", error);
    } finally {
      // Always redirect to home on logout, regardless of API success
      console.log("✅ Logout completed, redirecting to home.");
      window.location.href = '/';
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
