
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
import { User, UserRole, ChatSession, Message, AppView } from '../types';
import { GeminiService } from '../services/geminiService';
import { storageService } from '../services/storageService';
import { generateSessionPDF } from '../services/pdfService';

const TypingCursor: React.FC = () => <span className="typing-cursor" />;

const ReasoningSection: React.FC<{ thought: string }> = ({ thought }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  if (!thought) return null;

  return (
    <div className="mb-6 border-2 border-[#39FF14]/40 rounded-3xl bg-black/70 overflow-hidden transition-all duration-300 shadow-lg">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-cyber-green/10 transition-colors border-b-2 border-[#39FF14]/10"
      >
        <div className="flex items-center gap-3">
          <ListChecks size={18} className="text-[#39FF14] drop-shadow-[0_0_8px_rgba(57,255,20,0.6)]" />
          <span className="text-[11px] font-mono font-black text-[#39FF14] uppercase tracking-[0.2em] text-glow-green">Reasoning_Uplink_v4.0 🧠</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-mono font-black text-slate-500 uppercase tracking-tighter">
            {isExpanded ? 'Collapse' : 'Expand'}
          </span>
          {isExpanded ? <ChevronUp size={16} className="text-slate-500" /> : <ChevronDown size={16} className="text-slate-500" />}
        </div>
      </button>
      
      {isExpanded && (
        <div className="px-6 py-5 bg-black/90 font-mono text-[12px] leading-relaxed text-[#39FF14]/90 border-t border-white/5 animate-in slide-in-from-top-1">
          <div className="whitespace-pre-wrap pl-4 border-l-4 border-[#39FF14]/60 shadow-[inset_10px_0_20px_-10px_rgba(57,255,20,0.4)]">{thought.trim()}</div>
        </div>
      )}
    </div>
  );
};

interface ChatInterfaceProps {
  user: User;
  setUser: (u: User) => void;
  session: ChatSession | undefined;
  sessions: ChatSession[];
  setSessions: React.Dispatch<React.SetStateAction<ChatSession[]>>;
  aiService: GeminiService;
  onShowPaywall: () => void;
  onNewChat: () => void;
  addNotification: (t: string) => void;
  isMobile: boolean;
  onNavigate: (v: AppView) => void;
}

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
          if (event.results[i].isFinal) finalTranscript += event.results[i][0].transcript;
        }
        if (finalTranscript) {
          setInput(prev => prev + (prev && !prev.endsWith(' ') ? ' ' : '') + finalTranscript);
        }
      };
      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  const handleUnlock = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (pinInput === user.vaultPin) {
      setIsUnlocked(true);
      addNotification("Identity Verified. 🔓");
    } else {
      addNotification("Access Denied. 🔒");
      setPinInput('');
    }
  };

  // Fix: Added missing handleExportPDF function
  const handleExportPDF = () => {
    if (session) {
      generateSessionPDF(session);
      addNotification("Intelligence Report Generated. 📄");
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if ((!input.trim() && !activeImage) || isTyping) return;
    if (user.role === UserRole.FREE && user.credits <= 0) { onShowPaywall(); return; }
    if (!session) { onNewChat(); return; }

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input, imageUrl: activeImage || undefined, timestamp: Date.now() };
    const assistantMessage: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: '', thought: '', timestamp: Date.now() };

    const updatedSession = { ...session, messages: [...session.messages, userMessage, assistantMessage], updatedAt: Date.now() };
    setSessions(prev => prev.map(s => s.id === session.id ? updatedSession : s));
    
    setInput('');
    setActiveImage(null);
    setIsTyping(true);

    try {
      let fullRawResponse = '';
      const model = session.model || (user.role === UserRole.PREMIUM ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview');
      const history = updatedSession.messages.slice(0, -2).map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] }));
      
      if (userMessage.imageUrl) {
        const analysis = await aiService.analyzeImage(userMessage.imageUrl.split(',')[1], input || "Analyze payload.");
        setSessions(prev => prev.map(s => s.id === session.id ? { ...s, messages: s.messages.map(m => m.id === assistantMessage.id ? { ...m, content: analysis || '' } : m) } : s));
      } else {
        const streamResponse = await aiService.streamChat(model, userMessage.content, history);
        for await (const chunk of streamResponse) {
          fullRawResponse += chunk.text || "";
          const thoughtMatch = fullRawResponse.match(/<thought>([\s\S]*?)<\/thought>/);
          const thought = thoughtMatch ? thoughtMatch[1] : '';
          const content = fullRawResponse.replace(/<thought>[\s\S]*?<\/thought>/, '').trim();
          
          setSessions(prev => prev.map(s => s.id === session.id ? { 
            ...s, 
            messages: s.messages.map(m => m.id === assistantMessage.id ? { ...m, content, thought } : m) 
          } : s));
        }
      }
      if (autoVoice) {
        const finalMsg = fullRawResponse.replace(/<thought>[\s\S]*?<\/thought>/, '').trim();
        await aiService.speak(finalMsg, user.preferredVoice);
      }
      if (user.role === UserRole.FREE) {
        const updatedUser = { ...user, credits: user.credits - 1 };
        setUser(updatedUser);
        storageService.saveUser(updatedUser);
      }
    } catch (error) {
      addNotification("Link Failure. 🔌");
    } finally {
      setIsTyping(false);
      storageService.saveSessions(sessions);
    }
  };

  if (session?.isSecret && user.lockSecretChats && !isUnlocked) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-black relative h-full overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-20"></div>
        <div className="w-24 h-24 bg-[#FF007F]/10 border-2 border-[#FF007F] rounded-[2.5rem] flex items-center justify-center mb-10 shadow-[0_0_40px_rgba(255,0,127,0.5)] animate-pulse"><Lock className="text-[#FF007F]" size={42} /></div>
        <h2 className="text-xl md:text-2xl font-black font-mono text-[#FF007F] tracking-[0.3em] uppercase text-glow-pink">SECURE_CLEARANCE_REQUIRED</h2>
        <form onSubmit={handleUnlock} className="w-full max-w-xs space-y-8 mt-10">
          <input type="password" value={pinInput} onChange={(e) => setPinInput(e.target.value)} className="w-full bg-slate-900/60 border-2 border-[#FF007F]/40 text-center text-3xl tracking-[0.8em] py-6 rounded-3xl focus:outline-none focus:border-[#FF007F] text-white font-mono" maxLength={8} placeholder="****" autoFocus />
          <button type="submit" className="w-full bg-[#FF007F] text-white py-5 rounded-3xl font-black uppercase tracking-[0.3em] text-xs font-mono shadow-[0_0_30px_rgba(255,0,127,0.3)]">UNLOCK_ACCESS</button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-black relative">
      {!session ? (
        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center relative z-10 h-full overflow-hidden">
          <div className="absolute inset-0 cyber-grid opacity-30"></div>
          <div className="w-24 h-24 md:w-32 md:h-32 bg-[#39FF14]/10 rounded-[2.5rem] flex items-center justify-center mb-10 border-4 border-[#39FF14] text-[#39FF14] animate-pulse glow-green"><Cpu size={56} /></div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 font-mono tracking-[0.2em] text-white uppercase text-glow-green">Matrix_Online 🤖</h2>
          <p className="text-slate-500 text-[11px] max-w-lg mb-16 font-mono uppercase tracking-[0.4em] font-black">Establishing secure conversational uplink...</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
            <button onClick={() => onNewChat()} className="glass p-10 rounded-[3rem] border-[#39FF14]/30 hover:border-[#39FF14] transition-all text-left group shadow-[0_0_30px_rgba(57,255,20,0.1)]">
              <Zap className="text-[#39FF14] mb-6 drop-shadow-[0_0_12px_rgba(57,255,20,0.6)]" size={40} />
              <h3 className="font-black text-xl text-white font-mono uppercase tracking-[0.2em] mb-2 group-hover:text-[#39FF14]">Initialize_Chat 💬</h3>
              <p className="text-[10px] text-slate-500 font-mono font-black uppercase tracking-widest">Protocol: Fast_Response</p>
            </button>
            <button onClick={() => onNavigate(AppView.DASHBOARD)} className="glass p-10 rounded-[3rem] border-[#BC13FE]/30 hover:border-[#BC13FE] transition-all text-left group shadow-[0_0_30px_rgba(188,19,254,0.1)]">
              <LayoutDashboard className="text-[#BC13FE] mb-6 drop-shadow-[0_0_12px_rgba(188,19,254,0.6)]" size={40} />
              <h3 className="font-black text-xl text-white font-mono uppercase tracking-[0.2em] mb-2 group-hover:text-[#BC13FE]">System_Dashboard 📊</h3>
              <p className="text-[10px] text-slate-500 font-mono font-black uppercase tracking-widest">Protocol: Live_Analytics</p>
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between px-6 md:px-10 py-5 border-b-2 border-white/10 glass backdrop-blur-3xl sticky top-0 z-30">
            <div className="flex items-center gap-6 min-w-0">
              <div className={`w-3.5 h-3.5 rounded-full shrink-0 ${isTyping ? 'bg-[#39FF14] animate-pulse shadow-[0_0_12px_#39FF14]' : 'bg-slate-800'}`} />
              <h3 className="font-black text-[13px] font-mono tracking-[0.2em] uppercase truncate text-white">{session.title}</h3>
            </div>
            <div className="flex items-center gap-4">
               <button 
                  onClick={() => setAutoVoice(!autoVoice)} 
                  className={`p-3 rounded-2xl border-2 transition-all ${autoVoice ? 'text-[#39FF14] border-[#39FF14] bg-[#39FF14]/15 shadow-[0_0_15px_rgba(57,255,20,0.3)]' : 'text-slate-500 border-white/10'}`} 
                  title="Auto-Voice"
                >
                  <Volume2 size={20} />
                </button>
                <button onClick={handleExportPDF} className="p-3 bg-white/5 hover:text-cyber-blue rounded-2xl border-2 border-white/10 text-slate-500 transition-all"><FileDown size={20} /></button>
                <button onClick={() => setSessions(prev => prev.filter(s => s.id !== session.id))} className="p-3 hover:text-red-500 rounded-2xl text-slate-500 border-2 border-white/10 bg-white/5 transition-all"><Trash2 size={20} /></button>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 md:px-12 py-10 space-y-12 cyber-grid">
            {session.messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4`}>
                <div className={`max-w-[90%] md:max-w-[80%] rounded-[2.5rem] px-8 md:px-10 py-8 relative border-2 ${m.role === 'user' ? 'bg-[#39FF14] border-[#39FF14] text-black font-black' : 'bg-white border-white text-black font-bold'}`}>
                  {m.imageUrl && <img src={m.imageUrl} alt="Payload" className="rounded-2xl mb-6 border-4 border-black/10 shadow-lg w-full object-contain max-h-[400px]" />}
                  {m.role === 'assistant' && m.thought && <ReasoningSection thought={m.thought} />}
                  <div className="text-[15px] md:text-[16px] leading-[1.7] whitespace-pre-wrap font-sans">
                    {m.content}
                    {isTyping && m.role === 'assistant' && m.id === session.messages[session.messages.length - 1].id && <TypingCursor />}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-8 glass border-t-2 border-white/10 bg-black/95 relative z-40">
            <form onSubmit={handleSend} className="max-w-6xl mx-auto flex flex-col md:flex-row items-stretch md:items-end gap-6">
              <div className="flex items-center gap-4">
                <button type="button" onClick={() => fileInputRef.current?.click()} className="p-5 bg-black border-4 border-[#BC13FE] rounded-[1.5rem] text-[#BC13FE] shadow-[0_0_20px_rgba(188,19,254,0.3)] hover:scale-105 transition-all"><ImageIcon size={28} /></button>
                <input type="file" ref={fileInputRef} onChange={(e) => { const file = e.target.files?.[0]; if (file) { const r = new FileReader(); r.onload = (ev) => setActiveImage(ev.target?.result as string); r.readAsDataURL(file); } }} accept="image/*" className="hidden" />
              </div>

              <div className="flex-1 relative">
                <textarea 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)} 
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }} 
                  placeholder="TRANSMIT_COMMAND_DATA... ⌨️" 
                  className="w-full bg-white border-4 border-slate-300 rounded-[2rem] px-8 py-6 pr-20 focus:outline-none focus:border-cyber-green text-black font-black text-sm md:text-lg transition-all min-h-[72px] max-h-64 shadow-xl placeholder:text-slate-400 placeholder:uppercase" 
                  rows={1} 
                />
                <button type="submit" disabled={(!input.trim() && !activeImage) || isTyping} className="absolute right-4 bottom-4 p-4 rounded-2xl bg-[#39FF14] text-black shadow-[0_0_15px_#39FF14] hover:scale-110 active:scale-90 transition-all disabled:opacity-20"><Send size={24} strokeWidth={3} /></button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatInterface;
