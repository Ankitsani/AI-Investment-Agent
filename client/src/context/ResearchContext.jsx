import React, { createContext, useState, useEffect } from 'react';
import { fetchFullResearch, getResearchHistory } from '../services/api.js';

export const ResearchContext = createContext();

export const ResearchProvider = ({ children }) => {
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentReport, setCurrentReport] = useState(null);
  const [loadingStage, setLoadingStage] = useState('idle'); // 'idle' | 'profile' | 'financials' | 'news' | 'swot' | 'decision' | 'complete'
  const [historyList, setHistoryList] = useState([]);

  // Fetch histories on mount
  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await getResearchHistory();
      if (data && data.history) {
        setHistoryList(data.history);
      }
    } catch (err) {
      console.warn('Could not load history list:', err.message);
    }
  };

  const startResearch = async (companyName) => {
    if (!companyName.trim()) return;
    
    setLoading(true);
    setError(null);
    setCompany(companyName);
    setCurrentReport(null);
    
    // Animate stages sequentially to provide visual feedback
    const stages = ['profile', 'financials', 'news', 'swot', 'decision'];
    let stageIndex = 0;
    
    setLoadingStage(stages[0]);

    // Interval to advance the loading status indicator text
    const stageInterval = setInterval(() => {
      if (stageIndex < stages.length - 1) {
        stageIndex++;
        setLoadingStage(stages[stageIndex]);
      }
    }, 1800); // 1.8s per step for professional reading flow

    try {
      const result = await fetchFullResearch(companyName);
      
      // Clear interval and hold decision stage for a brief moment to conclude
      clearInterval(stageInterval);
      setLoadingStage('decision');
      
      setTimeout(() => {
        setCurrentReport(result);
        setLoadingStage('complete');
        setLoading(false);
        loadHistory(); // Reload history logs
      }, 1000);
      
    } catch (err) {
      clearInterval(stageInterval);
      const errorData = err.response?.data?.error;
      const errorMessage = typeof errorData === 'object'
        ? (errorData.message || JSON.stringify(errorData))
        : (errorData || err.message || 'An error occurred during AI research.');
      setError(errorMessage);
      setLoading(false);
      setLoadingStage('idle');
    }
  };

  const clearResearch = () => {
    setCompany('');
    setCurrentReport(null);
    setLoading(false);
    setError(null);
    setLoadingStage('idle');
  };

  return (
    <ResearchContext.Provider
      value={{
        company,
        loading,
        error,
        currentReport,
        loadingStage,
        historyList,
        startResearch,
        clearResearch,
        loadHistory,
        setCompany,
        setCurrentReport
      }}
    >
      {children}
    </ResearchContext.Provider>
  );
};
