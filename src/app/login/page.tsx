"use client";
import Link from "next/link";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

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
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Erro ao fazer login");
      } else {
        setError("Erro ao fazer login");
      }
    }
  };

  return (
    <div className="flex text-blue-600 flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-gray-300 to-blue-600">
      <form onSubmit={handleSubmit} className="bg-white bg-opacity-95 p-8 rounded-xl shadow-2xl w-full max-w-sm">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700">Login</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border text-blue-70 border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-blue-400"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-2 mb-6 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-blue-400"
          required
        />
        <button type="submit" className="w-full bg-blue-700  text-white py-2 rounded-xl hover:bg-blue-800 transition font-bold">Entrar</button>
        

        <p className="mt-4 text-center text-sm text-blue-700">
          Não tem uma conta?{" "}
          <Link href="/register" className="font-semibold underline hover:text-blue-900">
            Cadastre-se
          </Link>
        </p>



      </form>
    </div>
  );
}
