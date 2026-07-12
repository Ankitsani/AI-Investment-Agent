import React from 'react';
import { Building2, User, Users, Compass, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

function CompanyOverviewCard({ profile }) {
  if (!profile) return null;

  const details = [
    { icon: <User size={16} className="text-indigo-400" />, label: 'CEO', value: profile.ceo },
    { icon: <Globe size={16} className="text-indigo-400" />, label: 'Headquarters', value: profile.headquarters },
    { icon: <Users size={16} className="text-indigo-400" />, label: 'Employees', value: profile.employees },
    { icon: <Compass size={16} className="text-indigo-400" />, label: 'Industry', value: profile.industry }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-panel glass-panel-hover rounded-3xl p-6 shadow-xl relative overflow-hidden"
    >
      <div className="flex items-center space-x-3 mb-5">
        <div className="bg-indigo-600/10 p-2.5 rounded-xl text-indigo-400 border border-indigo-500/20">
          <Building2 size={22} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">{profile.name}</h2>
          <p className="text-xs text-indigo-400 uppercase tracking-widest font-semibold mt-0.5">Company Profile</p>
        </div>
      </div>

      <p className="text-sm text-gray-300 leading-relaxed mb-6 bg-gray-900/40 p-4 rounded-2xl border border-gray-800/40">
        {profile.overview}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {details.map((detail, idx) => (
          <div key={idx} className="flex items-start space-x-3 p-3 bg-gray-900/20 border border-gray-800/20 rounded-xl">
            <div className="mt-0.5 shrink-0 bg-indigo-600/5 p-2 rounded-lg">{detail.icon}</div>
            <div className="overflow-hidden">
              <span className="block text-[11px] text-gray-500 uppercase tracking-wider font-semibold">{detail.label}</span>
              <span className="block text-sm text-gray-200 font-medium truncate">{detail.value}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default CompanyOverviewCard;
