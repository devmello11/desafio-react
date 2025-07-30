import { IconBrandTailwind } from "@tabler/icons-react";
import Image from "next/image";
interface LogoProps {
    className?: string;
    logoUrl: string;
}
export default function Logo(props: LogoProps){
    return (
        <div className={`flex items-center gap-4 ${props.className ?? ''}`}>
            <IconBrandTailwind  size={40} stroke={1} />
            <span className="text-zinc-100">Gerenciamento</span>
        </div>
    );
}
