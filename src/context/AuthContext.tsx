'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { login as loginService, register as registerService } from '../services/authService';
import { setToken, getToken, removeToken } from '../utils/tokenUtils';

import { RegisterFormData } from '../types';

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
      const response = await loginService(email, password);
      setToken(response.token);
      setTokenState(response.token);
      let userObj: AuthUser;
      if (response.user && typeof response.user === 'object' && response.user !== null) {
        const anyUser = response.user as any;
        userObj = {
          name: anyUser.name || anyUser.email || email.split('@')[0],
          email: anyUser.email || email
        };
      } else {
        userObj = {
          name: response.user || email.split('@')[0],
          email: email
        };
      }
      setUser(userObj);
      localStorage.setItem('auth_user', JSON.stringify(userObj));
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (
      token &&
      typeof window !== 'undefined' &&
      window.location.pathname !== '/clientes' &&
      window.location.pathname !== '/login' &&
      window.location.pathname !== '/register'
    ) {
      router.push('/clientes');
    }
  }, [token, router]);

  const register = async (data: RegisterFormData) => {
    try {
      await registerService(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message || 'Erro ao registrar usuário');
      } else {
        throw new Error('Erro ao registrar usuário');
      }
    }
  };

  const logout = () => {
    removeToken();
    setTokenState(null);
    setUser(null);
    localStorage.removeItem('auth_user');
    router.push('/login'); 
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return context;
};
