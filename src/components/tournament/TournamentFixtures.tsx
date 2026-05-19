import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';

export const TournamentFixtures = () => {
  const matches = [
    { id: 1, team1: 'Royal Strikers', team2: 'Nadavara Kings', status: 'Live', time: 'Now', venue: 'Main Ground', score1: '145/4', score2: '120/6' },
    { id: 2, team1: 'Coastal Riders', team2: 'Malpe Blasters', status: 'Upcoming', time: 'Tomorrow, 4:00 PM', venue: 'Main Ground', score1: '-', score2: '-' },
    { id: 3, team1: 'Udupi Titans', team2: 'Coastal Riders', status: 'Completed', time: 'Yesterday', venue: 'Main Ground', score1: '180/2', score2: '175/8' },
  ];

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {matches.map((match) => (
        <div 
          key={match.id} 
          className="bg-card border border-white/5 rounded-2xl p-5 hover:border-white/20 transition-all group relative overflow-hidden cursor-pointer"
          onClick={() => navigate(`/match/${match.id}`)}
        >
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 relative z-10">
            {/* Team 1 */}
            <div className="flex items-center gap-4 flex-1 justify-end sm:justify-start w-full sm:w-auto">
              <span className="font-poppins font-bold text-white text-lg">{match.team1}</span>
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xl group-hover:border-primary/50 transition-colors">
                {match.team1.charAt(0)}
              </div>
            </div>

            {/* Middle Score/Status info */}
            <div className="flex flex-col items-center justify-center min-w-[140px]">
              {match.status === 'Live' && (
                <span className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-bold text-primary uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-live-gradient animate-pulse"></span>
                  Live
                </span>
              )}
              {match.status !== 'Live' && (
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">{match.status}</span>
              )}
              
              <div className="flex items-center gap-3">
                <span className={`font-black text-2xl ${match.status === 'Live' ? 'text-primary' : 'text-white'}`}>{match.score1}</span>
                <span className="text-gray-600 font-bold text-sm">vs</span>
                <span className={`font-black text-2xl ${match.status === 'Live' ? 'text-white' : 'text-white'}`}>{match.score2}</span>
              </div>
            </div>

            {/* Team 2 */}
            <div className="flex items-center gap-4 flex-1 justify-start sm:justify-end flex-row-reverse sm:flex-row w-full sm:w-auto">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xl group-hover:border-primary/50 transition-colors">
                {match.team2.charAt(0)}
              </div>
              <span className="font-poppins font-bold text-white text-lg">{match.team2}</span>
            </div>
          </div>

          {/* Footer Details */}
          <div className="mt-5 pt-4 border-t border-white/5 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-gray-400">
             <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-gray-500" /> {match.time}</div>
             <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-gray-500" /> {match.venue}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
