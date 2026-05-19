import React from 'react';
import { TrendingUp, Award, Activity, Crosshair } from 'lucide-react';

export const TeamStatsWidgets = () => {
  const stats = [
    { title: 'Highest Total', team: 'Royal Strikers', value: '245/3', icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/10' },
    { title: 'Longest Win Streak', team: 'Nadavara Kings', value: '4 Matches', icon: Award, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    { title: 'Best Run Rate', team: 'Coastal Riders', value: '+1.850', icon: Activity, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { title: 'Most Wickets Taken', team: 'Udupi Titans', value: '42', icon: Crosshair, color: 'text-green-500', bg: 'bg-green-500/10' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-card border border-white/5 rounded-2xl p-5 hover:bg-[#1a1a1a] hover:border-white/10 transition-colors flex flex-col justify-between h-full">
          <div className="flex justify-between items-start mb-6">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-lg text-white">
              {stat.team.charAt(0)}
            </div>
            <div className={`p-2 rounded-lg ${stat.bg}`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
          </div>
          
          <div>
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">{stat.title}</h3>
            <div className={`text-2xl font-black mb-1 ${stat.color}`}>{stat.value}</div>
            <div className="text-sm font-medium text-white">{stat.team}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
