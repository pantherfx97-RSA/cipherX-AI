
import React, { useState } from 'react';
import { Shield, Lock, Mail, User as UserIcon, ArrowRight, ChevronLeft } from 'lucide-react';
import { User, UserRole } from '../types';
import Logo from './Logo';

interface AuthProps {
  onAuth: (user: User) => void;
  onBack: () => void;
}

const Auth: React.FC<AuthProps> = ({ onAuth, onBack }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      name: isLogin ? email.split('@')[0] : name,
      role: UserRole.FREE,
      credits: 5,
      referrals: 0,
      joinedAt: new Date().toISOString()
    };
    onAuth(mockUser);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-black relative selection:bg-[#00E5FF]/40 selection:text-white">
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      <div className="absolute top-12 left-12 z-10">
        <button 
          onClick={onBack}
          className="flex items-center gap-3 text-slate-500 hover:text-[#00E5FF] transition-all font-mono text-xs uppercase tracking-widest font-black group"
        >
          <ChevronLeft size={24} className="group-hover:-translate-x-2 transition-transform" /> BACK
        </button>
      </div>

      <div className="w-full max-w-lg z-10 glass p-14 rounded-[3rem] border-[#00E5FF]/20 shadow-[0_0_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent"></div>
        
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-black border-2 border-[#00E5FF] rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(0,229,255,0.2)] animate-pulse">
            <Logo size={64} className="drop-shadow-[0_0_15px_rgba(0,229,255,0.6)]" />
          </div>
          <h1 className="text-4xl font-black font-mono tracking-tighter text-white uppercase text-glow-blue">
            {isLogin ? 'Login' : 'Sign_Up'}
          </h1>
          <p className="text-slate-500 mt-3 font-mono text-xs uppercase tracking-[0.4em]">Secure Access Required.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="relative group">
              <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-[#00E5FF] transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Your Name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-black/40 border-2 border-white/5 rounded-2xl pl-14 pr-6 py-5 focus:outline-none focus:border-[#00E5FF] text-sm text-white font-mono transition-all shadow-inner placeholder-slate-800"
                required
              />
            </div>
          )}
          <div className="relative group">
            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-[#00E5FF] transition-colors" size={20} />
            <input 
              type="email" 
              placeholder="Email Address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-black/40 border-2 border-white/5 rounded-2xl pl-14 pr-6 py-5 focus:outline-none focus:border-[#00E5FF] text-sm text-white font-mono transition-all shadow-inner placeholder-slate-800"
              required
            />
          </div>
          <div className="relative group">
            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-[#00E5FF] transition-colors" size={20} />
            <input 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-black/40 border-2 border-white/5 rounded-2xl pl-14 pr-6 py-5 focus:outline-none focus:border-[#00E5FF] text-sm text-white font-mono transition-all shadow-inner placeholder-slate-800"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-[#00E5FF] hover:bg-blue-400 text-black py-6 rounded-2xl font-black transition-all shadow-2xl shadow-blue-500/30 flex items-center justify-center gap-3 font-mono uppercase tracking-[0.2em] active:scale-95 text-lg"
          >
            {isLogin ? 'ENTER_SYSTEM' : 'CREATE_NODE'} <ArrowRight size={24} />
          </button>
        </form>

        <div className="mt-12 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className={`text-[10px] font-mono font-black tracking-[0.3em] uppercase transition-all p-2 rounded-lg border border-transparent hover:border-white/10 text-slate-500 hover:text-[#00E5FF]`}
          >
            {isLogin ? ">> NEED AN ACCOUNT? SIGN UP" : ">> ALREADY HAVE AN ACCOUNT? LOGIN"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
