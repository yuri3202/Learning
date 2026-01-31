import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, MessageSquare, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';

export const Mascot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: 1, sender: 'ai', text: "Olá! Sou Lumi, sua inteligência artificial de estudos. Como posso ajudar você a aprender hoje?", timestamp: new Date() }
    ]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg: ChatMessage = { id: Date.now(), sender: 'user', text: input, timestamp: new Date() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Improved AI Logic Simulation
        setTimeout(() => {
            let replyText = "Entendi. Pode me dar mais detalhes?";
            const lowerInput = userMsg.text.toLowerCase();

            if (lowerInput.includes('python')) replyText = "Python é ótimo! Lembre-se que a indentação é fundamental. Quer ver um exemplo de função?";
            else if (lowerInput.includes('sql') || lowerInput.includes('banco')) replyText = "Para bancos de dados, foque em entender a diferença entre INNER JOIN e LEFT JOIN. Quer abrir o simulador?";
            else if (lowerInput.includes('erro') || lowerInput.includes('bug')) replyText = "Erros acontecem! Verifique a sintaxe, pontos e vírgulas, e nomes de variáveis. Posso analisar seu código se você colar aqui.";
            else if (lowerInput.includes('jogo') || lowerInput.includes('game')) replyText = "Que tal criar um jogo? Vá até o 'Game Studio' nas ferramentas. Lá temos um template de Snake Game pronto!";
            else if (lowerInput.includes('ajuda')) replyText = "Posso te ajudar com:\n1. Explicações de código.\n2. Organização de estudos (Kanban/Pomodoro).\n3. Testes de conhecimento (Quiz).";
            else if (lowerInput.includes('oi') || lowerInput.includes('ola')) replyText = "Olá! Pronto para superar seus limites hoje?";

            const aiMsg: ChatMessage = { id: Date.now() + 1, sender: 'ai', text: replyText, timestamp: new Date() };
            setMessages(prev => [...prev, aiMsg]);
        }, 800);
    };

    return (
        <div className="fixed bottom-8 right-8 z-[60] flex flex-col items-end pointer-events-none">
            {/* Modern Chat Window */}
            <div className={`pointer-events-auto bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 w-80 md:w-96 rounded-2xl shadow-2xl transition-all duration-300 origin-bottom-right transform overflow-hidden ${isOpen ? 'scale-100 opacity-100 mb-4 translate-y-0' : 'scale-0 opacity-0 translate-y-20'}`}>
                
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex justify-between items-center text-white">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                            <Sparkles size={16} className="text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm">Lumi AI</h3>
                            <span className="text-[10px] text-blue-200 block">Assistente Inteligente</span>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-2 rounded-full transition"><X size={16} /></button>
                </div>

                {/* Messages Area */}
                <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#111] to-[#0a0a0a] custom-scrollbar">
                    {messages.map(msg => (
                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.sender === 'ai' && (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center mr-2 mt-1 shadow-lg shrink-0">
                                    <Bot size={16} className="text-white" />
                                </div>
                            )}
                            <div className={`max-w-[80%] p-3 text-sm leading-relaxed rounded-2xl shadow-md ${msg.sender === 'user' ? 'bg-white text-black rounded-tr-none' : 'bg-[#2a2a2a] text-gray-100 rounded-tl-none border border-white/5'}`}>
                                {msg.text.split('\n').map((line, i) => <p key={i} className="mb-1 last:mb-0">{line}</p>)}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-3 bg-[#1a1a1a] border-t border-white/5 flex gap-2">
                    <input 
                        className="flex-1 bg-[#0a0a0a] text-white text-sm px-4 py-2.5 rounded-full border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition placeholder-gray-500"
                        placeholder="Pergunte algo..."
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSend()}
                    />
                    <button onClick={handleSend} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white p-2.5 rounded-full shadow-lg transform active:scale-95 transition">
                        <Send size={18} />
                    </button>
                </div>
            </div>
            
            {/* Floating Button */}
            <button 
                className={`pointer-events-auto group relative w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)] flex items-center justify-center transition-all hover:scale-110 active:scale-95 ${isOpen ? 'rotate-90 scale-0 opacity-0 absolute' : 'scale-100 opacity-100'}`}
                onClick={() => setIsOpen(true)}
            >
                <Bot size={32} className="text-white drop-shadow-md" />
                <span className="absolute top-0 right-0 w-4 h-4 bg-green-500 border-2 border-[#0a0a0a] rounded-full animate-pulse"></span>
                
                {/* Tooltip */}
                <div className="absolute right-full mr-4 bg-white text-black px-4 py-2 rounded-xl text-xs font-bold shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition transform translate-x-4 group-hover:translate-x-0">
                    Fale com o Lumi!
                </div>
            </button>
        </div>
    );
};