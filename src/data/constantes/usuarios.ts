import { v4 as uuid } from "uuid";
import Usuario from "../model/Usuarios";
import Id from "../model/Id";

const usuarios: Usuario[] = [
  {
    id: Id.novo(),
    nome: "Neymar Jr",
    email: "neymar@futebol.com",
    senha: "senha123"
  
  },
  {
    id: Id.novo(),
    nome: "Cristiano Ronaldo",
    email: "cr7@futebol.com",
    senha: "cristiano123"
  },
  {
    id: Id.novo(),
    nome: "Lionel Messi",
    email: "messi@futebol.com",
    senha: "messi10"
    
  },
  {
    id: Id.novo(),
    nome: "Pelé",
    email: "pele@futebol.com",
    senha: "eterno10"
    
  },
  {
    id: Id.novo(),
    nome: "Zinedine Zidane",
    email: "zidane@futebol.com",
    senha: "zizou123"
    
  },
  {
    id: Id.novo(),
    nome: "Ronaldinho Gaúcho",
    email: "ronaldinho@futebol.com",
    senha: "bruxo10"
    
  },
  {
    id: Id.novo(),
    nome: "Kylian Mbappé",
    email: "mbappe@futebol.com",
    senha: "veloz7"
    
  },
  {
    id: Id.novo(),
    nome: "Vinícius Júnior",
    email: "vini@futebol.com",
    senha: "real20",
    
  },
  {
    id: Id.novo(),
    nome: "Romário",
    email: "romario@futebol.com",
    senha: "baixinho11"
    
  },
  {
    id: Id.novo(),
    nome: "Robert Lewandowski",
    email: "lewa@futebol.com",
    senha: "goleador9"
    
  },
  {
    id: Id.novo(),
    nome: "Thiago Silva",
    email: "tsilva@futebol.com",
    senha: "capitao3"
    
  },
  {
    id: Id.novo(),
    nome: "Karim Benzema",
    email: "benzema@futebol.com",
    senha: "ballondor"
    
  },
  {
    id: Id.novo(),
    nome: "Luka Modrić",
    email: "modric@futebol.com",
    senha: "croacia10"
    
  },
  {
    id: Id.novo(),
    nome: "Rivaldo",
    email: "rivaldo@futebol.com",
    senha: "craque10"
    
  },
  {
    id: Id.novo(),
    nome: "Garrincha",
    email: "garrincha@futebol.com",
    senha: "alegria77"
    
  },
  {
    id: Id.novo(),
    nome: "Erling Haaland",
    email: "haaland@futebol.com",
    senha: "noruega9"
    
  },
  {
    id: Id.novo(),
    nome: "Casemiro",
    email: "casemiro@futebol.com",
    senha: "volante5"
    
  },
  {
    id: Id.novo(),
    nome: "Philippe Coutinho",
    email: "coutinho@futebol.com",
    senha: "meia11"
    
  },
  {
    id: Id.novo(),
    nome: "Andrés Iniesta",
    email: "iniesta@futebol.com",
    senha: "barca8"
    
  },
  {
    id: Id.novo(),
    nome: "Lucas Paquetá",
    email: "paqueta@futebol.com",
    senha: "seleção7"
    
  }
];

export default usuarios;
