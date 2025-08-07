'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simple check for existing user session on app load
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch('/api/auth/me', {
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        
        if (res.ok) {
          const data = await res.json();
          console.log('User authenticated:', data.user);
          setUser(data.user);
        } else {
          console.log('User not authenticated');
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking user auth:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  const login = async (phone: string, password: string): Promise<User> => {
    setIsLoading(true);
    try {
      console.log('Attempting login with phone:', phone);
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Login failed:', data);
        throw new Error(data.message || 'فشل تسجيل الدخول');
      }

      console.log('Login successful, user data:', data.user);
      setUser(data.user);
      return data.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      console.log("🔄 Starting logout process...");
      
      // Clear user state immediately
      setUser(null);
      
      // Call logout API
      await fetch('/api/auth/logout', { 
        method: 'POST',
      });
      
      console.log("✅ Logout completed successfully");
      
    } catch (error) {
      console.error("❌ Logout failed", error);
      // Even if API fails, maintain logout state
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
