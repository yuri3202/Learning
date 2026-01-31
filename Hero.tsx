import React from 'react';
import { Play, Info } from 'lucide-react';

interface HeroProps {
  onPlay: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onPlay }) => {
  return (
    <div className="relative h-[80vh] w-full">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop" 
          alt="Coding Hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute bottom-[20%] left-4 md:left-12 max-w-xl space-y-6">
        <div className="flex items-center gap-2">
            <span className="text-blue-500 font-bold tracking-widest text-sm uppercase">Destaque da Semana</span>
            <span className="bg-red-600 text-white text-[10px] px-2 py-0.5 rounded font-bold">AO VIVO</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight drop-shadow-lg">
          Masterclass: <br/> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">SQL Avançado</span>
        </h1>
        <p className="text-lg text-gray-200 drop-shadow-md line-clamp-3">
          Domine JOINs, Subqueries e Otimização de Banco de Dados. Prepare-se para o IFRS com desafios práticos e análise de performance em tempo real.
        </p>
        
        <div className="flex items-center gap-4 pt-4">
          <button 
            onClick={onPlay}
            className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded hover:bg-opacity-80 transition font-bold text-lg"
          >
            <Play className="fill-black w-6 h-6" />
            Assistir Aula
          </button>
          <button className="flex items-center gap-2 bg-gray-500/70 text-white px-8 py-3 rounded hover:bg-gray-500/50 transition font-bold text-lg backdrop-blur-sm">
            <Info className="w-6 h-6" />
            Mais Detalhes
          </button>
        </div>
      </div>
    </div>
  );
};