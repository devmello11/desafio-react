import '../styles/globals.css';
import { ReactNode } from 'react';
import { AuthProvider } from '../context/AuthContext';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
