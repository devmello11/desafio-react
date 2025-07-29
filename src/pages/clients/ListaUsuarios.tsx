"use client";
import Usuario from "@/data/model/Usuarios";
import { IconEditCircle, IconTrash } from "@tabler/icons-react";
import { getClients, deleteClient } from "@/services/clientService";

export interface ListaUsuariosProps {
  usuarios: Usuario[];
  selecionarUsuario: (usuario: Usuario) => void;
  removerUsuario: (usuario: Usuario) => void;
}

export default function ListaUsuarios(props: ListaUsuariosProps) {
  function renderizarUsuario(usuario: Usuario) {
    return (
      <div className="flex items-center h-16 px-6 py-3 rounded-md bg-zinc-900 hover:bg-black ">
        <div className="flex-1 flex flex-col">
            <span className="font-semibold">{usuario.nome ?? (usuario as any).name}</span>
            <span className="text-sm text-zinc-400">{usuario.email}</span>
            
            
        </div>
        
        <div className="flex gap-2 p-1">
          <button className="botao azul p-1.5 cursor-pointer"
          onClick={()=> props.selecionarUsuario(usuario)}
          >
            
            
            <IconEditCircle />
          </button>
          <button className="botao vermelho p-1.5 cursor-pointer"
          onClick={()=> props.removerUsuario(usuario)}
                    >
            
            <IconTrash />
          </button>
        </div>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {props.usuarios.map((usuario) => (
        <li key={usuario.id}>{renderizarUsuario(usuario)}</li>
      ))}
    </ul>
  );
}
