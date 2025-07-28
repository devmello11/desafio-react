"use Client"
import { useState } from "react"
import todosOsUsuarios from "../../data/constantes/usuarios";
import Usuario from "@/data/model/Usuarios";
import ListaUsuarios from "./ListaUsuarios";
import FormUsuario from "./FormUsuario";
import Id from "@/data/model/Id";


export default function CadastroUsuario() {
    const [usuarioAtual, setUsuarioAtual] = useState<Partial<Usuario> | null>(null);
    const [usuarios, setUsuarios] = useState<Usuario[]>(todosOsUsuarios);

    function selecionarUsuario(usuario: Partial<Usuario> = {}) {
        setUsuarioAtual(usuario);
    }

    function salvarUsuario(){
        const usuarioExistente = usuarios.find((u) => u.id === usuarioAtual?.id)
        if(usuarioExistente){
            const novosUsuarios = usuarios.map(u => {
                return u.id === usuarioAtual?.id ? usuarioAtual : u;
            });
            setUsuarios(novosUsuarios as Usuario[])
        }else{
            setUsuarios([...usuarios, usuarioAtual as Usuario])
        }
        setUsuarioAtual(null);
    }


    function removerUsuario(usuario: Usuario) {
        const todosMenosUsuarioInformado = usuarios.filter(u => u.id !== usuario.id);
        setUsuarios(todosMenosUsuarioInformado);

    }

    function cancelar() {
        setUsuarioAtual(null);
    }


    return (
        <div className="flex flex-col gap-5">
            <button className="botao green self-end"
                onClick={()=> selecionarUsuario({id: Id.novo()})}


            >New User</button>
            {usuarioAtual ?
                <FormUsuario 
                usuario={usuarioAtual} 
                cancelar={cancelar}
                alterarUsuario={setUsuarioAtual}
                salvar={salvarUsuario}
                
                
                /> :
                <ListaUsuarios usuarios={usuarios}
                    selecionarUsuario={selecionarUsuario}
                    removerUsuario={removerUsuario} />
            }

        </div>
    )
}
