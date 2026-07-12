import React from 'react';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useResearch } from '../hooks/useResearch.js';

function LoadingIndicator() {
  const { loadingStage, company } = useResearch();

  const steps = [
    { key: 'profile', label: 'Researching Company Profile...' },
    { key: 'financials', label: 'Analyzing Balance Sheet & Financials...' },
    { key: 'news', label: 'Reading Latest News & Sentiment...' },
    { key: 'swot', label: 'Generating SWOT Matrices...' },
    { key: 'decision', label: 'Making Final Investment Decision...' }
  ];

  const getStepStatus = (stepKey) => {
    const order = ['profile', 'financials', 'news', 'swot', 'decision'];
    const currentIdx = order.indexOf(loadingStage);
    const stepIdx = order.indexOf(stepKey);

    if (loadingStage === 'complete') return 'completed';
    if (currentIdx === -1) return 'pending';
    if (currentIdx > stepIdx) return 'completed';
    if (currentIdx === stepIdx) return 'active';
    return 'pending';
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-gray-900/60 backdrop-blur-xl border border-gray-800/80 rounded-3xl p-8 shadow-2xl relative overflow-hidden mt-8">
      {/* Radar scanning line effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="w-full h-0.5 bg-indigo-500 animate-scan" />
      </div>

      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-white">Analyzing {company}</h3>
        <p className="text-xs text-gray-400 mt-1">Our Supervisor Agent is coordinating expert analysts...</p>
      </div>

      <div className="space-y-5 relative z-10">
        {steps.map((step, idx) => {
          const status = getStepStatus(step.key);
          
          return (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.15 }}
              key={step.key}
              className={`flex items-center space-x-4 p-3.5 rounded-xl border transition-all duration-300 ${
                status === 'active'
                  ? 'bg-indigo-600/10 border-indigo-500/40 text-indigo-200 shadow-neon-indigo'
                  : status === 'completed'
                  ? 'bg-gray-850/30 border-emerald-500/20 text-gray-300'
                  : 'bg-transparent border-gray-900/50 text-gray-500'
              }`}
            >
              {status === 'completed' && (
                <CheckCircle2 className="text-emerald-500 shrink-0" size={20} />
              )}
              {status === 'active' && (
                <Loader2 className="text-indigo-400 animate-spin shrink-0" size={20} />
              )}
              {status === 'pending' && (
                <Circle className="text-gray-700 shrink-0" size={20} />
              )}
              
              <span className={`text-sm font-medium ${status === 'active' ? 'text-indigo-300 font-semibold' : ''}`}>
                {step.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default LoadingIndicator;
