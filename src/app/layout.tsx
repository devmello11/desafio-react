import '../styles/globals.css';
import { ReactNode } from 'react';
import { AuthProvider } from '../context/AuthContext';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
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
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
