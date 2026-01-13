import { House, ListTodo } from "lucide-react"; // Sugestão de ícone para tarefas
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";

export default function MenuItens(props) {
  return (
    <nav className="flex flex-col gap-1 p-2">
      {/* Link com ícone e texto centralizados */}
      <Link
        to="/"
        className="flex items-center gap-3 p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
      >
        <House size={20} />
        <span className="font-medium">Cadastrar</span>
      </Link>
      {/* Mantendo o padrão mesmo sem ícone (ou adicionando um) */}
      <Link
        to="/tarefas"
        className="flex items-center gap-3 p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
      >
        <ListTodo size={20} />
        <span className="font-medium">Tarefas atuais</span>
      </Link>
      <Link
        to="/pomodoro"
        className="flex items-center gap-3 p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
      >
        <Clock size={20} />
        <span className="font-medium">Pomodoro</span>
      </Link>
    </nav>
  );
}
