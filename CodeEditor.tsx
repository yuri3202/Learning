import React, { useState } from 'react';
import { Play, RotateCcw, Check, Terminal } from 'lucide-react';
import { CodeChallenge } from '../types';

interface CodeEditorProps {
    challenge: CodeChallenge;
    onComplete: () => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ challenge, onComplete }) => {
    const [code, setCode] = useState(challenge.starterCode);
    const [output, setOutput] = useState<string>('');
    const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');

    const handleRun = () => {
        setStatus('running');
        setOutput('Compilando...');
        
        // Simulating execution
        setTimeout(() => {
            if (code.length > challenge.starterCode.length + 5) {
                // Mock success condition
                setStatus('success');
                if (challenge.language === 'python') {
                    setOutput(`> Output:\nOlá IFRS\n\n[Process finished with exit code 0]`);
                } else {
                    setOutput(`> Query Result:\n| id | nome  | nota |\n|----|-------|------|\n| 01 | João  | 8.5  |\n| 02 | Maria | 9.0  |\n\n[2 rows affected]`);
                }
                onComplete();
            } else {
                setStatus('error');
                setOutput(`> Error:\nSyntaxError: unexpected EOF while parsing\n\nDica: Tente escrever mais código!`);
            }
        }, 1200);
    };

    return (
        <div className="h-full flex flex-col gap-4 animate-fade-in">
            {/* Header */}
            <div className="flex justify-between items-center p-4 bg-[#1f1f1f] rounded-t-xl border-b border-gray-800">
                <div>
                    <h3 className="font-bold text-white flex items-center gap-2">
                        {challenge.language === 'python' ? '🐍 Python 3.12' : '🗄️ MySQL'}
                        <span className={`text-[10px] px-2 py-0.5 rounded ${challenge.difficulty === 'Easy' ? 'bg-green-900 text-green-400' : 'bg-yellow-900 text-yellow-400'}`}>
                            {challenge.difficulty}
                        </span>
                    </h3>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setCode(challenge.starterCode)}
                        className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded transition"
                        title="Reset Code"
                    >
                        <RotateCcw className="w-5 h-5" />
                    </button>
                    <button 
                        onClick={handleRun}
                        disabled={status === 'running'}
                        className={`flex items-center gap-2 px-6 py-2 rounded font-bold transition ${status === 'running' ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'}`}
                    >
                        {status === 'running' ? 'Rodando...' : <><Play className="w-4 h-4 fill-current" /> Executar</>}
                    </button>
                </div>
            </div>

            <div className="flex-1 flex flex-col md:flex-row gap-4 min-h-[400px]">
                {/* Editor Area */}
                <div className="flex-1 bg-[#0d0d0d] rounded-xl border border-gray-800 p-4 font-mono text-sm relative group">
                    <textarea 
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full h-full bg-transparent text-gray-300 focus:outline-none resize-none z-10 relative leading-relaxed"
                        spellCheck={false}
                    />
                    {/* Line Numbers Fake */}
                    <div className="absolute top-4 left-0 w-8 text-right text-gray-700 select-none text-sm leading-relaxed hidden md:block">
                        1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9
                    </div>
                </div>

                {/* Output Area */}
                <div className="md:w-1/3 bg-[#0d0d0d] rounded-xl border border-gray-800 flex flex-col">
                    <div className="p-3 border-b border-gray-800 bg-[#161616] rounded-t-xl">
                        <span className="text-xs font-bold text-gray-400 flex items-center gap-2"><Terminal className="w-3 h-3" /> Console</span>
                    </div>
                    <div className="p-4 font-mono text-sm flex-1 overflow-auto">
                        {status === 'idle' && <span className="text-gray-600 italic">Clique em Executar para ver o resultado...</span>}
                        {status !== 'idle' && (
                            <pre className={`${status === 'error' ? 'text-red-400' : 'text-green-400'} whitespace-pre-wrap`}>
                                {output}
                            </pre>
                        )}
                    </div>
                    {status === 'success' && (
                        <div className="p-3 bg-green-900/20 border-t border-green-900/50 text-green-400 text-center text-xs font-bold flex items-center justify-center gap-2">
                            <Check className="w-4 h-4" /> Desafio Completado!
                        </div>
                    )}
                </div>
            </div>
            
            <div className="p-4 bg-blue-900/20 border border-blue-500/20 rounded-xl">
                <h4 className="font-bold text-blue-300 mb-1">Instruções:</h4>
                <p className="text-sm text-gray-400">{challenge.description}</p>
            </div>
        </div>
    );
};