
import React, { useState, useEffect } from 'react';
import { 
  Plus, MessageSquare, Trash2, Shield, Lock, LayoutDashboard, 
  Settings, Zap, Key, Ghost, Folder as FolderIcon, ChevronDown, ChevronRight,
  Menu, X, Search, BarChart3, HelpCircle, ShieldAlert, FolderPlus,
  MoreVertical, Edit2, Library, Info, FileText
} from 'lucide-react';
import { ChatSession, User, AppView, Folder } from '../types';
import { storageService } from '../services/storageService';
import Logo from './Logo';

interface SidebarProps {
  user: User;
  sessions: ChatSession[];
  currentSessionId: string | null;
  setCurrentSessionId: (id: string) => void;
  setView: (view: AppView) => void;
  currentView: AppView;
  onNewChat: (isSecret?: boolean) => void;
  onToggle: () => void;
  isMobile?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  user, sessions, currentSessionId, setCurrentSessionId, 
  setView, currentView, onNewChat, onToggle, isMobile 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [folders, setFolders] = useState<Folder[]>([]);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  useEffect(() => {
    setFolders(storageService.getFolders());
  }, []);

  const toggleFolder = (id: string) => {
    setExpandedFolders(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const filteredSessions = sessions.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const rootSessions = filteredSessions.filter(s => !s.folderId);

  const NavItem = ({ view, icon: Icon, label, colorClass = 'text-[#39FF14]' }: { view: AppView, icon: any, label: string, colorClass?: string }) => (
    <button 
      onClick={() => setView(view)}
      className={`w-full flex items-center gap-5 px-6 py-4 rounded-2xl transition-all mb-2 group border-2 ${
        currentView === view 
          ? `bg-[#39FF14]/10 border-[#39FF14]/50 ${colorClass} shadow-[0_0_15px_rgba(57,255,20,0.1)]` 
          : 'text-slate-500 border-transparent hover:bg-white/5 font-black hover:text-white hover:border-white/10'
      }`}
    >
      <Icon size={20} className={`transition-transform duration-300 group-hover:scale-110 ${currentView === view ? 'drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]' : ''}`} />
      <span className="text-[12px] font-mono lowercase tracking-[0.2em] font-black drop-shadow-sm">{label}</span>
    </button>
  );

  const renderSessionItem = (session: ChatSession) => (
    <button
      key={session.id}
      onClick={() => { setCurrentSessionId(session.id); setView(AppView.CHAT); }}
      className={`w-full flex items-center gap-4 px-5 py-3 rounded-xl text-[11px] transition-all mb-1.5 border-2 ${
        currentSessionId === session.id 
          ? 'bg-cyber-blue border-cyber-blue text-black font-black shadow-[0_0_15px_rgba(0,229,255,0.4)]' 
          : 'text-slate-500 border-transparent hover:bg-white/5 font-black hover:text-cyber-blue hover:border-cyber-blue/30'
      }`}
    >
      <MessageSquare size={16} className={session.isSecret ? 'text-[#FF007F] drop-shadow-[0_0_5px_rgba(255,0,127,0.5)]' : ''} />
      <span className="truncate flex-1 text-left font-mono tracking-tighter">{session.title}</span>
    </button>
  );

  return (
    <aside className="w-full h-full bg-black border-r-2 border-white/10 flex flex-col relative overflow-hidden shadow-[10px_0_30px_rgba(0,0,0,0.5)]">
      <div className="p-8 md:p-10 flex items-center justify-between border-b-2 border-white/5 glass">
        <button 
          onClick={() => setView(AppView.DASHBOARD)}
          className="flex items-center gap-4 group hover:opacity-90 transition-all"
        >
          <Logo size={36} className="drop-shadow-[0_0_12px_rgba(0,229,255,0.6)] group-hover:scale-110 transition-transform duration-500" />
          <span className="font-black font-mono tracking-tighter text-white text-xl group-hover:text-glow-green group-hover:text-[#39FF14] transition-colors">CIPHER_X</span>
        </button>
        {isMobile && (
          <button onClick={onToggle} className="p-3 bg-white/5 text-[#39FF14] rounded-xl border border-white/10">
            <X size={24} />
          </button>
        )}
      </div>

      <div className="px-8 py-10 space-y-5">
        <button onClick={() => onNewChat(false)} className="btn-neon-green w-full flex items-center justify-center gap-4 py-5 rounded-2xl font-black text-[12px] uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(57,255,20,0.3)]">
          <Plus size={20} strokeWidth={3} /> NEW_TRANSMISSION
        </button>
        <button onClick={() => onNewChat(true)} className="w-full flex items-center justify-center gap-4 border-2 border-[#FF007F] text-[#FF007F] py-5 rounded-2xl font-black text-[12px] uppercase tracking-[0.2em] transition-all hover:bg-[#FF007F]/10 hover:shadow-[0_0_20px_rgba(255,0,127,0.3)] shadow-[0_0_10px_rgba(255,0,127,0.1)]">
          <Lock size={20} /> PRIVATE_UPLINK
        </button>
      </div>

      <div className="px-8 mb-6">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyber-blue transition-colors" size={16} />
          <input type="text" placeholder="Search Memory_Bank..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-slate-900/50 border-2 border-white/5 rounded-2xl pl-12 pr-5 py-4 text-[11px] text-slate-300 focus:outline-none focus:border-cyber-blue/60 font-mono placeholder:text-slate-600 placeholder:font-black uppercase tracking-widest" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 space-y-10 pb-16">
        <div className="space-y-2">
          <div className="px-5 mb-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] font-mono select-none">Navigation_Protocol</div>
          <NavItem view={AppView.DASHBOARD} icon={LayoutDashboard} label="Dashboard Status" colorClass="text-[#39FF14]" />
          <NavItem view={AppView.CHAT} icon={MessageSquare} label="Conversations" colorClass="text-cyber-blue" />
          <NavItem view={AppView.TASKS} icon={Zap} label="Task Modules" colorClass="text-cyber-pink" />
          <NavItem view={AppView.SNIPPETS} icon={Library} label="Archive Vault" colorClass="text-cyber-purple" />
          <NavItem view={AppView.VAULT} icon={Lock} label="Security Core" colorClass="text-cyber-green" />
          <NavItem view={AppView.SECURITY_ACTIVITY} icon={ShieldAlert} label="Security Log" colorClass="text-cyber-pink" />
        </div>
        
        <div className="space-y-2">
          <div className="px-5 mb-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] font-mono select-none">System_Inquiry</div>
          <NavItem view={AppView.ABOUT} icon={Info} label="Specs & Founders" colorClass="text-white" />
          <NavItem view={AppView.LEGAL} icon={FileText} label="Terms & Clearance" colorClass="text-slate-400" />
          <NavItem view={AppView.SUPPORT} icon={HelpCircle} label="Technical Uplink" colorClass="text-slate-400" />
        </div>

        <div className="space-y-2">
          <div className="px-5 mb-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] font-mono select-none">Memory_Buffer</div>
          <div className="space-y-1">
            {folders.map(folder => {
              const isExpanded = expandedFolders.has(folder.id);
              const folderSessions = filteredSessions.filter(s => s.folderId === folder.id);
              return (
                <div key={folder.id} className="mb-2">
                  <button onClick={() => toggleFolder(folder.id)} className="w-full flex items-center gap-4 px-5 py-3 text-slate-500 hover:text-white transition-all text-[11px] font-black border-2 border-transparent hover:border-white/5 rounded-xl group">
                    {isExpanded ? <ChevronDown size={14} className="group-hover:text-cyber-green" /> : <ChevronRight size={14} className="group-hover:text-cyber-green" />}
                    <FolderIcon size={16} className="text-cyber-green opacity-60 group-hover:opacity-100" />
                    <span className="truncate font-mono tracking-tighter uppercase">{folder.name}</span>
                  </button>
                  {isExpanded && <div className="ml-8 pl-4 border-l-2 border-white/5 space-y-1.5 mt-2 mb-4 animate-in slide-in-from-top-2">{folderSessions.map(renderSessionItem)}</div>}
                </div>
              );
            })}
            <div className="mt-6 pt-6 border-t-2 border-white/5 space-y-1.5">{rootSessions.map(renderSessionItem)}</div>
          </div>
        </div>
      </div>

      <div className="p-8 bg-slate-900/80 border-t-2 border-white/10 glass">
        <button onClick={() => setView(AppView.SETTINGS)} className={`w-full flex items-center gap-5 px-6 py-4 rounded-2xl transition-all border-2 ${currentView === AppView.SETTINGS ? 'bg-white/10 border-white/30 text-white' : 'text-slate-500 hover:text-cyber-green border-transparent hover:bg-white/5 hover:border-white/10'}`}>
          <Settings size={22} className={currentView === AppView.SETTINGS ? 'animate-spin-slow' : ''} />
          <span className="text-[12px] font-black font-mono lowercase tracking-[0.2em]">Config_Settings</span>
        </button>
      </div>
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
