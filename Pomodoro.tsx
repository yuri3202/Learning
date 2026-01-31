import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export const Pomodoro: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'focus' | 'short' | 'long'>('focus');

  useEffect(() => {
    let interval: number | undefined;

    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Play sound notification here in a real app
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    if (mode === 'focus') setTimeLeft(25 * 60);
    if (mode === 'short') setTimeLeft(5 * 60);
    if (mode === 'long') setTimeLeft(15 * 60);
  };

  const changeMode = (newMode: 'focus' | 'short' | 'long') => {
    setMode(newMode);
    setIsActive(false);
    if (newMode === 'focus') setTimeLeft(25 * 60);
    if (newMode === 'short') setTimeLeft(5 * 60);
    if (newMode === 'long') setTimeLeft(15 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((mode === 'focus' ? 1500 : mode === 'short' ? 300 : 900) - timeLeft) / (mode === 'focus' ? 1500 : mode === 'short' ? 300 : 900) * 100;

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-[#1f1f1f] rounded-2xl shadow-2xl border border-gray-800 w-full h-full min-h-[400px]">
      <div className="flex gap-2 mb-8 bg-black/40 p-1 rounded-full">
        <button 
            onClick={() => changeMode('focus')}
            className={`px-4 py-1 rounded-full text-sm font-bold transition ${mode === 'focus' ? 'bg-red-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
        >
            Foco
        </button>
        <button 
            onClick={() => changeMode('short')}
            className={`px-4 py-1 rounded-full text-sm font-bold transition ${mode === 'short' ? 'bg-green-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
        >
            Pausa Curta
        </button>
        <button 
            onClick={() => changeMode('long')}
            className={`px-4 py-1 rounded-full text-sm font-bold transition ${mode === 'long' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
        >
            Pausa Longa
        </button>
      </div>

      <div className="relative w-64 h-64 flex items-center justify-center mb-8">
        {/* SVG Circle Progress */}
        <svg className="w-full h-full transform -rotate-90">
            <circle cx="128" cy="128" r="120" stroke="#333" strokeWidth="8" fill="none" />
            <circle 
                cx="128" cy="128" r="120" 
                stroke={mode === 'focus' ? '#E50914' : mode === 'short' ? '#46d369' : '#3b82f6'} 
                strokeWidth="8" 
                fill="none" 
                strokeDasharray={2 * Math.PI * 120}
                strokeDashoffset={2 * Math.PI * 120 * (1 - progress / 100)}
                className="transition-all duration-1000 ease-linear"
            />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-6xl font-mono font-bold text-white tracking-widest">{formatTime(timeLeft)}</span>
            <span className="text-sm text-gray-400 mt-2 uppercase tracking-widest">{isActive ? 'EM ANDAMENTO' : 'PAUSADO'}</span>
        </div>
      </div>

      <div className="flex gap-6">
        <button 
            onClick={toggleTimer}
            className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 transition shadow-lg shadow-white/10"
        >
            {isActive ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
        </button>
        <button 
            onClick={resetTimer}
            className="w-16 h-16 rounded-full bg-[#333] text-white flex items-center justify-center hover:bg-[#444] transition border border-gray-700"
        >
            <RotateCcw className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};