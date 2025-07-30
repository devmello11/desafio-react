'use client';

import { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import Pagina from '@/template/Pagina';
import { useAuth } from '@/context/AuthContext';
import Titulo from '@/template/Titulo';
import Usuario from '@/data/model/Usuarios';
import { getClients, deleteClient } from '@/services/clientService';


export default function ClientesPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalConfirm, setModalConfirm] = useState<{ open: boolean; usuario?: Usuario }>({ open: false });
  const { user } = useAuth();

  useEffect(() => {
    const carregarUsuarios = async () => {
      setLoading(true);
      try {
        const dados = await getClients();
        if (Array.isArray(dados)) {
          setUsuarios(dados);
        } else if (Array.isArray(dados.clients)) {
          setUsuarios(dados.clients);
        } else {
          setUsuarios([]);
        }
      } catch (error) {
        console.error('Erro ao carregar usuários:', error);
        if (error instanceof Error) {
          toast.error(error.message || 'Erro ao carregar usuários');
        } else {
          toast.error('Erro ao carregar usuários');
        }
      } finally {
        setLoading(false);
      }
    };
    carregarUsuarios();
  }, []);

 
  const confirmarRemocao = async () => {
    if (!modalConfirm.usuario) return;
    setLoading(true);
    setModalConfirm({ open: false });
    try {
      await deleteClient(modalConfirm.usuario.id);
      setUsuarios(usuarios.filter(u => u.id !== modalConfirm.usuario!.id));
    } catch (error) {
      console.error('Erro ao remover usuário:', error);
      if (error instanceof Error) {
        toast.error(error.message || 'Erro ao remover usuário');
      } else {
        toast.error('Erro ao remover usuário');
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <Toaster position="top-right" />
      <Pagina>
      <div className="flex flex-col gap-0 pt-0 pb-0 relative min-h-screen bg-gradient-to-br from-emerald-50 via-emerald-200 to-emerald-700">
       
        {modalConfirm.open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-zinc-800 rounded-lg shadow-lg p-8 max-w-sm w-full flex flex-col items-center">
              <svg className="h-12 w-12 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <div className="text-lg text-zinc-100 font-semibold mb-2 text-center">
                Tem certeza que deseja excluir o cliente ? A acão não poderá ser desfeita<br />
                <span className="text-red-400">{modalConfirm.usuario?.name ?? modalConfirm.usuario?.email}</span>?
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  className="px-4 py-2 rounded bg-red-600 text-white font-bold hover:bg-red-700 transition"
                  onClick={confirmarRemocao}
                  autoFocus
                >
                  Excluir
                </button>
                <button
                  className="px-4 py-2 rounded bg-zinc-600 text-zinc-100 hover:bg-zinc-500 transition"
                  onClick={() => setModalConfirm({ open: false })}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
       
        <div className="w-full flex flex-col items-center justify-center p-0 m-0" style={{ minHeight: 0, marginBottom: 0 }}>
          <Titulo principal="Clientes" />
          <div className="flex flex-col items-center mt-2 mb-4">
            <span className="text-base font-semibold text-zinc-800">{typeof user === 'object' && user !== null && 'name' in user ? user.name : (typeof user === 'string' ? user : 'Usuário não identificado')}</span>
            <span className="text-sm text-zinc-500">{typeof user === 'object' && user !== null && 'email' in user ? user.email : ''}</span>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <svg className="animate-spin h-8 w-8 text-blue-500 mr-3" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            <span className="text-lg text-zinc-400 ml-2">Carregando...</span>
          </div>
        ) : (
          <>
            
          </>
        )}
      </div>
      </Pagina>
    </>
  );
}
