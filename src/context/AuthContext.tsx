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

// Cache for user data
let userCache: User | null = null;
let cacheTimestamp = 0;
const USER_CACHE_DURATION = 60 * 60 * 1000; // 1 hour

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
        setUser(userCache);
        setIsLoading(false);
        return;
      }

      const res = await fetch('/api/auth/me', {
        headers: {
          'Cache-Control': 'no-cache',
        },
        credentials: 'include',
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

  const login = async (phone: string, password: string): Promise<User> => {
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
    
    // Update cache and state immediately
    userCache = data.user;
    cacheTimestamp = Date.now();
    setUser(data.user);
    
    return data.user;
  };

  const logout = async (): Promise<void> => {
    try {
      // Clear user state and cache immediately
      setUser(null);
      userCache = null;
      cacheTimestamp = 0;
      
      // Clear all storage
      sessionStorage.clear();
      localStorage.clear();
      
      // Call logout API
      await fetch('/api/auth/logout', { 
        method: 'POST',
        credentials: 'include',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      });
      
    } catch (error) {
      console.error('Logout error:', error);
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
