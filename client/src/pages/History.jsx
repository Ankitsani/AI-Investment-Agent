import React from 'react';
import { useResearch } from '../hooks/useResearch.js';
import { useNavigate } from 'react-router-dom';
import { Calendar, Award, ArrowRight, Database, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

function History() {
  const { historyList, setCurrentReport, setCompany } = useResearch();
  const navigate = useNavigate();

  const handleRestore = (item) => {
    setCompany(item.company);
    setCurrentReport(item.report);
    navigate('/');
  };

  const formatDate = (isoString) => {
    try {
      return new Date(isoString).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return isoString;
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Research Logs</h1>
          <p className="text-sm text-gray-400 mt-1">Access past research runs and compiled evaluations.</p>
        </div>
        
        {/* MongoDB Indicator */}
        <div className="bg-gray-900/60 border border-gray-800/80 px-4 py-2 rounded-2xl flex items-center space-x-2 shrink-0">
          <Database size={14} className="text-indigo-400" />
          <span className="text-xs text-gray-400">
            Storage: <span className="text-indigo-400 font-semibold">{historyList.length > 0 ? 'MongoDB Active' : 'Session Cache'}</span>
          </span>
        </div>
      </div>

      {historyList.length === 0 ? (
        <div className="glass-panel text-center p-12 rounded-3xl space-y-4">
          <div className="text-4xl text-gray-650">🗂️</div>
          <div>
            <h3 className="text-white font-bold">No History Logs Found</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1">
              Once you enter search tickers on the dashboard and successfully compile research, reports will be archived here.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {historyList.map((item, idx) => {
            const decision = item.report?.decision || {};
            const isInvest = decision.recommendation === 'INVEST';
            
            return (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={item._id || idx}
                className="glass-panel glass-panel-hover p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-bold text-lg text-white">{item.company}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest border ${
                      isInvest 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                        : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                    }`}>
                      {decision.recommendation || 'N/A'}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                    <span className="flex items-center space-x-1">
                      <Calendar size={12} className="text-gray-500" />
                      <span>{formatDate(item.timestamp)}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Award size={12} className="text-gray-500" />
                      <span>Index Score: <strong className="text-white font-semibold">{decision.score || 'N/A'}</strong></span>
                    </span>
                  </div>
                </div>

                <div className="shrink-0 w-full sm:w-auto">
                  <button
                    onClick={() => handleRestore(item)}
                    className="w-full sm:w-auto flex items-center justify-center space-x-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-4.5 py-2.5 rounded-xl transition-all shadow-neon-indigo"
                  >
                    <span>Load Report</span>
                    <ExternalLink size={12} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default History;
