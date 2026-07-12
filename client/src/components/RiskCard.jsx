import React from 'react';
import { AlertOctagon, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

function RiskCard({ risk }) {
  if (!risk) return null;

  const riskCategories = [
    { label: 'Business Risk', raw: risk.business },
    { label: 'Financial Risk', raw: risk.financial },
    { label: 'Market Risk', raw: risk.market },
    { label: 'Competition Risk', raw: risk.competition },
    { label: 'Regulation Risk', raw: risk.regulation }
  ];

  // Helper to extract risk level (High, Medium, Low) and description
  const parseRisk = (rawText) => {
    if (!rawText) return { level: 'Unknown', desc: 'No risk information provided.', color: 'gray' };
    
    const parts = rawText.split('-');
    const level = parts[0].trim().toLowerCase();
    const desc = parts.slice(1).join('-').trim();

    if (level.includes('high')) {
      return { level: 'High', desc, color: 'red' };
    }
    if (level.includes('medium') || level.includes('moderate')) {
      return { level: 'Medium', desc, color: 'yellow' };
    }
    if (level.includes('low')) {
      return { level: 'Low', desc, color: 'green' };
    }
    return { level: 'Unknown', desc: rawText, color: 'gray' };
  };

  const getBadgeClass = (color) => {
    if (color === 'red') return 'bg-rose-500/10 text-rose-400 border border-rose-500/20';
    if (color === 'yellow') return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
    if (color === 'green') return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
    return 'bg-gray-800 text-gray-400 border border-gray-700';
  };

  const getIcon = (color) => {
    if (color === 'red') return <AlertOctagon size={16} className="text-rose-400" />;
    if (color === 'yellow') return <AlertTriangle size={16} className="text-amber-400" />;
    if (color === 'green') return <ShieldCheck size={16} className="text-emerald-400" />;
    return <HelpCircle size={16} className="text-gray-400" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="glass-panel glass-panel-hover rounded-3xl p-6 shadow-xl relative overflow-hidden"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-amber-500/10 p-2.5 rounded-xl text-amber-400 border border-amber-500/20">
          <AlertOctagon size={22} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Risk Assessment</h2>
          <p className="text-xs text-amber-400 uppercase tracking-widest font-semibold mt-0.5">Vulnerabilities & Threats</p>
        </div>
      </div>

      <div className="space-y-4">
        {riskCategories.map((cat, idx) => {
          const { level, desc, color } = parseRisk(cat.raw);
          
          return (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-900/40 border border-gray-850 hover:border-gray-800 rounded-2xl gap-3 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className="p-1.5 rounded-lg bg-gray-950/40 shrink-0">
                  {getIcon(color)}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-200">{cat.label}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed mt-0.5 max-w-xl">{desc}</p>
                </div>
              </div>

              <div className="sm:shrink-0 text-right">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getBadgeClass(color)}`}>
                  {level}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default RiskCard;
