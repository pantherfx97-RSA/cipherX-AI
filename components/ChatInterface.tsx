
import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, Mic, ImageIcon, Shield, Wand2, Paperclip, 
  Trash2, Download, Copy, Info, AlertTriangle, 
  Cpu, Zap, ImagePlus, Ghost, X, MicOff, Volume2, 
  VolumeX, Lock, Fingerprint, Activity, Terminal,
  ChevronDown, ChevronUp, BrainCircuit, FileDown,
  Library, Sparkles, Check, Square, Sparkle,
  Search, ListChecks, FileText, LayoutDashboard,
  ShieldAlert
} from 'lucide-react';
import { User, UserRole, ChatSession, Message, Snippet, AppView } from '../types';
import { GeminiService } from '../services/geminiService';
import { storageService } from '../services/storageService';
import { generateSessionPDF } from '../services/pdfService';

interface ChatInterfaceProps {
  user: User;
  setUser: (u: User) => void;
  session: ChatSession | undefined;
  sessions: ChatSession[];
  setSessions: React.Dispatch<React.SetStateAction<ChatSession[]>>;
  aiService: GeminiService | null;
  onShowPaywall: () => void;
  onNewChat: () => void;
  addNotification: (t: string) => void;
  isMobile?: boolean;
  onNavigate: (v: AppView) => void;
}

const TypingCursor: React.FC = () => <span className="typing-cursor" />;

const ReasoningSection: React.FC<{ thought: string }> = ({ thought }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  if (!thought) return null;

  return (
    <div className="mb-4 md:mb-5 border border-[#39FF14]/20 rounded-xl bg-black/40 overflow-hidden transition-all duration-300">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-white/5 transition-colors border-b border-white/5"
      >
        <div className="flex items-center gap-3">
          <ListChecks size={14} className="text-[#39FF14]" />
          <span className="text-[10px] font-mono font-bold text-[#39FF14] uppercase tracking-widest">Reasoning_Path 🧠</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[8px] font-mono font-bold text-slate-500 uppercase tracking-tighter">
            {isExpanded ? 'Collapse' : 'Expand'}
          </span>
          {isExpanded ? <ChevronUp size={14} className="text-slate-500" /> : <ChevronDown size={14} className="text-slate-500" />}
        </div>
      </button>
      
      {isExpanded && (
        <div className="px-4 py-4 bg-black/60 font-mono text-[11px] leading-relaxed text-slate-300 border-t border-white/5 animate-in slide-in-from-top-1">
          <div className="whitespace-pre-wrap pl-2 border-l-2 border-[#39FF14]/40">{thought.trim()}</div>
        </div>
      )}
    </div>
  );
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  user, setUser, session, sessions, setSessions, aiService, 
  onShowPaywall, onNewChat, addNotification, isMobile, onNavigate 
}) => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [autoVoice, setAutoVoice] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(!session?.isSecret || !user.lockSecretChats || !user.vaultPin);
  const [pinInput, setPinInput] = useState('');
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const activeAudioRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    setIsUnlocked(!session?.isSecret || !user.lockSecretChats || !user.vaultPin);
    setPinInput('');
    setShowModelDropdown(false);
  }, [session?.id, user.lockSecretChats, user.vaultPin]);

  useEffect(() => {
    if (isUnlocked) {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [session?.messages, isTyping, isUnlocked]);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setInput(prev => {
            const separator = prev && !prev.endsWith(' ') ? ' ' : '';
            return prev + separator + finalTranscript;
          });
        }
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          addNotification("Mic Access Denied. 🎙️");
        }
      };
      
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  const handleUnlock = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!user.vaultPin) return;
    if (pinInput === user.vaultPin) {
      setIsUnlocked(true);
      addNotification("Access Granted. 🔓");
    } else {
      addNotification("Invalid PIN. 🔒");
      setPinInput('');
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      addNotification("Voice Recognition Not Supported. 🚫");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        addNotification("Listening... 👂");
      } catch (e) { 
        recognitionRef.current.stop(); 
        setIsListening(false);
      }
    }
  };

  const speakMessage = async (text: string) => {
    if (!aiService) return;
    if (activeAudioRef.current) try { activeAudioRef.current.stop(); } catch(e) {}
    setIsSpeaking(true);
    try {
      const source = await aiService.speak(text, user.preferredVoice || 'Kore');
      if (source) {
        activeAudioRef.current = source;
        source.onended = () => setIsSpeaking(false);
      } else setIsSpeaking(false);
    } catch (e) { setIsSpeaking(false); }
  };

  const handleExportPDF = () => {
    if (!session) return;
    try {
      generateSessionPDF(session);
      addNotification("Export Complete. 📄");
    } catch (error) { addNotification("Export Failed. ❌"); }
  };

  const handleModelChange = (modelId: string) => {
    if (modelId === 'gemini-3-pro-preview' && user.role !== UserRole.PREMIUM) {
      onShowPaywall();
      setShowModelDropdown(false);
      return;
    }
    
    if (session) {
      const updatedSessions = sessions.map(s => 
        s.id === session.id ? { ...s, model: modelId, updatedAt: Date.now() } : s
      );
      setSessions(updatedSessions);
      storageService.saveSessions(updatedSessions);
      addNotification(`Switched to ${modelId === 'gemini-3-pro-preview' ? 'Pro' : 'Standard'} model. ⚡`);
    }
    setShowModelDropdown(false);
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if ((!input.trim() && !activeImage) || isTyping) return;
    if (isListening) recognitionRef.current.stop();
    if (user.role === UserRole.FREE && user.credits <= 0) { onShowPaywall(); return; }
    if (!session) { onNewChat(); return; }

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input, imageUrl: activeImage || undefined, timestamp: Date.now() };
    const updatedSession = { ...session, messages: [...session.messages, userMessage], title: session.messages.length === 0 ? input.slice(0, 30) : session.title, updatedAt: Date.now() };
    setSessions(prev => prev.map(s => s.id === session.id ? updatedSession : s));
    setInput('');
    setActiveImage(null);
    setIsTyping(true);

    try {
      if (!aiService) throw new Error("Service Offline.");
      let fullRawResponse = '';
      const model = session.model || (user.role === UserRole.PREMIUM ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview');
      const assistantMessage: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: '', thought: '', timestamp: Date.now() };
      setSessions(prev => prev.map(s => s.id === session.id ? { ...s, messages: [...s.messages, assistantMessage] } : s));
      const history = updatedSession.messages.slice(0, -1).map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] }));
      
      if (userMessage.imageUrl) {
        const analysis = await aiService.analyzeImage(userMessage.imageUrl.split(',')[1], input || "Analyze this image.");
        fullRawResponse = analysis || "Analysis failed.";
        setSessions(prev => prev.map(s => s.id === session.id ? { ...s, messages: s.messages.map(m => m.id === assistantMessage.id ? { ...m, content: fullRawResponse } : m) } : s));
      } else {
        const stream = await aiService.streamChat(model, userMessage.content, history);
        for await (const chunk of stream) {
          fullRawResponse += chunk.text || "";
          const thoughtMatch = fullRawResponse.match(/<thought>([\s\S]*?)<\/thought>/);
          const thought = thoughtMatch ? thoughtMatch[1] : '';
          const content = fullRawResponse.replace(/<thought>[\s\S]*?<\/thought>/, '').trim();
          setSessions(prev => prev.map(s => s.id === session.id ? { ...s, messages: s.messages.map(m => m.id === assistantMessage.id ? { ...m, content, thought } : m) } : s));
        }
      }
      if (autoVoice) {
        const contentOnly = fullRawResponse.replace(/<thought>[\s\S]*?<\/thought>/, '').trim();
        await speakMessage(contentOnly);
      }
      if (user.role === UserRole.FREE) {
        const newCredits = user.credits - 1;
        const newUser = { ...user, credits: newCredits };
        setUser(newUser);
        storageService.saveUser(newUser);
      }
    } catch (error: any) { addNotification("Connection Interrupted. 🔌"); } finally { setIsTyping(false); storageService.saveSessions(sessions); }
  };

  if (session?.isSecret && user.lockSecretChats && !isUnlocked) {
    if (!user.vaultPin) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-black text-center">
          <ShieldAlert className="text-[#FF007F] mb-6" size={48} />
          <h2 className="text-xl font-bold font-mono text-white mb-4 uppercase tracking-tighter">SECURITY_PROTOCOL_REQUIRED</h2>
          <p className="text-slate-400 text-sm max-w-sm mb-8 font-mono">
            Please establish a custom access code in the <b>Security Vault</b> to unlock and protect private sessions.
          </p>
          <button 
            onClick={() => onNavigate(AppView.VAULT)}
            className="px-8 py-3 bg-[#FF007F] text-white rounded-xl font-black uppercase text-xs tracking-widest font-mono shadow-lg shadow-pink-500/20 active:scale-95 transition-all"
          >
            GO_TO_VAULT
          </button>
        </div>
      );
    }

    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-black relative">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-[#FF007F]/5 border border-[#FF007F] rounded-2xl flex items-center justify-center mb-10 shadow-[0_0_20px_rgba(255,0,127,0.3)] animate-pulse"><Lock className="text-[#FF007F]" size={36} /></div>
        <h2 className="text-lg md:text-xl font-bold font-mono text-[#FF007F] tracking-widest uppercase text-glow-pink text-center">SESSION_LOCKED 🔒</h2>
        <form onSubmit={handleUnlock} className="w-full max-w-xs space-y-6 mt-8">
          <input type="password" value={pinInput} onChange={(e) => setPinInput(e.target.value)} className="w-full bg-slate-900/80 border border-slate-800 text-center text-2xl tracking-[0.5em] py-5 rounded-2xl focus:outline-none focus:border-[#FF007F] text-white font-mono" maxLength={8} placeholder="****" autoFocus />
          <button type="submit" className="w-full bg-[#FF007F] text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs font-mono">Unlock_Access</button>
        </form>
      </div>
    );
  }

  const currentModel = session?.model || (user.role === UserRole.PREMIUM ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview');

  return (
    <div className="flex-1 flex flex-col h-full bg-black relative">
      {!session ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-8 text-center relative z-10">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-[#39FF14]/10 rounded-2xl flex items-center justify-center mb-8 border-2 border-[#39FF14] text-[#39FF14] animate-pulse glow-green"><Cpu size={32} /></div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono tracking-widest text-white uppercase text-glow-green">System_Active 🤖</h2>
          <p className="text-slate-500 text-[10px] md:text-xs max-w-md mb-12 font-mono uppercase tracking-widest">Select a module to begin.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-2xl px-2">
            <button onClick={() => onNewChat()} className="glass p-6 md:p-10 rounded-[2rem] border-[#39FF14]/20 hover:border-[#39FF14]/60 transition-all text-left group">
              <Zap className="text-[#39FF14] mb-4" size={28} />
              <h3 className="font-bold text-base md:text-lg text-white font-mono uppercase tracking-widest mb-1 group-hover:text-[#39FF14]">Standard_Chat 💬</h3>
              <p className="text-[9px] text-slate-500 font-mono">FAST // EFFICIENT</p>
            </button>
            <button onClick={() => onNavigate(AppView.DASHBOARD)} className="glass p-6 md:p-10 rounded-[2rem] border-[#BC13FE]/20 hover:border-[#BC13FE]/60 transition-all text-left group">
              <LayoutDashboard className="text-[#BC13FE] mb-4" size={28} />
              <h3 className="font-bold text-base md:text-lg text-white font-mono uppercase tracking-widest mb-1 group-hover:text-[#BC13FE]">System_Monitor 📊</h3>
              <p className="text-[9px] text-slate-500 font-mono">DASHBOARD // STATS</p>
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-white/10 glass backdrop-blur-3xl sticky top-0 z-20">
            <div className="flex items-center gap-3 md:gap-6 min-w-0">
              <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full shrink-0 ${isTyping ? 'bg-[#39FF14] animate-pulse glow-green' : 'bg-slate-800'}`} />
              <div className="min-w-0">
                <h3 className="font-bold text-[10px] md:text-[11px] font-mono tracking-widest uppercase truncate text-white">{session.title}</h3>
                {/* Model Selector Dropdown */}
                <div className="relative mt-1">
                  <button 
                    onClick={() => setShowModelDropdown(!showModelDropdown)}
                    className="flex items-center gap-2 text-[8px] font-mono font-black text-[#39FF14] uppercase tracking-widest hover:opacity-80 transition-opacity"
                  >
                    <Sparkle size={10} />
                    {currentModel === 'gemini-3-pro-preview' ? 'Pro (Advanced) 🧠' : 'Standard (Fast) ⚡'}
                    <ChevronDown size={10} className={`transition-transform ${showModelDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showModelDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-56 glass border border-white/10 rounded-xl overflow-hidden z-30 shadow-2xl animate-in fade-in slide-in-from-top-2">
                      <button 
                        onClick={() => handleModelChange('gemini-3-flash-preview')}
                        className={`w-full text-left px-4 py-3 text-[10px] font-mono font-bold uppercase transition-colors flex items-center justify-between ${currentModel !== 'gemini-3-pro-preview' ? 'text-[#39FF14] bg-white/5' : 'text-slate-400 hover:bg-white/5'}`}
                      >
                        Standard (Fast) ⚡
                        {currentModel !== 'gemini-3-pro-preview' && <Check size={12} />}
                      </button>
                      <button 
                        onClick={() => handleModelChange('gemini-3-pro-preview')}
                        className={`w-full text-left px-4 py-3 text-[10px] font-mono font-bold uppercase transition-colors flex items-center justify-between ${currentModel === 'gemini-3-pro-preview' ? 'text-[#BC13FE] bg-white/5' : 'text-slate-400 hover:bg-white/5'}`}
                      >
                        <span className="flex items-center gap-2">
                          Pro (Advanced Reasoning) 🧠
                          <span className="bg-[#BC13FE] text-white text-[7px] px-1.5 py-0.5 rounded-full font-black">PREMIUM</span>
                        </span>
                        {currentModel === 'gemini-3-pro-preview' && <Check size={12} />}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <div className="hidden md:flex items-center gap-2">
                <button 
                  onClick={() => setAutoVoice(!autoVoice)} 
                  className={`p-2.5 rounded-xl border transition-all ${autoVoice ? 'text-[#39FF14] border-[#39FF14]/60 bg-[#39FF14]/10' : 'text-slate-500 border-white/10'}`} 
                  title="Auto-Voice Feedback"
                >
                  <Volume2 size={18} />
                </button>
                <button 
                  onClick={handleExportPDF} 
                  className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:text-[#00E5FF] rounded-xl border border-white/10 text-slate-500 transition-all group"
                  title="Export Session"
                >
                  <FileText size={18} />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest hidden lg:inline">Export_Session</span>
                </button>
              </div>
              
              <button 
                onClick={handleExportPDF} 
                className="md:hidden p-2.5 bg-white/5 hover:text-[#00E5FF] rounded-xl border border-white/10 text-slate-500"
                title="Export Session"
              >
                <FileDown size={18} />
              </button>
              
              <button onClick={() => setSessions(prev => prev.filter(s => s.id !== session.id))} className="p-2.5 hover:text-red-500 rounded-xl text-slate-500 border border-white/10 bg-white/5" title="Delete Session"><Trash2 size={18} /></button>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 md:px-8 py-8 md:py-12 space-y-8 md:space-y-12 cyber-grid">
            {session.messages.map((m, idx) => {
              const isLast = idx === session.messages.length - 1;
              const showCursor = isLast && isTyping && m.role === 'assistant';
              
              return (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                  <div className={`max-w-[92%] md:max-w-[85%] rounded-[1.5rem] md:rounded-[2rem] px-6 md:px-10 py-5 md:py-7 relative shadow-xl ${m.role === 'user' ? 'bg-[#39FF14] text-black' : 'bg-white text-black'}`}>
                    {m.imageUrl && <div className="rounded-xl overflow-hidden mb-4 border border-black/10"><img src={m.imageUrl} alt="Payload" className="w-full object-contain max-h-72" /></div>}
                    {m.role === 'assistant' && m.thought && <ReasoningSection thought={m.thought} />}
                    <div className="text-sm md:text-[15px] leading-relaxed whitespace-pre-wrap font-sans font-medium streaming-text">
                      {m.content}
                      {showCursor && <TypingCursor />}
                    </div>
                    {m.role === 'assistant' && !isTyping && m.content.length > 0 && (
                      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between opacity-60">
                         <div className="flex items-center gap-3">
                          <button onClick={() => speakMessage(m.content)} className="p-2 hover:text-[#00B0FF] transition-colors"><Volume2 size={14} /></button>
                          <button onClick={() => navigator.clipboard.writeText(m.content)} className="p-2 hover:text-[#00B0FF] transition-colors"><Copy size={14} /></button>
                        </div>
                        <span className="text-[8px] font-mono tracking-widest text-slate-400 uppercase">SYNTH_READY ✅</span>
                      </div>
                    )}
                    {/* Visual Indicator for role */}
                    <div className={`absolute bottom-[-10px] ${m.role === 'user' ? 'right-4 border-t-[#39FF14]' : 'left-4 border-t-white'} w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px]`}></div>
                  </div>
                </div>
              );
            })}
            {isTyping && (session.messages.length === 0 || session.messages[session.messages.length - 1]?.role !== 'assistant' || session.messages[session.messages.length - 1]?.content.length === 0) && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl px-6 py-4 border border-slate-200 flex items-center gap-4 animate-in slide-in-from-left-4 duration-300 shadow-md">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-[#39FF14] rounded-full animate-bounce [animation-duration:1s]" />
                    <div className="w-2 h-2 bg-[#39FF14] rounded-full animate-bounce [animation-duration:1s] [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-[#39FF14] rounded-full animate-bounce [animation-duration:1s] [animation-delay:0.4s]" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <BrainCircuit size={14} className="text-[#39FF14] animate-pulse" /> 
                    AI_Thinking... 🤖
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 md:p-10 glass border-t border-white/10 bg-black/90">
            <form onSubmit={handleSend} className="max-w-5xl mx-auto flex flex-col md:flex-row items-stretch md:items-end gap-3 md:gap-5 relative">
              {activeImage && (
                <div className="absolute bottom-full left-0 mb-4 p-3 glass rounded-2xl border-[#BC13FE]/60 bg-[#BC13FE]/10 flex items-center gap-4 shadow-xl">
                  <img src={activeImage} alt="Payload" className="w-12 h-12 rounded-lg object-cover" />
                  <button onClick={() => setActiveImage(null)} className="p-2 text-red-500 hover:bg-white/10 rounded-xl"><X size={16} /></button>
                </div>
              )}
              
              <div className="flex items-center gap-2 md:gap-3 order-2 md:order-1">
                <button type="button" onClick={() => fileInputRef.current?.click()} className="flex-1 md:flex-none p-4 bg-black border-2 border-[#BC13FE] rounded-xl text-[#BC13FE] shadow-[0_0_15px_rgba(188,19,254,0.2)] hover:bg-[#BC13FE]/5 transition-all">
                  <ImageIcon size={24} />
                </button>
                <input type="file" ref={fileInputRef} onChange={(e) => { const file = e.target.files?.[0]; if (file) { const r = new FileReader(); r.onload = (ev) => setActiveImage(ev.target?.result as string); r.readAsDataURL(file); } }} accept="image/*" className="hidden" />
                
                <button 
                  type="button" 
                  onClick={toggleListening} 
                  className={`flex-1 md:flex-none p-4 border-2 rounded-xl transition-all relative group overflow-hidden ${
                    isListening 
                      ? 'bg-red-500/20 text-red-500 border-red-500 animate-pulse shadow-[0_0_25px_rgba(239,68,68,0.4)]' 
                      : 'bg-black border-[#39FF14] text-[#39FF14] shadow-[0_0_15px_rgba(57,255,20,0.2)] hover:bg-[#39FF14]/5'
                  }`}
                  title={isListening ? "Stop Listening" : "Voice Input"}
                >
                  {isListening ? <Square size={24} /> : <Mic size={24} />}
                </button>
              </div>

              <div className="flex-1 relative order-1 md:order-2">
                {isListening && (
                  <div className="absolute -top-10 left-4 flex items-center gap-2 text-[10px] font-mono font-black text-red-500 uppercase tracking-widest animate-pulse">
                    <div className="w-2 h-2 rounded-full bg-red-500" /> LISTENING... 🎙️
                  </div>
                )}
                <textarea 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)} 
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }} 
                  placeholder={isMobile ? "Enter command..." : "Transcribe request... ⌨️"} 
                  className="w-full bg-white border-2 border-slate-300 rounded-[1.5rem] md:rounded-[2rem] px-5 md:px-10 py-4 md:py-6 pr-16 focus:outline-none focus:border-[#39FF14] text-black font-sans font-medium text-xs md:text-sm transition-all min-h-[56px] max-h-48 resize-none shadow-md" 
                  rows={1} 
                />
                <button type="submit" disabled={(!input.trim() && !activeImage) || isTyping} className="absolute right-3 bottom-2.5 md:right-4 md:bottom-4 p-3.5 md:p-5 rounded-xl disabled:opacity-20 transition-all bg-[#39FF14] text-black glow-green">
                  <Send size={20} />
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatInterface;
