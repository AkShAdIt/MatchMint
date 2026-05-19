import React from 'react';
import { User, Shield, Zap } from 'lucide-react';

export const TournamentRoster = () => {
  const players = [
    { id: 1, name: 'Rahul K.', role: 'Batsman', team: 'Royal Strikers', status: 'Sold', price: '₹45,000' },
    { id: 2, name: 'Vikram S.', role: 'Bowler', team: 'Coastal Riders', status: 'Sold', price: '₹38,000' },
    { id: 3, name: 'Amit P.', role: 'All-Rounder', team: 'Nadavara Kings', status: 'Sold', price: '₹52,000' },
    { id: 4, name: 'Darshan B.', role: 'Bowler', team: 'Malpe Blasters', status: 'Sold', price: '₹30,000' },
    { id: 5, name: 'Karthik N.', role: 'Wicket Keeper', team: 'Udupi Titans', status: 'Sold', price: '₹25,000' },
    { id: 6, name: 'Suresh M.', role: 'Batsman', team: 'Unsold', status: 'In Pool', price: '-' },
    { id: 7, name: 'Praveen T.', role: 'All-Rounder', team: 'Unsold', status: 'In Pool', price: '-' },
    { id: 8, name: 'Naveen R.', role: 'Bowler', team: 'Unsold', status: 'In Pool', price: '-' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {players.map((player) => (
        <div key={player.id} className="bg-card border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all group">
          <div className="h-24 bg-gradient-to-br from-white/5 to-transparent relative flex items-center justify-center border-b border-white/5">
            <User className="w-10 h-10 text-gray-600 group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute top-2 right-2">
              {player.status === 'Sold' ? (
                <span className="px-2 py-0.5 bg-primary/20 border border-primary/30 rounded text-[10px] font-bold text-primary uppercase tracking-wider">Sold</span>
              ) : (
                <span className="px-2 py-0.5 bg-white/10 border border-white/20 rounded text-[10px] font-bold text-gray-300 uppercase tracking-wider">Pool</span>
              )}
            </div>
          </div>
          
          <div className="p-4">
            <h3 className="font-bold text-white text-lg leading-tight mb-1">{player.name}</h3>
            
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
              {player.role === 'Batsman' && <Zap className="w-3.5 h-3.5 text-orange-500" />}
              {player.role === 'Bowler' && <Shield className="w-3.5 h-3.5 text-blue-500" />}
              {player.role === 'All-Rounder' && <Zap className="w-3.5 h-3.5 text-yellow-500" />}
              {player.role === 'Wicket Keeper' && <Shield className="w-3.5 h-3.5 text-green-500" />}
              {player.role}
            </div>

            <div className="flex justify-between items-end pt-3 border-t border-white/5">
              <div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">Team</div>
                <div className={`text-sm font-medium ${player.team === 'Unsold' ? 'text-gray-500' : 'text-white'}`}>{player.team}</div>
              </div>
              {player.status === 'Sold' && (
                <div className="text-right">
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">Price</div>
                  <div className="text-sm font-bold text-primary">{player.price}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
