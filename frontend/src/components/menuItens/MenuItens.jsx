import { House, ListTodo } from "lucide-react"; // Sugestão de ícone para tarefas
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import './MenuItens.css';

export default function MenuItens(props) {
  return (
    <nav className="flex gap-1 p-2 flex-wrap justify-center items-center ">
      {/* Link com ícone e texto centralizados */}
      <Link
        to="/"
        className="flex items-center gap-3 p-2 rounded-lg text-white-700 md:text-gray-700 hover:bg-gray-100 transition-colors hover:text-gray-700"
      >
        <House size={20} />
        <span className="font-medium">Cadastrar</span>
      </Link>
      {/* Mantendo o padrão mesmo sem ícone (ou adicionando um) */}
      <Link
        to="/tarefas"
        className="flex items-center gap-3 p-2 rounded-lg text-white-700  md:text-gray-700 hover:bg-gray-100 transition-colors hover:text-gray-700"
      >
        <ListTodo size={20} />
        <span className="font-medium">Tarefas atuais</span>
      </Link>
      <Link
        to="/pomodoro"
        className="flex items-center gap-3 p-2 rounded-lg text-white-700 md:text-gray-700 hover:bg-gray-100 transition-colors hover:text-gray-700"
      >
        <Clock size={20} />
        <span className="font-medium grow ">Pomodoro</span>
      </Link>
    </nav>
  );
}
