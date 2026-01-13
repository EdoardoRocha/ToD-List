import './Main.css';
import FormTask from './task/FormTask';
import TableTask from './task/TableTask';
import { Routes, Route } from 'react-router-dom';
import PomodoroTimer from './pomodoroTimer/PomodoroTimer';

export default function Main() {
    return (
        <main className="content">
            <Routes>
                <Route path='/' element={<FormTask />}/>
                <Route path='/tarefas' element={<TableTask />}/>
                <Route path='/pomodoro' element={<PomodoroTimer/>}/>
            </Routes>
        </main>
    )
}