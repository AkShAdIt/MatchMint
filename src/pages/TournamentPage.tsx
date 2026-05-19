import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Trophy, Play, MapPin } from 'lucide-react';
import { TournamentTable } from '../components/tournament/TournamentTable';
import { TournamentFixtures } from '../components/tournament/TournamentFixtures';
import { PlayerStatsWidgets } from '../components/tournament/PlayerStatsWidgets';
import { TeamStatsWidgets } from '../components/tournament/TeamStatsWidgets';
import { TournamentRoster } from '../components/tournament/TournamentRoster';
import { TournamentTeams } from '../components/tournament/TournamentTeams';
import { TournamentAuction } from '../components/tournament/TournamentAuction';

type Tab = 'Table' | 'Fixtures' | 'Player Stats' | 'Team Stats' | 'Players' | 'Teams' | 'Auction';

export const TournamentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('Table');

  const tabs: Tab[] = ['Table', 'Fixtures', 'Player Stats', 'Team Stats', 'Players', 'Teams', 'Auction'];

  // Mock tournament data based on ID (normally fetched from API)
  const tournament = {
    name: 'Nadavara Premier League',
    location: 'Aversa, Karwar',
    logoUrl: null, // placeholder
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Table':
        return <TournamentTable />;
      case 'Fixtures':
        return <TournamentFixtures />;
      case 'Player Stats':
        return <PlayerStatsWidgets />;
      case 'Team Stats':
        return <TeamStatsWidgets />;
      case 'Players':
        return <TournamentRoster />;
      case 'Teams':
        return <TournamentTeams />;
      case 'Auction':
        return <TournamentAuction />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Background with blur and gradient overlay */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat blur-sm opacity-20"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80")' }}
      />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Global Navbar */}
        <Navbar />

        <div className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col">
          
          {/* Tournament Header Section */}
          <div className="bg-card border border-white/10 rounded-3xl overflow-hidden shadow-2xl mb-6 flex-shrink-0 animate-in fade-in slide-in-from-top-4 duration-500">
            {/* Header Content */}
            <div className="p-6 sm:p-8 flex flex-row items-center justify-between gap-6 relative">
              
              <div className="flex flex-row items-center gap-6 relative z-10">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shadow-xl shrink-0">
                  {tournament.logoUrl ? (
                    <img src={tournament.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                  ) : (
                    <Trophy className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                
                <div className="text-left">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-black text-white tracking-tight uppercase italic mb-2">
                    {tournament.name}
                  </h1>
                  <div className="flex items-center justify-start gap-2 text-gray-400 font-medium">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{tournament.location}</span>
                  </div>
                </div>
              </div>

              {/* Watch Live Button */}
              <div className="relative z-10">
                <button 
                  onClick={() => alert('Opening livestream modal placeholder...')}
                  className="group flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(255,90,0,0.2)] focus:outline-none"
                >
                  <div className="w-10 h-10 rounded-full bg-live-gradient flex items-center justify-center pl-1 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,59,0,0.5)]">
                    <Play className="w-5 h-5 text-white fill-current" />
                  </div>
                  <span className="font-poppins font-bold text-white tracking-wider uppercase text-sm">Watch Live</span>
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="px-4 sm:px-8 bg-black/20">
              <div className="flex overflow-x-auto hide-scrollbar">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`whitespace-nowrap px-5 py-4 font-bold text-sm uppercase tracking-wider transition-all focus:outline-none border-b-2 ${
                      activeTab === tab 
                        ? 'text-primary border-primary bg-primary/5' 
                        : 'text-gray-500 border-transparent hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Dynamic Content Container */}
          <div className="flex-1 w-full">
            {renderTabContent()}
          </div>

        </div>
      </div>

      {/* Hide Scrollbar for tabs */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};
