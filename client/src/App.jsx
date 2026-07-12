import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import History from './pages/History.jsx';
import { ResearchProvider } from './context/ResearchContext.jsx';

function App() {
  return (
    <Router>
      <ResearchProvider>
        <div className="flex flex-col min-h-screen bg-[#090d16] text-gray-100 relative overflow-hidden">
          {/* Ambient Glow Elements */}
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] glow-spot-indigo rounded-full pointer-events-none z-0" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] glow-spot-emerald rounded-full pointer-events-none z-0" />
          
          <Navbar />
          
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </main>
          
          <footer className="py-6 border-t border-gray-800/40 text-center text-xs text-gray-500 relative z-10">
            © {new Date().getFullYear()} AI Investment Research Agent. For informational purposes only.
          </footer>
        </div>
      </ResearchProvider>
    </Router>
  );
}

export default App;
