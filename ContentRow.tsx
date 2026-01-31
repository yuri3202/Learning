import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, PlayCircle } from 'lucide-react';
import { StudyItem } from '../types';

interface ContentRowProps {
  title: string;
  items: StudyItem[];
  onItemClick: (item: StudyItem) => void;
}

export const ContentRow: React.FC<ContentRowProps> = ({ title, items, onItemClick }) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (offset: number) => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-10 pl-4 md:pl-12 group relative z-10">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4 hover:text-blue-400 transition cursor-pointer inline-flex items-center gap-2">
        {title}
        <span className="text-sm font-normal text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0">
          Ver tudo
        </span>
      </h2>

      <div className="group/row relative">
        <button 
          onClick={() => scroll(-500)}
          className="absolute left-0 top-0 bottom-0 z-40 bg-black/50 hover:bg-black/70 w-12 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity h-full"
        >
          <ChevronLeft className="text-white w-8 h-8" />
        </button>

        <div 
          ref={rowRef}
          className="flex gap-4 overflow-x-scroll no-scrollbar scroll-smooth py-4 px-1"
        >
          {items.map((item) => (
            <div 
              key={item.id}
              onClick={() => onItemClick(item)}
              className="relative min-w-[250px] md:min-w-[300px] aspect-video rounded-md cursor-pointer transition-all duration-300 hover:scale-105 hover:z-20 group/card"
            >
              <img 
                src={item.thumbnail} 
                alt={item.title} 
                className="w-full h-full object-cover rounded-md"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover/card:opacity-100 transition-opacity rounded-md flex flex-col justify-center items-center p-4">
                 <PlayCircle className="w-12 h-12 text-white mb-2" />
                 <h3 className="text-white font-bold text-center text-sm">{item.title}</h3>
                 <div className="flex gap-2 mt-2 text-xs text-gray-300">
                    <span>{item.category}</span>
                    <span>•</span>
                    <span>{item.duration}</span>
                 </div>
                 {item.isNew && (
                   <span className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-bold px-1 rounded">
                     NOVO
                   </span>
                 )}
              </div>
              
              {/* Progress Bar (if started) */}
              {item.progress > 0 && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700 rounded-b-md overflow-hidden">
                  <div 
                    className="h-full bg-red-600" 
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <button 
          onClick={() => scroll(500)}
          className="absolute right-0 top-0 bottom-0 z-40 bg-black/50 hover:bg-black/70 w-12 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity h-full"
        >
          <ChevronRight className="text-white w-8 h-8" />
        </button>
      </div>
    </div>
  );
};