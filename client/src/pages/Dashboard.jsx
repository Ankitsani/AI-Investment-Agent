import React from 'react';
import { useResearch } from '../hooks/useResearch.js';
import SearchBar from '../components/SearchBar.jsx';
import LoadingIndicator from '../components/LoadingIndicator.jsx';
import CompanyOverviewCard from '../components/CompanyOverviewCard.jsx';
import FinancialsCard from '../components/FinancialsCard.jsx';
import NewsCard from '../components/NewsCard.jsx';
import SWOTCard from '../components/SWOTCard.jsx';
import RiskCard from '../components/RiskCard.jsx';
import DecisionCard from '../components/DecisionCard.jsx';
import { AlertCircle, RotateCcw, BrainCircuit } from 'lucide-react';
import { motion } from 'framer-motion';

function Dashboard() {
  const { currentReport, loading, error, company, startResearch, clearResearch } = useResearch();

  const handleRetry = () => {
    if (company) startResearch(company);
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/35 px-4 py-1.5 rounded-full text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2"
        >
          <BrainCircuit size={14} />
          <span>LangChain Supervisor Multi-Agent</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-gray-200 to-indigo-400 bg-clip-text text-transparent"
        >
          AI Investment Research Agent
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto leading-relaxed"
        >
          Enter a company ticker or name. Our supervisor agent will coordinate profiling, financial, news, SWOT, and risk tools to compile institutional reports.
        </motion.p>
      </div>

      {/* Search Input Bar */}
      <SearchBar />

      {/* States handler */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pt-6"
        >
          <LoadingIndicator />
        </motion.div>
      )}

      {error && !loading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg mx-auto bg-rose-500/5 border border-rose-500/25 p-6 rounded-2xl text-center space-y-4 shadow-xl"
        >
          <div className="flex justify-center text-rose-500">
            <AlertCircle size={40} />
          </div>
          <div>
            <h3 className="text-white font-bold">Research Pipeline Interrupted</h3>
            <p className="text-xs text-gray-400 mt-1">{error}</p>
          </div>
          <div className="flex justify-center space-x-3">
            <button
              onClick={handleRetry}
              className="flex items-center space-x-1.5 bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold px-4 py-2 rounded-xl transition-all"
            >
              <RotateCcw size={12} />
              <span>Retry Search</span>
            </button>
            <button
              onClick={clearResearch}
              className="text-gray-500 hover:text-gray-400 text-xs font-semibold px-4 py-2"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {currentReport && !loading && !error && (
        <div className="space-y-6 pt-6">
          {/* Main Top rating card */}
          <DecisionCard decision={currentReport.decision} />

          {/* Sub Grid columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6">
              <CompanyOverviewCard profile={currentReport.profile} />
            </div>
            <div className="lg:col-span-6">
              <SWOTCard swot={currentReport.swot} />
            </div>
            <div className="lg:col-span-12">
              <FinancialsCard financials={currentReport.financials} />
            </div>
            <div className="lg:col-span-6">
              <RiskCard risk={currentReport.risk} />
            </div>
            <div className="lg:col-span-6">
              <NewsCard news={currentReport.news} />
            </div>
          </div>
        </div>
      )}

      {/* Empty State Instructions */}
      {!currentReport && !loading && !error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center pt-16 max-w-sm mx-auto space-y-3"
        >
          <div className="text-4xl">🔬</div>
          <h3 className="text-white font-bold text-sm">No Active Report</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Choose a popular ticker above or write in a company name to launch the agent workflow.
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default Dashboard;
