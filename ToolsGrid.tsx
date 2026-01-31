import React from 'react';
import { Database, Clock, BrainCircuit, Code2, ListChecks, Calculator, GraduationCap, Network, Gamepad2 } from 'lucide-react';
import { TRANSLATIONS } from '../constants';

interface ToolsGridProps {
    onSelectTool: (tool: string) => void;
    lang: 'pt' | 'en';
}

export const ToolsGrid: React.FC<ToolsGridProps> = ({ onSelectTool, lang }) => {
    const t = TRANSLATIONS[lang];
    const tools = [
        { id: 'game-studio', name: 'Game Studio', icon: Gamepad2, color: 'text-purple-400', bg: 'from-purple-500/20 to-fuchsia-500/5', desc: 'Engine Web para criação de Jogos' },
        { id: 'code-lab', name: 'Code Lab', icon: Code2, color: 'text-green-400', bg: 'from-green-500/20 to-emerald-500/5', desc: 'Compilador Python, Java, C++' },
        { id: 'mindmap', name: t.mindmap, icon: Network, color: 'text-cyan-400', bg: 'from-cyan-500/20 to-blue-500/5', desc: 'Mapas Mentais' },
        { id: 'srs', name: t.srs, icon: BrainCircuit, color: 'text-indigo-400', bg: 'from-indigo-500/20 to-violet-500/5', desc: 'Repetição Espaçada' },
        { id: 'quiz', name: t.quiz, icon: ListChecks, color: 'text-yellow-400', bg: 'from-yellow-500/20 to-orange-500/5', desc: 'Simulados' },
        { id: 'sql', name: t.sql, icon: Database, color: 'text-blue-400', bg: 'from-blue-500/20 to-indigo-500/5', desc: 'Terminal SQL' },
        { id: 'pomodoro', name: t.pomodoro, icon: Clock, color: 'text-red-400', bg: 'from-red-500/20 to-pink-500/5', desc: 'Foco Timer' },
        { id: 'flashcards', name: t.flashcards, icon: GraduationCap, color: 'text-pink-400', bg: 'from-pink-500/20 to-rose-500/5', desc: 'Flashcards Rápidos' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up pb-20">
            {tools.map((tool, idx) => (
                <div 
                    key={tool.id}
                    onClick={() => onSelectTool(tool.id)}
                    className="group relative overflow-hidden bg-[#161616] border border-white/5 rounded-2xl p-6 cursor-pointer card-hover hover:border-white/10"
                    style={{ animationDelay: `${idx * 100}ms` }}
                >
                    {/* Gradient Background Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${tool.bg} opacity-0 group-hover:opacity-100 transition duration-500`} />
                    
                    <div className="relative z-10 flex items-start justify-between">
                        <div className={`p-3 rounded-xl bg-white/5 ${tool.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                            <tool.icon className="w-8 h-8" />
                        </div>
                        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition -translate-x-2 group-hover:translate-x-0">
                            <span className="text-white">→</span>
                        </div>
                    </div>
                    
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold text-gray-100 mb-1 group-hover:text-white transition">{tool.name}</h3>
                        <p className="text-sm text-gray-500 group-hover:text-gray-300 transition">{tool.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};