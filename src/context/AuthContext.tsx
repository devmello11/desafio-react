'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { login as loginService, register as registerService } from '../services/authService';
import { setToken, getToken, removeToken } from '../utils/tokenUtils';

interface AuthContextType {
  user: string | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
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
    if (storedToken) {
      setTokenState(storedToken);
      setUser('Usuário autenticado'); 
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await loginService(email, password);
      setToken(response.token);
      setTokenState(response.token);
      setUser(response.user); 
      router.push('/');
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: any) => {
  try {
    await registerService(data);
    router.push('/Login');
  } catch (error: any) {
    throw new Error(error?.message || 'Erro ao registrar usuário');
  }
};

  const logout = () => {
    removeToken();
    setTokenState(null);
    setUser(null);
    router.push('/Login');
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
