import Pagina from "@/template/Pagina";
import Titulo from "@/template/Titulo";


export default function Home() {
  return (
    <Pagina>
      <div className="flex flex-col  gap-5 pt-5 pb-20">
        <Titulo principal="Bem-vindo ao sistema de clientes!" />
        
      </div>
    </Pagina>
  );
}
