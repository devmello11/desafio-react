import { IconDotsVertical } from "@tabler/icons-react"
import Image from "next/image"
interface UsuarioInfoProps {
    nome: string
    email: string
    imagemUrl: string
    className?: string
}
export default function UsuarioInfo(props: UsuarioInfoProps){
    return (
        <div className={`flex gap-2 mt-auto  ${props.className ?? ''}`}>
            
            <Image
            src={props.imagemUrl}
            alt="Avatar"
            height={30}
            width={40}
            className="rounded-full"
            />
            <div className="flex flex-col pt-2.5">
            <span>{props.nome}</span>
            <span className="text-sm text-zinc-400 ">{props.email}</span> 
            </div>
            <div className="flex-1">
            <IconDotsVertical className="cursor-pointer"/>

            </div>
               

        </div>
    )
}
