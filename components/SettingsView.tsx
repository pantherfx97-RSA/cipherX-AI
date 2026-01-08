
import React, { useState, useEffect, useRef } from 'react';
import { User, UserRole, AppView } from '../types';
import { 
  Settings, Shield, Key, LogOut, Mail, User as UserIcon, 
  CheckCircle, ExternalLink, Volume2, Share2, Trash2, 
  Download, Fingerprint, Lock, ShieldAlert, Play, Pause,
  Terminal, ShieldCheck, ChevronLeft
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
}

const SettingsView: React.FC<SettingsViewProps> = ({ user, setUser, handleLogout, addNotification, onBack }) => {
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
    <div className="p-8 max-w-4xl mx-auto space-y-8 overflow-y-auto h-full pb-24 cyber-grid">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-slate-900 border border-[#00E5FF]/30 rounded-2xl text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.2)]">
            <Settings size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-mono tracking-tight text-white flex items-center gap-2">
              SETTINGS
            </h1>
            <p className="text-slate-500 text-sm">Customize your conversational experience.</p>
          </div>
        </div>
        <button 
          onClick={onBack}
          className="p-3 bg-white/5 border border-white/10 rounded-xl text-slate-500 hover:text-[#00E5FF] transition-all flex items-center gap-2 group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest hidden md:inline">RETURN</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-12">
        <div className="space-y-6">
          <div className="glass p-6 rounded-2xl border-[#00E5FF]/20 relative overflow-hidden group">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white relative z-10">
              <Lock size={18} className="text-[#00E5FF]" /> Privacy Settings
            </h3>
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-2xl transition-all hover:border-[#00E5FF]/30">
                <div>
                  <div className="text-xs font-bold font-mono text-white">PROTECT_PRIVATE_CHATS</div>
                  <div className="text-[10px] text-slate-500">Require PIN for locked sessions</div>
                </div>
                <button 
                  onClick={toggleSecretLock}
                  className={`w-12 h-6 rounded-full transition-all relative ${user.lockSecretChats ? 'bg-[#00E5FF]' : 'bg-slate-800'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${user.lockSecretChats ? 'right-1' : 'left-1'}`} />
                </button>
              </div>
            </div>
          </div>

          <div className="glass p-6 rounded-2xl">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
              <UserIcon size={18} className="text-[#00E5FF]" /> User Profile
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 font-mono">IDENTITY_NAME</label>
                <div className="bg-slate-950 px-4 py-3 rounded-xl border border-white/5 text-slate-300 text-sm font-mono">
                  {user.name}
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 font-mono">EMAIL_ADDRESS</label>
                <div className="bg-slate-950 px-4 py-3 rounded-xl border border-white/5 text-slate-300 text-sm font-mono">
                  {user.email}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass p-6 rounded-2xl border-[#00E5FF]/20 relative overflow-hidden">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white relative z-10">
              <Volume2 size={18} className="text-[#00E5FF]" /> Voice Selection
            </h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed relative z-10">Choose the voice for your AI assistant.</p>
            <div className="space-y-3 relative z-10">
              {AVAILABLE_VOICES.map((voice) => (
                <div key={voice.id} className="flex gap-2">
                  <button
                    onClick={() => handleVoiceChange(voice.id)}
                    className={`flex-1 text-left px-4 py-3 rounded-xl border transition-all flex items-center justify-between ${
                      preferredVoice === voice.id
                        ? 'bg-[#00E5FF]/10 border-[#00E5FF] text-[#00E5FF]'
                        : 'bg-black/40 border-white/5 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-bold">{voice.name}</div>
                      <div className="text-[10px] opacity-60 font-mono uppercase tracking-tighter">{voice.description}</div>
                    </div>
                    {preferredVoice === voice.id && <CheckCircle size={16} className="text-[#00E5FF]" />}
                  </button>
                  <button 
                    onClick={() => testVoice(voice.id)}
                    disabled={isTestingVoice !== null}
                    className={`p-3 rounded-xl border flex items-center justify-center transition-all ${
                      isTestingVoice === voice.id 
                        ? 'bg-[#00E5FF]/20 border-[#00E5FF] text-[#00E5FF] animate-pulse' 
                        : 'bg-black/40 border-white/5 text-slate-500 hover:text-[#00E5FF] hover:border-[#00E5FF]/50'
                    }`}
                  >
                    {isTestingVoice === voice.id ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="glass p-6 rounded-2xl border-white/10">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
              <ShieldCheck size={18} className="text-[#00E5FF]" /> Account
            </h3>
            <button 
              onClick={handleLogout}
              className="w-full border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white py-3 rounded-xl font-bold transition-all font-mono text-xs tracking-widest uppercase"
            >
              LOG_OUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
