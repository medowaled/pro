'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';

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

// تعريف الكاش
let userCache: User | null = null;
let cacheTimestamp = 0;
const USER_CACHE_DURATION = 10 * 60 * 1000; // 10 دقائق

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const checkUser = useCallback(async (forceCheck = false) => {
    if (isLoggingOut) return; // منع الفحص أثناء تسجيل الخروج
    
    setIsLoading(true);
    try {
      const now = Date.now();
      // تجاهل الكاش إذا تم طلب فحص إجباري
      if (!forceCheck && userCache && (now - cacheTimestamp) < USER_CACHE_DURATION) {
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
      setUser(null);
      userCache = null;
    } finally {
      setIsLoading(false);
    }
  }, [isLoggingOut]);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  const login = async (phone: string, password: string): Promise<User> => {
    if (isLoggingOut) {
      throw new Error('جاري تسجيل الخروج، يرجى الانتظار');
    }
    
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'فشل تسجيل الدخول');
    }
    
    // تحديث الكاش والحالة مباشرة
    userCache = data.user;
    cacheTimestamp = Date.now();
    setUser(data.user);
    
    return data.user;
  };

  const logout = async (): Promise<void> => {
    if (isLoggingOut) return; // منع تسجيل الخروج المتكرر
    
    setIsLoggingOut(true);
    try {
      // حذف البيانات من الحالة والكاش أولاً
      setUser(null);
      userCache = null;
      cacheTimestamp = 0;
      
      // استدعاء API تسجيل الخروج
      await fetch('/api/auth/logout', { 
        method: 'POST',
      });
      
      // إعادة التوجيه للصفحة الرئيسية
      window.location.href = '/';
    } catch (error) {
      // في حالة حدوث خطأ، تأكد من حذف البيانات المحلية
      setUser(null);
      userCache = null;
      cacheTimestamp = 0;
      // إعادة التوجيه للصفحة الرئيسية حتى في حالة الخطأ
      window.location.href = '/';
    } finally {
      setIsLoggingOut(false);
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
