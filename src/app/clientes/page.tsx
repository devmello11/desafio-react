'use client';

import { useEffect, useState } from 'react';
import ListaUsuarios from '@/pages/clients/ListaUsuarios';
import Usuario from '@/data/model/Usuarios';
import { getClients, deleteClient } from '@/services/clientService';

export default function ClientesPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    const carregarUsuarios = async () => {
      try {
        const dados = await getClients();
        setUsuarios(dados);
      } catch (error) {
        console.error('Erro ao carregar usuários:', error);
      }
    };

    carregarUsuarios();
  }, []);

  const selecionarUsuario = (usuario: Usuario) => {
    console.log('Selecionar para edição:', usuario);
   
  };

  const removerUsuario = async (usuario: Usuario) => {
    try {
      await deleteClient(usuario.id);
      setUsuarios(usuarios.filter(u => u.id !== usuario.id));
    } catch (error) {
      console.error('Erro ao remover usuário:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-gray-300 to-blue-600">
      <div className="bg-white bg-opacity-95 p-8 rounded-xl shadow-2xl w-full max-w-sm">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700">Clientes</h2>
        <ListaUsuarios
          usuarios={usuarios}
          selecionarUsuario={selecionarUsuario}
          removerUsuario={removerUsuario}
        />
      </div>
    </div>
  );
}
