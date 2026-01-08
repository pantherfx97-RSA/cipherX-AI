
import React from 'react';
import { 
  Shield, Zap, Lock, Globe, ArrowRight, Cpu, 
  MessageSquare, Layout, Sparkles, Code, 
  Search, Users, Briefcase, Wand2, GraduationCap, 
  Check, Star, MousePointer2, AlertCircle, Terminal,
  Activity, ZapOff, Fingerprint, Layers, BrainCircuit,
  Eye, BarChart3, Clock, ShieldCheck, ZapIcon,
  Infinity, XCircle, CheckCircle2, ChevronRight
} from 'lucide-react';
import { APP_NAME, DEVELOPER_INFO, PRICING, NEON_GREEN, NEON_PINK, BRAND_COLOR } from '../constants';
import Logo from './Logo';

const LandingPage: React.FC<{ onEnter: () => void }> = ({ onEnter }) => {
  return (
    <div className="min-h-screen bg-black flex flex-col selection:bg-cyber-blue/30 selection:text-cyber-blue overflow-x-hidden relative">
      <div className="scanline"></div>
      
      {/* Navigation */}
      <nav className="p-5 md:p-8 flex items-center justify-between glass sticky top-0 z-[60] border-b-2 border-white/10 shadow-2xl backdrop-blur-3xl">
        <div className="flex items-center gap-4">
          <Logo size={36} className="drop-shadow-[0_0_15px_rgba(0,229,255,0.6)] animate-pulse" />
          <span className="text-xl md:text-2xl font-black font-mono tracking-tighter text-white drop-shadow-md">CIPHER_X <span className="text-[#39FF14]">AI</span></span>
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={onEnter}
            className="text-slate-400 hover:text-white transition-all text-[11px] font-mono uppercase tracking-[0.3em] font-black hidden lg:block hover:text-glow-blue"
          >
            CLEARANCE_AUTH
          </button>
          <button 
            onClick={onEnter}
            className="btn-neon-green px-8 md:px-10 py-3 md:py-4 rounded-2xl font-black transition-all text-xs md:text-sm uppercase tracking-[0.2em] shadow-[0_0_20px_#39FF14]"
          >
            INITIALIZE_UPLINK
          </button>
        </div>
      </nav>

      <main className="flex-1 relative">
        {/* Hero Section */}
        <section className="px-6 py-24 md:py-48 text-center max-w-6xl mx-auto space-y-12 relative z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-cyber-blue/15 blur-[150px] rounded-full pointer-events-none animate-pulse"></div>
          
          <div className="inline-flex flex-col items-center gap-8 mb-4 relative">
            <div className="p-8 md:p-12 glass border-4 border-cyber-blue rounded-[4rem] shadow-[0_0_60px_rgba(0,229,255,0.3)] animate-float">
                <Logo size={140} className="drop-shadow-[0_0_40px_rgba(0,229,255,0.7)]" />
            </div>
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-cyber-green/10 border-2 border-cyber-green/40 rounded-full text-cyber-green text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em] font-mono shadow-[0_0_20px_rgba(57,255,20,0.2)]">
              <Activity size={16} className="animate-pulse" /> CORE_INTELLIGENCE: STABLE
            </div>
          </div>
          
          <h1 className="text-5xl md:text-9xl font-black tracking-tighter text-white leading-[1.1] uppercase">
            DECRYPT THE <span className="text-glow-blue text-[#00E5FF]">FUTURE</span><br className="hidden md:block" /> 
            OF <span className="text-glow-green text-[#39FF14]">CONVERSATION</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-slate-400 leading-relaxed max-w-3xl mx-auto font-black font-mono tracking-tight uppercase opacity-80">
            High-clearance // Ultra-secure // Low-latency matrix for innovators & security professionals.
          </p>
          
          <div className="flex flex-col items-center gap-8 pt-10">
            <button 
              onClick={onEnter}
              className="w-full sm:w-auto bg-[#39FF14] text-black px-16 py-8 rounded-[2.5rem] font-black text-2xl hover:shadow-[0_0_60px_rgba(57,255,20,0.6)] transition-all flex items-center justify-center gap-5 group active:scale-95 shadow-[0_15px_30px_rgba(57,255,20,0.3)]"
            >
              ACCESS_INTERFACE <ArrowRight size={32} strokeWidth={3} className="group-hover:translate-x-3 transition-transform" />
            </button>
            <div className="flex items-center gap-6">
               <div className="h-px w-16 bg-gradient-to-r from-transparent to-slate-800"></div>
               <p className="text-[11px] text-slate-500 font-mono tracking-[0.5em] uppercase font-black">
                 ESTABLISHING_ENCRYPTED_UPLINK...
               </p>
               <div className="h-px w-16 bg-gradient-to-l from-transparent to-slate-800"></div>
            </div>
          </div>
        </section>

        {/* Protocol Comparison Table */}
        <section className="px-6 py-24 md:py-40 relative z-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black font-mono text-white tracking-tighter uppercase mb-6 text-glow-blue">CLEARANCE_LEVELS</h2>
              <div className="h-1 w-32 bg-cyber-blue mx-auto rounded-full shadow-[0_0_15px_#00E5FF]"></div>
              <p className="text-slate-500 font-mono text-[11px] tracking-[0.5em] uppercase mt-6 font-black opacity-60">Evaluate your access protocol requirements</p>
            </div>

            <div className="glass rounded-[4rem] border-4 border-white/10 overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.7)]">
              <div className="grid grid-cols-1 md:grid-cols-3">
                {/* Headers / Labels */}
                <div className="hidden md:flex flex-col bg-white/5 border-r-4 border-white/10">
                  <div className="h-40 p-12 flex items-end">
                    <span className="text-[12px] font-mono font-black text-slate-500 uppercase tracking-[0.3em]">SYSTEM_MATRIX_MODULES</span>
                  </div>
                  {[
                    "DAILY_POWER_CREDITS",
                    "INTELLIGENCE_MODEL",
                    "REASONING_PATH_CALC",
                    "VISUAL_PAYLOAD_SCAN",
                    "ENCRYPTED_VAULT_BANK",
                    "PRIORITY_UPLINK_STATUS",
                    "CLEAN_INTERFACE_SLA"
                  ].map((label, i) => (
                    <div key={i} className="h-24 px-12 flex items-center border-t-2 border-white/5">
                      <span className="text-[13px] font-mono font-black text-slate-400 uppercase tracking-tighter">{label}</span>
                    </div>
                  ))}
                </div>

                {/* Free Tier Column */}
                <div className="flex flex-col border-r-4 border-white/10 group hover:bg-white/[0.04] transition-all">
                  <div className="h-40 p-12 flex flex-col justify-center">
                    <div className="inline-flex items-center gap-3 text-[11px] font-mono font-black text-slate-500 uppercase tracking-[0.3em] mb-3">GUEST_IDENTITY</div>
                    <div className="text-4xl font-black font-mono text-white drop-shadow-md">FREE</div>
                  </div>
                  
                  <div className="md:hidden px-10 py-3 bg-slate-900/60 text-[10px] font-mono text-slate-600 font-black">DAILY_POWER_CREDITS</div>
                  <div className="h-24 px-10 flex items-center border-t-2 border-white/5 gap-5">
                    <ZapOff size={24} className="text-slate-600" />
                    <span className="text-sm font-mono font-black text-slate-400">5_LIMIT / DAY</span>
                  </div>

                  <div className="md:hidden px-10 py-3 bg-slate-900/60 text-[10px] font-mono text-slate-600 font-black">INTELLIGENCE_MODEL</div>
                  <div className="h-24 px-10 flex items-center border-t-2 border-white/5 gap-5">
                    <Activity size={24} className="text-slate-600" />
                    <span className="text-sm font-mono font-black text-slate-400">FLASH_V2_CORE</span>
                  </div>

                  <div className="md:hidden px-10 py-3 bg-slate-900/60 text-[10px] font-mono text-slate-600 font-black">REASONING_PATH</div>
                  <div className="h-24 px-10 flex items-center border-t-2 border-white/5 gap-5">
                    <XCircle size={24} className="text-red-500/40" />
                    <span className="text-sm font-mono font-black text-slate-600 uppercase tracking-widest">OFFLINE</span>
                  </div>

                  <div className="md:hidden px-10 py-3 bg-slate-900/60 text-[10px] font-mono text-slate-600 font-black">VISUAL_SCAN</div>
                  <div className="h-24 px-10 flex items-center border-t-2 border-white/5 gap-5">
                    <Search size={24} className="text-slate-600" />
                    <span className="text-sm font-mono font-black text-slate-400 uppercase tracking-widest">BASIC_ONLY</span>
                  </div>

                  <div className="md:hidden px-10 py-3 bg-slate-900/60 text-[10px] font-mono text-slate-600 font-black">ENCRYPTED_VAULT</div>
                  <div className="h-24 px-10 flex items-center border-t-2 border-white/5 gap-5">
                    <Lock size={24} className="text-slate-600" />
                    <span className="text-sm font-mono font-black text-slate-400 uppercase tracking-widest">3_ENTRIES_MAX</span>
                  </div>

                  <div className="md:hidden px-10 py-3 bg-slate-900/60 text-[10px] font-mono text-slate-600 font-black">PRIORITY_UPLINK</div>
                  <div className="h-24 px-10 flex items-center border-t-2 border-white/5 gap-5">
                    <XCircle size={24} className="text-red-500/40" />
                    <span className="text-sm font-mono font-black text-slate-600 uppercase tracking-widest">UNAVAILABLE</span>
                  </div>

                  <div className="md:hidden px-10 py-3 bg-slate-900/60 text-[10px] font-mono text-slate-600 font-black">CLEAN_INTERFACE</div>
                  <div className="h-24 px-10 flex items-center border-t-2 border-white/5 gap-5">
                    <XCircle size={24} className="text-red-500/40" />
                    <span className="text-sm font-mono font-black text-slate-600 uppercase tracking-widest">UNAVAILABLE</span>
                  </div>

                  <div className="p-10">
                    <button onClick={onEnter} className="w-full py-6 rounded-3xl border-2 border-white/10 text-slate-500 font-mono text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black hover:border-white transition-all shadow-xl active:scale-95">START_GUEST_SESSION</button>
                  </div>
                </div>

                {/* Premium Tier Column */}
                <div className="flex flex-col bg-cyber-pink/5 relative group border-2 border-cyber-pink/20 md:border-0">
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-cyber-pink text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-[0_0_25px_rgba(255,0,127,0.5)] animate-pulse">ELITE_CLEARANCE</div>
                  </div>
                  <div className="h-40 p-12 flex flex-col justify-center">
                    <div className="inline-flex items-center gap-3 text-[11px] font-mono font-black text-cyber-pink uppercase tracking-[0.3em] mb-3">ELITE_CORE_PROTOCOL</div>
                    <div className="text-4xl font-black font-mono text-white text-glow-pink">PREMIUM</div>
                  </div>

                  <div className="md:hidden px-10 py-3 bg-cyber-pink/10 text-[10px] font-mono text-cyber-pink font-black uppercase tracking-widest">DAILY_POWER_CREDITS</div>
                  <div className="h-24 px-10 flex items-center border-t-2 border-cyber-pink/20 gap-5">
                    <Infinity size={24} className="text-cyber-pink drop-shadow-[0_0_5px_#FF007F]" />
                    <span className="text-sm font-mono font-black text-white uppercase tracking-widest">UNLIMITED_OPS</span>
                  </div>

                  <div className="md:hidden px-10 py-3 bg-cyber-pink/10 text-[10px] font-mono text-cyber-pink font-black uppercase tracking-widest">INTELLIGENCE_MODEL</div>
                  <div className="h-24 px-10 flex items-center border-t-2 border-cyber-pink/20 gap-5">
                    <BrainCircuit size={24} className="text-cyber-pink" />
                    <span className="text-sm font-mono font-black text-white uppercase tracking-widest">PRO_MATRIX_V4</span>
                  </div>

                  <div className="md:hidden px-10 py-3 bg-cyber-pink/10 text-[10px] font-mono text-cyber-pink font-black uppercase tracking-widest">REASONING_PATH</div>
                  <div className="h-24 px-10 flex items-center border-t-2 border-cyber-pink/20 gap-5">
                    <CheckCircle2 size={24} className="text-cyber-green drop-shadow-[0_0_5px_#39FF14]" />
                    <span className="text-sm font-mono font-black text-white uppercase tracking-widest">DEEP_REASONING_ON</span>
                  </div>

                  <div className="md:hidden px-10 py-3 bg-cyber-pink/10 text-[10px] font-mono text-cyber-pink font-black uppercase tracking-widest">VISUAL_SCAN</div>
                  <div className="h-24 px-10 flex items-center border-t-2 border-cyber-pink/20 gap-5">
                    <Eye size={24} className="text-cyber-pink drop-shadow-[0_0_5px_#FF007F]" />
                    <span className="text-sm font-mono font-black text-white uppercase tracking-widest">HIGH_RES_INSPECT</span>
                  </div>

                  <div className="md:hidden px-10 py-3 bg-cyber-pink/10 text-[10px] font-mono text-cyber-pink font-black uppercase tracking-widest">ENCRYPTED_VAULT</div>
                  <div className="h-24 px-10 flex items-center border-t-2 border-cyber-pink/20 gap-5">
                    <ShieldCheck size={24} className="text-cyber-pink" />
                    <span className="text-sm font-mono font-black text-white uppercase tracking-widest">UNLIMITED_STORAGE</span>
                  </div>

                  <div className="md:hidden px-10 py-3 bg-cyber-pink/10 text-[10px] font-mono text-cyber-pink font-black uppercase tracking-widest">PRIORITY_UPLINK</div>
                  <div className="h-24 px-10 flex items-center border-t-2 border-cyber-pink/20 gap-5">
                    <CheckCircle2 size={24} className="text-cyber-green drop-shadow-[0_0_5px_#39FF14]" />
                    <span className="text-sm font-mono font-black text-white uppercase tracking-widest">TOP_TIER_SERVER_SLA</span>
                  </div>

                  <div className="md:hidden px-10 py-3 bg-cyber-pink/10 text-[10px] font-mono text-cyber-pink font-black uppercase tracking-widest">CLEAN_INTERFACE</div>
                  <div className="h-24 px-10 flex items-center border-t-2 border-cyber-pink/20 gap-5">
                    <CheckCircle2 size={24} className="text-cyber-green" />
                    <span className="text-sm font-mono font-black text-white uppercase tracking-widest">100%_ZERO_ADS</span>
                  </div>

                  <div className="p-10">
                    <button onClick={onEnter} className="w-full py-6 rounded-3xl bg-cyber-pink text-white font-mono text-[11px] font-black uppercase tracking-[0.3em] shadow-[0_0_40px_rgba(255,0,127,0.5)] hover:scale-105 transition-all active:scale-95">INITIALIZE_ELITE_CORE</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Matrix Section */}
        <section className="px-6 py-32 bg-slate-950/50 relative overflow-hidden">
           <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-blue/30 to-transparent"></div>
           <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-10 text-left">
                 <h2 className="text-5xl md:text-7xl font-black font-mono text-white tracking-tighter uppercase leading-[1.1]">
                   AESTHETIC_&_<br />
                   <span className="text-cyber-green text-glow-green">PRECISION</span>
                 </h2>
                 <p className="text-slate-400 text-lg md:text-xl font-bold font-mono tracking-tight uppercase leading-relaxed max-w-lg">
                   Crafted with a deep-void dark mode and high-contrast neon fixtures to ensure visibility in high-intensity operations.
                 </p>
                 <div className="flex flex-wrap gap-4 pt-4">
                    {["CYBER_DESIGN", "AES_ENCRYPTION", "NEURAL_VOICE", "PRO_MATRIX"].map((tag, i) => (
                      <div key={i} className="px-4 py-1.5 border-2 border-white/10 rounded-full font-mono text-[9px] font-black text-slate-500 uppercase tracking-widest bg-white/5">
                        {tag}
                      </div>
                    ))}
                 </div>
              </div>
              <div className="relative group">
                 <div className="absolute -inset-4 bg-cyber-green/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                 <div className="glass p-8 md:p-12 rounded-[4rem] border-4 border-cyber-green/30 shadow-[0_30px_60px_rgba(0,0,0,0.5)] transform hover:scale-[1.03] transition-all duration-700 relative z-10">
                    <div className="space-y-8">
                       <div className="flex items-center justify-between border-b-2 border-white/5 pb-6">
                          <div className="flex items-center gap-4">
                             <div className="w-4 h-4 rounded-full bg-cyber-green animate-pulse shadow-[0_0_10px_#39FF14]"></div>
                             <span className="font-mono text-xs font-black text-white uppercase tracking-widest">Interface_Preview_Active</span>
                          </div>
                          <Terminal size={20} className="text-cyber-green" />
                       </div>
                       <div className="space-y-6">
                          <div className="bg-white/5 p-5 rounded-2xl border-2 border-white/5 flex items-start gap-4">
                             <div className="w-8 h-8 rounded-lg bg-cyber-blue/20 border border-cyber-blue/50 shrink-0"></div>
                             <div className="h-4 w-3/4 bg-white/10 rounded-full mt-2"></div>
                          </div>
                          <div className="bg-cyber-green/10 p-5 rounded-2xl border-2 border-cyber-green/30 flex items-start gap-4">
                             <div className="w-8 h-8 rounded-lg bg-cyber-green border border-cyber-green/50 shrink-0 flex items-center justify-center text-black font-black text-[10px]">AI</div>
                             <div className="space-y-3 flex-1">
                                <div className="h-3 w-full bg-white/20 rounded-full"></div>
                                <div className="h-3 w-5/6 bg-white/10 rounded-full"></div>
                                <div className="h-3 w-4/6 bg-white/10 rounded-full"></div>
                             </div>
                          </div>
                       </div>
                       <div className="pt-4 flex justify-center">
                          <button className="px-8 py-3 bg-cyber-green text-black font-black font-mono text-[10px] rounded-xl shadow-[0_0_15px_#39FF14] uppercase tracking-widest">START_EXPLORATION</button>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Founder / Mission Section */}
        <section className="px-6 py-32 md:py-48 bg-black relative">
          <div className="max-w-4xl mx-auto text-center space-y-16">
            <div className="w-28 h-28 md:w-36 md:h-36 bg-slate-900 border-4 border-cyber-blue rounded-[3rem] flex items-center justify-center mx-auto shadow-[0_0_60px_rgba(0,229,255,0.2)] hover:scale-110 transition-all duration-700">
              <Fingerprint size={64} className="text-cyber-blue drop-shadow-[0_0_10px_#00E5FF]" />
            </div>
            <div className="relative">
              <span className="absolute -top-10 -left-6 text-9xl text-white/5 font-serif select-none">“</span>
              <blockquote className="text-2xl md:text-5xl font-black text-slate-100 italic leading-[1.3] drop-shadow-2xl">
                {DEVELOPER_INFO}
              </blockquote>
              <span className="absolute -bottom-16 -right-6 text-9xl text-white/5 font-serif select-none">”</span>
            </div>
            <div className="flex flex-col items-center gap-4">
               <div className="h-1 w-32 bg-gradient-to-r from-transparent via-cyber-blue to-transparent shadow-[0_0_10px_#00E5FF]"></div>
               <span className="font-mono text-[12px] text-slate-400 uppercase tracking-[0.6em] font-black text-glow-blue">Wally Nthani // FOUNDER_NODE_01</span>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-6 py-40 text-center relative overflow-hidden">
           <div className="absolute inset-0 cyber-grid opacity-30"></div>
           <div className="max-w-4xl mx-auto glass p-20 md:p-32 rounded-[5rem] border-4 border-cyber-green/40 space-y-12 relative overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)] group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyber-green/10 via-transparent to-cyber-blue/10 pointer-events-none group-hover:opacity-100 opacity-60 transition-opacity duration-1000"></div>
              <h2 className="text-5xl md:text-8xl font-black font-mono text-white tracking-tighter uppercase text-glow-green">READY_TO_<br />INITIALIZE?</h2>
              <p className="text-slate-400 font-black font-mono uppercase tracking-[0.2em] text-sm md:text-lg opacity-80">Join the network of secure conversational nodes today.</p>
              <button 
                onClick={onEnter}
                className="bg-[#39FF14] text-black px-20 py-10 rounded-[2.5rem] font-black text-3xl hover:shadow-[0_0_80px_rgba(57,255,20,0.6)] transition-all active:scale-95 shadow-[0_20px_40px_rgba(57,255,20,0.3)] hover:scale-[1.05]"
              >
                ACCESS_SYSTEM_INTERFACE
              </button>
           </div>
        </section>

        {/* Footer */}
        <footer className="p-12 md:p-24 border-t-4 border-white/10 glass bg-black/98 relative z-50">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <Logo size={48} className="drop-shadow-[0_0_15px_rgba(0,229,255,0.6)]" />
                <span className="text-3xl font-black font-mono tracking-tighter text-white">CIPHER_X <span className="text-cyber-blue">AI</span></span>
              </div>
              <p className="text-[12px] text-slate-500 max-w-sm leading-[2] font-mono uppercase font-black tracking-widest opacity-80">
                Advanced conversational architecture // Designed for elite performance, total security, and geometric elegance.
              </p>
            </div>
            <div className="flex flex-col md:items-end justify-end gap-5 text-[11px] text-slate-500 font-mono tracking-[0.4em] uppercase font-black">
              <div className="flex gap-10 mb-6">
                 <a href="#" className="hover:text-cyber-green transition-all hover:text-glow-green">TOS_PROTOCOL</a>
                 <a href="#" className="hover:text-cyber-green transition-all hover:text-glow-green">PRIVACY_POLICY</a>
                 <a href="#" className="hover:text-cyber-green transition-all hover:text-glow-green">TECHNICAL_SUPPORT</a>
              </div>
              <span className="opacity-60">&copy; 2025 Wally Nthani — CipherX AI. ALL_RIGHTS_RESERVED.</span>
              <span className="text-cyber-green animate-pulse flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-cyber-green shadow-[0_0_10px_#39FF14]"></div> NETWORK_STATUS: ACTIVE_MATRIX
              </span>
            </div>
          </div>
        </footer>
      </main>
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .btn-neon-green {
            background: #39FF14;
            color: #000;
            box-shadow: 0 0 15px rgba(57, 255, 20, 0.6);
            transition: all 0.3s ease;
        }
        .btn-neon-green:hover {
            box-shadow: 0 0 25px rgba(57, 255, 20, 0.8);
            transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
