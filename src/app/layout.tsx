
import '../styles/globals.css';
import React, { ReactNode } from 'react';
import GlobalLoading from '../components/common/GlobalLoading';
import { AuthProvider } from '../modules/auth/AuthContext';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AuthProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              style: { background: '#fff', color: '#1e3a8a', fontWeight: 600 },
              className: 'shadow-lg border-l-4 border-blue-600',
            }}
            gutter={8}
            containerStyle={{ top: 16, right: 16 }}
          />
          <GlobalLoading />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

