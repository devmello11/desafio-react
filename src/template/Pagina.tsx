import Menu  from "./Menu"
import UserInfo from "./UserInfo"
import Logo from "./Logo"
interface PaginaProps {
   children: React.ReactNode | ((ctx: { menuAberto: boolean; setMenuAberto: (open: boolean) => void }) => React.ReactNode);
}
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Pagina(props: PaginaProps){
    const { user } = useAuth();
    let nome = '';
    let email = '';
    const imagemUrl = 'https://www.iol.pt/multimedia/oratvi/multimedia/imagem/id/14184345/600';
    if (user) {
      nome = user.name;
      email = user.email;
    }
    const [menuAberto, setMenuAberto] = useState(false);
    const [loadingGlobal, setLoadingGlobal] = useState(false);

    useEffect(() => {
      function fecharMenuMobileListener() {
        setMenuAberto(false);
      }
      window.addEventListener('fechar-menu-mobile', fecharMenuMobileListener);
      return () => {
        window.removeEventListener('fechar-menu-mobile', fecharMenuMobileListener);
      };
    }, []);

    
    useEffect(() => {
      function onShowLoading() { setLoadingGlobal(true); }
      function onHideLoading() { setLoadingGlobal(false); }
      window.addEventListener('show-loading-global', onShowLoading);
      window.addEventListener('hide-loading-global', onHideLoading);
      return () => {
        window.removeEventListener('show-loading-global', onShowLoading);
        window.removeEventListener('hide-loading-global', onHideLoading);
      };
    }, []);

    return (
        <div className="flex h-screen">
            
            {loadingGlobal && (
              <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-40">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-600"></div>
              </div>
            )}
            <button
                className="fixed top-4 left-4 z-50 md:hidden bg-emerald-600 hover:bg-emerald-800 text-white rounded-full p-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                onClick={() => setMenuAberto(!menuAberto)}
                aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
            >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    {menuAberto ? (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                    )}
                </svg>
            </button>
            <aside className={`flex flex-col bg-zinc-900 w-72 fixed md:static top-0 left-0 h-full z-40 transition-transform duration-300 md:translate-x-0 ${menuAberto ? 'translate-x-0' : '-translate-x-full'} md:w-72 md:flex md:translate-x-0`}>
                <Logo className="pt-7 px-6" logoUrl="https://www.iol.pt/multimedia/oratvi/multimedia/imagem/id/14184345/600" />
                <Menu className="pt-2 px-6 pb-7" />
                <div className="flex-grow" />
                <hr className="mx-5 bg-zinc-800" />
                <UserInfo nome={nome} email={email} imagemUrl={imagemUrl} className="p-8" />
            </aside>
            {menuAberto && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
                    onClick={() => setMenuAberto(false)}
                />
            )}
            <div className="flex-1 overflow-auto">
                {typeof props.children === 'function'
                  ? props.children({ menuAberto, setMenuAberto })
                  : props.children}
            </div>
        </div>
    );
}

