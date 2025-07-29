'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { login as loginService, register as registerService } from '../services/authService';
import { setToken, getToken, removeToken } from '../utils/tokenUtils';

import { RegisterFormData } from '../types';

interface AuthContextType {
  user: string | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterFormData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = getToken();
    setTokenState(storedToken);
    setUser(storedToken ? 'Usuário autenticado' : null);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log('Tentando login com:', email, password);
      const response = await loginService(email, password);
      console.log('Resposta da API de login:', response);
      setToken(response.token);
      setTokenState(response.token);
      setUser(response.user);
      router.push('/clientes'); // Redireciona para a página de clientes após login
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      if (error instanceof Error) {
        alert(error.message || 'Erro ao fazer login');
      }
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
      router.push('/login'); // Redireciona para login após registro
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
    router.push('/login'); // Redireciona para login após logout
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
