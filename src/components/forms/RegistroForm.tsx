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
    } catch (err: any) {
      console.error('Erro ao registrar:', err.message);
      setErro(err.message || 'Erro ao registrar');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-900 p-8 w-full max-w-md rounded-xl"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-white">Cadastro</h2>

      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-zinc-300">
          Nome
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300 hover:border-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300 hover:border-blue-400"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
          Senha
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300 hover:border-blue-400"
          required
        />
      </div>

      {erro && <p className="text-red-500 text-sm mb-4">{erro}</p>}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Cadastrar
      </button>
    </form>
  );
}
