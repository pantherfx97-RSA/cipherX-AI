
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
    { label: 'Registered Nodes', value: '1,204', icon: Users, color: 'text-[#00E5FF]', trend: '+12.5%', isUp: true },
    { label: 'Message Flow', value: '42,891', icon: MessageSquare, color: 'text-[#00B0FF]', trend: '+8.2%', isUp: true },
    { label: 'Premium Users', value: '312', icon: ShieldCheck, color: 'text-white', trend: '+5.4%', isUp: true },
    { label: 'Network Uptime', value: '99.9%', icon: Activity, color: 'text-slate-400', trend: '-0.1%', isUp: false },
  ], []);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10 overflow-y-auto h-full pb-32">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold font-mono tracking-tighter flex items-center gap-3 text-white">
            <Database className="text-[#00E5FF]" /> NETWORK_STATS
          </h1>
          <p className="text-slate-500 font-mono text-xs uppercase tracking-widest mt-1">
            Real-time monitoring of infrastructure and user metrics.
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => onNavigate(AppView.CHAT)}
            className="px-5 py-3 glass border-[#00E5FF]/20 rounded-2xl text-[10px] font-mono font-bold text-[#00E5FF] flex items-center gap-2 hover:bg-[#00E5FF]/10 transition-all"
          >
            <MessageSquare size={14} /> LAUNCH_CONVERSATION
          </button>
          <button 
            onClick={() => onNavigate(AppView.TASKS)}
            className="px-5 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-[10px] font-mono font-bold text-white hover:border-[#00E5FF] transition-all flex items-center gap-2"
          >
            <Zap size={14} className="text-[#00E5FF]" /> RUN_TEMPLATES
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="glass p-8 rounded-[2rem] border-white/5 relative overflow-hidden group hover:border-white/10 transition-all shadow-2xl">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <stat.icon size={64} className={stat.color} />
            </div>
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className={`p-4 rounded-2xl bg-black border border-white/5 ${stat.color} shadow-lg`}>
                <stat.icon size={28} />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-bold font-mono ${stat.isUp ? 'text-[#00E5FF]' : 'text-slate-500'}`}>
                {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.trend}
              </div>
            </div>
            <div className="text-3xl font-bold font-mono text-white mb-1 tracking-tighter">{stat.value}</div>
            <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest font-mono">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass p-10 rounded-[2.5rem] border-white/5">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-bold font-mono text-white flex items-center gap-2">
                <Activity size={20} className="text-[#00E5FF]" /> SYSTEM_THROUGHPUT
              </h3>
              <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mt-1">7-Day Analysis of Command Invocations</p>
            </div>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#00E5FF]" />
              <div className="w-3 h-3 rounded-full bg-[#00B0FF]" />
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_DATA}>
                <defs>
                  <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00E5FF" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00B0FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00B0FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} tick={{ className: 'font-mono' }} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} tick={{ className: 'font-mono' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000000', border: '1px solid #ffffff10', borderRadius: '16px', fontFamily: 'JetBrains Mono' }}
                  itemStyle={{ fontSize: '10px' }}
                />
                <Area type="monotone" dataKey="usage" stroke="#00E5FF" fillOpacity={1} fill="url(#colorUsage)" strokeWidth={3} />
                <Area type="monotone" dataKey="users" stroke="#00B0FF" fillOpacity={1} fill="url(#colorUsers)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass p-10 rounded-[2.5rem] border-white/5 flex flex-col">
          <h3 className="text-xl font-bold font-mono text-white mb-2 flex items-center gap-2">
            <Globe size={20} className="text-[#00E5FF]" /> USER_DISTRIBUTION
          </h3>
          <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest border-b border-white/5 pb-4 mb-6">Segmentation of Node Identities</p>
          <div className="flex-1 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PIE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {PIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000000', border: '1px solid #ffffff10', borderRadius: '16px', fontFamily: 'JetBrains Mono' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-6">
            {PIE_DATA.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-black border border-white/5 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs font-mono font-bold text-white">{item.name}</span>
                </div>
                <span className="text-xs font-mono text-slate-500">{Math.round((item.value / 1204) * 100)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
