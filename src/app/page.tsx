import Pagina from "@/template/Pagina";
import Titulo from "@/template/Titulo";
import CadastroUsuario from "../pages/clients/CadastroUsuario";

export default function Home() {
  return (
    <Pagina>
      <div className="flex flex-col  gap-5 pt-5 pb-20">
        <Titulo principal="Cadastro de Usuário" />
        <CadastroUsuario />
      </div>
    </Pagina>
  );
}
