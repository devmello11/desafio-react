import User from "@/models/User";
import { useState } from "react";
import { toast } from "react-hot-toast";

export interface FormUsuarioProps {
    usuario: Partial<User>;
    alterarUsuario: (usuario: Partial<User>) => void;
    salvar: () => void;
    cancelar: () => void;
}

function formatarTelefone(valor: string) {
    if (!valor) {
        return "";
    }
    const onlyNums = valor.replace(/\D/g, "");
    if (onlyNums.length <= 2) {
        return `(${onlyNums}`;
    }
    if (onlyNums.length <= 7) {
        return `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2)}`;
    }
    return `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2, 7)}-${onlyNums.slice(7, 11)}`;
}


export default function FormUsuario(props: FormUsuarioProps) {
    const { usuario, alterarUsuario, salvar, cancelar } = props;
    const [erroNome, setErroNome] = useState("");
    const [usuarioOriginal] = useState(usuario);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const isEdit = !!usuarioOriginal.id;
    const isAlterado =
        usuario.name !== usuarioOriginal.name ||
        usuario.email !== usuarioOriginal.email ||
        usuario.phone !== usuarioOriginal.phone ||
        usuario.company !== usuarioOriginal.company;

    const handleSalvar = () => {
        if (!usuario.name || usuario.name.trim() === "") {
            toast.error("O nome não pode estar vazio.");
            return;
        }
        if (isEdit) {
            setShowConfirmModal(true);
            return;
        }
        setErroNome("");
        salvar();
    };

    const confirmarEdicao = () => {
        setShowConfirmModal(false);
        setErroNome("");
        salvar();
    };

    const cancelarEdicao = () => {
        setShowConfirmModal(false);
    };

    return (
        <>
            {showConfirmModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                  <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-zinc-200 max-w-sm w-full animate-modal-fade-in">
                    <button
                      onClick={cancelarEdicao}
                      aria-label="Fechar modal"
                      className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-2xl font-bold cursor-pointer transition-colors duration-200"
                    >
                      ×
                    </button>
                    <div className="flex flex-col items-center">
                      <svg className="h-12 w-12 text-emerald-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="text-xl font-bold text-zinc-900 mb-2 text-center">
                        Tem certeza que deseja confirmar a edição deste cliente?
                      </div>
                      <div className="flex gap-4 mt-6">
                        <button
                          className="rounded-full bg-emerald-600 hover:bg-emerald-800 text-white px-6 py-2 font-bold transition-colors duration-200 min-w-[110px]"
                          onClick={confirmarEdicao}
                          autoFocus
                        >
                          Confirmar
                        </button>
                        <button
                          className="rounded-full bg-zinc-400 hover:bg-zinc-600 text-zinc-900 px-6 py-2 font-bold transition-colors duration-200 min-w-[110px]"
                          onClick={cancelarEdicao}
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
            )}
            <div className="flex flex-col gap-6 bg-white rounded-2xl shadow-2xl p-8 border border-zinc-100 max-w-2xl mx-auto animate-modal-fade-in">
                <div className="text-2xl font-bold text-zinc-900 mb-2">
                    {isEdit ? 'Editar Usuário' : 'Novo Usuário'}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1">
                        <span className="text-zinc-700 font-semibold mb-1">Nome completo</span>
                        <input
                            type="text"
                            value={usuario.name !== undefined && usuario.name !== null ? usuario.name : ""}
                            onChange={(e) => {
                                alterarUsuario({ ...usuario, name: e.target.value });
                                if (e.target.value && e.target.value.trim() !== "") setErroNome("");
                            }}
                            className="input bg-zinc-50 border-zinc-200 text-zinc-700 placeholder-zinc-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                            placeholder="Digite o nome completo"
                        />
                        {erroNome && <span className="text-red-500 text-xs mt-1">{erroNome}</span>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-zinc-700 font-semibold mb-1">E-mail</span>
                        <input
                            type="text"
                            value={usuario.email !== undefined ? usuario.email : ""}
                            onChange={(e) => alterarUsuario({ ...usuario, email: e.target.value })}
                            className="input bg-zinc-50 border-zinc-200 text-zinc-700 placeholder-zinc-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                            placeholder="Digite o e-mail"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(!usuario.id || usuario.senha) && (
                        <div className="flex flex-col gap-1">
                            <span className="text-zinc-700 font-semibold mb-1">Senha</span>
                            <input
                                type="password"
                                value={usuario.senha !== undefined ? usuario.senha : ""}
                                onChange={(e) => alterarUsuario({ ...usuario, senha: e.target.value })}
                                className="input bg-zinc-50 border-zinc-200 text-zinc-700 placeholder-zinc-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                                placeholder="Digite a senha"
                            />
                        </div>
                    )}
                    <div className="flex flex-col gap-1">
                        <span className="text-zinc-700 font-semibold mb-1">Telefone</span>
                        <input
                            type="text"
                            maxLength={15}
                            value={formatarTelefone(usuario.phone ?? "")}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "").slice(0, 11);
                                alterarUsuario({ ...usuario, phone: value });
                            }}
                            className="input bg-zinc-50 border-zinc-200 text-zinc-700 placeholder-zinc-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                            placeholder="Digite o telefone"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-zinc-700 font-semibold mb-1">Empresa</span>
                    <input
                        type="text"
                        value={usuario.company !== undefined ? usuario.company : ""}
                        onChange={(e) => alterarUsuario({ ...usuario, company: e.target.value })}
                        className="input bg-zinc-50 border-zinc-200 text-zinc-700 placeholder-zinc-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                        placeholder="Digite a empresa"
                    />
                </div>
                <div className="flex gap-4 mt-4 justify-end">
                    <button
                        className={`rounded-full bg-emerald-600 hover:bg-emerald-800 text-white px-8 py-3 font-bold text-lg shadow transition-colors duration-200${isEdit && !isAlterado ? ' opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handleSalvar}
                        disabled={isEdit && !isAlterado}
                    >
                        Salvar
                    </button>
                    <button className="rounded-full bg-zinc-400 hover:bg-zinc-600 text-zinc-900 px-8 py-3 font-bold text-lg shadow transition-colors duration-200" onClick={cancelar}>Cancelar</button>
                </div>
            </div>
        </>
    );
}
