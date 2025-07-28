import { ListIcon, Plus, TvIcon, UserPlus } from "lucide-react"
import MenuGrupo from "./MenuGrupo"
import MenuItem from "./MenuItem"
interface MenuProps {
    className?: string
}
export default function Menu(props: MenuProps){
    return(
        <div className={` ${props.className ?? ''}`}>
         <MenuGrupo texto="Listar Clientes"/>
         <MenuItem icons={ListIcon} texto="Lista" url="/"/>

         <MenuGrupo texto="Criar novo cliente"/>
         <MenuItem icons={UserPlus} texto="Cadastro" url="/auth/register"/>

         <MenuGrupo texto="Editar cliente existente"/>
         <MenuItem icons={ListIcon} texto="Editar" url="/"/>
         <MenuGrupo texto="Exlcuir"/>
         <MenuItem icons={ListIcon} texto="Deletar" url="/"/>
        </div>
    )
}