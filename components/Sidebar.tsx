
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
      className={`w-full flex items-center gap-4 px-5 py-3 rounded-xl transition-all mb-1 group ${
        currentView === view 
          ? `bg-[#39FF14]/10 border border-[#39FF14]/30 ${colorClass}` 
          : 'text-slate-500 hover:bg-white/5 font-bold hover:text-white'
      }`}
    >
      <Icon size={18} />
      <span className="text-[11px] font-mono lowercase tracking-wider">{label}</span>
    </button>
  );

  const renderSessionItem = (session: ChatSession) => (
    <button
      key={session.id}
      onClick={() => { setCurrentSessionId(session.id); setView(AppView.CHAT); }}
      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[10px] transition-all mb-1 ${
        currentSessionId === session.id 
          ? 'bg-[#00E5FF] text-black font-black' 
          : 'text-slate-500 hover:bg-white/5 font-bold hover:text-[#00E5FF]'
      }`}
    >
      <MessageSquare size={14} className={session.isSecret ? 'text-[#FF007F]' : ''} />
      <span className="truncate flex-1 text-left font-mono">{session.title}</span>
    </button>
  );

  return (
    <aside className="w-full h-full bg-black border-r border-white/10 flex flex-col relative overflow-hidden">
      <div className="p-6 md:p-8 flex items-center justify-between border-b border-white/5">
        <button 
          onClick={() => setView(AppView.DASHBOARD)}
          className="flex items-center gap-3 group hover:opacity-80 transition-all"
        >
          <Logo size={28} className="drop-shadow-[0_0_8px_rgba(0,229,255,0.4)] group-hover:scale-110 transition-transform" />
          <span className="font-black font-mono tracking-tighter text-white text-base group-hover:text-[#39FF14]">CIPHER_X</span>
        </button>
        {isMobile && (
          <button onClick={onToggle} className="p-2 bg-white/5 text-[#39FF14] rounded-lg">
            <X size={20} />
          </button>
        )}
      </div>

      <div className="px-6 py-8 space-y-4">
        <button onClick={() => onNewChat(false)} className="w-full flex items-center justify-center gap-3 bg-[#39FF14] text-black py-4 rounded-xl font-black text-[10px] transition-all shadow-lg shadow-green-500/10">
          <Plus size={18} /> NEW_CHAT
        </button>
        <button onClick={() => onNewChat(true)} className="w-full flex items-center justify-center gap-3 border border-[#FF007F]/40 text-[#FF007F] py-4 rounded-xl font-black text-[10px] transition-all hover:bg-[#FF007F]/5">
          <Lock size={18} /> PRIVATE_CHAT
        </button>
      </div>

      <div className="px-6 mb-4">
        <input type="text" placeholder="Search Memory..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-3 text-[10px] text-slate-400 focus:outline-none focus:border-[#39FF14]/40 font-mono" />
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-8 pb-12">
        <div className="space-y-1">
          <div className="px-4 mb-3 text-[9px] font-black text-slate-600 uppercase tracking-widest font-mono">Navigation</div>
          <NavItem view={AppView.DASHBOARD} icon={LayoutDashboard} label="Network Dashboard" colorClass="text-[#39FF14]" />
          <NavItem view={AppView.CHAT} icon={MessageSquare} label="Conversations" colorClass="text-[#00E5FF]" />
          <NavItem view={AppView.TASKS} icon={Zap} label="Templates" colorClass="text-[#FF007F]" />
          <NavItem view={AppView.SNIPPETS} icon={Library} label="Archive" colorClass="text-[#BC13FE]" />
          <NavItem view={AppView.VAULT} icon={Lock} label="Security Vault" colorClass="text-[#39FF14]" />
          <NavItem view={AppView.SECURITY_ACTIVITY} icon={ShieldAlert} label="Security Log" colorClass="text-[#FF007F]" />
        </div>
        
        <div className="space-y-1">
          <div className="px-4 mb-3 text-[9px] font-black text-slate-600 uppercase tracking-widest font-mono">Info</div>
          <NavItem view={AppView.ABOUT} icon={Info} label="System Specs" colorClass="text-white" />
          <NavItem view={AppView.LEGAL} icon={FileText} label="Terms & Policy" colorClass="text-slate-400" />
          <NavItem view={AppView.SUPPORT} icon={HelpCircle} label="Direct Uplink" colorClass="text-slate-400" />
        </div>

        <div className="space-y-1">
          <div className="px-4 mb-3 text-[9px] font-black text-slate-600 uppercase tracking-widest font-mono">Memory_Units</div>
          <div className="space-y-1">
            {folders.map(folder => {
              const isExpanded = expandedFolders.has(folder.id);
              const folderSessions = filteredSessions.filter(s => s.folderId === folder.id);
              return (
                <div key={folder.id} className="mb-1">
                  <button onClick={() => toggleFolder(folder.id)} className="w-full flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-white transition-colors text-[10px] font-bold">
                    {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                    <FolderIcon size={12} className="text-[#39FF14]" />
                    <span className="truncate font-mono">{folder.name}</span>
                  </button>
                  {isExpanded && <div className="ml-6 pl-2 border-l border-white/5 space-y-1 mt-1 mb-2">{folderSessions.map(renderSessionItem)}</div>}
                </div>
              );
            })}
            <div className="mt-4 pt-4 border-t border-white/5 space-y-1">{rootSessions.map(renderSessionItem)}</div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-slate-900/50 border-t border-white/10">
        <button onClick={() => setView(AppView.SETTINGS)} className="w-full flex items-center gap-4 px-4 py-3 text-slate-500 hover:text-[#39FF14] transition-all rounded-xl hover:bg-white/5">
          <Settings size={18} />
          <span className="text-[11px] font-black font-mono lowercase tracking-widest">Settings</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
