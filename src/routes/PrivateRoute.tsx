'use client';

import { useAuth } from '../modules/auth/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <div className="text-center mt-10">Carregando...</div>;
  }

  return <>{children}</>;
};

export default PrivateRoute;
