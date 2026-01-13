import "./FormTask.css";
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

export default function FormTask({ onAddTask }) {
  const [taskText, setTaskText] = useState("");

  const handleSubmit = async (e) => {
    // 1. Transformamos em função async
    e.preventDefault();

    const textToSubmit = taskText.trim();
    if (!textToSubmit) {
      toast.warn("Insira uma tarefa.");
      return;
    }

    try {
      const url = `http://localhost:3000/tasks/`;

      const response = await axios.post(url, { name: textToSubmit });
      toast.success(response.data);

      if (onAddTask) onAddTask(textToSubmit);

      setTaskText(""); // Agora o campo vai limpar com segurança
    } catch (error) {
      toast.error("Erro ao salvar a tarefa. Tente novamente. " + error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      // Removi o sm:flex-row para testar se você prefere manter em linha (row) sempre
      // Adicionei shadow-lg para destacar mais do fundo
      className="flex flex-row gap-2 w-full max-w-3xl mx-auto p-2 bg-white rounded-xl shadow-lg border border-gray-100"
    >
      <input
        type="text"
        placeholder="Adicione uma nova tarefa..."
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        // Reduzi o padding (p-2) para não ficar tão "gordo" no mobile
        className="flex-1 p-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all outline-none text-sm"
      />

      <button
        type="submit"
        // Removi o texto "Criar" no mobile muito pequeno para economizar espaço (opcional)
        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors shadow-md active:scale-95"
      >
        <PlusCircle size={20} />
        <span className="hidden xs:block">Criar</span>
      </button>
    </form>
  );
}
