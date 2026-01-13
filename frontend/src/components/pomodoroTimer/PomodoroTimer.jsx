import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Coffee, Target } from "lucide-react";
import { toast } from "react-toastify";

export default function PomodoroTimer() {
  const WORK_TIME = 25 * 60; // 25 minutos em segundos
  const BREAK_TIME = 5 * 60; // 5 minutos em segundos

  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  // Lógica do Timer
  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      handleSwitchMode();
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // Alternar entre Foco e Pausa
  const handleSwitchMode = () => {
    const nextMode = !isBreak;
    setIsBreak(nextMode);
    setTimeLeft(nextMode ? BREAK_TIME : WORK_TIME);
    setIsActive(false);
    
    const message = nextMode ? "Hora de descansar! ☕" : "Hora de focar! 🎯";
    toast.info(message, { icon: nextMode ? "☕" : "🎯" });
    
    // Opcional: tocar um som de alerta
    new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg').play();
  };

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setTimeLeft(WORK_TIME);
  };

  // Formatação de MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Cálculo do progresso para a barra visual
  const totalTime = isBreak ? BREAK_TIME : WORK_TIME;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-xl border border-gray-100 max-w-md mx-auto mt-10">
      
      {/* Título do Modo */}
      <div className="flex items-center gap-2 mb-6">
        {isBreak ? (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-1 rounded-full">
            <Coffee size={20} />
            <span className="font-bold uppercase tracking-widest text-sm">Pausa Curta</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-1 rounded-full">
            <Target size={20} />
            <span className="font-bold uppercase tracking-widest text-sm">Foco Total</span>
          </div>
        )}
      </div>

      {/* Display do Tempo */}
      <div className="relative flex items-center justify-center mb-8">
        <h1 className="text-8xl font-black text-gray-800 font-mono tracking-tighter">
          {formatTime(timeLeft)}
        </h1>
      </div>

      {/* Barra de Progresso */}
      <div className="w-full bg-gray-100 h-3 rounded-full mb-8 overflow-hidden">
        <div 
          className={`h-full transition-all duration-1000 ease-linear ${isBreak ? 'bg-green-500' : 'bg-red-500'}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Controles */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTimer}
          className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white shadow-lg transition-all active:scale-95 ${
            isActive ? "bg-amber-500 hover:bg-amber-600" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isActive ? <Pause size={24} /> : <Play size={24} />}
          {isActive ? "Pausar" : "Começar"}
        </button>

        <button
          onClick={resetTimer}
          className="p-4 bg-gray-100 text-gray-500 rounded-xl hover:bg-gray-200 transition-all active:rotate-180 duration-500"
          title="Resetar"
        >
          <RotateCcw size={24} />
        </button>
      </div>
    </div>
  );
}