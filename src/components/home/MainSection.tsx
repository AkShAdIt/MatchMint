import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, ChevronDown } from 'lucide-react';
import { todayMatches } from '../../data/mockData';

export const MainSection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ongoing');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMatches = useMemo(() => {
    return todayMatches.filter((match) => {
      const isOngoingTab = activeTab === 'ongoing';
      const matchesTab = isOngoingTab 
        ? match.status === 'live' || match.status === 'completed'
        : match.status === 'upcoming';

      if (!matchesTab) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      return (
        match.tournamentName.toLowerCase().includes(q) ||
        match.team1.name.toLowerCase().includes(q) ||
        match.team2.name.toLowerCase().includes(q) ||
        match.venue.toLowerCase().includes(q) ||
        match.matchType.toLowerCase().includes(q)
      );
    });
  }, [activeTab, searchQuery]);

  const groupedMatches = filteredMatches.reduce((acc, match) => {
    if (!acc[match.tournamentName]) {
      acc[match.tournamentName] = [];
    }
    acc[match.tournamentName].push(match);
    return acc;
  }, {} as Record<string, typeof todayMatches>);

  return (
    <main className="flex-1 max-w-4xl min-w-0">
      {/* Header Controls */}
      <div className="bg-card border border-white/5 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-24 z-10 hover:border-primary/30 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,90,0,0.15)] transition-all duration-500">
        <h2 className="text-xl font-poppins font-semibold whitespace-nowrap">Today's Matches</h2>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex bg-background p-1 rounded-full border border-white/5">
            <button 
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeTab === 'ongoing' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('ongoing')}
            >
              Ongoing
            </button>
            <button 
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeTab === 'upcoming' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming
            </button>
          </div>
          
          <div className="relative flex-1 sm:flex-none">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search matches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-40 bg-background border border-white/10 rounded-full py-1.5 pl-9 pr-3 text-sm focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Match Cards */}
      <div className="space-y-6">
        {Object.keys(groupedMatches).length === 0 ? (
          <div className="text-center py-10 text-gray-500 bg-card border border-white/5 rounded-2xl">
            No matches found for "{searchQuery}"
          </div>
        ) : (
          Object.entries(groupedMatches).map(([tournamentName, matches]) => (
            <div key={tournamentName} className="bg-card border border-white/5 rounded-2xl overflow-hidden hover:border-primary/30 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,90,0,0.15)] transition-all duration-500">
              <div 
                className="bg-card-alt px-5 py-3 border-b border-white/5 flex justify-between items-center cursor-pointer hover:bg-white/5 transition-colors"
                onClick={() => navigate(`/tournament/${matches[0].tournamentId}`)}
              >
                <h3 className="font-poppins font-medium text-gray-200">{tournamentName}</h3>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>
              
              <div className="divide-y divide-white/5">
                {matches.map((match) => (
                  <div 
                    key={match.id} 
                    className="p-5 hover:bg-white/[0.04] hover:shadow-[inset_4px_0_0_0_rgba(255,90,0,1)] transition-all duration-300 group cursor-pointer"
                    onClick={() => navigate(`/match/${match.id}`)}
                  >
                    <div className="flex flex-wrap gap-2 justify-between items-center mb-3">
                      <span className="text-xs text-gray-500 font-medium tracking-wide uppercase">
                        {match.matchType} • {match.venue}
                      </span>
                      {match.status === 'live' && (
                        <span className="text-xs font-medium flex items-center gap-1.5 bg-primary/10 text-primary px-2 py-0.5 rounded border border-primary/20">
                          <span className="h-1.5 w-1.5 rounded-full bg-live-gradient animate-pulse"></span>
                          LIVE
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-col sm:grid sm:grid-cols-[1fr_auto_1fr] items-center gap-4">
                      {/* Team 1 */}
                      <div className="flex justify-between sm:justify-end items-center text-right w-full sm:w-auto">
                        <span className="font-poppins font-medium text-gray-200 truncate order-2 sm:order-1 flex-1 sm:flex-none text-left sm:text-right">{match.team1.name}</span>
                        <div className="mr-4 sm:mr-0 sm:ml-4 flex flex-col items-start sm:items-end order-1 sm:order-2">
                          <span className="font-bold text-lg">{match.team1.score}</span>
                          <span className="text-xs text-gray-500">({match.team1.overs})</span>
                        </div>
                      </div>
                      
                      {/* VS */}
                      <div className="text-xs font-bold text-gray-600 px-2 py-1 bg-white/5 rounded-full hidden sm:block">VS</div>
                      
                      {/* Team 2 */}
                      <div className="flex justify-between items-center w-full sm:w-auto">
                        <div className="mr-4 flex flex-col items-start">
                          <span className="font-bold text-lg">{match.team2.score}</span>
                          <span className="text-xs text-gray-500">({match.team2.overs})</span>
                        </div>
                        <span className="font-poppins font-medium text-gray-200 truncate flex-1 text-right sm:text-left">{match.team2.name}</span>
                      </div>
                    </div>
                    
                    {match.status === 'upcoming' && (
                      <div className="mt-4 text-center">
                        <span className="text-xs text-secondary bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">
                          Starts: {match.time}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
};
