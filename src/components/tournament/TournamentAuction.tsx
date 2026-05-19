import React from 'react';
import { Gavel, Activity, Users } from 'lucide-react';

export const TournamentAuction = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-in fade-in zoom-in duration-500">
      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 border border-primary/20 shadow-[0_0_30px_rgba(255,90,0,0.2)]">
        <Gavel className="w-12 h-12 text-primary animate-pulse" />
      </div>
      
      <h2 className="text-3xl font-poppins font-bold text-white mb-3">Live Auction Room</h2>
      <p className="text-gray-400 mb-10 max-w-md mx-auto text-center leading-relaxed">
        The live player auction is currently offline. When active, team owners will place realtime bids here.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl mx-auto">
        <div className="bg-card border border-white/10 rounded-2xl p-6 text-center hover:bg-[#1a1a1a] hover:border-white/20 transition-all">
          <Activity className="w-8 h-8 text-gray-500 mx-auto mb-4" />
          <h4 className="font-bold text-white mb-2">Realtime Bidding</h4>
          <p className="text-xs text-gray-400">See bids update live as owners compete for players.</p>
        </div>
        <div className="bg-card border border-white/10 rounded-2xl p-6 text-center hover:bg-[#1a1a1a] hover:border-white/20 transition-all">
          <Users className="w-8 h-8 text-gray-500 mx-auto mb-4" />
          <h4 className="font-bold text-white mb-2">Owner Participation</h4>
          <p className="text-xs text-gray-400">Approved franchise owners can bid directly from their devices.</p>
        </div>
        <div className="bg-card border border-white/10 rounded-2xl p-6 text-center hover:bg-[#1a1a1a] hover:border-white/20 transition-all">
          <Gavel className="w-8 h-8 text-gray-500 mx-auto mb-4" />
          <h4 className="font-bold text-white mb-2">Live Feed</h4>
          <p className="text-xs text-gray-400">Public viewers can watch the entire auction process live.</p>
        </div>
      </div>
    </div>
  );
};
