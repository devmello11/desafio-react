interface TituloProps{
    principal: string
    
}
export default function Titulo(props: TituloProps){
  return (
    <span className="text-2xl font-bold tracking-tight text-white">{props.principal}</span>
  )
}
