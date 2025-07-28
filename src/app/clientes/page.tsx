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
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Clientes</h1>
      <ListaUsuarios
        usuarios={usuarios}
        selecionarUsuario={selecionarUsuario}
        removerUsuario={removerUsuario}
      />
    </div>
  );
}
