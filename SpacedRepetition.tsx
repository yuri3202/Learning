import React, { useState } from 'react';
import { Plus, Check, Clock, BrainCircuit } from 'lucide-react';
import { MemoryCard } from '../types';

export const SpacedRepetition: React.FC = () => {
    const [cards, setCards] = useState<MemoryCard[]>([
        { id: 1, front: "Qual a complexidade de busca binária?", back: "O(log n)", nextReview: Date.now(), interval: 1, type: 'text' },
        { id: 2, front: "Tag HTML para imagem?", back: "<img src='...' />", nextReview: Date.now() - 10000, interval: 1, type: 'code' }
    ]);
    const [isAdding, setIsAdding] = useState(false);
    const [newFront, setNewFront] = useState("");
    const [newBack, setNewBack] = useState("");
    const [reviewing, setReviewing] = useState<MemoryCard | null>(null);
    const [showBack, setShowBack] = useState(false);

    const dueCards = cards.filter(c => c.nextReview <= Date.now());

    const addCard = () => {
        if(!newFront || !newBack) return;
        setCards([...cards, {
            id: Date.now(),
            front: newFront,
            back: newBack,
            nextReview: Date.now(),
            interval: 1,
            type: 'text'
        }]);
        setNewFront("");
        setNewBack("");
        setIsAdding(false);
    };

    const processReview = (difficulty: 'easy' | 'medium' | 'hard') => {
        if (!reviewing) return;
        
        let newInterval = reviewing.interval;
        if (difficulty === 'easy') newInterval *= 2;
        if (difficulty === 'hard') newInterval = 1;

        const nextDate = Date.now() + (newInterval * 24 * 60 * 60 * 1000);
        
        setCards(cards.map(c => c.id === reviewing.id ? { ...c, nextReview: nextDate, interval: newInterval } : c));
        setReviewing(null);
        setShowBack(false);
    };

    if (reviewing) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 animate-fade-in">
                <div className="w-full max-w-lg bg-[#1f1f1f] rounded-2xl p-8 border border-gray-700 shadow-2xl min-h-[300px] flex flex-col justify-center items-center text-center">
                    <span className="text-gray-500 text-xs uppercase mb-4 tracking-widest">Frente</span>
                    <h3 className="text-2xl font-bold text-white mb-8">{reviewing.front}</h3>
                    
                    {showBack ? (
                        <div className="animate-slide-up w-full border-t border-gray-700 pt-8 mt-4">
                            <span className="text-gray-500 text-xs uppercase mb-4 tracking-widest block">Verso</span>
                            <p className="text-xl text-blue-300 font-mono">{reviewing.back}</p>
                        </div>
                    ) : (
                        <button 
                            onClick={() => setShowBack(true)}
                            className="bg-blue-600 px-8 py-3 rounded-full text-white font-bold hover:scale-105 transition"
                        >
                            Mostrar Resposta
                        </button>
                    )}
                </div>

                {showBack && (
                    <div className="flex gap-4 mt-8 animate-fade-in">
                        <button onClick={() => processReview('hard')} className="px-6 py-3 rounded-xl bg-red-900/50 text-red-200 border border-red-800 hover:bg-red-800 transition">Difícil (1d)</button>
                        <button onClick={() => processReview('medium')} className="px-6 py-3 rounded-xl bg-yellow-900/50 text-yellow-200 border border-yellow-800 hover:bg-yellow-800 transition">Bom (Manter)</button>
                        <button onClick={() => processReview('easy')} className="px-6 py-3 rounded-xl bg-green-900/50 text-green-200 border border-green-800 hover:bg-green-800 transition">Fácil (2x)</button>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 h-full">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <BrainCircuit className="text-purple-500" /> Sistema de Memória
                    </h2>
                    <p className="text-gray-400">Você tem <span className="text-red-400 font-bold">{dueCards.length}</span> cards para revisar hoje.</p>
                </div>
                <button 
                    onClick={() => setIsAdding(!isAdding)}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
                >
                    <Plus size={18} /> Novo Card
                </button>
            </div>

            {isAdding && (
                <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-700 mb-8 animate-slide-up">
                    <input 
                        className="w-full bg-[#111] text-white p-3 rounded mb-3 border border-gray-600 focus:border-purple-500 outline-none" 
                        placeholder="Pergunta / Frente"
                        value={newFront}
                        onChange={e => setNewFront(e.target.value)}
                    />
                    <textarea 
                        className="w-full bg-[#111] text-white p-3 rounded mb-3 border border-gray-600 focus:border-purple-500 outline-none" 
                        placeholder="Resposta / Verso"
                        value={newBack}
                        onChange={e => setNewBack(e.target.value)}
                    />
                    <button onClick={addCard} className="w-full bg-purple-600 text-white py-2 rounded font-bold">Salvar na Memória</button>
                </div>
            )}

            {dueCards.length > 0 ? (
                 <div 
                    onClick={() => setReviewing(dueCards[0])}
                    className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-500/30 p-12 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-purple-500 transition group"
                 >
                     <Clock className="w-16 h-16 text-purple-400 mb-4 group-hover:scale-110 transition" />
                     <h3 className="text-2xl font-bold text-white">Iniciar Revisão Diária</h3>
                     <p className="text-gray-400 mt-2">Clique para começar</p>
                 </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                    <Check className="w-16 h-16 text-green-500 mb-4" />
                    <p className="text-xl">Tudo limpo por hoje!</p>
                    <p className="text-sm">Volte amanhã para fixar o conteúdo.</p>
                </div>
            )}
        </div>
    );
};