import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { MatchScoreboard } from '../components/match/MatchScoreboard';
import { MatchScorecard } from '../components/match/MatchScorecard';
import { MatchSquads } from '../components/match/MatchSquads';

type Tab = 'Scorecard' | 'Squads' | 'Info';

export const MatchPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('Scorecard');
  const tabs: Tab[] = ['Scorecard', 'Squads', 'Info'];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Scorecard':
        return <MatchScorecard />;
      case 'Squads':
        return <MatchSquads />;
      case 'Info':
        return (
          <div className="bg-card border border-white/5 rounded-2xl p-6 text-center text-gray-500 py-12">
            Match Information (Toss, Umpires, Pitch Report) will appear here.
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col bg-background">
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Global Navbar */}
        <Navbar />

        <div className="flex-1 w-full max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col">
          
          {/* Match Scoreboard Header */}
          <MatchScoreboard />

          {/* Navigation Tabs */}
          <div className="border-b border-white/10 mb-6 flex overflow-x-auto hide-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap px-6 py-4 font-bold text-sm uppercase tracking-wider transition-all focus:outline-none border-b-2 ${
                  activeTab === tab 
                    ? 'text-primary border-primary bg-primary/5' 
                    : 'text-gray-500 border-transparent hover:text-white hover:bg-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Dynamic Content Container */}
          <div className="flex-1 w-full pb-10">
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
