"use client";
import { ListIcon, UserPlus } from "lucide-react";
import MenuGrupo from "@/components/template/MenuGrupo";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

interface MenuProps {
    className?: string
}

export default function Menu(props: MenuProps){
    const [loadingMenu, setLoadingMenu] = useState<string | null>(null); 
    useEffect(() => {
      const handleLoadingLista = () => {
        setLoadingMenu('lista');
        setTimeout(() => setLoadingMenu(null), 800);
      };
      const handleLoadingCadastro = () => {
        setLoadingMenu('cadastro');
        setTimeout(() => setLoadingMenu(null), 800);
      };
      window.addEventListener('show-loading-lista', handleLoadingLista);
      window.addEventListener('show-loading-cadastro', handleLoadingCadastro);
      return () => {
        window.removeEventListener('show-loading-lista', handleLoadingLista);
        window.removeEventListener('show-loading-cadastro', handleLoadingCadastro);
      };
    }, []);
    const router = useRouter();
    function fecharMenuMobile() {
      if (typeof window !== 'undefined' && window.innerWidth < 768) {
        window.dispatchEvent(new CustomEvent('fechar-menu-mobile'));
      }
    }
    const handleMenuClick = (type: string, action: () => void) => {
        setLoadingMenu(type);
        if (typeof window !== 'undefined') {
          if (type === 'lista') {
            window.dispatchEvent(new CustomEvent('show-loading-lista'));
          } else if (type === 'cadastro') {
            window.dispatchEvent(new CustomEvent('show-loading-cadastro'));
          }
        }
        setTimeout(() => {
            action();
            setLoadingMenu(null);
        }, 400);
    };
    return(
        <div className={` ${props.className ?? ''}`}>
         <MenuGrupo texto="Listar Clientes"/>
         <button className="flex items-center my-1.5 gap-2 py-2 px-3 text-zinc-300 hover:bg-black rounded-md w-full disabled:opacity-60 z-50" onClick={() => { handleMenuClick('lista', () => router.push('/clientes')); fecharMenuMobile(); }} disabled={loadingMenu === 'lista'}>
            <ListIcon className="w-4 h-4 text-zinc-300" />
            <span>Lista</span>
            {loadingMenu === 'lista' && <span className="ml-2 animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-600 z-50"></span>}
        </button>
        {/* ...restante do código... */}
        </div>
    );
}
