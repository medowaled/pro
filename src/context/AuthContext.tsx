'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

interface User {
  id: string;
  email: string;
  // Add other user fields here
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  checkUser: (forceCheck?: boolean) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

let userCache: User | null = null;
let cacheTimestamp = 0;
const USER_CACHE_DURATION = 60_000; // 1 minute

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const clearCache = () => {
    userCache = null;
    cacheTimestamp = 0;
  };

  const checkUser = useCallback(
    async (forceCheck = false) => {
      if (isLoggingOut) return;

      const now = Date.now();

      // Use cache if valid and not forcing a refresh
      if (
        !forceCheck &&
        userCache &&
        now - cacheTimestamp < USER_CACHE_DURATION
      ) {
        setUser(userCache);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const res = await fetch('/api/auth/me', { cache: 'no-store' });

        if (res.status === 401) {
          // Not logged in or token expired
          setUser(null);
          clearCache();
          return;
        }

        if (!res.ok) {
          console.error('Error fetching user:', await res.text());
          return;
        }

        const data = await res.json();
        userCache = data.user;
        cacheTimestamp = now;
        setUser(data.user);
      } catch (error) {
        console.error('Check user failed:', error);
        setUser(null);
        clearCache();
      } finally {
        setIsLoading(false);
      }
    },
    [isLoggingOut]
  );

  const logout = useCallback(async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    try {
      // Clear local state immediately so navbar updates
      setUser(null);
      clearCache();

      localStorage.removeItem('token'); // if you store token here
      sessionStorage.clear();

      const res = await fetch('/api/auth/logout', { method: 'POST' });

      if (!res.ok) {
        console.error('Logout failed:', await res.text());
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  }, [isLoggingOut]);

  useEffect(() => {
    checkUser(true); // Force check on mount
  }, [checkUser]);

  return (
    <AuthContext.Provider value={{ user, isLoading, checkUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
