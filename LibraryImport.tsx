import React, { useState } from 'react';
import { Upload, Link as LinkIcon, FileText, Youtube, Check } from 'lucide-react';
import { StudyItem } from '../types';

interface LibraryImportProps {
    onImport: (item: StudyItem) => void;
}

export const LibraryImport: React.FC<LibraryImportProps> = ({ onImport }) => {
    const [activeTab, setActiveTab] = useState<'file' | 'link'>('link');
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const [fileName, setFileName] = useState('');

    const handleImport = () => {
        if (activeTab === 'link' && !url) return;
        if (activeTab === 'file' && !fileName) return;

        const newItem: StudyItem = {
            id: Date.now(),
            title: title || (activeTab === 'file' ? fileName : "Novo Link"),
            description: "Conteúdo importado pelo usuário",
            thumbnail: "https://images.unsplash.com/photo-1456324504439-367cee10d6e6?q=80&w=600",
            category: "Pessoal",
            duration: "N/A",
            progress: 0,
            type: activeTab === 'link' ? (url.includes('youtube') ? 'video' : 'link') : 'pdf',
            subject: 'general',
            videoUrl: url.includes('v=') ? url.split('v=')[1] : url 
        };

        onImport(newItem);
        setUrl('');
        setTitle('');
        setFileName('');
        alert("Importado com sucesso!");
    };

    return (
        <div className="p-6 bg-[#1a1a1a] rounded-xl border border-gray-700 mb-8 animate-fade-in">
            <h3 className="text-xl font-bold text-white mb-4">Adicionar à Biblioteca</h3>
            
            <div className="flex gap-4 mb-6">
                <button 
                    onClick={() => setActiveTab('link')}
                    className={`flex-1 py-3 rounded-lg border flex items-center justify-center gap-2 transition ${activeTab === 'link' ? 'bg-blue-600 border-blue-500 text-white' : 'border-gray-600 text-gray-400 hover:bg-white/5'}`}
                >
                    <LinkIcon size={18} /> Link / YouTube
                </button>
                <button 
                    onClick={() => setActiveTab('file')}
                    className={`flex-1 py-3 rounded-lg border flex items-center justify-center gap-2 transition ${activeTab === 'file' ? 'bg-green-600 border-green-500 text-white' : 'border-gray-600 text-gray-400 hover:bg-white/5'}`}
                >
                    <Upload size={18} /> Upload Arquivo
                </button>
            </div>

            <div className="space-y-4">
                <input 
                    type="text" 
                    placeholder="Título do Conteúdo (Opcional)"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full bg-[#111] border border-gray-700 rounded p-3 text-white focus:border-blue-500 outline-none"
                />

                {activeTab === 'link' ? (
                    <div className="relative">
                        <Youtube className="absolute left-3 top-3 text-gray-500" size={20} />
                        <input 
                            type="text" 
                            placeholder="Cole o link aqui (Youtube, Artigo...)"
                            value={url}
                            onChange={e => setUrl(e.target.value)}
                            className="w-full bg-[#111] border border-gray-700 rounded p-3 pl-10 text-white focus:border-blue-500 outline-none"
                        />
                    </div>
                ) : (
                    <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-green-500 transition cursor-pointer relative group">
                        <input 
                            type="file" 
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
                        />
                        <FileText className="mx-auto text-gray-500 mb-2 group-hover:text-green-500 transition" size={32} />
                        <p className="text-gray-400">{fileName || "Clique ou arraste PDF/DOCX aqui"}</p>
                    </div>
                )}

                <button 
                    onClick={handleImport}
                    className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition flex items-center justify-center gap-2"
                >
                    <Check size={18} /> Confirmar Importação
                </button>
            </div>
        </div>
    );
};