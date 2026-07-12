import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useResearch } from '../hooks/useResearch.js';

function SearchBar() {
  const { startResearch, loading } = useResearch();
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim() || loading) return;
    startResearch(query.trim());
  };

  const handleSuggestionClick = (companyName) => {
    if (loading) return;
    setQuery(companyName);
    startResearch(companyName);
  };

  const suggestions = ['Apple', 'Tesla', 'Microsoft', 'NVIDIA', 'Infosys'];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Enter company name (e.g. Apple, Tesla)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={loading}
            className="w-full bg-[#111827] border border-gray-800/80 rounded-2xl py-4 pl-12 pr-32 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-lg disabled:opacity-50 text-base"
          />
          <div className="absolute left-4 text-gray-500">
            <Search size={20} />
          </div>
          <div className="absolute right-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={!query.trim() || loading}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white font-medium px-6 py-2.5 rounded-xl flex items-center space-x-1.5 shadow-neon-indigo transition-all text-sm"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Researching</span>
                </>
              ) : (
                <span>Analyze</span>
              )}
            </motion.button>
          </div>
        </div>
      </form>

      {/* Suggested Quick Links */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs text-gray-400">
        <span>Popular searches:</span>
        {suggestions.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => handleSuggestionClick(item)}
            disabled={loading}
            className="bg-gray-800/50 hover:bg-indigo-600/20 hover:text-indigo-400 border border-gray-800 hover:border-indigo-500/30 px-3 py-1.5 rounded-full transition-all disabled:opacity-50"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
