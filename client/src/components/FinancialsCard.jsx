import React from 'react';
import { DollarSign, Landmark, Percent, Layers, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function FinancialsCard({ financials }) {
  if (!financials) return null;

  const kpis = [
    { label: 'Revenue', value: financials.revenue, icon: <DollarSign size={16} /> },
    { label: 'Profit', value: financials.profit, icon: <Landmark size={16} /> },
    { label: 'Market Cap', value: financials.marketCap, icon: <Layers size={16} /> },
    { label: 'P/E Ratio', value: financials.peRatio, icon: <Percent size={16} /> },
    { label: 'Growth YoY', value: financials.growth, icon: <TrendingUp size={16} /> }
  ];

  // Default Fallbacks if chartData is missing
  const chartLabels = financials.chartData?.labels || ['2021', '2022', '2023', '2024', '2025'];
  const revenueHistory = financials.chartData?.revenueHistory || [100, 120, 140, 160, 180];
  const profitHistory = financials.chartData?.profitHistory || [10, 12, 15, 18, 22];

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        type: 'bar',
        label: 'Revenue ($B)',
        data: revenueHistory,
        backgroundColor: 'rgba(99, 102, 241, 0.45)', // Neon Indigo
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 1.5,
        borderRadius: 6,
      },
      {
        type: 'line',
        label: 'Profit ($B)',
        data: profitHistory,
        borderColor: 'rgb(16, 185, 129)', // Neon Emerald
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 2,
        tension: 0.35,
        pointBackgroundColor: 'rgb(16, 185, 129)',
        yAxisID: 'y1'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#9ca3af',
          font: { family: 'Inter', size: 11 }
        }
      },
      tooltip: {
        backgroundColor: '#111827',
        titleColor: '#fff',
        bodyColor: '#d1d5db',
        borderColor: 'rgba(99, 102, 241, 0.25)',
        borderWidth: 1,
        padding: 10
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.03)' },
        ticks: { color: '#9ca3af', font: { size: 10 } }
      },
      y: {
        position: 'left',
        grid: { color: 'rgba(255, 255, 255, 0.03)' },
        ticks: { color: '#9ca3af', font: { size: 10 } }
      },
      y1: {
        position: 'right',
        grid: { drawOnChartArea: false },
        ticks: { color: '#10b981', font: { size: 10 } }
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="glass-panel glass-panel-hover rounded-3xl p-6 shadow-xl relative overflow-hidden"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-emerald-500/10 p-2.5 rounded-xl text-emerald-400 border border-emerald-500/20">
          <Landmark size={22} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Financial Metrics</h2>
          <p className="text-xs text-emerald-400 uppercase tracking-widest font-semibold mt-0.5">Key Performance Indicators</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* KPI Panel */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3.5">
          {kpis.map((kpi, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 bg-gray-900/40 border border-gray-800/50 rounded-2xl"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-indigo-600/10 p-2 rounded-xl text-indigo-400">
                  {kpi.icon}
                </div>
                <span className="text-sm text-gray-400">{kpi.label}</span>
              </div>
              <span className="text-base font-bold text-white tracking-tight">{kpi.value}</span>
            </div>
          ))}
        </div>

        {/* Chart Panel */}
        <div className="lg:col-span-7 h-[280px] bg-gray-900/30 border border-gray-800/40 p-4 rounded-2xl relative">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </motion.div>
  );
}

export default FinancialsCard;
