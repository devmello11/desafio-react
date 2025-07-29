'use client';

import { useEffect, useState } from 'react';
import ListaUsuarios from '@/pages/clients/ListaUsuarios';
import Pagina from '@/template/Pagina';
import Titulo from '@/template/Titulo';
import FormUsuario from '@/pages/clients/FormUsuario';



import { getClients, createClient, updateClient, deleteClient } from '@/services/clientService';

export default function ClientesPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [busca, setBusca] = useState("");
  const [pagina, setPagina] = useState(1);
  const USUARIOS_POR_PAGINA = 9;
  const [usuarioAtual, setUsuarioAtual] = useState<Partial<Usuario> | null>(null);
  const [exibindoFormulario, setExibindoFormulario] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalConfirm, setModalConfirm] = useState<{ open: boolean; usuario?: Usuario }>({ open: false });

  useEffect(() => {
    const carregarUsuarios = async () => {
      setLoading(true);
      try {
        const dados = await getClients();
        console.log('Resposta da API de clientes:', dados);
        // Tenta ambos formatos: array direto ou objeto com .clients
        if (Array.isArray(dados)) {
          setUsuarios(dados);
        } else if (Array.isArray(dados.clients)) {
          setUsuarios(dados.clients);
        } else {
          setUsuarios([]);
        }
      } catch (error) {
        console.error('Erro ao carregar usuários:', error);
      } finally {
        setLoading(false);
      }
    };
    carregarUsuarios();
  }, []);

  const selecionarUsuario = async (usuario: Usuario) => {
    setLoading(true);
    // Simula um pequeno delay para UX (pode ser removido se não quiser)
    await new Promise(res => setTimeout(res, 400));
    // Prioriza nome, mas se vier name da API, usa como fallback
    setUsuarioAtual({
      ...usuario,
      nome: usuario.nome ?? (usuario as any).name ?? '',
    });
    setExibindoFormulario(true);
    setLoading(false);
  };

  const salvarUsuario = async () => {
    if (usuarioAtual) {
      // Validação básica
      if (!usuarioAtual.nome || usuarioAtual.nome.trim() === "") {
        alert("O nome é obrigatório.");
        return;
      }
      if (!usuarioAtual.email || !usuarioAtual.email.includes("@")) {
        alert("E-mail inválido.");
        return;
      }
      // Verifica se o e-mail já existe (apenas para criação)
      if (!usuarioAtual.id) {
        const emailExistente = usuarios.some(u => (u.email ?? "").toLowerCase() === usuarioAtual.email!.toLowerCase());
        if (emailExistente) {
          alert("Já existe um usuário com este e-mail.");
          return;
        }
      }
      if (!usuarioAtual.phone || usuarioAtual.phone.length < 8) {
        alert("Telefone inválido.");
        return;
      }
      if (!usuarioAtual.company || usuarioAtual.company.trim() === "") {
        alert("Empresa é obrigatória.");
        return;
      }
      setLoading(true);
      try {
        if (usuarioAtual.id) {
          // Edição
          await updateClient(usuarioAtual.id, {
            name: usuarioAtual.nome || '',
            email: usuarioAtual.email || '',
            phone: usuarioAtual.phone || '',
            company: usuarioAtual.company || '',
          });
        } else {
          // Criação
          await createClient({
            name: usuarioAtual.nome || '',
            email: usuarioAtual.email || '',
            phone: usuarioAtual.phone || '',
            company: usuarioAtual.company || '',
          });
        }
        // Atualiza a lista após criar/editar
        const dados = await getClients();
        if (Array.isArray(dados)) {
          setUsuarios(dados);
        } else if (Array.isArray(dados.clients)) {
          setUsuarios(dados.clients);
        } else {
          setUsuarios([]);
        }
        setUsuarioAtual(null);
        setExibindoFormulario(false);
      } catch (error) {
        console.error('Erro ao salvar usuário:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const removerUsuario = (usuario: Usuario) => {
    setModalConfirm({ open: true, usuario });
  };

  const confirmarRemocao = async () => {
    if (!modalConfirm.usuario) return;
    setLoading(true);
    setModalConfirm({ open: false });
    try {
      await deleteClient(modalConfirm.usuario.id);
      setUsuarios(usuarios.filter(u => u.id !== modalConfirm.usuario!.id));
    } catch (error) {
      console.error('Erro ao remover usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  const cancelar = () => {
    setUsuarioAtual(null);
    setExibindoFormulario(false);
  };

  return (
    <Pagina>
      <div className="flex flex-col gap-5 pt-5 pb-20 relative">
        {/* Modal de confirmação de exclusão */}
        {modalConfirm.open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-zinc-900 rounded-lg shadow-lg p-8 max-w-sm w-full flex flex-col items-center">
              <svg className="h-12 w-12 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <div className="text-lg text-white font-semibold mb-2 text-center">
                Tem certeza que deseja excluir o cliente<br />
                <span className="text-red-400">{modalConfirm.usuario?.nome ?? (modalConfirm.usuario as any)?.name ?? modalConfirm.usuario?.email}</span>?
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
                  className="px-4 py-2 rounded bg-zinc-700 text-white hover:bg-zinc-600 transition"
                  onClick={() => setModalConfirm({ open: false })}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
        <Titulo principal="Clientes" />
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
            {!exibindoFormulario && (
              <>
                <button
                  className="botao green w-fit mb-2"
                  onClick={() => {
                    setUsuarioAtual({});
                    setExibindoFormulario(true);
                  }}
                >
                  Novo Usuário
                </button>
        {/* Busca */}
        <div className="flex justify-end mb-2">
          <input
            type="text"
            placeholder="Buscar por nome, e-mail ou empresa..."
            className="input w-full max-w-xs"
            value={busca}
            onChange={e => {
              setBusca(e.target.value);
              setPagina(1);
            }}
          />
        </div>
        <ListaUsuarios
          usuarios={usuarios
            .filter(u => {
              const termo = busca.toLowerCase();
              return (
                (u.nome?.toLowerCase().includes(termo) ||
                  (typeof (u as any).name === 'string' && (u as any).name.toLowerCase().includes(termo)) ||
                  u.email?.toLowerCase().includes(termo) ||
                  u.company?.toLowerCase().includes(termo))
              );
            })
            .slice((pagina - 1) * USUARIOS_POR_PAGINA, pagina * USUARIOS_POR_PAGINA)
          }
          selecionarUsuario={selecionarUsuario}
          removerUsuario={removerUsuario}
        />
        {/* Paginação */}
        <div className="flex justify-center mt-4 gap-2">
          <button
            className="px-3 py-1 rounded bg-zinc-700 text-white disabled:opacity-50"
            onClick={() => setPagina(p => Math.max(1, p - 1))}
            disabled={pagina === 1}
          >
            Anterior
          </button>
          <span className="px-2 text-zinc-300">Página {pagina} de {Math.max(1, Math.ceil(
            usuarios.filter(u => {
              const termo = busca.toLowerCase();
              return (
                (u.nome?.toLowerCase().includes(termo) ||
                  (typeof (u as any).name === 'string' && (u as any).name.toLowerCase().includes(termo)) ||
                  u.email?.toLowerCase().includes(termo) ||
                  u.company?.toLowerCase().includes(termo))
              );
            }).length / USUARIOS_POR_PAGINA))}</span>
          <button
            className="px-3 py-1 rounded bg-zinc-700 text-white disabled:opacity-50"
            onClick={() => setPagina(p => p + 1)}
            disabled={pagina >= Math.ceil(
              usuarios.filter(u => {
                const termo = busca.toLowerCase();
                return (
                  (u.nome?.toLowerCase().includes(termo) ||
                    (typeof (u as any).name === 'string' && (u as any).name.toLowerCase().includes(termo)) ||
                    u.email?.toLowerCase().includes(termo) ||
                    u.company?.toLowerCase().includes(termo))
                );
              }).length / USUARIOS_POR_PAGINA)
            }
          >
            Próxima
          </button>
        </div>
              </>
            )}
            {exibindoFormulario && (
              <FormUsuario
                usuario={usuarioAtual ?? {}}
                alterarUsuario={u => setUsuarioAtual(prev => ({ ...prev, ...u }))}
                salvar={salvarUsuario}
                cancelar={cancelar}
              />
            )}
          </>
        )}
      </div>
    </Pagina>
  );
}
