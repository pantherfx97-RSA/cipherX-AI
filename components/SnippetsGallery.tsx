
import React, { useState, useEffect } from 'react';
import { Search, Copy, Trash2, Library, Terminal, ExternalLink, Calendar, Check, Wand2, ChevronLeft } from 'lucide-react';
import { Snippet } from '../types';
import { storageService } from '../services/storageService';

interface SnippetsGalleryProps {
  addNotification: (t: string) => void;
  onBack: () => void;
}

const SnippetsGallery: React.FC<SnippetsGalleryProps> = ({ addNotification, onBack }) => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    setSnippets(storageService.getSnippets());
  }, []);

  const handleCopy = (snippet: Snippet) => {
    navigator.clipboard.writeText(snippet.content);
    setCopiedId(snippet.id);
    addNotification("Copied to clipboard.");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    const updated = snippets.filter(s => s.id !== id);
    setSnippets(updated);
    storageService.saveSnippets(updated);
    addNotification("Snippet removed.");
  };

  const filteredSnippets = snippets.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-10 max-w-6xl mx-auto space-y-10 h-full overflow-y-auto pb-32 cyber-grid">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <button 
            onClick={onBack}
            className="p-3 bg-white/5 border border-white/10 rounded-xl text-slate-500 hover:text-[#00E5FF] transition-all group"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <div className="p-4 bg-slate-950 border-2 border-[#00E5FF] rounded-3xl text-[#00E5FF] shadow-xl shadow-[#00E5FF]/10">
            <Library size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-bold font-mono tracking-tighter text-white flex items-center gap-2 uppercase">
              ARCHIVE
            </h1>
            <p className="text-slate-500 text-[10px] font-mono uppercase tracking-[0.2em] mt-1 font-bold">Saved snippets for rapid deployment.</p>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
          <input 
            type="text" 
            placeholder="Search archive..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-96 bg-black border-2 border-slate-800 rounded-2xl pl-12 pr-6 py-4 text-sm focus:outline-none focus:border-[#00E5FF] text-white font-mono transition-all shadow-sm"
          />
        </div>
      </div>

      {filteredSnippets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-40 space-y-6 glass rounded-[3rem] border-dashed border-slate-800">
          <Library size={80} className="text-slate-800" />
          <p className="text-slate-400 font-mono text-xs uppercase tracking-widest font-bold">Archive Empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSnippets.map((snippet) => (
            <div key={snippet.id} className="glass p-8 rounded-[2.5rem] border-2 border-slate-800 hover:border-[#00E5FF]/40 transition-all group flex flex-col relative overflow-hidden shadow-xl hover:shadow-2xl bg-black">
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button 
                  onClick={() => handleDelete(snippet.id)}
                  className="p-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all border border-red-500/20"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-[#00E5FF] shadow-inner">
                  <Terminal size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-white truncate text-sm font-mono group-hover:text-[#00E5FF] transition-colors uppercase">{snippet.title}</h3>
                  <div className="flex items-center gap-2 text-[9px] text-slate-400 font-mono uppercase tracking-widest mt-1">
                    <Calendar size={12} /> {new Date(snippet.timestamp).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="flex-1 bg-slate-900/50 p-6 rounded-2xl border border-white/5 font-mono text-[11px] text-slate-400 mb-8 overflow-hidden relative">
                <p className="line-clamp-8 leading-loose whitespace-pre-wrap">{snippet.content}</p>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent"></div>
              </div>

              <button 
                onClick={() => handleCopy(snippet)}
                className={`w-full py-4 rounded-xl font-black font-mono text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all border-2 ${
                  copiedId === snippet.id 
                    ? 'bg-[#00E5FF] border-[#00E5FF] text-black shadow-lg shadow-blue-500/20' 
                    : 'bg-slate-900 border-white/5 text-slate-400 hover:bg-[#00E5FF] hover:text-black hover:border-[#00E5FF]'
                }`}
              >
                {copiedId === snippet.id ? (
                  <>COPIED <Check size={16} /></>
                ) : (
                  <>COPY_SNIPPET <Copy size={16} /></>
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SnippetsGallery;
