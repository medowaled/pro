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

// الذاكرة المؤقتة (Cache) - دي اللي كانت بتسبب الأزمة
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
      const now = Date.now();
      if (userCache && (now - cacheTimestamp) < USER_CACHE_DURATION) {
        setUser(userCache);
        setIsLoading(false);
        return;
      }

      const res = await fetch('/api/auth/me', {
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      
      if (res.ok) {
        const data = await res.json();
        userCache = data.user;
        cacheTimestamp = now;
        setUser(data.user);
      } else {
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

  const login = async (phone: string, password: string): Promise<User> => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'فشل تسجيل الدخول');
    }

    userCache = data.user;
    cacheTimestamp = Date.now();
    setUser(data.user);
    
    await new Promise(resolve => setTimeout(resolve, 100));
    return data.user;
  };

  // --- دالة تسجيل الخروج المعدلة ---
  const logout = async () => {
    try {
      // 1. مسح الكوكيز من السيرفر
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      // 2. تصفير الذاكرة المؤقتة (Global Cache)
      userCache = null;
      cacheTimestamp = 0;
      
      // 3. تصفير حالة المستخدم في الـ State (عشان الهيدر يتغير فوراً)
      setUser(null);
      
      // 4. توجيه لصفحة اللوجن وعمل Refresh كامل للمتصفح لتنظيف أي كاش باقي
      window.location.href = '/login';
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