import { IconDotsVertical } from "@tabler/icons-react"
import { useState, useRef, useEffect } from "react"
import { useAuth } from "@/context/AuthContext"
import Image from "next/image"
interface UsuarioInfoProps {
    nome: string;
    email: string;
    imagemUrl: string;
    className?: string;
}

export default function UserInfo(props: UsuarioInfoProps) {
    const { logout } = useAuth();
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    return (
        <div className={`flex gap-2 mt-auto relative ${props.className ?? ''}`} ref={menuRef}>
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
            <div className="flex-1 flex items-center justify-end relative">
                <IconDotsVertical className="cursor-pointer" onClick={() => setOpen((v) => !v)} />
                {open && (
                    <div className="absolute right-0 top-8 z-50 bg-white border border-zinc-200 rounded shadow-lg min-w-[120px]">
                        <button
                            className="w-full text-left px-4 py-2 text-zinc-800 hover:bg-zinc-100"
                            onClick={logout}
                        >
                            Sair
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
