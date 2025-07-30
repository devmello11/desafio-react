"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      toast.success('Login realizado com sucesso!', { duration: 2000 });
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1200);
    } catch (err: unknown) {
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
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-gray-300 to-blue-600 px-2 sm:px-4">
    <form
      onSubmit={handleSubmit}
      className="bg-white bg-opacity-95 p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
    >
      <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-center text-blue-700">Login</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full p-2 sm:p-3 mb-4 border text-blue-700 border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-blue-400 text-base sm:text-lg"
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full p-2 sm:p-3 mb-6 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-blue-400 text-base sm:text-lg"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-700 text-white py-2 sm:py-3 rounded-xl hover:bg-blue-800 transition font-bold text-base sm:text-lg"
      >
        Entrar
      </button>
      <p className="mt-4 text-center text-sm sm:text-base text-blue-700">
        Não tem uma conta?{' '}
        <Link href="/register" className="font-semibold underline hover:text-blue-900">
          Cadastre-se
        </Link>
      </p>
    </form>
  </div>
);
}
