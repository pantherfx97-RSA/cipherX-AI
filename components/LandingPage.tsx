
import React from 'react';
import { 
  Shield, Zap, Lock, Globe, ArrowRight, Cpu, 
  MessageSquare, Layout, Sparkles, Code, 
  Search, Users, Briefcase, Wand2, GraduationCap, 
  Check, Star, MousePointer2, AlertCircle, Terminal,
  Activity, ZapOff, Fingerprint, Layers, BrainCircuit,
  Eye, BarChart3, Clock, ShieldCheck, ZapIcon,
  Infinity, XCircle, CheckCircle2
} from 'lucide-react';
import { APP_NAME, DEVELOPER_INFO, PRICING, NEON_GREEN, NEON_PINK, BRAND_COLOR } from '../constants';
import Logo from './Logo';

const LandingPage: React.FC<{ onEnter: () => void }> = ({ onEnter }) => {
  return (
    <div className="min-h-screen bg-black flex flex-col selection:bg-[#00E5FF]/30 selection:text-[#00E5FF] overflow-x-hidden">
      {/* Navigation */}
      <nav className="p-4 md:p-6 flex items-center justify-between glass sticky top-0 z-50 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Logo size={24} className="drop-shadow-[0_0_8px_rgba(0,229,255,0.4)]" />
          <span className="text-lg font-bold font-mono tracking-tighter text-white">CIPHER_X</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={onEnter}
            className="text-slate-400 hover:text-white transition-all text-xs font-mono uppercase tracking-widest hidden md:block"
          >
            LOGIN
          </button>
          <button 
            onClick={onEnter}
            className="bg-[#39FF14] text-black px-4 md:px-6 py-2 rounded-lg font-bold transition-all text-xs md:text-sm shadow-[0_0_15px_rgba(57,255,20,0.3)] hover:scale-105 active:scale-95"
          >
            INITIALIZE
          </button>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-4 py-16 md:py-32 text-center max-w-5xl mx-auto space-y-8 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#00E5FF]/10 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="inline-flex flex-col items-center gap-6 mb-8">
            <Logo size={120} className="drop-shadow-[0_0_35px_rgba(0,229,255,0.6)] animate-pulse" />
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#39FF14]/10 border border-[#39FF14]/30 rounded-full text-[#39FF14] text-[8px] md:text-[10px] font-bold uppercase tracking-widest font-mono">
              CORE_INTELLIGENCE: ONLINE
            </div>
          </div>
          <h1 className="text-4xl md:text-8xl font-black tracking-tighter text-white leading-tight">
            DECRYPT THE <span className="text-glow-blue text-[#00E5FF]">FUTURE</span> OF <br className="hidden md:block" /> 
            <span className="text-white">CONVERSATION</span>
          </h1>
          <p className="text-base md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto font-medium">
            High-security, low-latency conversational intelligence for the next generation of innovators and cybersecurity professionals.
          </p>
          <div className="flex flex-col items-center gap-4 pt-6">
            <button 
              onClick={onEnter}
              className="w-full sm:w-auto bg-[#39FF14] text-black px-12 py-6 rounded-2xl font-black text-xl hover:shadow-[0_0_35px_rgba(57,255,20,0.5)] transition-all flex items-center justify-center gap-3 group active:scale-95"
            >
              ACCESS_INTERFACE <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase font-bold">
              ESTABLISHING_ENCRYPTED_UPLINK...
            </p>
          </div>
        </section>

        {/* Protocol Comparison Table (Now directly below Hero) */}
        <section className="px-4 py-12 md:py-20 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-black font-mono text-white tracking-tighter uppercase mb-4">PROTOCOL_COMPARISON</h2>
              <p className="text-slate-500 font-mono text-[10px] tracking-[0.3em] uppercase">Evaluate your clearance level</p>
            </div>

            <div className="glass rounded-[3rem] border-white/10 overflow-hidden shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3">
                {/* Headers / Labels */}
                <div className="hidden md:flex flex-col bg-white/5 border-r border-white/10">
                  <div className="h-32 p-8 flex items-end">
                    <span className="text-[10px] font-mono font-black text-slate-600 uppercase tracking-widest">SYSTEM_MODULES</span>
                  </div>
                  {[
                    "DAILY_POWER_CREDITS",
                    "INTELLIGENCE_MODEL",
                    "REASONING_PATH",
                    "VISUAL_PAYLOAD_SCAN",
                    "ENCRYPTED_VAULT",
                    "PRIORITY_UPLINK",
                    "AD_FREE_PROTOCOL"
                  ].map((label, i) => (
                    <div key={i} className="h-20 px-8 flex items-center border-t border-white/5">
                      <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-tighter">{label}</span>
                    </div>
                  ))}
                </div>

                {/* Free Tier Column */}
                <div className="flex flex-col border-r border-white/10 group hover:bg-white/[0.02] transition-colors">
                  <div className="h-32 p-8 flex flex-col justify-center">
                    <div className="inline-flex items-center gap-2 text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest mb-2">GUEST_CLEARANCE</div>
                    <div className="text-3xl font-black font-mono text-white">FREE</div>
                  </div>
                  
                  {/* Mobile Labels (only shown on mobile) */}
                  <div className="md:hidden px-8 py-2 bg-slate-900/50 text-[9px] font-mono text-slate-600">DAILY_POWER_CREDITS</div>
                  <div className="h-20 px-8 flex items-center border-t border-white/5 gap-3">
                    <ZapOff size={18} className="text-slate-500" />
                    <span className="text-xs font-mono font-bold text-slate-300">5 PER DAY</span>
                  </div>

                  <div className="md:hidden px-8 py-2 bg-slate-900/50 text-[9px] font-mono text-slate-600">INTELLIGENCE_MODEL</div>
                  <div className="h-20 px-8 flex items-center border-t border-white/5 gap-3">
                    <Activity size={18} className="text-slate-500" />
                    <span className="text-xs font-mono font-bold text-slate-300">STANDARD_V2</span>
                  </div>

                  <div className="md:hidden px-8 py-2 bg-slate-900/50 text-[9px] font-mono text-slate-600">REASONING_PATH</div>
                  <div className="h-20 px-8 flex items-center border-t border-white/5 gap-3">
                    <XCircle size={18} className="text-red-500/40" />
                    <span className="text-xs font-mono font-bold text-slate-600">DISABLED</span>
                  </div>

                  <div className="md:hidden px-8 py-2 bg-slate-900/50 text-[9px] font-mono text-slate-600">VISUAL_PAYLOAD_SCAN</div>
                  <div className="h-20 px-8 flex items-center border-t border-white/5 gap-3">
                    <Search size={18} className="text-slate-500" />
                    <span className="text-xs font-mono font-bold text-slate-300">BASIC_ONLY</span>
                  </div>

                  <div className="md:hidden px-8 py-2 bg-slate-900/50 text-[9px] font-mono text-slate-600">ENCRYPTED_VAULT</div>
                  <div className="h-20 px-8 flex items-center border-t border-white/5 gap-3">
                    <Lock size={18} className="text-slate-500" />
                    <span className="text-xs font-mono font-bold text-slate-300">3 ENTRIES</span>
                  </div>

                  <div className="md:hidden px-8 py-2 bg-slate-900/50 text-[9px] font-mono text-slate-600">PRIORITY_UPLINK</div>
                  <div className="h-20 px-8 flex items-center border-t border-white/5 gap-3">
                    <XCircle size={18} className="text-red-500/40" />
                    <span className="text-xs font-mono font-bold text-slate-600">UNAVAILABLE</span>
                  </div>

                  <div className="md:hidden px-8 py-2 bg-slate-900/50 text-[9px] font-mono text-slate-600">AD_FREE_PROTOCOL</div>
                  <div className="h-20 px-8 flex items-center border-t border-white/5 gap-3">
                    <XCircle size={18} className="text-red-500/40" />
                    <span className="text-xs font-mono font-bold text-slate-600">UNAVAILABLE</span>
                  </div>

                  <div className="p-8">
                    <button onClick={onEnter} className="w-full py-4 rounded-xl border border-white/10 text-slate-400 font-mono text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">START_GUEST_SESSION</button>
                  </div>
                </div>

                {/* Premium Tier Column */}
                <div className="flex flex-col bg-[#FF007F]/5 relative group">
                  <div className="absolute top-0 right-0 p-4">
                    <div className="bg-[#FF007F] text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg shadow-pink-500/40">ELITE_CLEARANCE</div>
                  </div>
                  <div className="h-32 p-8 flex flex-col justify-center">
                    <div className="inline-flex items-center gap-2 text-[10px] font-mono font-black text-[#FF007F] uppercase tracking-widest mb-2">ELITE_PROTOCOL</div>
                    <div className="flex items-baseline gap-2">
                      <div className="text-3xl font-black font-mono text-white">PREMIUM</div>
                    </div>
                  </div>

                  <div className="md:hidden px-8 py-2 bg-[#FF007F]/10 text-[9px] font-mono text-[#FF007F]">DAILY_POWER_CREDITS</div>
                  <div className="h-20 px-8 flex items-center border-t border-[#FF007F]/10 gap-3">
                    <Infinity size={18} className="text-[#FF007F]" />
                    <span className="text-xs font-mono font-black text-white">UNLIMITED</span>
                  </div>

                  <div className="md:hidden px-8 py-2 bg-[#FF007F]/10 text-[9px] font-mono text-[#FF007F]">INTELLIGENCE_MODEL</div>
                  <div className="h-20 px-8 flex items-center border-t border-[#FF007F]/10 gap-3">
                    <BrainCircuit size={18} className="text-[#FF007F]" />
                    <span className="text-xs font-mono font-black text-white">PRO_INTELLIGENCE_V3</span>
                  </div>

                  <div className="md:hidden px-8 py-2 bg-[#FF007F]/10 text-[9px] font-mono text-[#FF007F]">REASONING_PATH</div>
                  <div className="h-20 px-8 flex items-center border-t border-[#FF007F]/10 gap-3">
                    <CheckCircle2 size={18} className="text-[#39FF14]" />
                    <span className="text-xs font-mono font-black text-white">ACTIVE_REASONING</span>
                  </div>

                  <div className="md:hidden px-8 py-2 bg-[#FF007F]/10 text-[9px] font-mono text-[#FF007F]">VISUAL_PAYLOAD_SCAN</div>
                  <div className="h-20 px-8 flex items-center border-t border-[#FF007F]/10 gap-3">
                    <Eye size={18} className="text-[#FF007F]" />
                    <span className="text-xs font-mono font-black text-white">HIGH_RES_ANALYSIS</span>
                  </div>

                  <div className="md:hidden px-8 py-2 bg-[#FF007F]/10 text-[9px] font-mono text-[#FF007F]">ENCRYPTED_VAULT</div>
                  <div className="h-20 px-8 flex items-center border-t border-[#FF007F]/10 gap-3">
                    <ShieldCheck size={18} className="text-[#FF007F]" />
                    <span className="text-xs font-mono font-black text-white">UNLIMITED_STORAGE</span>
                  </div>

                  <div className="md:hidden px-8 py-2 bg-[#FF007F]/10 text-[9px] font-mono text-[#FF007F]">PRIORITY_UPLINK</div>
                  <div className="h-20 px-8 flex items-center border-t border-[#FF007F]/10 gap-3">
                    <CheckCircle2 size={18} className="text-[#39FF14]" />
                    <span className="text-xs font-mono font-black text-white">PRIORITY_SERVER_HANDOFF</span>
                  </div>

                  <div className="md:hidden px-8 py-2 bg-[#FF007F]/10 text-[9px] font-mono text-[#FF007F]">AD_FREE_PROTOCOL</div>
                  <div className="h-20 px-8 flex items-center border-t border-[#FF007F]/10 gap-3">
                    <CheckCircle2 size={18} className="text-[#39FF14]" />
                    <span className="text-xs font-mono font-black text-white">100%_CLEAN_INTERFACE</span>
                  </div>

                  <div className="p-8">
                    <button onClick={onEnter} className="w-full py-4 rounded-xl bg-[#FF007F] text-white font-mono text-[10px] font-black uppercase tracking-widest shadow-xl shadow-pink-500/30 hover:scale-[1.02] transition-all">INITIALIZE_PREMIUM_CORE</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* System Fixtures Previews */}
        <section className="px-4 py-24 bg-slate-950/40 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black font-mono text-white tracking-tighter uppercase mb-4">SYSTEM_FIXTURES</h2>
              <p className="text-slate-500 font-mono text-xs tracking-[0.3em] uppercase">Visual Preview of Active Protocols</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Free Protocol Fixture */}
              <div className="space-y-6">
                <div className="flex items-center justify-between px-6">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">FREE_TIER_PREVIEW</span>
                  <div className="flex items-center gap-2 px-2 py-1 bg-white/5 rounded border border-white/10 text-[8px] text-slate-400 font-mono">
                    <Clock size={10} /> RESET: 24H
                  </div>
                </div>
                <div className="glass rounded-[2rem] border-white/10 overflow-hidden shadow-2xl h-[400px] flex flex-col grayscale-[0.8] hover:grayscale-0 transition-all duration-700">
                  <div className="p-4 border-b border-white/10 bg-black/40 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-slate-500"></div>
                      <span className="text-[10px] font-mono text-slate-400">Standard_Session</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#39FF14]">3/5_CREDITS</span>
                  </div>
                  <div className="flex-1 p-6 space-y-4 font-mono">
                    <div className="flex justify-end">
                      <div className="bg-[#39FF14]/10 text-[#39FF14] p-3 rounded-xl rounded-tr-none text-[10px] max-w-[80%]">
                        Explain quantum entanglement briefly.
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-white/5 border border-white/10 p-4 rounded-xl rounded-tl-none text-[10px] text-slate-300 max-w-[90%] leading-relaxed">
                        Quantum entanglement is a physical phenomenon that occurs when pairs or groups of particles are generated, interact, or share spatial proximity...
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t border-white/10 bg-black/60">
                    <div className="h-10 bg-white/5 border border-white/10 rounded-xl flex items-center px-4 text-[10px] text-slate-600">
                      Enter command...
                    </div>
                  </div>
                </div>
              </div>

              {/* Premium Core Fixture */}
              <div className="space-y-6">
                <div className="flex items-center justify-between px-6">
                  <span className="text-[10px] font-mono font-bold text-[#FF007F] uppercase tracking-widest flex items-center gap-2">
                    <Star size={12} /> PREMIUM_CORE_PREVIEW
                  </span>
                  <div className="flex items-center gap-2 px-2 py-1 bg-[#FF007F]/10 rounded border border-[#FF007F]/30 text-[8px] text-[#FF007F] font-mono">
                    <Zap size={10} /> UNLIMITED_FLOW
                  </div>
                </div>
                <div className="glass rounded-[2rem] border-[#FF007F]/30 overflow-hidden shadow-[0_0_50px_rgba(255,0,127,0.15)] h-[400px] flex flex-col">
                  <div className="p-4 border-b border-[#FF007F]/20 bg-[#FF007F]/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#FF007F] animate-pulse glow-pink"></div>
                      <span className="text-[10px] font-mono text-white font-bold">Pro_Intelligence_V3</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#FF007F] font-black">UNLIMITED_ACCESS</span>
                  </div>
                  <div className="flex-1 p-6 space-y-4 font-mono overflow-hidden">
                    <div className="flex justify-start">
                      <div className="bg-[#FF007F]/10 border border-[#FF007F]/20 p-3 rounded-xl text-[9px] text-[#FF007F] flex items-center gap-2">
                        <BrainCircuit size={14} /> Reasoning_Path: Initializing...
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-white text-black p-4 rounded-xl rounded-tl-none text-[11px] font-sans font-bold leading-relaxed shadow-xl">
                        Based on the high-resolution visual scan of the network topology provided, I have identified a critical vulnerability in the Layer 2 authentication protocol.
                      </div>
                    </div>
                    <div className="flex justify-start gap-2">
                       <div className="w-24 h-24 bg-slate-900 border border-[#FF007F]/40 rounded-xl flex items-center justify-center text-[#FF007F] relative">
                          <Eye size={20} />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-2">
                            <span className="text-[6px] text-white">SCANNING...</span>
                          </div>
                       </div>
                       <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col justify-center gap-2">
                          <div className="h-1 w-full bg-[#FF007F] rounded"></div>
                          <div className="h-1 w-2/3 bg-[#FF007F]/40 rounded"></div>
                          <div className="h-1 w-4/5 bg-[#FF007F]/40 rounded"></div>
                       </div>
                    </div>
                  </div>
                  <div className="p-4 border-t border-[#FF007F]/20 bg-black/60">
                    <div className="h-12 bg-white border-2 border-[#FF007F] rounded-2xl flex items-center px-6 text-[11px] text-black font-bold justify-between">
                      Executing high-res analysis...
                      <Zap size={16} className="text-[#FF007F]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Infrastructure Stats Fixture */}
        <section className="px-4 py-20 bg-slate-950/60 border-y border-white/5">
          <div className="max-w-7xl mx-auto">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { label: "NETWORK_NODES", val: "1,204+", icon: Users },
                  { label: "TOTAL_PAYLOADS", val: "42.8K+", icon: MessageSquare },
                  { label: "UPTIME_PROTOCOL", val: "99.99%", icon: Activity },
                  { label: "SECURITY_LEVEL", val: "AES_256", icon: Shield }
                ].map((stat, i) => (
                  <div key={i} className="text-center space-y-2">
                    <stat.icon size={24} className="mx-auto text-[#00E5FF] opacity-50 mb-4" />
                    <div className="text-2xl md:text-3xl font-black font-mono text-white">{stat.val}</div>
                    <div className="text-[8px] md:text-[10px] text-slate-500 font-mono tracking-[0.2em] font-bold">{stat.label}</div>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* Founder / Mission Section */}
        <section className="px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="w-24 h-24 bg-slate-900 border border-[#00E5FF]/40 rounded-[2rem] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(0,229,255,0.1)]">
              <Fingerprint size={48} className="text-[#00E5FF]" />
            </div>
            <blockquote className="text-xl md:text-4xl font-medium text-slate-300 italic leading-relaxed">
              "{DEVELOPER_INFO}"
            </blockquote>
            <div className="flex flex-col items-center gap-2">
               <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent"></div>
               <span className="font-mono text-[10px] text-slate-500 uppercase tracking-[0.5em] font-black">Wally Nthani // FOUNDER_CODE_01</span>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-4 py-32 text-center">
           <div className="max-w-3xl mx-auto glass p-16 rounded-[4rem] border-[#39FF14]/30 space-y-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#39FF14]/5 to-transparent pointer-events-none"></div>
              <h2 className="text-4xl md:text-6xl font-black font-mono text-white tracking-tighter">READY_TO_INITIALIZE?</h2>
              <p className="text-slate-400 font-medium">Join the network of secure conversational explorers today.</p>
              <button 
                onClick={onEnter}
                className="bg-[#39FF14] text-black px-12 py-6 rounded-2xl font-black text-xl hover:shadow-[0_0_50px_rgba(57,255,20,0.4)] transition-all active:scale-95"
              >
                START_CONNECTION_NOW
              </button>
           </div>
        </section>

        {/* Footer */}
        <footer className="p-10 md:p-20 border-t border-white/10 glass bg-black/95">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Logo size={32} className="drop-shadow-[0_0_12px_rgba(0,229,255,0.4)]" />
                <span className="text-xl font-bold font-mono tracking-tighter text-white">CIPHER_X AI</span>
              </div>
              <p className="text-xs text-slate-600 max-w-sm leading-loose font-mono uppercase font-bold">
                Advanced conversational architecture designed for performance, security, and elegance.
              </p>
            </div>
            <div className="flex flex-col md:items-end justify-end gap-3 text-[10px] text-slate-500 font-mono tracking-widest uppercase font-black">
              <div className="flex gap-6 mb-4">
                 <a href="#" className="hover:text-[#39FF14] transition-colors">TOS</a>
                 <a href="#" className="hover:text-[#39FF14] transition-colors">PRIVACY</a>
                 <a href="#" className="hover:text-[#39FF14] transition-colors">UPLINK_SUPPORT</a>
              </div>
              <span>&copy; 2025 Wally Nthani — CipherX AI.</span>
              <span className="text-[#39FF14]">NETWORK_STATUS: ACTIVE</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default LandingPage;
