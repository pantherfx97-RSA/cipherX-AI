
import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Plus, Trash2, Key, FileText, Shield, AlertCircle, Settings, Check, X, ChevronLeft, Fingerprint, Cpu } from 'lucide-react';
import { User, VaultItem } from '../types';
import { storageService } from '../services/storageService';

const Vault: React.FC<{ user: User, setUser: (u: User) => void, onBack: () => void }> = ({ user, setUser, onBack }) => {
  const [isLocked, setIsLocked] = useState(true);
  const [pin, setPin] = useState('');
  const [items, setItems] = useState<VaultItem[]>(storageService.getVault());
  const [isAdding, setIsAdding] = useState(false);
  const [isChangingPin, setIsChangingPin] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [newItem, setNewItem] = useState({ title: '', content: '', type: 'password' as const });

  const needsInitialization = !user.vaultPin;

  const handleUnlock = () => {
    if (pin === user.vaultPin) {
      setIsLocked(false);
      setPin('');
    } else {
      alert("Invalid Access PIN. ❌");
      setPin('');
    }
  };

  const handleInitializePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length < 4) {
      alert("PIN must be at least 4 digits. 📏");
      return;
    }
    if (newPin !== confirmPin) {
      alert("PINs do not match. 🔄");
      return;
    }
    
    const updatedUser = { ...user, vaultPin: newPin };
    setUser(updatedUser);
    storageService.saveUser(updatedUser);
    setIsLocked(false);
    setNewPin('');
    setConfirmPin('');
    alert("Security Protocol Initialized. Vault Unlocked. 🔓");
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const item: VaultItem = {
      ...newItem,
      id: Date.now().toString(),
      timestamp: Date.now()
    };
    const updated = [...items, item];
    setItems(updated);
    storageService.saveVault(updated);
    setIsAdding(false);
    setNewItem({ title: '', content: '', type: 'password' });
  };

  const deleteItem = (id: string) => {
    const updated = items.filter(i => i.id !== id);
    setItems(updated);
    storageService.saveVault(updated);
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length < 4 || isNaN(Number(newPin))) {
      alert("PIN must be at least 4 numeric digits. 🔢");
      return;
    }
    if (newPin !== confirmPin) {
      alert("PINs do not match. 🔄");
      return;
    }
    
    const updatedUser = { ...user, vaultPin: newPin };
    setUser(updatedUser);
    storageService.saveUser(updatedUser);
    setIsChangingPin(false);
    setNewPin('');
    setConfirmPin('');
    alert("PIN updated successfully. 🛡️");
  };

  if (needsInitialization) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-black relative overflow-hidden h-full">
        <button 
          onClick={onBack}
          className="absolute top-8 left-8 p-3 bg-white/5 border border-white/10 rounded-xl text-slate-500 hover:text-[#00E5FF] transition-all z-20 group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        </button>
        <div className="absolute inset-0 cyber-grid opacity-20"></div>
        <div className="w-24 h-24 bg-[#00E5FF]/5 border-2 border-[#00E5FF] rounded-[2.5rem] flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(0,229,255,0.2)] animate-pulse relative z-10">
          <Fingerprint className="text-[#00E5FF]" size={48} />
        </div>
        <h2 className="text-3xl font-bold mb-2 font-mono text-[#00E5FF] tracking-tighter text-glow-blue relative z-10">SECURITY_INITIALIZATION</h2>
        <p className="text-slate-500 mb-10 font-mono text-[10px] uppercase tracking-[0.3em] text-center max-w-sm relative z-10">
          Establish your unique access code to activate local encryption layers.
        </p>
        
        <form onSubmit={handleInitializePin} className="w-full max-w-xs space-y-6 relative z-10">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">SET_NEW_PIN</label>
              <input 
                type="password" 
                maxLength={8} 
                value={newPin} 
                onChange={e => setNewPin(e.target.value)}
                placeholder="****"
                className="w-full bg-slate-900/50 border-2 border-slate-800 text-center text-2xl tracking-[0.5em] py-4 rounded-2xl focus:outline-none focus:border-[#00E5FF] text-white font-mono"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">CONFIRM_PIN</label>
              <input 
                type="password" 
                maxLength={8} 
                value={confirmPin} 
                onChange={e => setConfirmPin(e.target.value)}
                placeholder="****"
                className="w-full bg-slate-900/50 border-2 border-slate-800 text-center text-2xl tracking-[0.5em] py-4 rounded-2xl focus:outline-none focus:border-[#00E5FF] text-white font-mono"
                required
              />
            </div>
          </div>
          <button 
            type="submit"
            className="w-full bg-[#00E5FF] text-black py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs font-mono shadow-xl shadow-blue-500/20 active:scale-95 transition-all"
          >
            ACTIVATE_ENCRYPTION
          </button>
        </form>
      </div>
    );
  }

  if (isLocked) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-black relative overflow-hidden h-full">
        <button 
          onClick={onBack}
          className="absolute top-8 left-8 p-3 bg-white/5 border border-white/10 rounded-xl text-slate-500 hover:text-[#00E5FF] transition-all z-20 group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        </button>
        <div className="absolute inset-0 cyber-grid opacity-20"></div>
        <div className="w-24 h-24 bg-slate-900 border-2 border-[#00E5FF] rounded-3xl flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(0,229,255,0.3)] animate-pulse relative z-10">
          <Lock className="text-[#00E5FF]" size={48} />
        </div>
        <h2 className="text-3xl font-bold mb-2 font-mono text-[#00E5FF] tracking-tighter text-glow-blue relative z-10">VAULT_LOCKED</h2>
        <p className="text-slate-500 mb-8 font-mono text-xs uppercase tracking-widest relative z-10">Enter PIN to access vault.</p>
        <div className="flex flex-col items-center gap-6 w-full max-w-xs relative z-10">
          <input 
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full bg-slate-900/50 border-2 border-slate-800 text-center text-3xl tracking-[1em] py-4 rounded-2xl focus:outline-none focus:border-[#00E5FF] text-white font-mono"
            maxLength={8}
            placeholder="****"
            autoFocus
            onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
          />
          <button 
            onClick={handleUnlock}
            className="w-full bg-[#00E5FF] hover:bg-blue-400 text-black py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 font-mono uppercase tracking-widest"
          >
            UNLOCK_VAULT
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto h-full overflow-y-auto pb-24 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-3 bg-white/5 border border-white/10 rounded-xl text-slate-500 hover:text-[#00E5FF] transition-all group"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3 font-mono text-glow-blue text-[#00E5FF]">
              <Shield className="text-[#00E5FF]" /> SECURITY_VAULT
            </h1>
            <p className="text-slate-500 text-xs font-mono uppercase tracking-widest mt-1">Items stored with local encryption.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsChangingPin(true)}
            className="p-3 bg-slate-900 hover:bg-slate-800 text-slate-400 rounded-xl border border-slate-800 transition-all hover:text-[#00E5FF] hover:border-[#00E5FF]/30"
            title="Settings"
          >
            <Settings size={20} />
          </button>
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-[#00E5FF] hover:bg-blue-400 text-black px-5 py-3 rounded-xl font-bold flex items-center gap-2 text-sm shadow-lg shadow-blue-500/10"
          >
            <Plus size={18} /> NEW_ENTRY
          </button>
          <button 
            onClick={() => setIsLocked(true)}
            className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-xl font-bold border border-slate-800 text-sm"
          >
            LOCK_VAULT
          </button>
        </div>
      </div>

      {isAdding && (
        <form onSubmit={handleAddItem} className="glass p-8 rounded-3xl mb-10 border-[#00E5FF]/20 animate-in fade-in slide-in-from-top-4 duration-500">
          <h3 className="text-sm font-bold text-white mb-6 font-mono uppercase tracking-widest flex items-center gap-2">
            <Plus size={16} className="text-[#00E5FF]" /> Add_Payload
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">{" >> "} LABEL</label>
              <input 
                value={newItem.title}
                onChange={e => setNewItem({...newItem, title: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-5 py-3 focus:outline-none focus:border-[#00E5FF] text-white text-sm"
                placeholder="Entry Title"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">{" >> "} TYPE</label>
              <select 
                value={newItem.type}
                onChange={e => setNewItem({...newItem, type: e.target.value as any})}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-5 py-3 focus:outline-none focus:border-[#00E5FF] text-white text-sm appearance-none"
              >
                <option value="password">Password / Key</option>
                <option value="note">Secure Note</option>
                <option value="seed">Recovery Seed</option>
              </select>
            </div>
          </div>
          <div className="mb-8 space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">{" >> "} CONTENT</label>
            <textarea 
              value={newItem.content}
              onChange={e => setNewItem({...newItem, content: e.target.value})}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-5 py-3 h-32 focus:outline-none focus:border-[#00E5FF] text-white text-sm resize-none"
              placeholder="Private information..."
              required
            />
          </div>
          <div className="flex gap-4 justify-end">
            <button type="button" onClick={() => setIsAdding(false)} className="px-6 py-2 text-slate-500 hover:text-white transition-colors text-xs font-mono font-bold uppercase tracking-widest">
              CANCEL
            </button>
            <button type="submit" className="bg-[#00E5FF] hover:bg-blue-400 text-black px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-blue-500/10">
              SAVE_ENCRYPTED
            </button>
          </div>
        </form>
      )}

      {isChangingPin && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleChangePin} className="glass p-8 rounded-3xl border-[#00E5FF]/20 max-w-sm w-full space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold font-mono text-white">UPDATE_PIN</h3>
              <button type="button" onClick={() => setIsChangingPin(false)} className="text-slate-500 hover:text-white"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">NEW_PIN</label>
                <input 
                  type="password" 
                  maxLength={8} 
                  value={newPin} 
                  onChange={e => setNewPin(e.target.value)}
                  className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-3 text-center text-xl tracking-widest font-mono focus:border-[#00E5FF] outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">CONFIRM_PIN</label>
                <input 
                  type="password" 
                  maxLength={8} 
                  value={confirmPin} 
                  onChange={e => setConfirmPin(e.target.value)}
                  className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-3 text-center text-xl tracking-widest font-mono focus:border-[#00E5FF] outline-none"
                />
              </div>
            </div>
            <button type="submit" className="w-full bg-[#00E5FF] text-black py-4 rounded-xl font-bold uppercase text-xs tracking-widest">COMMIT_CHANGE</button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map(item => (
          <div key={item.id} className="glass p-6 rounded-3xl group hover:border-[#00E5FF]/30 transition-all duration-500 border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
               <button 
                onClick={() => deleteItem(item.id)}
                className="p-2.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all border border-red-500/20"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center text-[#00E5FF] shadow-lg group-hover:border-[#00E5FF]/50 transition-colors">
                {item.type === 'password' ? <Key size={20} /> : <FileText size={20} />}
              </div>
              <div>
                <h3 className="font-bold text-white group-hover:text-[#00E5FF] transition-colors">{item.title}</h3>
                <p className="text-[9px] text-slate-500 font-mono uppercase tracking-widest font-bold">{item.type}</p>
              </div>
            </div>
            <div className="bg-black/60 p-4 rounded-xl font-mono text-sm border border-white/5 group-hover:border-[#00E5FF]/20 transition-all text-slate-300 relative">
               <div className="text-xs break-all leading-relaxed">
                  {item.content}
               </div>
            </div>
            <div className="mt-6 flex items-center justify-between text-[8px] font-mono font-bold text-slate-700 tracking-widest uppercase">
              <span className="flex items-center gap-1"><Shield size={10} /> ENCRYPTED_STATE: ACTIVE</span>
              <span>SAVED: {new Date(item.timestamp).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
        {items.length === 0 && !isAdding && (
          <div className="col-span-full py-24 text-center glass rounded-3xl border-dashed border-slate-800">
            <div className="text-slate-700 font-mono text-xs uppercase tracking-[0.3em]">Vault is empty.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vault;
