
import React from 'react';
import { Shield, Terminal, AlertCircle, CheckCircle2, Search, Filter, ShieldAlert, Cpu, ChevronLeft } from 'lucide-react';
import { User } from '../types';

interface SecurityEvent {
  id: string;
  type: string;
  timestamp: string;
  source: string;
  status: 'SUCCESS' | 'WARNING' | 'ALERT';
  details: string;
}

const MOCK_EVENTS: SecurityEvent[] = [
  { id: 'EV-001', type: 'Login detected', timestamp: '2025-05-20 14:22:01', source: 'Node_122.4.5.1', status: 'SUCCESS', details: 'Successful authentication' },
  { id: 'EV-002', type: 'Configuration updated', timestamp: '2025-05-20 12:05:44', source: 'Terminal_01', status: 'SUCCESS', details: 'System settings synchronized' },
  { id: 'EV-003', type: 'Session terminated', timestamp: '2025-05-20 11:30:12', source: 'Internal_Memory', status: 'ALERT', details: 'Private session memory cleared' },
  { id: 'EV-004', type: 'Vault access attempt', timestamp: '2025-05-19 23:45:10', source: 'Unknown_Node', status: 'WARNING', details: 'Invalid PIN entry blocked' },
  { id: 'EV-005', type: 'Login detected', timestamp: '2025-05-19 09:15:33', source: 'Node_122.4.5.1', status: 'SUCCESS', details: 'Successful authentication' },
  { id: 'EV-006', type: 'Credit reset', timestamp: '2025-05-19 00:00:01', source: 'System', status: 'SUCCESS', details: 'Daily usage limit renewed' },
];

const SecurityActivity: React.FC<{ user: User, onBack: () => void }> = ({ user, onBack }) => {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 overflow-y-auto h-full pb-32 cyber-grid">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-3 bg-white/5 border border-white/10 rounded-xl text-slate-500 hover:text-[#00E5FF] transition-all group"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <div className="p-3 bg-slate-900 border border-[#00E5FF]/30 rounded-2xl text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.2)]">
            <ShieldAlert size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-mono tracking-tighter text-white flex items-center gap-2">
              AUDIT_LOG
            </h1>
            <p className="text-slate-500 text-xs font-mono uppercase tracking-widest mt-1">Immutable ledger of system events.</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <div className="px-4 py-2 glass border-[#00E5FF]/20 rounded-xl flex items-center gap-2">
            <Cpu size={14} className="text-[#00E5FF]" />
            <span className="text-[10px] font-mono font-bold text-[#00E5FF]">LOG_INTEGRITY: OK</span>
          </div>
        </div>
      </div>

      <div className="glass rounded-[2rem] border-white/5 overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/5 bg-black/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
              <input 
                type="text" 
                placeholder="Search log..."
                className="bg-black border border-white/5 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-[#00E5FF] text-white font-mono w-64"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono">
            <thead>
              <tr className="border-b border-white/5 text-[10px] text-slate-600 uppercase tracking-[0.2em] font-bold bg-slate-950/50">
                <th className="px-8 py-5">Event_ID</th>
                <th className="px-8 py-5">Timestamp</th>
                <th className="px-8 py-5">Activity</th>
                <th className="px-8 py-5">Node_Source</th>
                <th className="px-8 py-5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {MOCK_EVENTS.map((event) => (
                <tr key={event.id} className="hover:bg-[#00E5FF]/[0.02] transition-colors group">
                  <td className="px-8 py-6 text-xs text-slate-500 font-bold">#{event.id}</td>
                  <td className="px-8 py-6 text-xs text-slate-400">{event.timestamp}</td>
                  <td className="px-8 py-6">
                    <div className="text-sm font-bold text-white group-hover:text-[#00E5FF] transition-colors">{event.type}</div>
                    <div className="text-[9px] text-slate-600 mt-0.5">{event.details}</div>
                  </td>
                  <td className="px-8 py-6 text-xs text-slate-500 font-bold">{event.source}</td>
                  <td className="px-8 py-6">
                    <div className="flex justify-center">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border flex items-center gap-2 ${
                        event.status === 'SUCCESS' ? 'bg-[#00E5FF]/5 text-[#00E5FF] border-[#00E5FF]/20' : 
                        event.status === 'WARNING' ? 'bg-slate-900 text-slate-400 border-slate-800' : 
                        'bg-red-500/5 text-red-500 border-red-500/20'
                      }`}>
                        {event.status === 'SUCCESS' ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
                        {event.status}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SecurityActivity;
