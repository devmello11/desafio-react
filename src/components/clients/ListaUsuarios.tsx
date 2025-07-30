"use client";
import User from "@/models/User";
import { IconEditCircle, IconTrash } from "@tabler/icons-react";

export interface ListaUsuariosProps {
  usuarios: User[];
  selecionarUsuario: (usuario: User) => void;
  removerUsuario: (usuario: User) => void;
}

export default function ListaUsuarios(props: ListaUsuariosProps) {
  function formatarNome(name: string) {
    if (!name) return '';
    if (name.length <= 40) return name;
    const partes = name.trim().split(/\s+/);
    if (partes.length === 1) return partes[0];
    const primeiro = partes[0];
    const sobrenome = partes.length > 1 ? partes[partes.length - 1] : '';
    const meios = partes.slice(1, -1).map((n) => n.length > 0 ? n[0].toUpperCase() : '').filter(Boolean).join(' ');
    return meios ? `${primeiro} ${meios} ${sobrenome}`.trim() : `${primeiro} ${sobrenome}`.trim();
  }

  return (
    <div className="w-full">
      <div className="hidden md:block">
        <table className="w-full text-left border-separate border-spacing-y-3">
          <thead>
            <tr>
              <th className="px-6 py-2 text-xs font-bold uppercase tracking-wide text-indigo-700">Nome</th>
              <th className="px-6 py-2 text-xs font-bold uppercase tracking-wide text-indigo-700">E-mail</th>
              <th className="px-6 py-2 text-xs font-bold uppercase tracking-wide text-indigo-700">Telefone</th>
              <th className="px-6 py-2 text-xs font-bold uppercase tracking-wide text-indigo-700">Empresa</th>
              <th className="px-6 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {props.usuarios.map((usuario) => (
              <tr key={usuario.id} className="bg-white rounded-2xl shadow-lg border border-zinc-100 align-middle">
                <td className="px-6 py-3 max-w-[180px] truncate font-semibold text-zinc-900 text-base">{formatarNome(usuario.name)}</td>
                <td className="px-6 py-3 max-w-[200px] truncate text-zinc-900">{usuario.email}</td>
                <td className="px-6 py-3 max-w-[140px] truncate text-zinc-900">{usuario.phone}</td>
                <td className="px-6 py-3 max-w-[140px] truncate text-zinc-900">{usuario.company}</td>
                <td className="px-6 py-3">
                  <div className="flex gap-2 justify-end">
                    <button
                      className="rounded-full bg-indigo-600 hover:bg-indigo-800 text-white px-5 py-2 font-bold transition-colors duration-200 shadow-sm"
                      onClick={() => props.selecionarUsuario(usuario)}
                    >
                      <IconEditCircle className="w-5 h-5 inline" /> Editar
                    </button>
                    <button
                      className="rounded-full bg-red-600 hover:bg-red-800 text-white px-5 py-2 font-bold transition-colors duration-200 shadow-sm"
                      onClick={() => props.removerUsuario(usuario)}
                    >
                      <IconTrash className="w-5 h-5 inline" /> Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="md:hidden flex flex-col gap-4 bg-indigo-700/90 p-2 rounded-xl">
        {props.usuarios.map((usuario) => (
          <div key={usuario.id} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-2 border border-zinc-100">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Nome</span>
              <div className="text-lg font-semibold text-zinc-900 truncate">{formatarNome(usuario.name)}</div>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600">E-mail</span>
              <div className="text-sm text-zinc-900 truncate">{usuario.email}</div>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Telefone</span>
              <div className="text-sm text-zinc-900 truncate">{usuario.phone}</div>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Empresa</span>
              <div className="text-sm text-zinc-900 truncate">{usuario.company}</div>
            </div>
            <div className="flex gap-2 mt-2 justify-end">
              <button
                className="rounded-full bg-indigo-600 hover:bg-indigo-800 text-white px-6 py-2 font-bold transition-colors duration-200 shadow-sm"
                onClick={() => props.selecionarUsuario(usuario)}
              >
                <IconEditCircle className="w-5 h-5 inline text-white" /> Editar
              </button>
              <button
                className="rounded-full bg-red-600 hover:bg-red-800 text-white px-6 py-2 font-bold transition-colors duration-200 shadow-sm"
                onClick={() => props.removerUsuario(usuario)}
              >
                <IconTrash className="w-5 h-5 inline text-white" /> Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
