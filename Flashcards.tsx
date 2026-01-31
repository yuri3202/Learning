import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Check, X } from 'lucide-react';
import { Flashcard } from '../types';

interface FlashcardsProps {
    items: Flashcard[];
}

export const Flashcards: React.FC<FlashcardsProps> = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const handleNext = () => {
        setIsFlipped(false);
        setTimeout(() => setCurrentIndex((prev) => (prev + 1) % items.length), 300);
    };

    const handlePrev = () => {
        setIsFlipped(false);
        setTimeout(() => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length), 300);
    };

    const currentCard = items[currentIndex];

    return (
        <div className="flex flex-col items-center justify-center h-full w-full min-h-[400px]">
            <div className="mb-6 flex justify-between w-full max-w-lg px-4 text-gray-400 text-sm">
                <span>Carta {currentIndex + 1} de {items.length}</span>
                <span className={`px-2 py-0.5 rounded ${currentCard.difficulty === 'easy' ? 'bg-green-900/50 text-green-400' : currentCard.difficulty === 'medium' ? 'bg-yellow-900/50 text-yellow-400' : 'bg-red-900/50 text-red-400'}`}>
                    {currentCard.category}
                </span>
            </div>

            <div 
                className="relative w-full max-w-lg aspect-[3/2] cursor-pointer group"
                onClick={() => setIsFlipped(!isFlipped)}
                style={{ perspective: '1000px' }}
            >
                <div 
                    className="w-full h-full relative transition-transform duration-500 transform-style-3d"
                    style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)', transformStyle: 'preserve-3d' }}
                >
                    {/* Front */}
                    <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-[#1f1f1f] to-[#141414] border border-gray-700 rounded-xl p-8 flex flex-col items-center justify-center shadow-2xl" style={{ backfaceVisibility: 'hidden' }}>
                        <span className="text-blue-500 font-bold mb-4 uppercase tracking-widest text-xs">Pergunta</span>
                        <h3 className="text-2xl md:text-3xl text-center font-bold text-white select-none">{currentCard.question}</h3>
                        <p className="absolute bottom-4 text-gray-500 text-sm flex items-center gap-2">
                            <RotateCw className="w-4 h-4" /> Clique para virar
                        </p>
                    </div>

                    {/* Back */}
                    <div 
                        className="absolute inset-0 backface-hidden bg-gradient-to-br from-blue-900/20 to-[#141414] border border-blue-500/30 rounded-xl p-8 flex flex-col items-center justify-center shadow-2xl"
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    >
                        <span className="text-green-500 font-bold mb-4 uppercase tracking-widest text-xs">Resposta</span>
                        <p className="text-xl text-center text-gray-200 leading-relaxed select-none">{currentCard.answer}</p>
                    </div>
                </div>
            </div>

            <div className="flex gap-4 mt-8">
                <button onClick={(e) => { e.stopPropagation(); handlePrev(); }} className="p-3 rounded-full bg-[#333] hover:bg-[#444] text-white transition">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <button 
                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                    className="flex items-center gap-2 px-6 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold transition"
                >
                    <Check className="w-5 h-5" /> Acertei
                </button>
                <button 
                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                    className="flex items-center gap-2 px-6 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold transition"
                >
                    <X className="w-5 h-5" /> Errei
                </button>
                 <button onClick={(e) => { e.stopPropagation(); handleNext(); }} className="p-3 rounded-full bg-[#333] hover:bg-[#444] text-white transition">
                    <ArrowRight className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};