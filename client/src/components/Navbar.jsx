import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TrendingUp, History, LayoutDashboard } from 'lucide-react';

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="glass-panel sticky top-0 z-50 border-b border-gray-800/60 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="bg-indigo-600 p-2 rounded-lg text-white shadow-neon-indigo group-hover:scale-105 transition-transform duration-200">
            <TrendingUp size={20} />
          </div>
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white via-gray-200 to-indigo-400 bg-clip-text text-transparent">
            AI <span className="text-indigo-400 font-medium text-sm tracking-widest uppercase">Agent</span>
          </span>
        </Link>

        {/* Navigation Items */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Link
            to="/"
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              isActive('/')
                ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/20'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
            }`}
          >
            <LayoutDashboard size={16} />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/history"
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              isActive('/history')
                ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/20'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
            }`}
          >
            <History size={16} />
            <span>History</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
