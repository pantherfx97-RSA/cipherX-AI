
import React, { useState, useEffect, useRef } from 'react';
import { User, UserRole, AppView } from '../types';
import { 
  Settings, Shield, Key, LogOut, Mail, User as UserIcon, 
  CheckCircle, ExternalLink, Volume2, Share2, Trash2, 
  Download, Fingerprint, Lock, ShieldAlert, Play, Pause,
  Terminal, ShieldCheck, ChevronLeft, Sun, Moon, Zap
} from 'lucide-react';
import { storageService } from '../services/storageService';
import { AVAILABLE_VOICES } from '../constants';
import { GeminiService } from '../services/geminiService';

interface SettingsViewProps {
  user: User;
  setUser: (u: User) => void;
  handleLogout: () => void;
  addNotification: (t: string) => void;
  onBack: () => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ user, setUser, handleLogout, addNotification, onBack, theme, toggleTheme }) => {
  const [preferredVoice, setPreferredVoice] = useState(user.preferredVoice || 'Kore');
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [isTestingVoice, setIsTestingVoice] = useState<string | null>(null);
  
  const testAudioRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    if (window.PublicKeyCredential) {
      (window as any).PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
        .then((available: boolean) => setBiometricAvailable(available));
    }
  }, []);

  const toggleSecretLock = () => {
    const updatedUser = { ...user, lockSecretChats: !user.lockSecretChats };
    setUser(updatedUser);
    storageService.saveUser(updatedUser);
    addNotification(updatedUser.lockSecretChats ? "Private Lock Enabled." : "Private Lock Disabled.");
  };

  const handleVoiceChange = (voiceId: string) => {
    setPreferredVoice(voiceId);
    const updatedUser = { ...user, preferredVoice: voiceId };
    setUser(updatedUser);
    storageService.saveUser(updatedUser);
    addNotification(`Voice changed to ${voiceId}.`);
  };

  const testVoice = async (voiceId: string) => {
    if (isTestingVoice) return;
    setIsTestingVoice(voiceId);
    
    try {
      const ai = new GeminiService();
      const source = await ai.speak("CipherX audio test active. Voice profile verified.", voiceId);
      if (source) {
        testAudioRef.current = source;
        source.onended = () => setIsTestingVoice(null);
      } else {
        setIsTestingVoice(null);
      }
    } catch (e) {
      setIsTestingVoice(null);
      addNotification("Voice test failed.");
    }
  };

  return (
    <div className="p-10 md:p-16 max-w-5xl mx-auto space-y-12 overflow-y-auto h-full pb-32 cyber-grid">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-8 border-b-2 border-white/5 pb-10">
        <div className="flex items-center gap-6">
          <div className="p-5 dark:bg-slate-900 bg-white border-2 border-cyber-blue rounded-3xl text-cyber-blue shadow-[0_0_25px_rgba(0,229,255,0.4)]">
            <Settings size={36} className="animate-spin-slow" />
          </div>
          <div>
            <h1 className="text-4xl font-black font-mono tracking-tighter dark:text-white text-slate-900 flex items-center gap-3 text-glow-blue">
              SYSTEM_CONFIG
            </h1>
            <p className="text-slate-500 font-mono text-[11px] uppercase tracking-[0.4em] mt-2 font-bold">Personalize your conversational uplink & clearance levels.</p>
          </div>
        </div>
        <button 
          onClick={onBack}
          className="px-8 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-slate-500 hover:text-cyber-blue hover:border-cyber-blue transition-all flex items-center gap-3 group font-black uppercase tracking-[0.2em] text-[11px] font-mono"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-2 transition-transform" />
          <span>RETURN_TO_UPLINK</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-16">
        <div className="space-y-10">
          <div className="glass p-10 rounded-[3rem] border-2 border-cyber-blue/20 relative overflow-hidden group shadow-xl">
            <h3 className="text-xl font-black mb-8 flex items-center gap-3 dark:text-white text-slate-900 relative z-10 font-mono uppercase tracking-[0.1em]">
              <Sun size={24} className="text-cyber-blue text-glow-blue" /> VISUAL_PROTOCOL
            </h3>
            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between p-6 bg-black/60 border-2 border-white/5 rounded-3xl transition-all hover:border-cyber-blue/40 shadow-inner">
                <div>
                  <div className="text-[12px] font-black font-mono dark:text-white text-slate-200 uppercase tracking-widest">THEME_MODE</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mt-1 font-bold">{theme === 'dark' ? 'DEEP_VOID_ACTIVE' : 'WHITE_HAT_ACTIVE'}</div>
                </div>
                <button 
                  onClick={toggleTheme}
                  className={`w-16 h-10 rounded-full transition-all relative flex items-center px-1.5 border-2 ${theme === 'dark' ? 'bg-slate-800 border-white/10' : 'bg-cyber-blue border-cyber-blue shadow-[0_0_15px_#00E5FF]'}`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500 ${theme === 'dark' ? 'translate-x-0 bg-slate-700 shadow-lg' : 'translate-x-6 bg-white shadow-[0_0_20px_#fff]'}`}>
                    {theme === 'dark' ? <Moon size={14} className="text-cyber-blue" /> : <Sun size={14} className="text-amber-500" />}
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="glass p-10 rounded-[3rem] border-2 border-cyber-pink/20 relative overflow-hidden group shadow-xl">
            <h3 className="text-xl font-black mb-8 flex items-center gap-3 dark:text-white text-slate-900 relative z-10 font-mono uppercase tracking-[0.1em]">
              <Lock size={24} className="text-cyber-pink text-glow-pink" /> SECURITY_LAYERS
            </h3>
            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between p-6 bg-black/60 border-2 border-white/5 rounded-3xl transition-all hover:border-cyber-pink/40 shadow-inner">
                <div>
                  <div className="text-[12px] font-black font-mono dark:text-white text-slate-200 uppercase tracking-widest">PRIVATE_LOCK</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mt-1 font-bold">{user.lockSecretChats ? 'PIN_CHALLENGE_ACTIVE' : 'CHALLENGE_DISABLED'}</div>
                </div>
                <button 
                  onClick={toggleSecretLock}
                  className={`w-16 h-10 rounded-full transition-all relative flex items-center px-1.5 border-2 ${user.lockSecretChats ? 'bg-cyber-pink border-cyber-pink shadow-[0_0_15px_#FF007F]' : 'bg-slate-800 border-white/10'}`}
                >
                  <div className={`w-6 h-6 rounded-full bg-white transition-all duration-500 shadow-lg ${user.lockSecretChats ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>
          </div>

          <div className="glass p-10 rounded-[3rem] border-2 border-white/5 shadow-2xl">
            <h3 className="text-xl font-black mb-8 flex items-center gap-3 dark:text-white text-slate-900 font-mono uppercase tracking-[0.1em]">
              <UserIcon size={24} className="text-cyber-blue" /> NODE_IDENTITY
            </h3>
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="block text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] mb-1 font-mono">{" >> "} CLEARANCE_NAME</label>
                <div className="dark:bg-slate-950 bg-slate-50 px-6 py-4 rounded-2xl border-2 border-white/5 dark:text-slate-200 text-slate-800 text-sm font-black font-mono tracking-tight shadow-inner">
                  {user.name}
                </div>
              </div>
              <div className="space-y-3">
                <label className="block text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] mb-1 font-mono">{" >> "} UPLINK_ADDRESS</label>
                <div className="dark:bg-slate-950 bg-slate-50 px-6 py-4 rounded-2xl border-2 border-white/5 dark:text-slate-200 text-slate-800 text-sm font-black font-mono tracking-tight shadow-inner">
                  {user.email}
                </div>
              </div>
              <div className="pt-4">
                 <div className="flex items-center justify-between px-2">
                    <span className="text-[10px] font-mono font-black text-slate-600 uppercase tracking-widest">MEMBER_SINCE</span>
                    <span className="text-[10px] font-mono font-black text-cyber-blue uppercase tracking-widest">{new Date(user.joinedAt).toLocaleDateString()}</span>
                 </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <div className="glass p-10 rounded-[3rem] border-2 border-cyber-green/20 relative overflow-hidden shadow-xl">
            <h3 className="text-xl font-black mb-8 flex items-center gap-3 dark:text-white text-slate-900 relative z-10 font-mono uppercase tracking-[0.1em]">
              <Volume2 size={24} className="text-cyber-green text-glow-green" /> VOCAL_PROFILES
            </h3>
            <p className="text-[11px] text-slate-500 mb-8 font-mono font-bold uppercase tracking-[0.2em] relative z-10">Calibrate the audio synthesis protocol.</p>
            <div className="space-y-4 relative z-10">
              {AVAILABLE_VOICES.map((voice) => (
                <div key={voice.id} className="flex gap-3">
                  <button
                    onClick={() => handleVoiceChange(voice.id)}
                    className={`flex-1 text-left px-6 py-5 rounded-[2rem] border-2 transition-all flex items-center justify-between group ${
                      preferredVoice === voice.id
                        ? 'bg-cyber-green/10 border-cyber-green text-cyber-green shadow-[0_0_20px_rgba(57,255,20,0.1)]'
                        : 'bg-black/60 border-white/5 text-slate-500 hover:border-slate-700 hover:bg-white/5'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-black font-mono uppercase tracking-tight">{voice.name}</div>
                      <div className="text-[9px] font-mono font-black uppercase tracking-[0.2em] mt-1 opacity-60">{voice.description}</div>
                    </div>
                    {preferredVoice === voice.id && <CheckCircle size={20} className="text-cyber-green drop-shadow-[0_0_5px_#39FF14]" />}
                  </button>
                  <button 
                    onClick={() => testVoice(voice.id)}
                    disabled={isTestingVoice !== null}
                    className={`px-5 rounded-2xl border-2 flex items-center justify-center transition-all shadow-lg ${
                      isTestingVoice === voice.id 
                        ? 'bg-cyber-green border-cyber-green text-black animate-pulse shadow-[0_0_20px_#39FF14]' 
                        : 'bg-black/80 border-white/10 text-slate-500 hover:text-cyber-green hover:border-cyber-green/60 hover:scale-105 active:scale-95'
                    }`}
                  >
                    {isTestingVoice === voice.id ? <Pause size={20} /> : <Play size={20} />}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="glass p-10 rounded-[3rem] border-2 border-white/5 shadow-2xl flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-black mb-8 flex items-center gap-3 dark:text-white text-slate-900 font-mono uppercase tracking-[0.1em]">
                <ShieldCheck size={24} className="text-cyber-blue" /> SESSION_TERMINATION
              </h3>
              <p className="text-[11px] text-slate-500 mb-10 font-mono font-bold uppercase tracking-[0.2em]">Safely disconnect the current session and clear memory cache.</p>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full bg-red-600/10 border-4 border-red-600/40 text-red-500 hover:bg-red-600 hover:text-white py-6 rounded-[2.5rem] font-black transition-all font-mono text-xs tracking-[0.4em] uppercase shadow-[0_0_20px_rgba(239,68,68,0.1)] hover:shadow-[0_0_40px_rgba(239,68,68,0.4)] hover:scale-[1.02] active:scale-95"
            >
              TERMINATE_UPLINK
            </button>
          </div>
        </div>
      </div>
      <style>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default SettingsView;
