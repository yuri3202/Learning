import React, { useState, useRef, useEffect } from 'react';
import { DBQueryLog } from '../types';

export const SqlConsole: React.FC = () => {
  const [sqlCommand, setSqlCommand] = useState('');
  const [logs, setLogs] = useState<DBQueryLog[]>([
     { id: 1, command: 'SELECT * FROM tarefas WHERE status="pendente"', timestamp: '10:00:23', status: 'success' },
     { id: 2, command: 'UPDATE alunos SET nota=10 WHERE id=1', timestamp: '10:05:12', status: 'success' },
  ]);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const runSQL = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sqlCommand.trim()) return;
    setTimeout(() => {
        const isError = Math.random() > 0.8;
        setLogs(prev => [...prev, {
            id: Date.now(),
            command: sqlCommand,
            timestamp: new Date().toLocaleTimeString(),
            status: isError ? 'error' : 'success'
        }]);
        setSqlCommand('');
    }, 200);
  };

  return (
    <div className="flex flex-col h-full font-mono bg-[#0f0f0f] rounded-lg border border-gray-800 overflow-hidden shadow-inner">
        <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-b border-gray-800">
            <span className="text-xs text-gray-400">root@ifrs-db-server:~/projects</span>
            <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
        </div>
        <div className="flex-1 p-4 overflow-y-auto space-y-2 text-sm">
            {logs.map(log => (
            <div key={log.id} className="flex flex-col md:flex-row md:gap-2">
                <span className="text-gray-600 shrink-0">[{log.timestamp}]</span>
                <div className="flex gap-2">
                    <span className="text-blue-500 shrink-0">➜</span>
                    <span className={log.status === 'error' ? 'text-red-400' : 'text-green-400'}>{log.command}</span>
                </div>
                {log.status === 'error' && <span className="block text-red-500 ml-8 text-xs opacity-80">Error: Syntax error near token 'WHERE' or permission denied.</span>}
                {log.status === 'success' && <span className="block text-gray-500 ml-8 text-xs opacity-60">Query OK, 1 row affected (0.02 sec)</span>}
            </div>
            ))}
            <div ref={logEndRef} />
        </div>
        <form onSubmit={runSQL} className="bg-[#1f1f1f] p-2 flex gap-2 border-t border-gray-800">
            <span className="text-green-500 self-center pl-2 animate-pulse">➜</span>
            <input 
                type="text" 
                value={sqlCommand}
                onChange={(e) => setSqlCommand(e.target.value)}
                className="flex-1 bg-transparent border-none focus:ring-0 text-white font-mono text-sm"
                placeholder="Digite seu comando..."
                autoFocus
            />
        </form>
    </div>
  );
};