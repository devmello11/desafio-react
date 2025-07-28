'use client';

import PrivateRoute from '@/routes/PrivateRoute';

export default function DashboardPage() {
  return (
    <PrivateRoute>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Conteúdo protegido</p>
      </div>
    </PrivateRoute>
  );
}
