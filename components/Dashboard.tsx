
import React, { useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { User, ChatSession, UserRole, AppView } from '../types';
import { 
  Users, CreditCard, MessageSquare, TrendingUp, 
  ShieldCheck, Activity, Globe, Database, 
  Search, Filter, ArrowUpRight, ArrowDownRight, Zap
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
  { name: 'Admin', value: 2, color: '#E0F7FA' },
];

const Dashboard: React.FC<{ user: User, sessions: ChatSession[], onNavigate: (v: AppView) => void }> = ({ user, sessions, onNavigate }) => {
  const stats = useMemo(() => [
    { label: 'Registered Nodes', value: '1,204', icon: Users, color: 'text-[#00E5FF]', trend: '+12.5%', isUp: true, glow: 'shadow-[0_0_20px_rgba(0,229,255,0.3)]' },
    { label: 'Message Flow', value: '42,891', icon: MessageSquare, color: 'text-[#00B0FF]', trend: '+8.2%', isUp: true, glow: 'shadow-[0_0_20px_rgba(0,176,255,0.3)]' },
    { label: 'Premium Users', value: '312', icon: ShieldCheck, color: 'text-white', trend: '+5.4%', isUp: true, glow: 'shadow-[0_0_20px_rgba(255,255,255,0.1)]' },
    { label: 'Network Uptime', value: '99.9%', icon: Activity, color: 'text-[#39FF14]', trend: '-0.1%', isUp: false, glow: 'shadow-[0_0_20px_rgba(57,255,20,0.3)]' },
  ], []);

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-12 overflow-y-auto h-full pb-32 cyber-grid">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b-2 border-white/5 pb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-black font-mono tracking-tighter flex items-center gap-5 text-white text-glow-blue">
            <Database className="text-[#00E5FF] drop-shadow-[0_0_10px_#00E5FF]" size={42} /> NETWORK_STATS
          </h1>
          <p className="text-slate-500 font-mono text-[11px] uppercase tracking-[0.4em] mt-3 font-bold">
            Real-time monitoring of infrastructure and user metrics // VERSION_4.0_UPLINK
          </p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => onNavigate(AppView.CHAT)}
            className="px-6 py-4 glass border-2 border-[#00E5FF]/40 rounded-2xl text-[11px] font-mono font-black text-[#00E5FF] flex items-center gap-3 hover:bg-[#00E5FF]/20 hover:border-[#00E5FF] transition-all shadow-lg hover:shadow-[0_0_30px_rgba(0,229,255,0.3)]"
          >
            <MessageSquare size={18} /> LAUNCH_CONVERSATION
          </button>
          <button 
            onClick={() => onNavigate(AppView.TASKS)}
            className="px-6 py-4 bg-slate-900 border-2 border-slate-800 rounded-2xl text-[11px] font-mono font-black text-white hover:border-[#39FF14] hover:text-[#39FF14] transition-all flex items-center gap-3 group"
          >
            <Zap size={18} className="text-[#39FF14] group-hover:animate-pulse" /> RUN_TEMPLATES
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className={`glass p-10 rounded-[2.5rem] border-2 border-white/5 relative overflow-hidden group hover:border-white/20 transition-all ${stat.glow} shadow-2xl`}>
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity">
              <stat.icon size={80} className={stat.color} />
            </div>
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className={`p-5 rounded-2xl bg-black border-2 border-white/5 ${stat.color} shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform`}>
                <stat.icon size={32} />
              </div>
              <div className={`flex items-center gap-1.5 text-[11px] font-black font-mono px-3 py-1 rounded-full border ${stat.isUp ? 'text-[#39FF14] border-[#39FF14]/30 bg-[#39FF14]/5' : 'text-[#FF007F] border-[#FF007F]/30 bg-[#FF007F]/5'}`}>
                {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.trend}
              </div>
            </div>
            <div className="text-4xl font-black font-mono text-white mb-2 tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">{stat.value}</div>
            <div className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] font-mono">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 glass p-12 rounded-[3.5rem] border-2 border-white/5 shadow-inner">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-2xl font-black font-mono text-white flex items-center gap-4 text-glow-blue">
                <Activity size={28} className="text-[#00E5FF] drop-shadow-[0_0_8px_#00E5FF]" /> SYSTEM_THROUGHPUT
              </h3>
              <p className="text-[11px] text-slate-500 font-mono uppercase tracking-[0.4em] mt-2 font-bold">Analysis of Incoming Transmission Flow</p>
            </div>
            <div className="flex gap-3">
              <div className="w-4 h-4 rounded-full bg-[#00E5FF] shadow-[0_0_10px_#00E5FF]" />
              <div className="w-4 h-4 rounded-full bg-[#00B0FF] shadow-[0_0_10px_#00B0FF]" />
            </div>
          </div>
          
          <div className="h-[360px] min-h-[360px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%" debounce={50}>
              <AreaChart data={MOCK_DATA}>
                <defs>
                  <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#00E5FF" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00B0FF" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#00B0FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} tick={{ className: 'font-mono font-black' }} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} tick={{ className: 'font-mono font-black' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000000', border: '2px solid #00E5FF40', borderRadius: '20px', fontFamily: 'JetBrains Mono', color: '#fff', fontSize: '12px' }}
                  itemStyle={{ fontWeight: 'black' }}
                  cursor={{ stroke: '#00E5FF', strokeWidth: 2 }}
                />
                <Area type="monotone" dataKey="usage" stroke="#00E5FF" fillOpacity={1} fill="url(#colorUsage)" strokeWidth={4} dot={{ r: 4, fill: '#00E5FF', strokeWidth: 2 }} activeDot={{ r: 8, strokeWidth: 0, fill: '#39FF14' }} />
                <Area type="monotone" dataKey="users" stroke="#00B0FF" fillOpacity={1} fill="url(#colorUsers)" strokeWidth={4} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass p-12 rounded-[3.5rem] border-2 border-white/5 flex flex-col shadow-inner">
          <h3 className="text-2xl font-black font-mono text-white mb-3 flex items-center gap-4 text-glow-pink">
            <Globe size={28} className="text-[#FF007F] drop-shadow-[0_0_8px_#FF007F]" /> NODE_SEGMENTATION
          </h3>
          <p className="text-[11px] text-slate-500 font-mono uppercase tracking-[0.4em] border-b-2 border-white/5 pb-6 mb-8 font-bold">Distribution of Identified Assets</p>
          
          <div className="h-[280px] min-h-[280px] w-full min-w-0 flex-1 relative">
            <ResponsiveContainer width="100%" height="100%" debounce={50}>
              <PieChart>
                <Pie
                  data={PIE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {PIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000000', border: '2px solid #ffffff20', borderRadius: '20px', fontFamily: 'JetBrains Mono' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-black font-mono text-white">1,204</span>
                <span className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest">NODES_LOGGED</span>
            </div>
          </div>
          
          <div className="space-y-4 mt-10">
            {PIE_DATA.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-black border-2 border-white/5 rounded-2xl group hover:border-white/20 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.3)]" style={{ backgroundColor: item.color }} />
                  <span className="text-sm font-mono font-black text-white uppercase tracking-tight group-hover:text-cyber-blue transition-colors">{item.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-black text-slate-400">{item.value}</span>
                  <span className="text-xs font-mono font-black text-cyber-green">{Math.round((item.value / 1204) * 100)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
