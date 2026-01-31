import React, { useState, useRef, useEffect } from 'react';
import { Plus, X, Move, Save } from 'lucide-react';
import { MindNode } from '../types';

export const MindMap: React.FC = () => {
    const [nodes, setNodes] = useState<MindNode[]>([
        { id: 1, x: 400, y: 300, label: 'Central Idea', color: '#3b82f6', connections: [] }
    ]);
    const [selectedNode, setSelectedNode] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Load from local storage on mount
    useEffect(() => {
        const savedMap = localStorage.getItem('userMindMap');
        if (savedMap) {
            try {
                setNodes(JSON.parse(savedMap));
            } catch(e) { console.error("Could not load map"); }
        }
    }, []);

    const saveMap = () => {
        localStorage.setItem('userMindMap', JSON.stringify(nodes));
        alert("Mapa mental salvo com sucesso!");
    };

    const addNode = (e: React.MouseEvent) => {
        if (selectedNode !== null) return; // Don't add if selecting
        if (!containerRef.current) return;
        
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newNode: MindNode = {
            id: Date.now(),
            x,
            y,
            label: 'Nova Ideia',
            color: '#a855f7',
            connections: []
        };
        setNodes([...nodes, newNode]);
    };

    const handleNodeClick = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        if (selectedNode === null) {
            setSelectedNode(id);
        } else if (selectedNode !== id) {
            // Connect
            setNodes(nodes.map(n => {
                if (n.id === selectedNode) {
                    return { ...n, connections: [...n.connections, id] };
                }
                return n;
            }));
            setSelectedNode(null);
        } else {
            setSelectedNode(null);
        }
    };

    const deleteNode = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        setNodes(nodes.filter(n => n.id !== id).map(n => ({
            ...n,
            connections: n.connections.filter(c => c !== id)
        })));
        if (selectedNode === id) setSelectedNode(null);
    };

    const updateLabel = (id: number, newLabel: string) => {
        setNodes(nodes.map(n => n.id === id ? { ...n, label: newLabel } : n));
    };

    return (
        <div className="h-full flex flex-col animate-fade-in relative group/map">
            <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur p-4 rounded-xl border border-white/10 text-xs text-gray-300 pointer-events-none transition-opacity opacity-0 group-hover/map:opacity-100">
                <p className="font-bold text-white mb-1">Como usar:</p>
                <ul className="list-disc pl-4 space-y-1">
                    <li>Clique no fundo para criar um nó.</li>
                    <li>Clique em um nó e depois em outro para conectar.</li>
                    <li>Clique no 'X' para deletar.</li>
                    <li>Edite o texto direto no balão.</li>
                </ul>
            </div>

            <button 
                onClick={saveMap}
                className="absolute top-4 right-4 z-20 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow-lg transition"
            >
                <Save size={16} /> Salvar Mapa
            </button>

            <div 
                ref={containerRef}
                className="flex-1 bg-[#111] relative overflow-hidden cursor-crosshair border border-gray-800 rounded-xl shadow-inner"
                onClick={addNode}
                style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '20px 20px' }}
            >
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {nodes.map(node => 
                        node.connections.map(targetId => {
                            const target = nodes.find(n => n.id === targetId);
                            if (!target) return null;
                            return (
                                <line 
                                    key={`${node.id}-${targetId}`}
                                    x1={node.x} y1={node.y}
                                    x2={target.x} y2={target.y}
                                    stroke="rgba(255,255,255,0.2)"
                                    strokeWidth="2"
                                />
                            );
                        })
                    )}
                </svg>

                {nodes.map(node => (
                    <div
                        key={node.id}
                        onClick={(e) => handleNodeClick(e, node.id)}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-full shadow-xl border-2 transition-all duration-300 flex items-center justify-center min-w-[100px] min-h-[100px] group ${selectedNode === node.id ? 'scale-110 border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'border-transparent hover:scale-105'}`}
                        style={{ 
                            left: node.x, 
                            top: node.y, 
                            backgroundColor: selectedNode === node.id ? node.color : `${node.color}40`,
                            borderColor: node.color
                        }}
                    >
                        <input 
                            value={node.label}
                            onChange={(e) => updateLabel(node.id, e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-transparent text-white text-center text-sm font-bold focus:outline-none w-full pointer-events-auto"
                        />
                        <button 
                            onClick={(e) => deleteNode(e, node.id)}
                            className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition pointer-events-auto"
                        >
                            <X size={10} className="text-white" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};