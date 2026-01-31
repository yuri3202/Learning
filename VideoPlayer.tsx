import React from 'react';
import { X, Tv } from 'lucide-react';

interface VideoPlayerProps {
  videoId: string;
  onClose: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId, onClose }) => {
  const isUrl = videoId.includes('http') || videoId.includes('.mp4');
  
  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center animate-fade-in p-4">
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:text-red-500 z-50 transition hover:scale-110 bg-black/50 rounded-full p-2"
      >
        <X className="w-8 h-8" />
      </button>
      
      {/* Retro TV Frame */}
      <div className="relative w-full max-w-6xl aspect-video bg-[#222] rounded-3xl p-4 md:p-8 border-4 border-[#444] shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col items-center">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gray-600 rounded-b-xl"></div>
         
         <div className="w-full h-full bg-black rounded-[2rem] overflow-hidden relative border-8 border-[#111] shadow-inner">
            {/* Screen Glare */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none z-20 rounded-[2rem]"></div>
            
            {isUrl ? (
                <video 
                    src={videoId} 
                    controls 
                    autoPlay 
                    className="w-full h-full object-contain"
                >
                    Seu navegador não suporta a tag de vídeo.
                </video>
            ) : (
                <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                title="Video Player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                ></iframe>
            )}
         </div>

         {/* TV Brand / Controls */}
         <div className="absolute bottom-2 flex items-center gap-2 text-gray-500 font-mono text-xs tracking-widest">
            <Tv size={14} /> LEARNING_VISION_2000
         </div>
         <div className="absolute bottom-4 right-8 flex gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_red]"></div>
            <div className="w-8 h-1 bg-gray-700 rounded-full"></div>
            <div className="w-8 h-1 bg-gray-700 rounded-full"></div>
         </div>
      </div>
    </div>
  );
};