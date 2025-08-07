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
const LOGOUT_COOLDOWN = 60 * 60 * 1000; // 1 hour cooldown

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const checkUser = useCallback(async () => {
    // Check if user just logged out (persistent across reloads)
    const storedLogoutTime = localStorage.getItem('logoutTimestamp');
    if (storedLogoutTime) {
      const logoutTime = parseInt(storedLogoutTime);
      const now = Date.now();
      if (now - logoutTime < LOGOUT_COOLDOWN) {
        console.log('🚫 User is in logout cooldown, skipping auth check');
        setUser(null);
        setIsLoading(false);
        return;
      } else {
        // Clear expired logout state
        localStorage.removeItem('logoutTimestamp');
        console.log('🔄 Logout cooldown expired, resetting state');
      }
    }

    // Don't check if user just logged out (in-memory)
    if (isLoggedOut) {
      const now = Date.now();
      if (now - logoutTimestamp < LOGOUT_COOLDOWN) {
        console.log('🚫 User is in logout cooldown, skipping auth check');
        setUser(null);
        setIsLoading(false);
        return;
      } else {
        // Reset logout state after cooldown
        console.log('🔄 Logout cooldown expired, resetting state');
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

  // Only check user on mount, not periodically
  useEffect(() => {
    checkUser();
  }, []); // Remove checkUser from dependencies to prevent re-runs

  const login = async (phone: string, password: string): Promise<User> => {
    try {
      // Reset logout state when logging in
      isLoggedOut = false;
      logoutTimestamp = 0;
      localStorage.removeItem('logoutTimestamp');

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
      
      // Set logout state immediately to prevent any further auth checks
      isLoggedOut = true;
      logoutTimestamp = Date.now();
      localStorage.setItem('logoutTimestamp', logoutTimestamp.toString());
      
      // Clear user state immediately
      setUser(null);
      
      // Clear all storage except logout timestamp
      sessionStorage.clear();
      // Don't clear localStorage completely, keep logout timestamp
      
      // Call logout API to clear server-side session
      const logoutResponse = await fetch('/api/auth/logout', { 
        method: 'POST',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
        },
        credentials: 'include',
      });
      
      if (logoutResponse.ok) {
        console.log("✅ Logout API called successfully");
        // The API now redirects to /login, so we don't need to handle redirect here
      } else {
        console.log("❌ Logout API failed");
      }
      
      console.log("✅ Logout completed successfully");
      
    } catch (error) {
      console.error("❌ Logout failed", error);
      // Even if API fails, maintain logout state
      isLoggedOut = true;
      logoutTimestamp = Date.now();
      localStorage.setItem('logoutTimestamp', logoutTimestamp.toString());
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
