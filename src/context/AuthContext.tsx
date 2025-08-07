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

  const checkUser = useCallback(async (forceCheck = false) => {
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
  }, []);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  // إزالة إعادة التوجيه التلقائي عند وجود مستخدم
  // useEffect(() => {
  //   if (user && (window.location.pathname === '/login' || window.location.pathname === '/register')) {
  //     const targetPath = user.role === 'ADMIN' ? '/admin/dashboard' : '/user/my-courses';
  //     window.location.href = targetPath;
  //   }
  // }, [user]);

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
    
    // تحديث الكاش والحالة
    userCache = data.user;
    cacheTimestamp = Date.now();
    setUser(data.user);
    
    // إعادة التحقق من حالة المستخدم للتأكد من تحديث الحالة
    await checkUser();
    
    return data.user;
  };

  const logout = async (): Promise<void> => {
    try {
      // حذف البيانات من الحالة والكاش أولاً
      setUser(null);
      userCache = null;
      cacheTimestamp = 0;
      
      // استدعاء API تسجيل الخروج
      await fetch('/api/auth/logout', { 
        method: 'POST',
      });
      
      // إجبار إعادة التحقق من حالة المستخدم للتأكد من تسجيل الخروج
      await checkUser(true);
    } catch (error) {
      // في حالة حدوث خطأ، تأكد من حذف البيانات المحلية
      setUser(null);
      userCache = null;
      cacheTimestamp = 0;
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
