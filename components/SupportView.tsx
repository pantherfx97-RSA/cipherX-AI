
import React, { useState } from 'react';
import { HelpCircle, Mail, Phone, MapPin, Send, MessageSquare, AlertCircle, Terminal, ShieldAlert, ChevronLeft } from 'lucide-react';
import { User } from '../types';
import { CONTACT_DETAILS } from '../constants';

interface SupportViewProps {
  user: User;
  addNotification: (t: string) => void;
  onBack: () => void;
}

// Fixed the truncated component and added the missing default export
const SupportView: React.FC<SupportViewProps> = ({ user, addNotification, onBack }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    // Simulate report submission delay
    setTimeout(() => {
      setIsSending(false);
      setSubject('');
      setMessage('');
      addNotification("Report submitted successfully.");
    }, 1500);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12 overflow-y-auto h-full pb-32 cyber-grid">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-slate-900 border border-[#00E5FF]/30 rounded-[2rem] text-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.15)] animate-pulse">
            <HelpCircle size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-bold font-mono tracking-tight text-white text-glow-blue">
              SUPPORT
            </h1>
            <p className="text-slate-500 font-mono text-xs uppercase tracking-widest mt-1">Direct uplink for technical assistance and feedback.</p>
          </div>
        </div>
        <button 
          onClick={onBack}
          className="p-3 bg-white/5 border border-white/10 rounded-xl text-slate-500 hover:text-[#00E5FF] transition-all group"
        >
          <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="glass p-12 rounded-[3rem] border-[#00E5FF]/20 space-y-10 relative overflow-hidden group shadow-2xl">
            <div className="relative z-10">
              <h2 className="text-2xl font-bold font-mono text-white mb-2">SEND_REPORT</h2>
              <p className="text-[10px] text-slate-600 font-mono uppercase tracking-widest border-b border-white/5 pb-4">Encrypted communication channel.</p>
            </div>
            
            <div className="space-y-8 relative z-10">
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono flex items-center gap-2">
                  <Terminal size={12} className="text-[#00E5FF]" /> >> SUBJECT
                </label>
                <input 
                  type="text"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  placeholder="Categorize your request..."
                  className="w-full bg-slate-950/80 border border-white/5 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#00E5FF] font-mono text-white placeholder-slate-800 transition-all shadow-inner"
                  required
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono flex items-center gap-2">
                  <Terminal size={12} className="text-[#00E5FF]" /> >> MESSAGE
                </label>
                <textarea 
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Provide detailed feedback..."
                  rows={8}
                  className="w-full bg-slate-950/80 border border-white/5 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#00E5FF] font-mono text-white resize-none placeholder-slate-800 transition-all shadow-inner"
                  required
                />
              </div>
              <button 
                type="submit"
                disabled={isSending}
                className="w-full bg-[#00E5FF] hover:bg-blue-400 text-black py-5 rounded-[2rem] font-bold transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 uppercase tracking-widest text-sm font-mono active:scale-95 disabled:grayscale"
              >
                {isSending ? (
                  <>
                    <div className="w-5 h-5 border-3 border-black/30 border-t-black rounded-full animate-spin" />
                    SENDING...
                  </>
                ) : (
                  <>SUBMIT_FEEDBACK <Send size={20} /></>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-8">
          <div className="glass p-10 rounded-[2.5rem] border-white/5 shadow-xl relative overflow-hidden group">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8 font-mono border-b border-white/5 pb-4">CONTACT_INFO</h3>
            <div className="space-y-8 relative z-10">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-white/5 flex items-center justify-center text-[#00E5FF] shadow-lg group-hover:border-[#00E5FF]/50 transition-colors"><Mail size={22} /></div>
                <div>
                  <div className="text-[9px] text-slate-600 font-mono uppercase tracking-widest font-bold">Email</div>
                  <div className="text-sm font-bold text-slate-200">{CONTACT_DETAILS.email}</div>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-white/5 flex items-center justify-center text-[#00B0FF] shadow-lg group-hover:border-[#00B0FF]/50 transition-colors"><Phone size={22} /></div>
                <div>
                  <div className="text-[9px] text-slate-600 font-mono uppercase tracking-widest font-bold">Phone</div>
                  <div className="text-sm font-bold text-slate-200">{CONTACT_DETAILS.phone}</div>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-white/5 flex items-center justify-center text-white shadow-lg group-hover:border-white/50 transition-colors"><MapPin size={22} /></div>
                <div>
                  <div className="text-[9px] text-slate-600 font-mono uppercase tracking-widest font-bold">Office</div>
                  <div className="text-sm font-bold text-slate-200">{CONTACT_DETAILS.address}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="glass p-8 rounded-[2rem] border-white/5 bg-slate-900/40">
            <div className="flex items-center gap-3 text-slate-400 mb-3">
              <ShieldAlert size={18} className="text-[#00E5FF]" />
              <h4 className="text-[10px] font-bold font-mono uppercase tracking-widest">Support_SLA</h4>
            </div>
            <p className="text-[9px] text-slate-500 font-mono leading-relaxed">
              Our support protocols are optimized for rapid response. Standard resolution time is within 24-48 business hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportView;
