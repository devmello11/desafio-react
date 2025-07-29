import Usuario from "@/data/model/Usuarios";



export interface FormUsuarioProps {
    usuario: Partial<Usuario>;
    alterarUsuario: (Usuario:Partial<Usuario>)=> void;
    salvar:()=> void;
    cancelar:()=> void;
}

import { useState } from "react";

// Função para formatar telefone (99) 99999-9999
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

    const handleSalvar = () => {
        if (!usuario.nome || usuario.nome.trim() === "") {
            setErroNome("O nome não pode estar vazio.");
            return;
        }
        setErroNome("");
        salvar();
    };

    console.log('FormUsuario - usuario recebido:', usuario);
    return (
        <div className="flex flex-col gap-4">
            <div className="text-lg font-bold text-zinc-200 mb-2">
                Novo Usuário
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <span>Nome</span>
                    <input
                        type="text"
                        value={usuario.nome !== undefined && usuario.nome !== null ? usuario.nome : ""}
                        onChange={(e) => alterarUsuario({ ...usuario, nome: e.target.value })}
                        className="input"
                    />
                    {erroNome && <span className="text-red-500 text-xs mt-1">{erroNome}</span>}
                </div>
                <div className="flex flex-col gap-1">
                    <span>E-mail</span>
                    <input
                        type="text"
                        value={usuario.email !== undefined ? usuario.email : ""}
                        onChange={(e) => alterarUsuario({ ...usuario, email: e.target.value })}
                        className="input"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(!usuario.id || usuario.senha) && (
                    <div className="flex flex-col gap-1">
                        <span>Senha</span>
                        <input
                            type="password"
                            value={usuario.senha !== undefined ? usuario.senha : ""}
                            onChange={(e) => alterarUsuario({ ...usuario, senha: e.target.value })}
                            className="input"
                        />
                    </div>
                )}
                <div className="flex flex-col gap-1">
                    <span>Telefone</span>
                    <input
                        type="text"
                        maxLength={15}
                        value={formatarTelefone(usuario.phone ?? "")}
                        onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "").slice(0, 11);
                            alterarUsuario({ ...usuario, phone: value });
                        }}
                        className="input"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <span>Empresa</span>
                <input
                    type="text"
                    value={usuario.company !== undefined ? usuario.company : ""}
                    onChange={(e) => alterarUsuario({ ...usuario, company: e.target.value })}
                    className="input"
                />
            </div>
            <div className="flex gap-2">
                <button className="botao azul" onClick={handleSalvar}>Salvar</button>
                <button className="botao cinza" onClick={cancelar}>Cancelar</button>
            </div>
        </div>
    );
}