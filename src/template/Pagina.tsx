import Menu  from "./Menu"
import UserInfo from "./UserInfo"
import Logo from "./Logo"
interface PaginaProps {
   children: any
}
export default function Pagina(props: PaginaProps){
    const usurario = {
        nome: 'Dev Mello',
        email: 'devmello11@gmail.com',
        imagemUrl:'https://www.iol.pt/multimedia/oratvi/multimedia/imagem/id/14184345/600'
    }
    
    
  return (
    <div className="flex h-screen">
      <aside className="flex flex-col bg-zinc-900 w-72">
        <Logo className="pt-7 px-6"/>
        <Menu className="pt-2 px-6 pb-7" />

        <div className="flex-grow" />

        <hr className="mx-5 bg-zinc-800" />
        <UserInfo {...usurario} className="p-8" />
      </aside>

      <div className="p-7 flex-1 overflow-auto">
        {props.children}
      </div>
    </div>
  );
}

