
import React from 'react';
import { Info, User, Shield, Zap, Globe, Cpu, Github, Linkedin, Mail, ExternalLink, Activity, Lock, ChevronLeft } from 'lucide-react';
import { DEVELOPER_INFO, CONTACT_DETAILS, APP_NAME } from '../constants';

const AboutView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-12 overflow-y-auto h-full pb-32 cyber-grid">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="p-4 bg-white/5 border border-white/20 rounded-[2rem] text-[#00E5FF] shadow-2xl">
            <Info size={36} />
          </div>
          <div>
            <h1 className="text-4xl font-black font-mono tracking-tighter text-white uppercase">About</h1>
            <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.3em] mt-1">System specifications and mission.</p>
          </div>
        </div>
        <button 
          onClick={onBack}
          className="p-3 bg-white/5 border border-white/10 rounded-xl text-slate-500 hover:text-[#00E5FF] transition-all group"
        >
          <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="glass p-10 rounded-[3rem] border-white/10 relative overflow-hidden group shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
          <Cpu size={120} className="text-[#00E5FF]" />
        </div>
        
        <div className="space-y-8 relative z-10">
          <section>
            <h2 className="text-xl font-bold font-mono text-white mb-4 flex items-center gap-3">
              <Shield className="text-[#00E5FF]" size={24} /> THE_VISION
            </h2>
            <p className="text-slate-400 leading-relaxed font-sans text-lg">
              {APP_NAME} is built to deliver intelligent, high-performance conversational AI without compromising on speed or elegance. Our platform bridges modern neural capabilities with a sleek, blue-themed user experience.
            </p>
          </section>

          <section className="pt-8 border-t border-white/5">
            <h2 className="text-xl font-bold font-mono text-white mb-4 flex items-center gap-3">
              <User className="text-[#00B0FF]" size={24} /> FOUNDER
            </h2>
            <div className="bg-black/40 p-8 rounded-3xl border border-white/5 space-y-4">
              <p className="text-slate-300 font-sans leading-relaxed italic">
                "{DEVELOPER_INFO}"
              </p>
              <div className="flex items-center gap-4 pt-4">
                <div className="w-12 h-12 bg-[#00E5FF]/10 rounded-xl flex items-center justify-center text-[#00E5FF]">
                  <Activity size={24} />
                </div>
                <div>
                  <div className="text-white font-bold font-mono">Wally Nthani</div>
                  <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Founder & Developer</div>
                </div>
              </div>
            </div>
          </section>

          <section className="pt-8 border-t border-white/5">
            <h2 className="text-xl font-bold font-mono text-white mb-6">TECHNOLOGY</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Intelligence Core', val: 'Gemini 3 Pro / Flash', icon: Zap },
                { label: 'Security', val: 'Local Encryption Layer', icon: Lock },
                { label: 'Vocal Engine', val: 'Neural Text-to-Speech', icon: Activity },
                { label: 'Interface', val: 'Modern React Architecture', icon: Globe }
              ].map((tech, i) => (
                <div key={i} className="flex items-center gap-4 p-5 glass rounded-2xl border-white/5">
                  <tech.icon size={20} className="text-[#00E5FF]" />
                  <div>
                    <div className="text-[9px] text-slate-500 font-mono uppercase tracking-widest">{tech.label}</div>
                    <div className="text-sm font-bold text-white">{tech.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      
      <div className="text-center text-[10px] font-mono text-slate-600 uppercase tracking-[0.5em]">
        &copy; 2025 Wally Nthani — CipherX AI.
      </div>
    </div>
  );
};

export default AboutView;
