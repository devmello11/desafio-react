"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';
import { RegisterFormData } from '@/types/index';
import { useAuth } from '../../modules/auth/AuthContext';

export default function RegisterForm() {
   useEffect(() => {
      window.dispatchEvent(new Event('show-loading-global'));
      const timeout = setTimeout(() => {
        window.dispatchEvent(new Event('hide-loading-global'));
      }, 600);
      return () => clearTimeout(timeout);
    }, []);
  
  const { register } = useAuth();
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: ''
  });
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setLoading(true);
    try {
      const { name, email, password } = formData;
      await register({ name, email, password });
      toast.success('Cadastro realizado com sucesso!', { duration: 2500, icon: '✅' });
      setTimeout(() => {
        localStorage.setItem('userData', JSON.stringify({ name, email, password }));
        router.push('/clientes');
      }, 1200);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErro(err.message || 'Erro ao registrar');
        toast.error(err.message || 'Erro ao registrar', { duration: 4000, icon: '❌' });
      } else {
        setErro('Erro ao registrar');
        toast.error('Erro ao registrar', { duration: 4000, icon: '❌' });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600"></div>
          </div>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-md p-5 sm:p-10 rounded-xl shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg border border-indigo-100"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-700">Cadastro</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-indigo-700"></label>
          <input
            type="text"
            name="name"
            placeholder="Nome completo"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-indigo-300 text-indigo-700 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-indigo-400"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-indigo-700"></label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-indigo-300 text-indigo-700 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-indigo-400"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-indigo-700"></label>
          <input
            type="password"
            name="password"
            placeholder="Senha"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-indigo-300 text-indigo-700 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-indigo-400"
            required
          />
        </div>
        {erro && <p className="text-red-500 text-sm mb-4">{erro}</p>}
        <button
          type="submit"
          className="w-full bg-indigo-700 text-white py-2 rounded-xl hover:bg-indigo-800 transition font-bold"
        >
          Cadastrar
        </button>
      </form>
    </>
  );
}
