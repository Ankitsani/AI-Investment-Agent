import React from 'react';
import { Award, CheckCircle, AlertTriangle, ArrowRight, Eye, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

function DecisionCard({ decision }) {
  if (!decision) return null;

  const isInvest = decision.recommendation === 'INVEST';
  const score = decision.score || 0;
  const confidence = decision.confidence || 0;

  // SVG Concentric Circle Parameters
  const radius = 50;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const scoreStrokeDashoffset = circumference - (score / 100) * circumference;
  const confidenceStrokeDashoffset = circumference - (confidence / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-panel border-indigo-500/35 shadow-2xl rounded-3xl p-6 lg:p-8 relative overflow-hidden"
    >
      {/* Background radial highlight */}
      <div className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-25 z-0 ${
        isInvest ? 'bg-emerald-500/30' : 'bg-rose-500/30'
      }`} />

      {/* Top Banner Recommendation */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-gray-800/80 relative z-10">
        <div className="flex items-center space-x-3.5">
          <div className={`p-3 rounded-2xl border ${
            isInvest 
              ? 'bg-emerald-600/10 text-emerald-400 border-emerald-500/30 shadow-neon-emerald' 
              : 'bg-rose-600/10 text-rose-400 border-rose-500/30 shadow-neon-indigo'
          }`}>
            <Award size={26} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Final Assessment</span>
            <h2 className="text-2xl font-black text-white tracking-tight mt-0.5">Investment Rating</h2>
          </div>
        </div>

        <div className="flex items-center space-x-3.5">
          <span className="text-sm font-semibold text-gray-400">Recommendation:</span>
          <span className={`px-6 py-2.5 rounded-2xl text-lg font-black tracking-widest uppercase border ${
            isInvest
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40 shadow-neon-emerald'
              : 'bg-rose-500/10 text-rose-400 border-rose-500/40'
          }`}>
            {decision.recommendation}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 relative z-10">
        
        {/* SVG Gauges Column */}
        <div className="lg:col-span-4 flex items-center justify-around gap-6 bg-gray-950/40 p-6 rounded-2xl border border-gray-900">
          {/* Score Circle */}
          <div className="text-center relative">
            <svg className="w-28 h-28 transform -rotate-90">
              {/* Outer Track */}
              <circle
                cx="56"
                cy="56"
                r={radius}
                className="stroke-gray-800 fill-transparent"
                strokeWidth={strokeWidth}
              />
              {/* Inner Glow Filler */}
              <circle
                cx="56"
                cy="56"
                r={radius}
                className={`fill-transparent transition-all duration-1000 ${
                  isInvest ? 'stroke-emerald-400' : 'stroke-rose-400'
                }`}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={scoreStrokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center mt-[-6px]">
              <span className="text-2xl font-black text-white">{score}</span>
              <span className="text-[9px] text-gray-500 uppercase font-semibold">Score</span>
            </div>
            <span className="block text-[11px] text-gray-400 font-medium mt-3">Investment Index</span>
          </div>

          {/* Confidence Circle */}
          <div className="text-center relative">
            <svg className="w-28 h-28 transform -rotate-90">
              <circle
                cx="56"
                cy="56"
                r={radius}
                className="stroke-gray-800 fill-transparent"
                strokeWidth={strokeWidth}
              />
              <circle
                cx="56"
                cy="56"
                r={radius}
                className="stroke-indigo-400 fill-transparent transition-all duration-1000"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={confidenceStrokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center mt-[-6px]">
              <span className="text-2xl font-black text-white">{confidence}%</span>
              <span className="text-[9px] text-gray-500 uppercase font-semibold">Accuracy</span>
            </div>
            <span className="block text-[11px] text-gray-400 font-medium mt-3">Confidence %</span>
          </div>
        </div>

        {/* Reasoning Column */}
        <div className="lg:col-span-8 flex flex-col justify-center">
          <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400 mb-2">Executive Thesis</h3>
          <p className="text-gray-300 text-sm leading-relaxed bg-gray-900/10 p-4 rounded-xl border border-gray-850">
            {decision.reasoning}
          </p>
        </div>
      </div>

      {/* Pros & Cons Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 relative z-10">
        {/* Pros Box */}
        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5">
          <div className="flex items-center space-x-2 text-emerald-400 mb-3.5">
            <CheckCircle size={18} />
            <h4 className="font-bold text-sm tracking-wide uppercase text-white">Investment Strengths (Pros)</h4>
          </div>
          <ul className="space-y-2.5">
            {decision.pros?.map((pro, index) => (
              <li key={index} className="text-xs text-gray-300 flex items-start space-x-2 leading-relaxed">
                <ArrowRight size={12} className="text-emerald-400 mt-1 shrink-0" />
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons Box */}
        <div className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-5">
          <div className="flex items-center space-x-2 text-rose-400 mb-3.5">
            <ShieldAlert size={18} />
            <h4 className="font-bold text-sm tracking-wide uppercase text-white">Risk Exposures (Cons)</h4>
          </div>
          <ul className="space-y-2.5">
            {decision.cons?.map((con, index) => (
              <li key={index} className="text-xs text-gray-300 flex items-start space-x-2 leading-relaxed">
                <ArrowRight size={12} className="text-rose-400 mt-1 shrink-0" />
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Future Outlook */}
      <div className="mt-8 bg-gray-900/60 border border-gray-850 p-5 rounded-2xl flex items-start space-x-3.5 relative z-10">
        <div className="p-2 bg-indigo-600/10 text-indigo-400 rounded-xl shrink-0 mt-0.5">
          <Eye size={18} />
        </div>
        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-indigo-400">Future Outlook</h4>
          <p className="text-xs text-gray-300 leading-relaxed mt-1">{decision.outlook}</p>
        </div>
      </div>

    </motion.div>
  );
}

export default DecisionCard;
