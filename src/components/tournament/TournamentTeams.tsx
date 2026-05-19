import React from 'react';
import { Shield } from 'lucide-react';

export const TournamentTeams = () => {
  const teams = [
    { id: 1, name: 'Royal Strikers', owner: 'Ramesh K.', players: 15, purse: '₹5,000' },
    { id: 2, name: 'Nadavara Kings', owner: 'Suresh B.', players: 14, purse: '₹12,000' },
    { id: 3, name: 'Coastal Riders', owner: 'Vinay P.', players: 15, purse: '₹2,500' },
    { id: 4, name: 'Malpe Blasters', owner: 'Karthik S.', players: 13, purse: '₹18,000' },
    { id: 5, name: 'Udupi Titans', owner: 'Nitin M.', players: 15, purse: '₹1,000' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {teams.map((team) => (
        <div key={team.id} className="bg-card border border-white/5 rounded-2xl p-6 hover:bg-[#1a1a1a] hover:border-white/10 transition-all group relative overflow-hidden flex flex-col justify-between">

          
          <div className="flex items-start gap-4 mb-6 relative z-10">
            <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
               <Shield className="w-8 h-8 text-gray-400 group-hover:text-white transition-colors" />
            </div>
            <div>
              <h3 className="font-poppins font-bold text-white text-xl leading-tight mb-1">{team.name}</h3>
              <p className="text-xs font-medium text-gray-500">Owner: <span className="text-gray-300">{team.owner}</span></p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5 relative z-10">
            <div>
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Squad Size</div>
              <div className="text-lg font-medium text-white">{team.players} <span className="text-sm text-gray-500">/ 15</span></div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Purse Left</div>
              <div className="text-lg font-bold text-primary">{team.purse}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
