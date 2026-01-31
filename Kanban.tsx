import React, { useState } from 'react';
import { Plus, MoreHorizontal } from 'lucide-react';
import { Task } from '../types';

export const Kanban: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, title: 'Modelagem ER', subject: 'Database', status: 'todo', priority: 'High' },
        { id: 2, title: 'Instalar Python', subject: 'Prog', status: 'done', priority: 'Medium' },
        { id: 3, title: 'Revisar JOINs', subject: 'Database', status: 'doing', priority: 'High' },
        { id: 4, title: 'Ler Artigo UX', subject: 'Design', status: 'todo', priority: 'Low' },
    ]);

    const moveTask = (id: number, newStatus: 'todo' | 'doing' | 'done') => {
        setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
    };

    const getPriorityColor = (p: string) => {
        switch(p) {
            case 'High': return 'bg-red-900/50 text-red-200 border-red-800';
            case 'Medium': return 'bg-yellow-900/50 text-yellow-200 border-yellow-800';
            default: return 'bg-blue-900/50 text-blue-200 border-blue-800';
        }
    };

    const Column = ({ title, status, color }: { title: string, status: 'todo' | 'doing' | 'done', color: string }) => (
        <div className="flex-1 min-w-[300px] bg-[#1a1a1a] rounded-xl p-4 border border-gray-800 flex flex-col h-full">
            <div className={`flex items-center justify-between mb-4 pb-2 border-b border-gray-800`}>
                <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${color}`}></div>
                    <h3 className="font-bold text-white">{title}</h3>
                    <span className="text-xs bg-gray-800 px-2 py-0.5 rounded text-gray-400">{tasks.filter(t => t.status === status).length}</span>
                </div>
                <button className="text-gray-500 hover:text-white"><Plus className="w-4 h-4" /></button>
            </div>
            
            <div className="space-y-3 overflow-y-auto flex-1 pr-2 custom-scrollbar">
                {tasks.filter(t => t.status === status).map(task => (
                    <div 
                        key={task.id} 
                        className="bg-[#242424] p-4 rounded-lg border border-gray-700 hover:border-gray-500 cursor-grab active:cursor-grabbing group shadow-sm transition"
                    >
                        <div className="flex justify-between items-start mb-2">
                             <span className={`text-[10px] px-2 py-0.5 rounded border ${getPriorityColor(task.priority)}`}>
                                {task.priority}
                             </span>
                             <button className="text-gray-600 hover:text-white"><MoreHorizontal className="w-4 h-4" /></button>
                        </div>
                        <h4 className="text-white font-medium mb-2">{task.title}</h4>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                            <span>{task.subject}</span>
                            {/* Simple controls to move tasks for demo purposes */}
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                                {status !== 'todo' && <button onClick={() => moveTask(task.id, 'todo')} className="w-4 h-4 rounded bg-gray-700 hover:bg-gray-600 flex items-center justify-center">←</button>}
                                {status !== 'done' && <button onClick={() => moveTask(task.id, status === 'todo' ? 'doing' : 'done')} className="w-4 h-4 rounded bg-gray-700 hover:bg-gray-600 flex items-center justify-center">→</button>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="flex overflow-x-auto gap-6 h-[500px] pb-4">
            <Column title="A Fazer" status="todo" color="bg-gray-500" />
            <Column title="Em Progresso" status="doing" color="bg-blue-500" />
            <Column title="Concluído" status="done" color="bg-green-500" />
        </div>
    );
};