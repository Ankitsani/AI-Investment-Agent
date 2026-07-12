import React from 'react';
import { Target, Award, ShieldAlert, Rocket, AlertOctagon } from 'lucide-react';
import { motion } from 'framer-motion';

function SWOTCard({ swot }) {
  if (!swot) return null;

  const quadrants = [
    {
      title: 'Strengths',
      color: 'border-emerald-500/25 bg-emerald-500/5 text-emerald-400',
      icon: <Award size={18} />,
      points: swot.strengths || []
    },
    {
      title: 'Weaknesses',
      color: 'border-rose-500/25 bg-rose-500/5 text-rose-400',
      icon: <ShieldAlert size={18} />,
      points: swot.weaknesses || []
    },
    {
      title: 'Opportunities',
      color: 'border-indigo-500/25 bg-indigo-500/5 text-indigo-400',
      icon: <Rocket size={18} />,
      points: swot.opportunities || []
    },
    {
      title: 'Threats',
      color: 'border-amber-500/25 bg-amber-500/5 text-amber-400',
      icon: <AlertOctagon size={18} />,
      points: swot.threats || []
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="glass-panel glass-panel-hover rounded-3xl p-6 shadow-xl relative overflow-hidden"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-indigo-600/10 p-2.5 rounded-xl text-indigo-400 border border-indigo-500/20">
          <Target size={22} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">SWOT Analysis</h2>
          <p className="text-xs text-indigo-400 uppercase tracking-widest font-semibold mt-0.5">Strategic Market Positioning</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quadrants.map((q, idx) => (
          <div
            key={idx}
            className={`border rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between ${q.color}`}
          >
            <div>
              <div className="flex items-center space-x-2 mb-3.5">
                <div className="p-1.5 rounded-lg bg-gray-900/60">{q.icon}</div>
                <h3 className="font-bold text-sm tracking-wide text-white uppercase">{q.title}</h3>
              </div>

              <ul className="space-y-2.5">
                {q.points.map((pt, pIdx) => (
                  <li key={pIdx} className="text-xs text-gray-300 leading-relaxed flex items-start space-x-2">
                    <span className="inline-block w-1.5 h-1.5 bg-gray-500 rounded-full mt-1.5 shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default SWOTCard;
