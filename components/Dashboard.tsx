
import React, { useMemo } from 'react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { User, ChatSession, AppView } from '../types';
import { 
  Users, MessageSquare, ShieldCheck, Activity, Globe, Database, 
  ArrowUpRight, ArrowDownRight, Zap
} from 'lucide-react';

const MOCK_DATA = [
  { name: 'Mon', usage: 240, users: 120 },
  { name: 'Tue', usage: 198, users: 110 },
  { name: 'Wed', usage: 310, users: 150 },
  { name: 'Thu', usage: 280, users: 145 },
  { name: 'Fri', usage: 420, users: 210 },
  { name: 'Sat', usage: 380, users: 190 },
  { name: 'Sun', usage: 450, users: 230 },
];

const PIE_DATA = [
  { name: 'Free Tier', value: 890, color: '#00B0FF' },
  { name: 'Premium', value: 312, color: '#00E5FF' },
  { name: 'Admin', value: 2, color: '#39FF14' },
];

const Dashboard: React.FC<{ user: User, sessions: ChatSession[], onNavigate: (v: AppView) => void }> = ({ user, sessions, onNavigate }) => {
  const stats = useMemo(() => [
    { label: 'Registered Nodes', value: '1,204', icon: Users, color: 'text-[#00E5FF]', trend: '+12.5%', isUp: true },
    { label: 'Message Flow', value: '42,891', icon: MessageSquare, color: 'text-[#00B0FF]', trend: '+8.2%', isUp: true },
    { label: 'Premium Users', value: '312', icon: ShieldCheck, color: 'text-white', trend: '+5.4%', isUp: true },
    { label: 'Network Uptime', value: '99.9%', icon: Activity, color: 'text-[#39FF14]', trend: '-0.1%', isUp: false },
  ], []);

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-12 overflow-y-auto h-full pb-32 cyber-grid">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b-2 border-white/5 pb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-black font-mono tracking-tighter flex items-center gap-5 text-white text-glow-blue">
            <Database className="text-[#00E5FF] drop-shadow-[0_0_10px_#00E5FF]" size={42} /> SYSTEM_STATUS
          </h1>
          <p className="text-slate-500 font-mono text-[11px] uppercase tracking-[0.4em] mt-3 font-bold">
            Real-time infrastructure monitoring // CLEARANCE_LEVEL: ADMIN
          </p>
        </div>
        <div className="flex gap-4">
          <button onClick={() => onNavigate(AppView.CHAT)} className="px-6 py-4 glass border-2 border-[#00E5FF]/40 rounded-2xl text-[11px] font-mono font-black text-[#00E5FF] hover:bg-[#00E5FF]/10 transition-all shadow-lg">LAUNCH_CORE</button>
          <button onClick={() => onNavigate(AppView.TASKS)} className="px-6 py-4 bg-slate-900 border-2 border-slate-800 rounded-2xl text-[11px] font-mono font-black text-white hover:border-[#39FF14] transition-all flex items-center gap-3"><Zap size={18} className="text-[#39FF14]" /> DEPLOY_TASKS</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="glass p-10 rounded-[2.5rem] border-2 border-white/5 relative overflow-hidden group hover:border-white/20 transition-all shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <div className={`p-4 rounded-2xl bg-black border-2 border-white/5 ${stat.color} shadow-lg group-hover:scale-110 transition-transform`}><stat.icon size={28} /></div>
              <div className={`text-[11px] font-black font-mono px-3 py-1 rounded-full border ${stat.isUp ? 'text-[#39FF14] border-[#39FF14]/30' : 'text-[#FF007F] border-[#FF007F]/30'}`}>{stat.trend}</div>
            </div>
            <div className="text-4xl font-black font-mono text-white mb-2 tracking-tighter">{stat.value}</div>
            <div className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] font-mono">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 glass p-12 rounded-[3.5rem] border-2 border-white/5 h-[450px]">
          <h3 className="text-xl font-black font-mono text-white mb-8 flex items-center gap-4"><Activity size={24} className="text-[#00E5FF]" /> TRANSMISSION_THROUGHPUT</h3>
          <div className="h-[280px] w-full min-h-[280px]">
            <ResponsiveContainer width="100%" height="100%" debounce={100}>
              <AreaChart data={MOCK_DATA}>
                <defs>
                  <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#00E5FF" stopOpacity={0.4}/><stop offset="95%" stopColor="#00E5FF" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} tick={{ className: 'font-mono' }} />
                <YAxis stroke="#64748b" fontSize={11} tick={{ className: 'font-mono' }} />
                <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #00E5FF40', borderRadius: '15px' }} />
                <Area type="monotone" dataKey="usage" stroke="#00E5FF" fillOpacity={1} fill="url(#colorUsage)" strokeWidth={4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass p-12 rounded-[3.5rem] border-2 border-white/5 flex flex-col h-[450px]">
          <h3 className="text-xl font-black font-mono text-white mb-8 flex items-center gap-4"><Globe size={24} className="text-[#39FF14]" /> NODE_DISTRIBUTION</h3>
          <div className="h-[250px] w-full min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%" debounce={100}>
              <PieChart>
                <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={10} dataKey="value" stroke="none">
                  {PIE_DATA.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #ffffff20', borderRadius: '15px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-6">
            {PIE_DATA.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-[11px] font-mono font-black text-slate-400">
                <span className="flex items-center gap-3"><div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} /> {item.name.toUpperCase()}</span>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
