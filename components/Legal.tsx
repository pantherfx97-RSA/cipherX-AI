
import React, { useState } from 'react';
import { Shield, FileText, Lock, RefreshCcw, ChevronLeft } from 'lucide-react';
import { DEVELOPER_INFO, CONTACT_DETAILS } from '../constants';

const Legal: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'tos' | 'privacy' | 'refund'>('tos');

  const tabs = [
    { id: 'tos', label: 'Terms of Service', icon: FileText },
    { id: 'privacy', label: 'Privacy Policy', icon: Shield },
    { id: 'refund', label: 'Refund Policy', icon: RefreshCcw }
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto overflow-y-auto h-full pb-20">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-3 bg-white/5 border border-white/10 rounded-xl text-slate-500 hover:text-[#00E5FF] transition-all group"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <h1 className="text-3xl font-bold font-mono tracking-tight flex items-center gap-2">
            <Lock className="text-[#00E5FF]" /> LEGAL_POLICIES
          </h1>
        </div>
      </div>
      
      <div className="flex gap-4 border-b border-slate-800 mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-4 px-2 text-sm font-bold transition-all relative ${
              activeTab === tab.id ? 'text-[#00E5FF]' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <tab.icon size={16} /> {tab.label}
            </div>
            {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#00E5FF] rounded-t-full" />}
          </button>
        ))}
      </div>

      <div className="glass p-8 rounded-2xl prose prose-invert max-w-none text-slate-300 leading-relaxed">
        {activeTab === 'tos' && (
          <>
            <h2 className="text-xl font-bold text-white mb-4 font-mono uppercase tracking-widest text-[#00E5FF]">Terms of Service – CipherX AI</h2>
            <p>Welcome to CipherX AI. By accessing or using our platform, you agree to the following terms:</p>
            <h3 className="text-white mt-6 mb-2">1. Use of Service</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>CipherX AI provides automated AI-generated responses.</li>
              <li>You agree not to use the service for harmful or illegal activities.</li>
            </ul>
            <h3 className="text-white mt-6 mb-2">2. Account Responsibilities</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>You are responsible for maintaining the confidentiality of your login details.</li>
              <li>You must be of legal age or have parental consent to use this service.</li>
            </ul>
            <h3 className="text-white mt-6 mb-2">3. Intellectual Property</h3>
            <p>{DEVELOPER_INFO}</p>
            <p>© 2025 Wally Nthani — CipherX AI. All Rights Reserved.</p>
          </>
        )}

        {activeTab === 'privacy' && (
          <>
            <h2 className="text-xl font-bold text-white mb-4 font-mono uppercase tracking-widest text-[#00E5FF]">Privacy Policy – CipherX AI</h2>
            <p>We implement encryption to protect your conversations.</p>
            <h3 className="text-white mt-6 mb-2">1. Data Collection</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>User account data (name, email).</li>
              <li>Usage data for service optimization.</li>
              <li>Payment data processed securely via Yoco.</li>
            </ul>
          </>
        )}

        {activeTab === 'refund' && (
          <>
            <h2 className="text-xl font-bold text-white mb-4 font-mono uppercase tracking-widest text-[#00E5FF]">Refund Policy</h2>
            <p>Premium features are activated immediately upon purchase:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>All payments are non-refundable once premium service is active.</li>
              <li>Refund requests will be evaluated for duplicate charges.</li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Legal;
