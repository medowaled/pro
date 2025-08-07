'use client';

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';

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
  isLoggingOut: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

let userCache: User | null = null;
let cacheTimestamp = 0;
const USER_CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const checkUser = useCallback(
    async (forceCheck = false) => {
      if (isLoggingOut) return;

      setIsLoading(true);
      try {
        const now = Date.now();

        if (
          !forceCheck &&
          userCache &&
          now - cacheTimestamp < USER_CACHE_DURATION
        ) {
          setUser(userCache);
          setIsLoading(false);
          return;
        }

        const res = await fetch('/api/auth/me', {
          headers: { 'Cache-Control': 'no-cache' },
        });

        if (res.ok) {
          const data = await res.json();
          userCache = data.user;
          cacheTimestamp = now;
          setUser(data.user);
        } else {
          setUser(null);
          userCache = null;
          cacheTimestamp = 0;
        }
      } catch (error) {
        setUser(null);
        userCache = null;
        cacheTimestamp = 0;
      } finally {
        setIsLoading(false);
      }
    },
    [isLoggingOut]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      checkUser();
    }, 100);
    return () => clearTimeout(timer);
  }, [checkUser]);

  const login = async (phone: string, password: string): Promise<User> => {
    if (isLoggingOut) throw new Error('جاري تسجيل الخروج، يرجى الانتظار');

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
    return data.user;
  };

  const logout = async (): Promise<void> => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    try {
      setUser(null);
      userCache = null;
      cacheTimestamp = 0;
      localStorage.removeItem('token'); // if you store token here
      sessionStorage.clear();

      const res = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (!res.ok) {
        console.warn('Logout API responded with error:', await res.text());
      }

      // Just let the caller handle the redirect if needed
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isLoading, isLoggingOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
