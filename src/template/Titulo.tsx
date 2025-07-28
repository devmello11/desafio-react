interface TituloProps{
    principal: string
    
}
export default function Titulo(props: TituloProps){
return(
    <div className="flex flex-col ">
        <span>{props.principal}</span>
        
    </div>
)
}