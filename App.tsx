import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ContentRow } from './components/ContentRow';
import { VideoPlayer } from './components/VideoPlayer';
import { Kanban } from './components/Kanban';
import { Pomodoro } from './components/Pomodoro';
import { Flashcards } from './components/Flashcards';
import { SqlConsole } from './components/SqlConsole';
import { ToolsGrid } from './components/ToolsGrid';
import { Quiz } from './components/Quiz';
import { CodeDojo } from './components/CodeDojo';
import { SpacedRepetition } from './components/SpacedRepetition';
import { Mascot } from './components/Mascot';
import { MindMap } from './components/MindMap';
import { LibraryImport } from './components/LibraryImport';
import { DATABASE_VIDEOS, PYTHON_VIDEOS, IFRS_RESOURCES, FLASHCARDS_DATA, QUIZ_DATA, GENERAL_STUDIES, TRANSLATIONS } from './constants';
import { StudyItem, Language, UserProfile, Playlist } from './types';
import { ArrowLeft, Clock, CheckCircle2, TrendingUp, Sparkles, Flame, Trophy, Star, X, BrainCircuit, Network, Gamepad2, Edit2, Save, User, FolderPlus, FileText, Layers } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState('home'); 
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [showXpNotify, setShowXpNotify] = useState(false);
  const [lang, setLang] = useState<Language>('pt');
  const [searchQuery, setSearchQuery] = useState('');
  
  // -- STATE WITH PERSISTENCE --
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
      const saved = localStorage.getItem('userProfile');
      return saved ? JSON.parse(saved) : {
          name: "Estudante IFRS",
          avatar: "",
          streak: 14,
          xp: 1250,
          level: 2,
          bio: "Apaixonado por tecnologia e café. Estudando Fullstack e Game Dev!",
          trophies: []
      };
  });

  const [userLibrary, setUserLibrary] = useState<StudyItem[]>(() => {
      const saved = localStorage.getItem('userLibrary');
      return saved ? JSON.parse(saved) : [];
  });

  const [playlists, setPlaylists] = useState<Playlist[]>(() => {
      const saved = localStorage.getItem('playlists');
      return saved ? JSON.parse(saved) : [];
  });

  // -- EFFECTS --
  useEffect(() => {
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
      localStorage.setItem('userLibrary', JSON.stringify(userLibrary));
  }, [userLibrary]);

  useEffect(() => {
      localStorage.setItem('playlists', JSON.stringify(playlists));
  }, [playlists]);


  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const t = TRANSLATIONS[lang];
  const srsDueCount = 3; 

  const addXp = (amount: number) => {
    setUserProfile(prev => ({...prev, xp: prev.xp + amount}));
    setShowXpNotify(true);
    setTimeout(() => setShowXpNotify(false), 3000);
  };

  const handlePlay = (videoId: string) => {
    setSelectedVideo(videoId);
    setTimeout(() => addXp(20), 5000); 
  };

  const handleItemClick = (item: StudyItem) => {
    if (item.type === 'link' || item.type === 'pdf') {
        window.open(item.videoUrl, '_blank');
        return;
    }
    if (item.videoUrl) {
        handlePlay(item.videoUrl);
    }
  };

  const handleUserImport = (item: StudyItem) => {
      setUserLibrary(prev => [...prev, item]);
      addXp(50);
  };

  const createPlaylist = () => {
      const name = prompt("Nome da Playlist:");
      if (!name) return;
      const newPlaylist: Playlist = {
          id: Date.now().toString(),
          title: name,
          cover: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600',
          items: []
      };
      setPlaylists([...playlists, newPlaylist]);
  };

  const filterContent = (items: StudyItem[]) => {
      if(!searchQuery) return items;
      return items.filter(i => i.title.toLowerCase().includes(searchQuery.toLowerCase()) || i.category.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  // --- RENDER SECTIONS ---

  const renderHome = () => (
      <div className="px-4 md:px-12 py-8 space-y-12 animate-fade-in pb-24">
          <div className="relative overflow-hidden bg-[#161616] border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                  <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/20">
                         <Sparkles className="w-3 h-3" /> Learning+ Premium
                      </div>
                      <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                          {t.welcome} {userProfile.name.split(' ')[0]}!
                      </h1>
                      <p className="text-gray-400 max-w-lg text-lg">
                         Você tem <span className="text-red-400 font-bold">{srsDueCount}</span> revisões pendentes no Anki.
                      </p>
                      <div className="flex gap-4">
                        <button 
                            onClick={() => { setActiveView('tools'); setActiveTool('srs'); }}
                            className="mt-4 px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center gap-2"
                        >
                           <BrainCircuit size={18} /> Revisar Agora
                        </button>
                        <button 
                            onClick={() => { setActiveView('tools'); setActiveTool('game-studio'); }}
                            className="mt-4 px-8 py-3 bg-[#333] border border-gray-600 text-white font-bold rounded-full hover:bg-black transition flex items-center gap-2"
                        >
                            <Gamepad2 size={18} /> Criar Jogo
                        </button>
                      </div>
                  </div>
                  
                  {/* Stats Cards */}
                  <div className="flex gap-4">
                      <div className="glass-panel p-6 rounded-2xl text-center min-w-[120px]">
                          <div className="text-yellow-500 mb-2 flex justify-center"><Flame className="w-6 h-6 animate-pulse" /></div>
                          <span className="block text-3xl font-bold text-white">{userProfile.streak}</span>
                          <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Sequência</span>
                      </div>
                      <div className="glass-panel p-6 rounded-2xl text-center min-w-[120px]">
                          <div className="text-blue-500 mb-2 flex justify-center"><CheckCircle2 className="w-6 h-6" /></div>
                          <span className="block text-3xl font-bold text-white">42</span>
                          <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Aulas</span>
                      </div>
                  </div>
              </div>
          </div>

          <ContentRow 
            title={t.continueWatching}
            items={filterContent(DATABASE_VIDEOS.slice(0, 2))} 
            onItemClick={handleItemClick}
          />
          
          <ContentRow 
              title="Recomendado para Você"
              items={filterContent(GENERAL_STUDIES)}
              onItemClick={handleItemClick}
          />

          <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 bg-[#121212] p-6 rounded-3xl border border-gray-800 hover:border-gray-700 transition group cursor-pointer" onClick={() => { setActiveView('tools'); setActiveTool('kanban'); }}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <CheckCircle2 className="text-green-500" /> Tarefas Ativas
                    </h2>
                    <span className="text-xs text-gray-500 group-hover:text-white transition">Ver Board →</span>
                  </div>
                  <div className="space-y-3">
                      <div className="p-4 bg-[#1a1a1a] rounded-xl border border-gray-800 flex justify-between items-center">
                          <div className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-red-500"></div>
                              <span className="text-gray-200 font-medium">Modelagem ER - Exercício 3</span>
                          </div>
                          <span className="text-xs bg-red-900/30 text-red-400 px-2 py-1 rounded">Hoje</span>
                      </div>
                  </div>
              </div>

               <div className="bg-gradient-to-br from-red-900/20 to-black p-6 rounded-3xl border border-red-900/30 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                        <Clock className="text-red-500" /> Modo Foco
                    </h2>
                    <p className="text-sm text-gray-400">Maximize sua produtividade.</p>
                  </div>
                  <div className="flex items-center justify-center py-6">
                        <div className="text-center relative">
                            <div className="absolute inset-0 bg-red-500 blur-[40px] opacity-20"></div>
                            <span className="relative text-5xl font-mono font-bold text-white tracking-tighter">25:00</span>
                        </div>
                  </div>
                  <button 
                    onClick={() => { setActiveView('tools'); setActiveTool('pomodoro'); }}
                    className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition"
                  >
                      Iniciar
                  </button>
              </div>
          </div>
      </div>
  );

  const renderLibrary = () => (
      <div className="animate-fade-in pb-32 pt-24 px-4 md:px-12">
        <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold text-white">{t.library}</h2>
            <button onClick={createPlaylist} className="flex items-center gap-2 bg-[#333] hover:bg-white text-white hover:text-black px-4 py-2 rounded-full transition text-sm font-bold">
                <FolderPlus size={16} /> Nova Playlist
            </button>
        </div>
        
        <LibraryImport onImport={handleUserImport} />

        {playlists.length > 0 && (
             <div className="mb-12">
                 <h3 className="text-xl font-bold text-white mb-4">Suas Playlists</h3>
                 <div className="flex gap-4 overflow-x-auto pb-4">
                     {playlists.map(pl => (
                         <div key={pl.id} className="min-w-[200px] bg-[#1a1a1a] rounded-lg border border-gray-800 p-3 hover:border-gray-600 transition cursor-pointer">
                             <div className="w-full h-32 bg-gray-800 rounded mb-2 overflow-hidden">
                                 <img src={pl.cover} alt={pl.title} className="w-full h-full object-cover opacity-70" />
                             </div>
                             <h4 className="font-bold text-white truncate">{pl.title}</h4>
                             <span className="text-xs text-gray-500">{pl.items.length} itens</span>
                         </div>
                     ))}
                 </div>
             </div>
        )}

        <div className="space-y-12">
            <ContentRow 
                title={t.tech} 
                items={filterContent(DATABASE_VIDEOS.concat(PYTHON_VIDEOS))} 
                onItemClick={handleItemClick}
            />
            <ContentRow 
                title={t.generalStudies}
                items={filterContent(GENERAL_STUDIES)}
                onItemClick={handleItemClick}
            />
             <ContentRow 
                title="IFRS - Documentos" 
                items={IFRS_RESOURCES} 
                onItemClick={handleItemClick}
            />
        </div>
      </div>
  );

  const renderImports = () => (
      <div className="animate-fade-in pb-32 pt-24 px-4 md:px-12 min-h-screen">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <FileText className="text-blue-500" /> Meus Arquivos Importados
          </h2>
          
          {userLibrary.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-800 rounded-2xl text-gray-500">
                  <FileText size={48} className="mb-4 opacity-50" />
                  <p>Você ainda não importou nenhum conteúdo.</p>
                  <button onClick={() => setActiveView('library')} className="mt-4 text-blue-500 hover:underline">Ir para Biblioteca</button>
              </div>
          ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userLibrary.map(item => (
                      <div key={item.id} onClick={() => handleItemClick(item)} className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800 hover:border-blue-500 transition cursor-pointer group">
                          <div className="flex items-start justify-between mb-3">
                              <div className={`p-2 rounded-lg ${item.type === 'pdf' ? 'bg-red-900/30 text-red-400' : 'bg-blue-900/30 text-blue-400'}`}>
                                  {item.type === 'pdf' ? <FileText size={20} /> : <Layers size={20} />}
                              </div>
                              <span className="text-xs text-gray-500 bg-black/50 px-2 py-1 rounded">{item.duration}</span>
                          </div>
                          <h3 className="font-bold text-white group-hover:text-blue-400 transition truncate">{item.title}</h3>
                          <p className="text-xs text-gray-500 mt-1 truncate">{item.description}</p>
                      </div>
                  ))}
              </div>
          )}
      </div>
  );

  const renderTools = () => (
      <div className="pt-24 px-4 md:px-12 pb-20 min-h-screen animate-fade-in bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-background to-background">
          {!activeTool ? (
              <>
                <div className="mb-12">
                    <h1 className="text-4xl font-extrabold text-white mb-4">{t.tools}</h1>
                    <p className="text-gray-400 max-w-2xl">Acesse utilitários de estudo, simuladores de código e sistemas de revisão.</p>
                </div>
                <ToolsGrid onSelectTool={setActiveTool} lang={lang} />
                
                <div className="mt-16 pt-16 border-t border-gray-800">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-white">Quadro Kanban</h2>
                    </div>
                    <Kanban />
                </div>
              </>
          ) : (
              <div className="h-[85vh] flex flex-col max-w-7xl mx-auto">
                  <div className="flex items-center justify-between mb-6">
                    <button 
                        onClick={() => setActiveTool(null)} 
                        className="flex items-center gap-2 text-gray-400 hover:text-white px-4 py-2 rounded-full hover:bg-white/5 transition"
                    >
                        <ArrowLeft className="w-5 h-5" /> Voltar
                    </button>
                    <span className="text-gray-500 text-sm font-mono uppercase tracking-widest">{activeTool.replace('-', ' ')}</span>
                  </div>
                  
                  <div className="flex-1 bg-[#121212] rounded-3xl border border-gray-800 overflow-hidden relative shadow-2xl">
                        {activeTool === 'sql' && <SqlConsole />}
                        {activeTool === 'pomodoro' && <Pomodoro />}
                        {activeTool === 'flashcards' && <Flashcards items={FLASHCARDS_DATA} />}
                        {activeTool === 'quiz' && <Quiz questions={QUIZ_DATA} onComplete={addXp} />}
                        
                        {/* Separate Logic for Code Tools */}
                        {activeTool === 'game-studio' && <CodeDojo mode="game" />}
                        {activeTool === 'code-lab' && <CodeDojo mode="standard" />}
                        
                        {activeTool === 'srs' && <SpacedRepetition />}
                        {activeTool === 'mindmap' && <MindMap />}
                  </div>
              </div>
          )}
      </div>
  );

  const renderProfile = () => {
    // Generate Stats based on XP/Mock data
    const pieData = [
        { name: 'Tech', value: 450, color: '#3b82f6' },
        { name: 'Mat/Fís', value: 320, color: '#eab308' },
        { name: 'Inglês', value: 210, color: '#a855f7' },
        { name: 'Projetos', value: 150, color: '#ef4444' },
    ];

    const barData = [
        { day: 'Seg', xp: 120 }, { day: 'Ter', xp: 200 }, { day: 'Qua', xp: 150 },
        { day: 'Qui', xp: 300 }, { day: 'Sex', xp: 180 }, { day: 'Sab', xp: 90 }, { day: 'Dom', xp: 100 }
    ];
    
    return (
      <div className="pt-24 px-4 md:px-12 pb-20 animate-fade-in min-h-screen">
           <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold text-white flex items-center gap-4">
                    <User className="text-blue-500 w-10 h-10" /> {t.profile} & {t.rankings}
                </h1>
                <button onClick={() => setIsEditingProfile(!isEditingProfile)} className="bg-[#1f1f1f] hover:bg-white/10 px-4 py-2 rounded-lg text-sm text-white flex items-center gap-2 transition">
                    <Edit2 size={14} /> {isEditingProfile ? 'Cancelar Edição' : 'Editar Perfil'}
                </button>
           </div>

           {/* Profile Header Card */}
           <div className="bg-gradient-to-r from-[#1a1a1a] to-[#121212] p-8 rounded-3xl border border-gray-800 mb-8 flex flex-col md:flex-row items-center gap-8 shadow-xl">
               <div className="relative group">
                   <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-5xl font-bold ring-4 ring-white/10 overflow-hidden">
                       {userProfile.avatar ? <img src={userProfile.avatar} alt="Avatar" className="w-full h-full object-cover" /> : userProfile.name.charAt(0)}
                   </div>
               </div>
               
               <div className="flex-1 text-center md:text-left space-y-4 w-full">
                   {isEditingProfile ? (
                       <div className="space-y-4 max-w-lg bg-[#0a0a0a] p-6 rounded-xl border border-gray-700">
                           <div>
                               <label className="text-xs text-gray-500 block mb-1">Nome de Usuário</label>
                               <input 
                                value={userProfile.name} 
                                onChange={e => setUserProfile({...userProfile, name: e.target.value})}
                                className="bg-[#111] border border-gray-700 p-2 rounded w-full text-white focus:border-blue-500 outline-none"
                                placeholder="Seu Nome"
                               />
                           </div>
                           <div>
                               <label className="text-xs text-gray-500 block mb-1">Biografia</label>
                               <textarea 
                                value={userProfile.bio} 
                                onChange={e => setUserProfile({...userProfile, bio: e.target.value})}
                                className="bg-[#111] border border-gray-700 p-2 rounded w-full text-white h-24 resize-none focus:border-blue-500 outline-none"
                                placeholder="Sua Biografia"
                               />
                           </div>
                           <div>
                               <label className="text-xs text-gray-500 block mb-1">Upload Avatar</label>
                               <input 
                                type="file" 
                                onChange={e => {
                                    if (e.target.files && e.target.files[0]) {
                                        const reader = new FileReader();
                                        reader.onload = (ev) => setUserProfile({...userProfile, avatar: ev.target?.result as string});
                                        reader.readAsDataURL(e.target.files[0]);
                                    }
                                }}
                                className="text-sm text-gray-500 w-full"
                               />
                           </div>
                           <button onClick={() => setIsEditingProfile(false)} className="bg-green-600 w-full py-2 rounded text-white font-bold flex items-center justify-center gap-2"><Save size={16} /> Salvar Alterações</button>
                       </div>
                   ) : (
                       <>
                        <div>
                            <h2 className="text-3xl font-bold text-white">{userProfile.name}</h2>
                            <span className="text-blue-400 font-bold">Nível {Math.floor(userProfile.xp / 1000) + 1}</span>
                            <span className="text-gray-500 mx-2">•</span>
                            <span className="text-gray-400">{userProfile.xp} XP</span>
                        </div>
                        <p className="text-gray-300 max-w-2xl text-lg italic">{userProfile.bio}</p>
                       </>
                   )}
               </div>

               <div className="flex gap-4">
                   <div className="text-center p-4 bg-white/5 rounded-2xl min-w-[100px]">
                       <span className="block text-2xl font-bold text-orange-500">{userProfile.streak} 🔥</span>
                       <span className="text-xs text-gray-500 uppercase">Sequência</span>
                   </div>
                   <div className="text-center p-4 bg-white/5 rounded-2xl min-w-[100px]">
                       <span className="block text-2xl font-bold text-blue-500">{userLibrary.length}</span>
                       <span className="text-xs text-gray-500 uppercase">Arquivos</span>
                   </div>
               </div>
           </div>

           <div className="grid md:grid-cols-2 gap-8">
                {/* Subject Distribution */}
                <div className="bg-[#121212] p-8 rounded-3xl border border-gray-800 h-[400px] relative overflow-hidden">
                    <h3 className="text-xl font-bold text-white mb-6">Distribuição de Estudos</h3>
                    <ResponsiveContainer width="100%" height="90%">
                        <PieChart>
                            <Pie 
                                data={pieData} 
                                cx="50%" cy="50%" 
                                innerRadius={80} 
                                outerRadius={120} 
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ backgroundColor: 'rgba(20,20,20,0.9)', border: '1px solid #333', borderRadius: '12px', color: '#fff' }} 
                                itemStyle={{ color: '#fff' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none pt-8">
                        <div className="text-center">
                            <span className="block text-4xl font-bold text-white">24h</span>
                            <span className="text-gray-500 text-sm">Total</span>
                        </div>
                    </div>
                </div>

                {/* Weekly Activity */}
                <div className="bg-[#121212] p-8 rounded-3xl border border-gray-800 h-[400px]">
                    <h3 className="text-xl font-bold text-white mb-6">Atividade Semanal (XP)</h3>
                    <ResponsiveContainer width="100%" height="90%">
                        <BarChart data={barData}>
                            <XAxis dataKey="day" stroke="#555" tick={{fill: '#888'}} />
                            <YAxis stroke="#555" tick={{fill: '#888'}} />
                            <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', color: '#fff' }} />
                            <Bar dataKey="xp" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
           </div>

            {/* Trophies */}
           <div className="mt-8 bg-[#121212] p-8 rounded-3xl border border-gray-800">
               <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                   <Trophy className="text-yellow-500" /> Sala de Troféus
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition">
                        <div className="p-3 bg-yellow-500/20 rounded-full text-yellow-500"><Sparkles size={20} /></div>
                        <div>
                            <p className="font-bold text-white text-sm">Poliglota</p>
                            <p className="text-xs text-gray-400 mt-1">Estudou 3 linguagens diferentes.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition">
                        <div className="p-3 bg-blue-500/20 rounded-full text-blue-500"><Clock size={20} /></div>
                        <div>
                            <p className="font-bold text-white text-sm">Focado</p>
                            <p className="text-xs text-gray-400 mt-1">500 min de Pomodoro.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition">
                        <div className="p-3 bg-green-500/20 rounded-full text-green-500"><Gamepad2 size={20} /></div>
                        <div>
                            <p className="font-bold text-white text-sm">Game Dev</p>
                            <p className="text-xs text-gray-400 mt-1">Criou seu primeiro jogo.</p>
                        </div>
                    </div>
               </div>
           </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30">
      <Navbar 
        activeView={activeView} 
        setView={(v) => { setActiveView(v); setActiveTool(null); }} 
        xp={userProfile.xp} 
        lang={lang} 
        setLang={setLang}
        srsDueCount={srsDueCount}
        onSearch={setSearchQuery}
        toggleProfile={() => setActiveView('profile')}
      />
      
      {/* Interactive Mascot */}
      <Mascot />

      {/* XP Notification */}
      <div className={`fixed top-24 right-8 z-[90] bg-yellow-500 text-black px-6 py-3 rounded-xl font-bold shadow-2xl transform transition-all duration-500 flex items-center gap-3 ${showXpNotify ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0 pointer-events-none'}`}>
          <Sparkles className="w-5 h-5 animate-spin-slow" /> +XP Atualizado!
      </div>

      <main className="relative z-0">
          {activeView === 'home' && <div className="pt-24">{renderHome()}</div>}
          {activeView === 'library' && renderLibrary()}
          {activeView === 'imports' && renderImports()}
          {activeView === 'tools' && renderTools()}
          {activeView === 'profile' && renderProfile()}
      </main>

      {selectedVideo && (
        <VideoPlayer 
          videoId={selectedVideo} 
          onClose={() => setSelectedVideo(null)} 
        />
      )}
    </div>
  );
};

export default App;