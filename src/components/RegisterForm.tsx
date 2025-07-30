"use client";

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { RegisterFormData } from '@/types/index';
import { useAuth } from '../context/AuthContext';

export default function RegisterForm() {
  const { register } = useAuth();

  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: ''
  });

  const [erro, setErro] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    try {
      const { name, email, password } = formData;
      await register({ name, email, password });
      toast.success('Cadastro realizado com sucesso!', { duration: 2500, icon: '✅' });
      setTimeout(() => {
        localStorage.setItem('userData', JSON.stringify({ name, email, password }));
        window.location.href = '/login';
      }, 1200);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErro(err.message || 'Erro ao registrar');
        toast.error(err.message || 'Erro ao registrar', { duration: 4000, icon: '❌' });
      } else {
        setErro('Erro ao registrar');
        toast.error('Erro ao registrar', { duration: 4000, icon: '❌' });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white bg-opacity-95 p-8 rounded-xl shadow-2xl w-full max-w-sm"
    >
      <h2 className="text-3xl font-extrabold mb-6 text-center text-emerald-700">Cadastro</h2>

      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-emerald-700"></label>
        <input
          type="text"
          name="name"
          placeholder="Nome completo"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-emerald-300 text-emerald-700 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-emerald-400"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-emerald-700"></label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-emerald-300 text-emerald-700 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-emerald-400"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-emerald-700"></label>
        <input
          type="password"
          name="password"
          placeholder="Senha"
          id="password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-emerald-300 text-emerald-700 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-emerald-400"
          required
        />
      </div>

      {erro && <p className="text-red-500 text-sm mb-4">{erro}</p>}

      <button
        type="submit"
        className="w-full bg-emerald-700 text-white py-2 rounded-xl hover:bg-emerald-800 transition font-bold"
      >
        Cadastrar
      </button>
    </form>
  );
}
