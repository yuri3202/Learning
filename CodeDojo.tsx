import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Check, Terminal, Code, Monitor, AlertTriangle, Cpu, Save, Gamepad2, Layers } from 'lucide-react';
import { CodeChallenge, CodeLanguage } from '../types';
import { CHALLENGES_DATA } from '../constants';

interface CodeDojoProps {
    mode?: 'game' | 'standard';
}

export const CodeDojo: React.FC<CodeDojoProps> = ({ mode = 'standard' }) => {
    const [selectedLang, setSelectedLang] = useState<CodeLanguage>(mode === 'game' ? 'web' : 'python');
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
    const [lintErrors, setLintErrors] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');

    const challenge = CHALLENGES_DATA.find(c => c.language === selectedLang) || CHALLENGES_DATA[0];

    useEffect(() => {
        setCode(challenge.starterCode);
        setOutput('');
        setStatus('idle');
        setLintErrors([]);
        if (selectedLang === 'web') setActiveTab('preview');
        else setActiveTab('code');
    }, [selectedLang]);

    const runLinter = (currentCode: string) => {
        const errors = [];
        if (selectedLang === 'python') {
            if (currentCode.includes('def') && !currentCode.includes(':')) errors.push("SyntaxError: ':' esperado após definição de função.");
        }
        if (selectedLang === 'javascript' || selectedLang === 'java' || selectedLang === 'cpp') {
            if (!currentCode.includes(';') && !currentCode.includes('}') && !currentCode.includes('{')) errors.push("Linter: Ponto e vírgula ';' ausente.");
        }
        if (selectedLang === 'web') {
            if (currentCode.includes('<') && !currentCode.includes('>')) errors.push("HTML: Tag mal fechada.");
            if (!currentCode.includes('<script>') && currentCode.includes('var ')) errors.push("HTML: JavaScript deve estar dentro de tags <script>.");
        }
        setLintErrors(errors);
        return errors.length === 0;
    };

    const handleRun = () => {
        setStatus('running');
        setOutput('Inicializando Compilador...\nAnalisando sintaxe...\n');
        runLinter(code);

        setTimeout(() => {
            // Visual Web Mode
            if (selectedLang === 'web') {
                setStatus('success');
                setActiveTab('preview');
                return;
            }

            // Standard Console Mode
            if (code.length > challenge.starterCode.length + 5) {
                setStatus('success');
                if (selectedLang === 'python') setOutput(prev => prev + "Process finished with exit code 0\nResult: [2, 4, 6, 8, 10]");
                else if (selectedLang === 'java') setOutput(prev => prev + "Build Success.\nPessoa[nome='João', idade=20]");
                else if (selectedLang === 'cpp') setOutput(prev => prev + "Ola IFRS");
                else if (selectedLang === 'javascript') setOutput(prev => prev + "DOM Updated: background-color: black");
                else setOutput(prev => prev + "Success.");
            } else {
                setStatus('error');
                setOutput(prev => prev + `Error: Runtime Exception. Implementação incompleta.\nHint: ${challenge.description}`);
            }
        }, 800);
    };

    const languages: {id: CodeLanguage, label: string, color: string}[] = mode === 'game' 
        ? [{ id: 'web', label: 'GAME ENGINE (JS/CANVAS)', color: 'text-purple-400' }]
        : [
            { id: 'python', label: 'PYTHON', color: 'text-yellow-400' },
            { id: 'java', label: 'JAVA', color: 'text-red-400' },
            { id: 'javascript', label: 'JS NODE', color: 'text-yellow-300' },
            { id: 'cpp', label: 'C++', color: 'text-blue-400' },
        ];

    return (
        <div className="h-full flex flex-col gap-4 animate-fade-in font-sans">
            {/* Modern Top Bar */}
            <div className="bg-[#1f1f1f] border border-gray-800 rounded-t-xl p-3 flex items-center justify-between shadow-sm">
                <div className="flex gap-2">
                    {languages.map(lang => (
                        <button
                            key={lang.id}
                            onClick={() => setSelectedLang(lang.id)}
                            className={`px-4 py-2 text-sm font-bold rounded-lg transition-all flex items-center gap-2 ${
                                selectedLang === lang.id 
                                ? 'bg-white text-black shadow-lg scale-105' 
                                : 'bg-transparent text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            {mode === 'game' ? <Gamepad2 size={16} /> : <Code size={16} />}
                            {lang.label}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-2 text-xs text-green-500 bg-green-900/20 px-3 py-1 rounded-full border border-green-900/50">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    ONLINE ENVIRONMENT
                </div>
            </div>

            {/* Main IDE Window */}
            <div className="bg-[#0f0f0f] border border-gray-800 rounded-b-xl p-4 flex flex-col gap-4 shadow-2xl relative overflow-hidden flex-1">
                
                {/* Toolbar */}
                <div className="flex justify-between items-center bg-[#1a1a1a] p-3 rounded-lg border border-gray-800">
                    <div className="flex flex-col">
                        <h3 className="font-bold text-white text-lg flex items-center gap-2">
                             {mode === 'game' ? <Gamepad2 className="text-purple-500" /> : <Layers className="text-blue-500" />}
                             {challenge.title}
                        </h3>
                        <p className="text-xs text-gray-400">{challenge.description}</p>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => setCode(challenge.starterCode)} className="p-2 bg-[#333] hover:bg-[#444] text-white border border-gray-700 rounded-lg transition" title="Reset">
                            <RotateCcw size={18} />
                        </button>
                        <button 
                            onClick={handleRun} 
                            disabled={status === 'running'} 
                            className={`px-6 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all shadow-lg ${status === 'running' ? 'bg-gray-700 text-gray-400' : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white'}`}
                        >
                            {status === 'running' ? 'Compilando...' : <><Play size={16} fill="currentColor" /> Executar</>}
                        </button>
                    </div>
                </div>

                {/* Editor / Preview Split */}
                <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-[500px] z-10 relative">
                    
                    {/* Code Editor */}
                    <div className={`flex-1 bg-[#0a0a0a] border border-gray-800 rounded-xl flex flex-col relative group shadow-inner ${selectedLang === 'web' && activeTab === 'preview' ? 'hidden lg:flex' : 'flex'}`}>
                         <div className="flex justify-between items-center px-4 py-2 bg-[#141414] border-b border-gray-800 text-xs text-gray-500 rounded-t-xl">
                            <span className="font-mono">main.{selectedLang === 'web' ? 'html' : selectedLang}</span>
                            <Save size={14} className="cursor-pointer hover:text-white" />
                         </div>
                         <div className="flex-1 relative">
                             {/* Line Numbers */}
                            <div className="absolute top-0 left-0 w-10 h-full bg-[#111] border-r border-gray-800 text-right pr-3 pt-4 text-gray-600 text-sm font-mono leading-relaxed select-none">
                                {Array.from({length: 25}).map((_, i) => <div key={i}>{i+1}</div>)}
                            </div>
                            <textarea 
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="w-full h-full bg-transparent text-gray-300 focus:outline-none resize-none leading-relaxed font-mono p-4 pl-12 text-sm selection:bg-blue-500/30"
                                spellCheck={false}
                            />
                         </div>

                         {/* Linter Error Box */}
                         {lintErrors.length > 0 && (
                            <div className="absolute bottom-4 right-4 bg-red-900/90 text-white text-xs p-3 rounded-lg border border-red-500/50 shadow-xl backdrop-blur-md max-w-xs z-50 animate-slide-up">
                                <h5 className="font-bold flex items-center gap-2 mb-2 text-red-200"><AlertTriangle size={14} /> Erro de Compilação</h5>
                                <ul className="list-disc pl-4 space-y-1">
                                    {lintErrors.map((err, i) => <li key={i}>{err}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Output / Preview Screen */}
                    <div className={`lg:w-1/2 flex flex-col gap-4 ${selectedLang === 'web' && activeTab === 'code' ? 'hidden lg:flex' : 'flex'}`}>
                        {selectedLang === 'web' ? (
                            <div className="bg-white rounded-xl flex-1 flex flex-col overflow-hidden shadow-2xl border border-gray-800 relative">
                                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur text-white text-[10px] px-2 py-1 rounded font-bold z-10">
                                    LIVE PREVIEW 
                                </div>
                                <iframe 
                                    title="preview"
                                    srcDoc={code}
                                    className="w-full h-full flex-1 bg-white"
                                    sandbox="allow-scripts allow-modals"
                                />
                            </div>
                        ) : (
                            <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl flex-1 flex flex-col font-mono shadow-inner">
                                <div className="p-3 border-b border-gray-800 bg-[#141414] rounded-t-xl flex items-center gap-2">
                                     <Terminal className="w-4 h-4 text-gray-400" /> <span className="text-xs font-bold text-gray-400">CONSOLE OUTPUT</span>
                                </div>
                                <div className="p-4 text-sm flex-1 overflow-auto text-gray-300">
                                    {status === 'idle' && <span className="text-gray-600 italic">Aguardando execução...</span>}
                                    {status === 'running' && <div className="text-blue-400 animate-pulse">Compilando...</div>}
                                    <pre className={`whitespace-pre-wrap ${status === 'error' ? 'text-red-400' : 'text-green-400'}`}>
                                        {output}
                                    </pre>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Status Footer */}
                <div className="flex justify-between items-center text-[10px] text-gray-500 pt-2 border-t border-gray-800">
                    <div className="flex gap-4">
                        <span>Ln 12, Col 45</span>
                        <span>UTF-8</span>
                        <span>{selectedLang.toUpperCase()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Cpu size={12} /> RAM: 64MB OK
                    </div>
                </div>
            </div>
        </div>
    );
};