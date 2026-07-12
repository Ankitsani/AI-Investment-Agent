import React from 'react';
import { Newspaper, ArrowUpRight, ShieldCheck, AlertTriangle, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

function NewsCard({ news }) {
  if (!news || !Array.isArray(news)) return null;

  const getSentimentPill = (sentiment) => {
    const norm = sentiment?.toLowerCase();
    if (norm === 'positive') {
      return (
        <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <ShieldCheck size={10} />
          <span>Positive</span>
        </span>
      );
    }
    if (norm === 'negative') {
      return (
        <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/20">
          <AlertTriangle size={10} />
          <span>Negative</span>
        </span>
      );
    }
    return (
      <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gray-800 text-gray-400 border border-gray-700">
        <HelpCircle size={10} />
        <span>Neutral</span>
      </span>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="glass-panel glass-panel-hover rounded-3xl p-6 shadow-xl relative overflow-hidden"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-indigo-500/10 p-2.5 rounded-xl text-indigo-400 border border-indigo-500/20">
          <Newspaper size={22} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Latest News & Sentiment</h2>
          <p className="text-xs text-indigo-400 uppercase tracking-widest font-semibold mt-0.5">Real-time Press & Market Impacts</p>
        </div>
      </div>

      <div className="space-y-4">
        {news.map((item, idx) => (
          <div
            key={idx}
            className="group p-4 bg-gray-900/40 border border-gray-850 hover:border-gray-800 rounded-2xl transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-4 mb-2.5">
              <h3 className="text-sm font-semibold text-gray-100 group-hover:text-indigo-300 transition-colors duration-200 line-clamp-2">
                {item.title}
              </h3>
              <div className="shrink-0">{getSentimentPill(item.sentiment)}</div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed bg-gray-950/20 p-2.5 rounded-lg">
              {item.summary}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default NewsCard;
