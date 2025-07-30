'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { login as loginService, register as registerService } from '../services/authService';
import { setToken, getToken, removeToken } from '@/modules/utils/tokenUtils';
import { RegisterFormData } from '../../types';

interface AuthUser {
  name: string;
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterFormData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = getToken();
    setTokenState(storedToken);
    const storedUser = localStorage.getItem('auth_user');
    if (storedToken && storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      window.dispatchEvent(new Event('show-loading-global'));
      const response = await loginService(email, password);
      setToken(response.token);
      setTokenState(response.token);
      let userObj: AuthUser;
      if (response.user && typeof response.user === 'object' && response.user !== null) {
        const userObjCast = response.user as Partial<AuthUser>;
        userObj = {
          name: userObjCast.name || userObjCast.email || email.split('@')[0],
          email: userObjCast.email || email
        };
      } else {
        userObj = {
          name: response.user || email.split('@')[0],
          email: email
        };
      }
      setUser(userObj);
      localStorage.setItem('auth_user', JSON.stringify(userObj));
      window.dispatchEvent(new Event('hide-loading-global'));
      router.push('/clients');
    } catch (error) {
      window.dispatchEvent(new Event('hide-loading-global'));
      throw error;
    }
  };

  const register = async (data: RegisterFormData) => {
    try {
      window.dispatchEvent(new Event('show-loading-global'));
      await registerService(data);
      window.dispatchEvent(new Event('hide-loading-global'));
      router.push('/login');
    } catch (error) {
      window.dispatchEvent(new Event('hide-loading-global'));
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setTokenState(null);
    removeToken();
    localStorage.removeItem('auth_user');
    router.push('/login');
  };

  const isAuthenticated = !!user && !!token;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = getToken();
    setTokenState(storedToken);
    const storedUser = typeof window !== 'undefined' ? localStorage.getItem('auth_user') : null;
    if (storedToken && storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAuthenticated, loading }}>
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
