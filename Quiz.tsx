import React, { useState } from 'react';
import { CheckCircle, XCircle, Trophy, ArrowRight, RotateCcw } from 'lucide-react';
import { QuizQuestion } from '../types';

interface QuizProps {
    questions: QuizQuestion[];
    onComplete: (xpEarned: number) => void;
}

export const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const currentQ = questions[currentIndex];

    const handleAnswer = (index: number) => {
        if (isAnswered) return;
        setSelectedOption(index);
        setIsAnswered(true);
        if (index === currentQ.correctAnswer) {
            setScore(prev => prev + 1);
        }
    };

    const nextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            setShowResult(true);
            const totalXP = score * 50; // 50 XP per correct answer
            onComplete(totalXP);
        }
    };

    const resetQuiz = () => {
        setCurrentIndex(0);
        setSelectedOption(null);
        setIsAnswered(false);
        setScore(0);
        setShowResult(false);
    };

    if (showResult) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-fade-in">
                <div className="w-24 h-24 bg-yellow-500/20 rounded-full flex items-center justify-center mb-6 animate-pulse-slow">
                    <Trophy className="w-12 h-12 text-yellow-400" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Quiz Completado!</h2>
                <p className="text-gray-400 mb-8">Você acertou <span className="text-white font-bold">{score}</span> de <span className="text-white font-bold">{questions.length}</span> perguntas.</p>
                
                <div className="flex gap-4">
                    <div className="bg-[#1f1f1f] px-6 py-4 rounded-xl border border-gray-700">
                        <span className="block text-2xl font-bold text-blue-500">+{score * 50}</span>
                        <span className="text-xs text-gray-500 uppercase">XP Ganho</span>
                    </div>
                </div>

                <button 
                    onClick={resetQuiz}
                    className="mt-12 flex items-center gap-2 text-gray-400 hover:text-white transition"
                >
                    <RotateCcw className="w-4 h-4" /> Tentar Novamente
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto h-full flex flex-col justify-center p-4 md:p-8 animate-fade-in">
            {/* Progress */}
            <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Questão {currentIndex + 1} de {questions.length}</span>
                    <span>Score: {score}</span>
                </div>
                <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-blue-600 transition-all duration-500"
                        style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Question */}
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-tight">
                {currentQ.question}
            </h3>

            {/* Options */}
            <div className="space-y-3 mb-8">
                {currentQ.options.map((option, idx) => {
                    let btnClass = "w-full text-left p-5 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group ";
                    
                    if (isAnswered) {
                        if (idx === currentQ.correctAnswer) {
                            btnClass += "bg-green-900/30 border-green-500 text-green-100";
                        } else if (idx === selectedOption) {
                            btnClass += "bg-red-900/30 border-red-500 text-red-100";
                        } else {
                            btnClass += "bg-[#1f1f1f] border-gray-800 text-gray-500 opacity-50";
                        }
                    } else {
                        btnClass += "bg-[#1f1f1f] border-gray-800 hover:border-blue-500 hover:bg-[#252525] text-gray-200";
                    }

                    return (
                        <button 
                            key={idx}
                            onClick={() => handleAnswer(idx)}
                            disabled={isAnswered}
                            className={btnClass}
                        >
                            <span className="font-medium">{option}</span>
                            {isAnswered && idx === currentQ.correctAnswer && <CheckCircle className="w-6 h-6 text-green-500" />}
                            {isAnswered && idx === selectedOption && idx !== currentQ.correctAnswer && <XCircle className="w-6 h-6 text-red-500" />}
                        </button>
                    );
                })}
            </div>

            {/* Feedback & Next */}
            {isAnswered && (
                <div className="animate-slide-up bg-blue-900/20 border border-blue-500/30 p-6 rounded-xl">
                    <p className="text-blue-200 mb-4">
                        <span className="font-bold">Explicação:</span> {currentQ.explanation}
                    </p>
                    <button 
                        onClick={nextQuestion}
                        className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition flex items-center justify-center gap-2"
                    >
                        Próxima Questão <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    );
};