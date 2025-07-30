interface MenuItemProps{
    icons: React.ElementType
    texto: string
    url: string
}
export default function MenuItem({icons:Icon,texto,url}: MenuItemProps){
return(
    <div>
            <a href={url} className="flex items-center my-1.5 gap-2 py-2 px-3
             text-zinc-300 hover:bg-black
              rounded-md">
      <Icon className="w-4 h-4 text-zinc-300" />
      <span>{texto}</span>
    </a>
    </div>
)
}
