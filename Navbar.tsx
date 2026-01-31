import React, { useState, useEffect } from 'react';
import { Bell, Search, Layout, BookOpen, PenTool, BarChart, Trophy, Star, Settings, Globe, User, Menu, X, LogOut, HelpCircle, FileText } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface NavbarProps {
  activeView: string;
  setView: (view: string) => void;
  xp: number;
  lang: Language;
  setLang: (l: Language) => void;
  srsDueCount: number;
  onSearch: (q: string) => void;
  toggleProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeView, setView, xp, lang, setLang, srsDueCount, onSearch, toggleProfile }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: t.dashboard, icon: Layout },
    { id: 'library', label: t.library, icon: BookOpen },
    { id: 'tools', label: t.tools, icon: PenTool },
    { id: 'imports', label: 'Meus Arquivos', icon: FileText }
  ];

  const level = Math.floor(xp / 1000) + 1;
  const progressToNext = (xp % 1000) / 10; 

  const handleMenuClick = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-md shadow-2xl border-b border-white/5' : 'bg-gradient-to-b from-black/90 via-black/60 to-transparent'}`}>
      <div className="px-4 md:px-8 py-3 flex items-center justify-between">
        
        <div className="flex items-center gap-4 md:gap-8">
           {/* Menu Button */}
          <button onClick={handleMenuClick} className="text-gray-300 hover:text-white transition">
             <Menu size={24} />
          </button>

          <h1 onClick={() => setView('home')} className="hidden md:block text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 tracking-tighter cursor-pointer hover:scale-105 transition-transform select-none">
            LEARNING+
          </h1>
          
          <ul className="hidden md:flex gap-6 text-sm font-medium text-gray-400">
            {navItems.map((item) => (
              <li 
                key={item.id}
                onClick={() => setView(item.id)}
                className={`flex items-center gap-2 cursor-pointer transition-all hover:text-white px-3 py-2 rounded-lg ${activeView === item.id ? 'bg-white/10 text-white font-bold' : ''}`}
              >
                <item.icon size={16} />
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4 text-white">
            {/* Search */}
            <div className="relative hidden lg:block group">
                <Search className="absolute left-3 top-2.5 text-gray-500 group-hover:text-blue-500 transition" size={16} />
                <input 
                    type="text" 
                    placeholder={t.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); onSearch(e.target.value); }}
                    className="bg-[#1f1f1f] border border-gray-700 rounded-full py-2 pl-10 pr-4 text-sm w-48 focus:w-64 transition-all focus:border-blue-500 outline-none"
                />
            </div>

            {/* Language Toggle */}
            <button 
                onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
                className="p-2 hover:bg-white/10 rounded-full transition text-gray-400 hover:text-white"
                title="Change Language"
            >
                <Globe size={20} />
            </button>

          {/* XP Display */}
          <div onClick={toggleProfile} className="hidden md:flex items-center gap-3 bg-white/5 px-4 py-1.5 rounded-full border border-white/10 hover:border-blue-500/50 transition group cursor-pointer relative">
             <div className="p-1 bg-blue-500/20 rounded-full text-blue-400 group-hover:rotate-12 transition">
                <Trophy className="w-4 h-4" />
             </div>
             <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{t.level} {level}</span>
                <div className="w-20 h-1 bg-gray-700 rounded-full overflow-hidden mt-0.5">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000" style={{ width: `${progressToNext}%` }}></div>
                </div>
             </div>
          </div>

          {/* Notification */}
          <div className="relative" title={srsDueCount + " " + t.srsDue}>
             <Bell className="w-5 h-5 cursor-pointer text-gray-400 hover:text-white transition hover:scale-110" />
             {srsDueCount > 0 && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-black animate-pulse"></span>}
          </div>
          
          <button onClick={toggleProfile} className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center font-bold shadow-lg ring-2 ring-white/10 cursor-pointer hover:ring-white/50 transition overflow-hidden">
             <User size={18} />
          </button>
        </div>
      </div>
    </nav>

    {/* Sidebar Menu Overlay */}
    {isMenuOpen && (
        <div className="fixed inset-0 z-[60] flex">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
            <div className="relative w-64 bg-[#121212] h-full border-r border-gray-800 shadow-2xl flex flex-col animate-slide-right p-6">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-bold text-white">Menu</h2>
                    <button onClick={() => setIsMenuOpen(false)} className="text-gray-400 hover:text-white"><X size={20} /></button>
                </div>
                
                <div className="space-y-2 flex-1">
                    {navItems.map((item) => (
                        <button 
                            key={item.id}
                            onClick={() => { setView(item.id); setIsMenuOpen(false); }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeView === item.id ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                        >
                            <item.icon size={18} /> {item.label}
                        </button>
                    ))}
                    <div className="border-t border-gray-800 my-4"></div>
                    <button onClick={() => { toggleProfile(); setIsMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white">
                        <User size={18} /> {t.profile}
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white">
                        <Settings size={18} /> {t.settings}
                    </button>
                </div>

                <div className="text-xs text-gray-600 mt-4">
                    Learning+ v1.2.0 <br/>
                    &copy; 2024 IFRS Project
                </div>
            </div>
        </div>
    )}
    </>
  );
};