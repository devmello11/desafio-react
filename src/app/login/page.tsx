
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../modules/auth/AuthContext";
import { toast } from "react-hot-toast";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    window.dispatchEvent(new Event('show-loading-global'));
    const timeout = setTimeout(() => {
      window.dispatchEvent(new Event('hide-loading-global'));
    }, 600);
    return () => clearTimeout(timeout);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      window.dispatchEvent(new Event('show-loading-global'));
      await login(email, password);
      toast.success('Login realizado com sucesso!', { duration: 2000 });
      router.push('/clientes');
    } catch (err: unknown) {
      window.dispatchEvent(new Event('hide-loading-global'));
      if (err instanceof Error) {
        setError(err.message || "E-mail ou senha incorretos");
        toast.error(err.message || 'E-mail ou senha incorretos', { duration: 4000 });
      } else {
        setError("E-mail ou senha incorretos");
        toast.error('E-mail ou senha incorretos', { duration: 4000 });
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-gray-300 to-indigo-600 px-2 sm:px-4 font-['Roboto_Condensed','Arial','Helvetica','sans-serif']">
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-md p-5 sm:p-10 rounded-xl shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg border border-indigo-100"
      >
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-center text-indigo-700">Login</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border  border-indigo-300 text-indigo-700 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-indigo-400"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-indigo-300 text-indigo-700 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-indigo-400"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-700 text-white py-2 sm:py-3 rounded-xl hover:bg-indigo-800 transition font-bold text-base sm:text-lg mt-6"
        >
          Entrar
        </button>
        <p className="mt-4 text-center text-sm sm:text-base text-indigo-700">
          Não tem uma conta?{' '}
          <Link href="/register" className="font-semibold underline hover:text-indigo-900">
            Cadastre-se
          </Link>
        </p>
      </form>
    </div>
  );
}
