'use client';

import { useState } from 'react';
import { RegisterFormData } from '@/types';
import { useAuth } from '@/context/AuthContext';

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
    console.log('Dados do formulário:', formData);
    setErro('');
    console.log('teste')

    try {
      const { name, email, password } = formData;
      await register({ name, email, password });
      localStorage.setItem('userData', JSON.stringify({ name, email, password }));
      window.location.href = '/login';
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Erro ao registrar:', err.message);
        setErro(err.message || 'Erro ao registrar');
      } else {
        setErro('Erro ao registrar');
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white bg-opacity-95 p-8 rounded-xl shadow-2xl w-full max-w-sm"
    >
      <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700">Cadastro</h2>

      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-blue-700">
          
        </label>
        <input
          type="text"
          name="name"
          placeholder="Nome"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-blue-300 text-blue-700 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-blue-400"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-blue-700">
          
        </label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-blue-300 text-blue-700 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-blue-400"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-blue-700">
          
        </label>
        <input
          type="password"
          name="password"
          placeholder="Senha"
          id="password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-blue-300 text-blue-700 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-blue-400"
          required
        />
      </div>

      {erro && <p className="text-red-500 text-sm mb-4">{erro}</p>}

      <button
        type="submit"
        className="w-full bg-blue-700 text-white py-2 rounded-xl hover:bg-blue-800 transition font-bold"
      >
        Cadastrar
      </button>
    </form>
  );
}
