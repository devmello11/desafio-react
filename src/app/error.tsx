"use client";

export default function GlobalError({ error }: { error: Error }) {
  return (
    <html>
      <body className="flex flex-col items-center justify-center min-h-screen bg-red-50">
        <h2 className="text-2xl font-bold text-red-700 mb-4">Ocorreu um erro inesperado</h2>
        <pre className="bg-red-100 p-4 rounded text-red-800 max-w-xl overflow-auto">{error.message}</pre>
        <button onClick={() => window.location.reload()} className="mt-6 px-4 py-2 bg-red-600 text-white rounded">Recarregar página</button>
      </body>
    </html>
  );
}
