import Usuario from "@/data/model/Usuarios";


export interface FormUsuarioProps {
    usuario: Partial<Usuario>;
    alterarUsuario: (Usuario:Partial<Usuario>)=> void;
    salvar:()=> void;
    cancelar:()=> void;
}

export default function FormUsuario(props: FormUsuarioProps) {
    const { usuario, alterarUsuario , salvar, cancelar } = props;
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <span>Nome</span>
                <input type="text" 
                value={usuario.nome ?? ""}
                onChange={(e) => alterarUsuario({ ...usuario, nome: e.target.value}) }
                className="input" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <span>E-mail</span>
                    <input type="text" value={usuario.email ?? ""} 
                    onChange={(e) => alterarUsuario({ ...usuario, email: e.target.value}) }
                    className="input" />
                </div>
                <div className="flex flex-col gap-1">
                    <span>Senha</span>
                    <input type="password" value={usuario.senha ?? ""} 
                    onChange={(e) => alterarUsuario({ ...usuario, senha: e.target.value}) }
                    className="input" />
                </div>
            </div>
            <div className="flex gap-2">
                <button className="botao azul" onClick={salvar}>Salvar</button>
                <button className="botao cinza" onClick={cancelar}>Cancelar</button>
            </div>
        </div>
    );
}