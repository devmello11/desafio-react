"use client";


import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
import Pagina from '../../template/Pagina';
import ListaUsuarios from '../../components/ListaUsuarios';
import FormUsuario from '../../components/FormUsuario';
import User from '../../models/User';
import { getClients, createClient, updateClient, deleteClient } from '../../services/clients';
import { useSearchParams } from 'next/navigation';

export default function ClientesPage() {
  const [loadingGlobal, setLoadingGlobal] = useState<string | null>(null); 
  useEffect(() => {
    const handleShowLoadingLista = () => {
      setLoadingGlobal('lista');
      setTimeout(() => setLoadingGlobal(null), 900);
    };
    const handleShowLoadingCadastro = () => {
      setLoadingGlobal('cadastro');
      setTimeout(() => setLoadingGlobal(null), 900);
    };
    window.addEventListener('show-loading-lista', handleShowLoadingLista);
    window.addEventListener('show-loading-cadastro', handleShowLoadingCadastro);
    return () => {
      window.removeEventListener('show-loading-lista', handleShowLoadingLista);
      window.removeEventListener('show-loading-cadastro', handleShowLoadingCadastro);
    };
  }, []);
  const [modalBuscaEditar, setModalBuscaEditar] = useState(false);
  const [modalBuscaExcluir, setModalBuscaExcluir] = useState(false);
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [busca, setBusca] = useState("");
  const [pagina, setPagina] = useState(1);
  const USUARIOS_POR_PAGINA = 6;
  const [usuarioAtual, setUsuarioAtual] = useState<Partial<User> | null>(null);
  const [exibindoFormulario, setExibindoFormulario] = useState(false);
  const [modalConfirm, setModalConfirm] = useState<{ open: boolean; usuario?: User }>({ open: false });
  const searchParams = useSearchParams();
  const lastIdRef = useRef<string | null>(null);
  const lastDeletarRef = useRef<string | null>(null);

  
  useEffect(() => {
    if ((modalBuscaEditar || modalBuscaExcluir) && exibindoFormulario) {
      setExibindoFormulario(false);
      setUsuarioAtual(null);
    }
  }, [modalBuscaEditar, modalBuscaExcluir, exibindoFormulario]);
 
  useEffect(() => {
    const abrirEditar = () => {
      setExibindoFormulario(false); 
      setModalBuscaEditar(true);
    };
    const abrirExcluir = () => {
      setExibindoFormulario(false); 
      setModalBuscaExcluir(true);
    };
    window.addEventListener('abrir-modal-editar-cliente', abrirEditar);
    window.addEventListener('abrir-modal-excluir-cliente', abrirExcluir);
    return () => {
      window.removeEventListener('abrir-modal-editar-cliente', abrirEditar);
      window.removeEventListener('abrir-modal-excluir-cliente', abrirExcluir);
    };
  }, []);

  
  useEffect(() => {
    const handler = () => {
      setUsuarioAtual({});
      setExibindoFormulario(true);
    };
    window.addEventListener('abrir-cadastro-cliente', handler);
    return () => {
      window.removeEventListener('abrir-cadastro-cliente', handler);
    };
  }, []);

  
  useEffect(() => {
    const fecharForm = () => {
      setExibindoFormulario(false);
      setUsuarioAtual(null);
    };
    window.addEventListener('fechar-formulario-cliente', fecharForm);
    return () => {
      window.removeEventListener('fechar-formulario-cliente', fecharForm);
    };
  }, []);

  useEffect(() => {
    if (!searchParams) return;
    const idParam = searchParams.get('id');
    const deletar = searchParams.get('deletar');
    const novo = searchParams.get('novo');
    if (novo === '1') {
      setUsuarioAtual({});
      setExibindoFormulario(true);
      lastIdRef.current = null;
      lastDeletarRef.current = null;
      return;
    }
    if (idParam) {
      if (idParam === lastIdRef.current && deletar === lastDeletarRef.current) return;
      lastIdRef.current = idParam;
      lastDeletarRef.current = deletar;
      const usuario = usuarios.find(u => String(u.id) === String(idParam));
      const handleUsuario = (user: User | undefined) => {
        if (deletar === '1') {
          if (user) {
            setUsuarioAtual(user);
            setModalConfirm({ open: true, usuario: user });
          } else {
            setModalConfirm({ open: false, usuario: undefined });
            setUsuarioAtual(null);
            setExibindoFormulario(false);
            setTimeout(() => toast.error('Cliente não encontrado.'), 10);
          }
        } else {
          if (user) {
            setUsuarioAtual(user);
            setExibindoFormulario(true);
          } else {
            setExibindoFormulario(true);
          }
        }
      };
      if (usuario) {
        handleUsuario(usuario);
      } else {
        (async () => {
          try {
            const dados = await getClients();
            const lista = Array.isArray(dados) ? dados : dados.clients || [];
            const user = lista.find((u: User) => String(u.id) === String(idParam));
            setUsuarios(lista);
            handleUsuario(user);
          } catch {
            setModalConfirm({ open: false, usuario: undefined });
            setExibindoFormulario(false);
            setUsuarioAtual(null);
            setTimeout(() => toast.error('Erro ao buscar cliente na API.'), 10);
          }
        })();
      }
      return;
    }
    setExibindoFormulario(false);
    setUsuarioAtual(null);
    lastIdRef.current = null;
    lastDeletarRef.current = null;
  }, [searchParams, usuarios]);

  useEffect(() => {
    const carregarUsuarios = async () => {
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
        if (error instanceof Error) {
          toast.error(error.message || 'Erro ao carregar usuários');
        } else {
          toast.error('Erro ao carregar usuários');
        }
      }
    };
    carregarUsuarios();
  }, []);

  const selecionarUsuario = async (usuario: User) => {
    setUsuarioAtual({ ...usuario, name: usuario.name ?? '' });
    setExibindoFormulario(true);
  };

  const salvarUsuario = async () => {
    if (!usuarioAtual) return;
    if (!usuarioAtual.name || usuarioAtual.name.trim() === '') {
      toast.error('O nome (name) é obrigatório.');
      return;
    }
    if (!usuarioAtual.email || !usuarioAtual.email.includes('@')) {
      toast.error('E-mail inválido.');
      return;
    }
    if (!usuarioAtual.phone || usuarioAtual.phone.length < 8) {
      toast.error('Telefone inválido.');
      return;
    }
    if (!usuarioAtual.id) {
      const emailExistente = usuarios.some(u => (u.email ?? '').toLowerCase() === usuarioAtual.email!.toLowerCase());
      if (emailExistente) {
        toast.error('Já existe um usuário com este e-mail.');
        return;
      }
    }
    if (!usuarioAtual.company || usuarioAtual.company.trim() === '') {
      toast.error('Empresa é obrigatória.');
      return;
    }
    try {
      if (usuarioAtual.id) {
        await updateClient(usuarioAtual.id, {
          name: usuarioAtual.name || '',
          email: usuarioAtual.email || '',
          phone: usuarioAtual.phone || '',
          company: usuarioAtual.company || '',
        });
        toast.success('Usuário atualizado com sucesso!', { duration: 2200, icon: '✅' });
      } else {
        await createClient({
          name: usuarioAtual.name || '',
          email: usuarioAtual.email || '',
          phone: usuarioAtual.phone || '',
          company: usuarioAtual.company || '',
        });
        toast.success('Cliente criado com sucesso!', { duration: 2200, icon: '✅' });
      }
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
      if (error instanceof Error) {
        toast.error(error.message || 'Erro ao salvar usuário');
      } else {
        toast.error('Erro ao salvar usuário');
      }
    }
  };

  const removerUsuario = (usuario: User) => {
    setModalConfirm({ open: true, usuario });
  };

  const confirmarRemocao = async () => {
    if (!modalConfirm.usuario) return;
    setModalConfirm({ open: false });
    try {
      await deleteClient(modalConfirm.usuario.id);
      setUsuarios(usuarios.filter(u => u.id !== modalConfirm.usuario!.id));
      toast.success('Usuário removido com sucesso!', { duration: 2200, icon: '✅' });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || 'Erro ao remover usuário');
      } else {
        toast.error('Erro ao remover usuário');
      }
    }
  };

  const cancelar = () => {
    setUsuarioAtual(null);
    setExibindoFormulario(false);
  };

  
  const usuariosFiltrados = usuarios.filter(u => {
    const termo = busca.toLowerCase();
    return (
      (u.name?.toLowerCase().includes(termo) ||
        u.email?.toLowerCase().includes(termo) ||
        u.company?.toLowerCase().includes(termo))
    );
  });
  return (
    <>
     
      {loadingGlobal && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black bg-opacity-40">
          <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-emerald-600 mb-6"></div>
          <span className="text-2xl font-bold text-emerald-700 drop-shadow-lg">
            {loadingGlobal === 'lista' ? 'Carregando lista...' : 'Abrindo cadastro...'}
          </span>
        </div>
      )}
      <Pagina>
        {({ menuAberto }) => {
          return (
            <>
              <div className={menuAberto ? 'hidden md:block' : ''}>
              <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur shadow-[0_2px_16px_0_rgba(24,28,42,0.06)] border-b border-gray-200 flex flex-col md:flex-row items-center justify-between px-4 md:px-10 py-4 md:py-6 mb-8 gap-4">
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-2xl xs:text-3xl md:text-4xl font-extrabold text-emerald-700 tracking-tight leading-tight drop-shadow-sm break-words">
                    Clientes
                  </h1>
                </div>
                <div className="w-full md:w-auto flex justify-center md:justify-end mt-3 md:mt-0">
                  <input
                    type="text"
                    placeholder="Buscar "
                    className="input font-bold w-full max-w-[90vw] sm:max-w-xs bg-gray-50 border-gray-200 text-emerald-900 placeholder-emerald-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 rounded-full px-4 sm:px-5 py-2 shadow-sm transition-all duration-200 text-base sm:text-lg"
                    value={busca}
                    onChange={e => {
                      setBusca(e.target.value);
                      setPagina(1);
                    }}
                  />
                </div>
              </header>
            </div>
            <div className="flex flex-col gap-6 pt-8 pb-20 min-h-screen w-full bg-zinc-50 px-2 md:px-8">
              
              {modalConfirm.open && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                  <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-zinc-200 max-w-sm w-full animate-modal-fade-in">
                    <button
                      onClick={() => setModalConfirm({ open: false })}
                      aria-label="Fechar modal"
                      className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-2xl font-bold cursor-pointer transition-colors duration-200"
                    >
                      ×
                    </button>
                    <div className="flex flex-col items-center">
                      <svg className="h-12 w-12 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="text-xl font-bold text-zinc-900 mb-2 text-center">
                        Tem certeza que deseja excluir o cliente?
                        <span className="text-red-600 font-semibold">{modalConfirm.usuario?.name ?? modalConfirm.usuario?.email}</span>
                      </div>
                      <div className="text-zinc-500 mb-6 text-center">
                        A ação não poderá ser desfeita.<br />
                      </div>
                      <div className="flex gap-4 mt-2">
                        <button
                          className="rounded-full bg-red-600 hover:bg-red-800 text-white px-6 py-2 font-bold transition-colors duration-200 min-w-[110px]"
                          onClick={confirmarRemocao}
                          autoFocus
                        >
                          Excluir
                        </button>
                        <button
                          className="rounded-full bg-zinc-400 hover:bg-zinc-600 text-zinc-900 px-6 py-2 font-bold transition-colors duration-200 min-w-[110px]"
                          onClick={() => setModalConfirm({ open: false })}
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
             
              {!exibindoFormulario && (
                <button
                  className="rounded-full bg-emerald-600 hover:bg-emerald-800 text-white px-6 sm:px-8 py-2.5 sm:py-3 font-bold text-base sm:text-lg shadow w-full sm:w-fit self-end mb-2 transition-colors duration-200"
                  onClick={() => {
                    setModalBuscaEditar(false);
                    setModalBuscaExcluir(false);
                    setUsuarioAtual({});
                    setExibindoFormulario(true);
                  }}
                >
                  Novo Usuário
                </button>
              )}
              
              
              {modalBuscaEditar && !exibindoFormulario && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                  <div className="bg-white rounded-2xl shadow-2xl px-4 py-6 border border-zinc-200 w-full max-w-md animate-modal-fade-in relative">
                    <button onClick={() => setModalBuscaEditar(false)} className="text-2xl text-red-500 font-bold absolute top-4 right-6 z-10" aria-label="Fechar modal">×</button>
                    <ListaUsuarios
                      usuarios={usuarios}
                      selecionarUsuario={(u) => {
                        setModalBuscaEditar(false);
                        setTimeout(() => {
                          
                          if (!modalBuscaEditar && !modalBuscaExcluir) {
                            setUsuarioAtual(u);
                            setExibindoFormulario(true);
                          }
                        }, 200);
                      }}
                      removerUsuario={() => {}}
                    />
                  </div>
                </div>
              )}
              {modalBuscaExcluir && !exibindoFormulario && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                  <div className="bg-white rounded-2xl shadow-2xl px-4 py-6 border border-zinc-200 w-full max-w-md animate-modal-fade-in relative">
                    <button onClick={() => setModalBuscaExcluir(false)} className="text-2xl text-red-500 font-bold absolute top-4 right-6 z-10" aria-label="Fechar modal">×</button>
                    <ListaUsuarios
                      usuarios={usuarios}
                      selecionarUsuario={() => {}}
                      removerUsuario={(u) => {
                        setModalBuscaExcluir(false);
                        setTimeout(() => {
                          if (!modalBuscaEditar && !modalBuscaExcluir) {
                            setModalConfirm({ open: true, usuario: u });
                          }
                        }, 200);
                      }}
                    />
                  </div>
                </div>
              )}
              
              
              {!exibindoFormulario && !modalBuscaEditar && !modalBuscaExcluir && (
                <div className="w-full overflow-x-auto">
                  <ListaUsuarios
                    usuarios={usuariosFiltrados.slice((pagina - 1) * USUARIOS_POR_PAGINA, pagina * USUARIOS_POR_PAGINA)}
                    selecionarUsuario={selecionarUsuario}
                    removerUsuario={removerUsuario}
                  />
                </div>
              )}
             
              {!exibindoFormulario && (
                <div className="flex justify-center mt-4 gap-2 w-full overflow-x-auto">
                  <div className="flex flex-col xs:flex-row items-center gap-2 w-full max-w-md">
                    <button
                      className="rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-4 py-2 font-bold disabled:opacity-50 transition-colors duration-200 w-full xs:w-auto text-base xs:text-sm"
                      onClick={() => setPagina(p => Math.max(1, p - 1))}
                      disabled={pagina === 1}
                    >
                      Anterior
                    </button>
                    <span className="px-2 text-emerald-900 font-semibold text-center min-w-[110px] text-base xs:text-sm w-full xs:w-auto">
                      Página {pagina} de {Math.max(1, Math.ceil(
                        usuariosFiltrados.length / USUARIOS_POR_PAGINA))}
                    </span>
                    <button
                      className="rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-4 py-2 font-bold disabled:opacity-50 transition-colors duration-200 w-full xs:w-auto text-base xs:text-sm"
                      onClick={() => setPagina(p => p + 1)}
                      disabled={pagina >= Math.ceil(
                        usuariosFiltrados.length / USUARIOS_POR_PAGINA)
                      }
                    >
                      Próxima
                    </button>
                  </div>
                </div>
              )}
              
              {exibindoFormulario && (
                (usuarioAtual && usuarioAtual.id && !usuarioAtual.name) ? (
                  <div className="flex flex-col items-center justify-center min-h-[300px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4"></div>
                    <span className="text-emerald-700 font-semibold">Carregando dados do cliente...</span>
                  </div>
                ) : (
                  <FormUsuario
                    usuario={usuarioAtual ?? {}}
                    alterarUsuario={(u: Partial<User>) => setUsuarioAtual((prev: Partial<User> | null) => ({ ...prev, ...u }))}
                    salvar={salvarUsuario}
                    cancelar={cancelar}
                  />
                )
              )}
            </div>
          </>
          );
        }}
      </Pagina>
      
    </>
  );
}


