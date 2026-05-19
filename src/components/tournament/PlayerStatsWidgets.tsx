import React from 'react';
import { Target, Zap, Shield, Flame, Star } from 'lucide-react';

export const PlayerStatsWidgets = () => {
  const stats = [
    { title: 'Most Runs', player: 'Rahul K.', team: 'Royal Strikers', value: '345', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { title: 'Most Wickets', player: 'Vikram S.', team: 'Coastal Riders', value: '14', icon: Target, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { title: 'Highest Strike Rate', player: 'Amit P.', team: 'Nadavara Kings', value: '210.5', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    { title: 'Most Sixes', player: 'Rahul K.', team: 'Royal Strikers', value: '24', icon: Star, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { title: 'Best Economy', player: 'Darshan B.', team: 'Malpe Blasters', value: '5.2', icon: Shield, color: 'text-green-500', bg: 'bg-green-500/10' },
    { title: 'MVP', player: 'Rahul K.', team: 'Royal Strikers', value: '980 pts', icon: Star, color: 'text-primary', bg: 'bg-primary/10' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-card border border-white/5 rounded-2xl p-5 hover:bg-[#1a1a1a] hover:border-white/10 transition-colors group relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.title}</h3>
            <div className={`p-2 rounded-lg ${stat.bg}`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
          </div>
          
          <div className="flex items-end justify-between">
            <div>
              <div className="font-poppins font-bold text-white text-lg leading-tight">{stat.player}</div>
              <div className="text-xs text-gray-500 mt-1">{stat.team}</div>
            </div>
            <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
