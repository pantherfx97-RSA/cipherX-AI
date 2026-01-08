
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Shield, Lock, MessageSquare, Zap, CreditCard, LayoutDashboard, 
  Settings, FileText, Share2, Trash2, LogOut, ChevronRight, 
  Plus, Search, Folder, Ghost, Key, Menu, X, User as UserIcon,
  Mic, Image as ImageIcon, Wand2, ArrowRight, BarChart3, HelpCircle,
  Cpu, Terminal, ChevronLeft, Activity, MessageCircle, ShieldAlert,
  Library
} from 'lucide-react';
import { 
  AppView, User, UserRole, ChatSession, Message, Folder as IFolder, VaultItem 
} from './types';
import { storageService } from './services/storageService';
import { GeminiService } from './services/geminiService';
import { APP_NAME, DEVELOPER_INFO, PRICING, TASK_TEMPLATES, TaskTemplate } from './constants';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import Auth from './components/Auth';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Vault from './components/Vault';
import Legal from './components/Legal';
import SettingsView from './components/SettingsView';
import Paywall from './components/Paywall';
import SupportView from './components/SupportView';
import SecurityActivity from './components/SecurityActivity';
import SnippetsGallery from './components/SnippetsGallery';
import AboutView from './components/AboutView';
import Logo from './components/Logo';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.LANDING);
  const [user, setUser] = useState<User | null>(null);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showPaywall, setShowPaywall] = useState(false);
  const [notifications, setNotifications] = useState<{ id: string; text: string }[]>([]);
  const [selectedTask, setSelectedTask] = useState<TaskTemplate | null>(null);
  const [taskData, setTaskData] = useState<Record<string, string>>({});
  const [isInitializingTask, setIsInitializingTask] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(
    (localStorage.getItem('cipherx_theme') as 'dark' | 'light') || 'dark'
  );

  const aiServiceRef = useRef<GeminiService>(new GeminiService());

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const mobile = width < 768;
      setIsMobile(mobile);
      if (width < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const storedUser = storageService.getUser();
    if (storedUser) {
      setUser(storedUser);
      setSessions(storageService.getSessions());
      if (view === AppView.LANDING) setView(AppView.DASHBOARD);
    }
  }, []);

  useEffect(() => {
    if (sessions.length > 0) {
      storageService.saveSessions(sessions);
    }
  }, [sessions]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.remove('light-mode');
      root.classList.add('dark');
    } else {
      root.classList.add('light-mode');
      root.classList.remove('dark');
    }
    localStorage.setItem('cipherx_theme', theme);
  }, [theme]);

  const addNotification = (text: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications(prev => [...prev, { id, text }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  const handleAuth = (userData: User) => {
    setUser(userData);
    storageService.saveUser(userData);
    setSessions(storageService.getSessions());
    setView(AppView.DASHBOARD);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('cipherx_user');
    setView(AppView.LANDING);
  };

  const handleNewChat = (isSecret = false, initialPrompt?: string) => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: isSecret ? 'Private Session' : (initialPrompt ? 'Template Run' : 'New Chat'),
      messages: initialPrompt ? [{
        id: (Date.now() + 1).toString(),
        role: 'user',
        content: initialPrompt,
        timestamp: Date.now()
      }] : [],
      isSecret,
      updatedAt: Date.now()
    };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
    setView(AppView.CHAT);
    if (isMobile) setIsSidebarOpen(false);
    return newSession.id;
  };

  const handleInitializeTask = async () => {
    if (!selectedTask) return;
    setIsInitializingTask(true);
    
    const compiledDetails = Object.entries(taskData)
      .map(([key, value]) => {
        const field = selectedTask.fields.find(f => f.id === key);
        return `${field?.label}: ${value}`;
      })
      .join('\n');
    
    const finalPrompt = `${selectedTask.prompt}\n\n[USER_SUBMITTED_DATA]\n${compiledDetails}`;
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    handleNewChat(false, finalPrompt);
    setSelectedTask(null);
    setTaskData({});
    setIsInitializingTask(false);
    addNotification(`Task Ready.`);
  };

  const handleViewChange = (newView: AppView) => {
    if (isMobile) setIsSidebarOpen(false);
    setView(newView);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const currentSession = sessions.find(s => s.id === currentSessionId);

  const renderContent = () => {
    if (view === AppView.LANDING && !user) return <LandingPage onEnter={() => setView(AppView.AUTH)} />;
    if (!user) return <Auth onAuth={handleAuth} onBack={() => setView(AppView.LANDING)} />;

    switch (view) {
      case AppView.CHAT:
        return (
          <ChatInterface 
            user={user}
            setUser={setUser}
            session={currentSession}
            sessions={sessions}
            setSessions={setSessions}
            aiService={aiServiceRef.current}
            onShowPaywall={() => setShowPaywall(true)}
            onNewChat={() => handleNewChat()}
            addNotification={addNotification}
            isMobile={isMobile}
            onNavigate={(v) => setView(v)}
          />
        );
      case AppView.TASKS:
        return (
          <div className="p-4 md:p-8 max-w-5xl mx-auto h-full overflow-y-auto">
            {selectedTask ? (
              <div className="max-w-2xl mx-auto space-y-8 animate-in slide-in-from-bottom-8 duration-500">
                <button onClick={() => setSelectedTask(null)} className="flex items-center gap-2 text-slate-500 hover:text-[#00E5FF] transition-colors text-xs font-mono uppercase tracking-widest">
                  <ChevronLeft size={16} /> BACK_TO_LIBRARY
                </button>
                <div className="glass p-6 md:p-10 rounded-[2rem] border border-[#00E5FF]/20 shadow-2xl relative overflow-hidden cyber-corners">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2 font-mono text-[#00E5FF] text-glow-blue">{selectedTask.label}</h2>
                  <p className="text-slate-400 text-[10px] md:text-sm mb-10 font-mono uppercase tracking-tighter">{selectedTask.description}</p>
                  <div className="space-y-6 md:space-y-8">
                    {selectedTask.fields.map(field => (
                      <div key={field.id} className="space-y-3">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">>> {field.label}</label>
                        {field.type === 'text' ? (
                          <input type="text" placeholder={field.placeholder} value={taskData[field.id] || ''} onChange={(e) => setTaskData({...taskData, [field.id]: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#00E5FF] transition-all font-mono dark:text-white text-slate-900 placeholder-slate-800" />
                        ) : (
                          <textarea placeholder={field.placeholder} rows={5} value={taskData[field.id] || ''} onChange={(e) => setTaskData({...taskData, [field.id]: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#00E5FF] transition-all font-mono dark:text-white text-slate-900 placeholder-slate-800 resize-none" />
                        )}
                      </div>
                    ))}
                    <button onClick={handleInitializeTask} disabled={isInitializingTask} className="w-full bg-[#00E5FF] hover:bg-blue-400 text-black py-5 rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 uppercase tracking-widest text-sm font-mono">
                      {isInitializingTask ? "PROCESSING..." : "RUN_TEMPLATE"} <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8 md:space-y-12 pb-24">
                 <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 font-mono text-[#00E5FF] text-glow-blue">TEMPLATES</h1>
                    <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest">Select an automated intelligence protocol to deploy.</p>
                  </div>
                  <button onClick={() => setView(AppView.DASHBOARD)} className="p-3 bg-white/5 border border-white/10 rounded-xl text-slate-500 hover:text-[#00E5FF] transition-all">
                    <ChevronLeft size={20} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                  {TASK_TEMPLATES.map(task => (
                    <button key={task.id} onClick={() => setSelectedTask(task)} className="glass p-6 md:p-10 rounded-[2.5rem] hover:border-[#00E5FF]/50 transition-all text-left group border-white/5 relative overflow-hidden shadow-2xl">
                      <Zap className="text-[#00E5FF] mb-6" size={32} />
                      <h3 className="text-xl md:text-2xl font-bold mb-3 font-mono dark:text-white text-slate-900 group-hover:text-[#00E5FF] transition-colors">{task.label}</h3>
                      <p className="text-slate-400 text-xs leading-relaxed mb-8">{task.description}</p>
                      <div className="flex items-center gap-2 text-[9px] font-mono font-bold text-slate-500 group-hover:text-[#00E5FF] transition-colors uppercase tracking-widest">DEPLOY_SEQUENCE <ChevronRight size={14} /></div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      case AppView.SETTINGS: return <SettingsView user={user} setUser={setUser} handleLogout={handleLogout} addNotification={addNotification} onBack={() => setView(AppView.DASHBOARD)} theme={theme} toggleTheme={toggleTheme} />;
      case AppView.DASHBOARD: return <Dashboard user={user} sessions={sessions} onNavigate={(v) => setView(v)} />;
      case AppView.VAULT: return <Vault user={user} setUser={setUser} onBack={() => setView(AppView.DASHBOARD)} />;
      case AppView.SECURITY_ACTIVITY: return <SecurityActivity user={user} onBack={() => setView(AppView.DASHBOARD)} />;
      case AppView.SNIPPETS: return <SnippetsGallery addNotification={addNotification} onBack={() => setView(AppView.DASHBOARD)} />;
      case AppView.LEGAL: return <Legal onBack={() => setView(AppView.DASHBOARD)} />;
      case AppView.SUPPORT: return <SupportView user={user} addNotification={addNotification} onBack={() => setView(AppView.DASHBOARD)} />;
      case AppView.ABOUT: return <AboutView onBack={() => setView(AppView.DASHBOARD)} />;
      default: return null;
    }
  };

  return (
    <div className={`flex h-screen w-full transition-colors duration-300 overflow-hidden selection:bg-[#00E5FF]/30 selection:text-[#00E5FF] ${theme === 'dark' ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'}`}>
      <div className="fixed top-4 md:top-6 right-4 md:right-6 z-[100] flex flex-col gap-3 max-w-[80vw]">
        {notifications.map(n => (
          <div key={n.id} className="glass border border-[#00E5FF]/30 text-[#00E5FF] px-4 md:px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right-8 duration-500">
            <Shield size={16} className="shrink-0" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest truncate">{n.text}</span>
          </div>
        ))}
      </div>

      {user && (
        <>
          {isMobile && isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 animate-in fade-in duration-300"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
          <div className={`
            fixed md:relative z-50 h-full transition-transform duration-300
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:hidden'}
            ${isMobile ? 'w-80' : 'w-80'}
          `}>
            <Sidebar 
              user={user}
              sessions={sessions}
              currentSessionId={currentSessionId}
              setCurrentSessionId={setCurrentSessionId}
              setView={handleViewChange}
              currentView={view}
              onNewChat={handleNewChat}
              onToggle={() => setIsSidebarOpen(false)}
              isMobile={isMobile}
            />
          </div>
        </>
      )}

      <main className="flex-1 flex flex-col relative overflow-hidden">
        {user && (
          <header className="h-16 border-b border-white/10 flex items-center justify-between px-4 md:px-8 glass z-20">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                className={`p-2 hover:bg-white/10 rounded-xl transition-colors ${isSidebarOpen && !isMobile ? 'hidden' : 'block'}`}
              >
                <Menu size={22} className="text-[#00E5FF]" />
              </button>
              <button 
                onClick={() => setView(AppView.DASHBOARD)}
                className="flex items-center gap-2 group transition-all"
              >
                <Logo size={24} className="drop-shadow-[0_0_8px_rgba(0,229,255,0.4)] group-hover:scale-110 transition-transform" />
                <span className="text-sm md:text-lg font-bold font-mono tracking-tighter group-hover:text-[#00E5FF]">CIPHER_X</span>
              </button>
            </div>
            <div className="flex items-center gap-4">
              {!isMobile && (
                <div className="flex flex-col items-end mr-2">
                  <span className={`text-[10px] font-bold font-mono text-[#00E5FF]`}>
                    {user.role === UserRole.PREMIUM ? 'PREMIUM_MEMBER' : `${user.credits} CREDITS`}
                  </span>
                </div>
              )}
              <button onClick={() => handleViewChange(AppView.SETTINGS)} className="w-9 h-9 md:w-10 md:h-10 rounded-2xl border border-white/10 dark:bg-slate-900 bg-white flex items-center justify-center hover:border-[#00E5FF] transition-all shadow-sm">
                <UserIcon size={18} className="text-slate-400" />
              </button>
            </div>
          </header>
        )}
        <div className="flex-1 overflow-hidden relative">
          {renderContent()}
        </div>
      </main>

      {showPaywall && (
        <Paywall onClose={() => setShowPaywall(false)} onUpgrade={() => {
            const updatedUser = { ...user!, role: UserRole.PREMIUM };
            setUser(updatedUser);
            storageService.saveUser(updatedUser);
            setShowPaywall(false);
            addNotification("Premium Unlocked.");
        }} />
      )}
    </div>
  );
};

export default App;
