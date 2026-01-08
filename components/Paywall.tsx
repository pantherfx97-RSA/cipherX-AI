
import React from 'react';
import { Shield, Zap, Check, X, Star, Sparkles, Image, ZapOff } from 'lucide-react';
import { PRICING } from '../constants';

interface PaywallProps {
  onClose: () => void;
  onUpgrade: () => void;
}

const Paywall: React.FC<PaywallProps> = ({ onClose, onUpgrade }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="glass max-w-2xl w-full rounded-3xl overflow-hidden relative border border-white/10 animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-slate-900 rounded-full hover:bg-slate-800 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-8 text-center bg-gradient-to-b from-[#00E5FF]/10 to-transparent">
          <div className="w-16 h-16 bg-[#00E5FF] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#00E5FF]/20">
            <Sparkles className="text-black" size={32} />
          </div>
          <h2 className="text-3xl font-bold mb-2">Upgrade to Premium</h2>
          <p className="text-slate-400">Experience the full power of intelligent conversational AI.</p>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Premium Features</h3>
            {[
              "Unlimited Intelligent Conversations",
              "Priority Processing Speed",
              "Advanced Image Recognition",
              "Access to All Task Templates",
              "Premium Neural Voice Synthesis",
              "Private Chat Protection"
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-[#00E5FF]/20 rounded-full flex items-center justify-center text-[#00E5FF]">
                  <Check size={12} />
                </div>
                <span className="text-sm text-slate-300">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <button 
              onClick={() => {
                window.open(PRICING.MONTHLY.url, '_blank');
                onUpgrade();
              }}
              className="w-full group relative overflow-hidden bg-white text-slate-950 py-4 rounded-2xl font-bold transition-all hover:scale-[1.02] active:scale-95"
            >
              <div className="flex flex-col items-center">
                <span className="text-lg">Monthly Plan</span>
                <span className="text-sm opacity-70">{PRICING.MONTHLY.localPrice} / month</span>
              </div>
            </button>

            <button 
              onClick={() => {
                window.open(PRICING.YEARLY.url, '_blank');
                onUpgrade();
              }}
              className="w-full group relative overflow-hidden bg-[#00E5FF] text-black py-4 rounded-2xl font-bold transition-all hover:scale-[1.02] active:scale-95 border-2 border-[#00E5FF]/30"
            >
              <div className="absolute top-2 right-2 bg-yellow-400 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Best Value
              </div>
              <div className="flex flex-col items-center">
                <span className="text-lg">Annual Plan</span>
                <span className="text-sm opacity-70">{PRICING.YEARLY.localPrice} / year</span>
              </div>
            </button>
            <p className="text-[10px] text-center text-slate-500 mt-4 px-4 font-mono">
              Securely processed via Yoco. Instant activation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paywall;
