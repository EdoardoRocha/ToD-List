import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Check,
  Edit2,
  Trash2,
  Loader2,
  ListTodo,
  X,
  Save,
  Target,
} from "lucide-react";
import { useFocus } from "../pomodoroTimer/FocusContext"; // Certifique-se de que o caminho está correto

export default function TableTask() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Estados para Edição Inline
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const { setActiveTask } = useFocus();
  const navigate = useNavigate();

  // 1. Buscar tarefas do Backend (MongoDB via Express)
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/tasks/");
      setTasks(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
      toast.error("Erro ao carregar tarefas do servidor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 2. Excluir Tarefa
  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir esta tarefa?")) return;
    try {
      await axios.delete(`http://localhost:3000/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
      toast.success("Tarefa removida com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir tarefa.");
    }
  };

  // 3. Alternar Status (Concluir/Pendente)
  const handleToggleStatus = async (task) => {
    try {
      const newStatus = !task.completed;
      await axios.post(`http://localhost:3000/tasks/${task._id}`, {
        name: task.name,
        completed: newStatus,
      });

      setTasks(
        tasks.map((t) =>
          t._id === task._id ? { ...t, completed: newStatus } : t
        )
      );
      newStatus
        ? toast.success("Tarefa concluída!")
        : toast.info("Tarefa pendente.");
    } catch (error) {
      toast.error("Erro ao atualizar status.");
    }
  };

  // 4. Salvar Edição de Nome
  const handleSaveEdit = async (id) => {
    if (!editValue.trim()) return toast.warn("O nome não pode estar vazio");
    try {
      await axios.post(`http://localhost:3000/tasks/${id}`, {
        name: editValue,
      });
      setTasks(
        tasks.map((t) => (t._id === id ? { ...t, name: editValue } : t))
      );
      setEditingId(null);
      toast.success("Nome atualizado!");
    } catch (error) {
      toast.error("Erro ao salvar edição.");
    }
  };

  // 5. Vincular ao Pomodoro (US03)
  const handleFocus = (task) => {
    setActiveTask(task);
    navigate("/pomodoro");
    toast.info(`Focando em: ${task.name}`, { icon: "🎯" });
  };

  const startEdit = (task) => {
    setEditingId(task._id);
    setEditValue(task.name);
  };

  const filteredTasks = tasks.filter((t) =>
    t.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 gap-4">
        <Loader2 className="animate-spin text-blue-600" size={40} />
        <p className="text-gray-500 font-medium italic">
          Sincronizando com o banco...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6 animate-in fade-in duration-500">
      {/* CABEÇALHO E BUSCA */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <ListTodo className="text-blue-600" />
            Tarefas Atuais
          </h2>
          <p className="text-sm text-gray-500">
            Gerenciamento completo do seu backlog.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Pesquisar tarefa..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* TABELA */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-600 uppercase tracking-wider">
                <th className="p-4 font-bold"># ID</th>
                <th className="p-4 font-bold text-center">Status</th>
                <th className="p-4 font-bold">Descrição</th>
                <th className="p-4 font-bold text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <tr
                    key={task._id}
                    className="hover:bg-blue-50/20 transition-colors"
                  >
                    <td className="p-4 text-xs font-mono text-gray-400">
                      {task._id}
                    </td>

                    <td className="p-4 text-center">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                          task.completed
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {task.completed ? "CONCLUÍDA" : "PENDENTE"}
                      </span>
                    </td>

                    <td className="p-4">
                      {editingId === task._id ? (
                        <div className="flex items-center gap-2">
                          <input
                            className="flex-1 p-2 border border-blue-400 rounded outline-none text-sm"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            autoFocus
                            onKeyDown={(e) =>
                              e.key === "Enter" && handleSaveEdit(task._id)
                            }
                          />
                          <button
                            onClick={() => handleSaveEdit(task.id)}
                            className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                          >
                            <Save size={16} />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="p-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <span
                          className={`text-sm font-medium ${
                            task.completed
                              ? "line-through text-gray-400"
                              : "text-gray-700"
                          }`}
                        >
                          {task.name}
                        </span>
                      )}
                    </td>

                    <td className="p-4">
                      <div className="flex items-center justify-center gap-1">
                        {editingId !== task._id && (
                          <>
                            <button
                              onClick={() => handleToggleStatus(task)}
                              className={`p-2 rounded-lg transition-all ${
                                task.completed
                                  ? "text-green-600 bg-green-50"
                                  : "text-gray-400 hover:text-green-600 hover:bg-green-50"
                              }`}
                              title="Concluir"
                            >
                              <Check size={20} />
                            </button>
                            <button
                              onClick={() => handleFocus(task)}
                              className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg"
                              title="Focar (Pomodoro)"
                            >
                              <Target size={18} />
                            </button>
                            <button
                              onClick={() => startEdit(task)}
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                              title="Editar"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(task._id)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                              title="Excluir"
                            >
                              <Trash2 size={18} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="p-20 text-center text-gray-400 italic"
                  >
                    Nenhum registro encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
