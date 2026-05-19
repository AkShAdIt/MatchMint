import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { featuredMatches } from '../../data/mockData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const FeaturedMatch = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!featuredMatches || featuredMatches.length === 0) {
    return (
      <div className="bg-card border border-white/5 rounded-2xl p-6 text-center text-gray-500">
        No featured matches right now.
      </div>
    );
  }

  const featuredMatch = featuredMatches[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredMatches.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredMatches.length) % featuredMatches.length);
  };

  return (
    <div 
      className="bg-card border border-white/5 hover:border-primary/30 rounded-2xl p-6 relative overflow-hidden group hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,90,0,0.15)] transition-all duration-500 cursor-pointer"
      onClick={() => navigate(`/match/${featuredMatch.id}`)}
    >
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[50px] -mr-10 -mt-10 group-hover:bg-primary/30 transition-colors duration-500"></div>
      
      <div className="flex justify-between items-center mb-6 relative z-10">
        <div>
          <span className="text-xs text-gray-400 font-medium tracking-wider uppercase block mb-1">
            Featured Match {currentIndex + 1}/{featuredMatches.length}
          </span>
          <h3 className="text-sm font-poppins text-gray-200">
            {featuredMatch.matchType}, {featuredMatch.venue}
          </h3>
        </div>
        <span className="h-2 w-2 rounded-full bg-live-gradient animate-pulse shadow-[0_0_8px_rgba(255,90,0,0.6)]"></span>
      </div>

      <div className="flex items-center justify-between mb-8 relative z-10">
        <button 
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          className="h-8 w-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors focus:outline-none"
        >
          <ChevronLeft className="h-4 w-4 text-gray-400" />
        </button>

        <div className="flex items-center gap-4 sm:gap-6">
          {/* Team 1 Logo Placeholder */}
          <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center border-2 border-white/10 shadow-lg relative">
             <span className="font-poppins font-bold text-lg sm:text-xl text-gray-400">
               {featuredMatch.team1.name.charAt(0)}
             </span>
             <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-black rounded-full border border-white/20 flex items-center justify-center">
               <span className="text-[10px] font-bold">bat</span>
             </div>
          </div>
          
          <div className="flex flex-col items-center justify-center hidden sm:flex">
            <span className="text-xs font-bold text-gray-500 mb-1">V/S</span>
            <div className="h-px w-12 bg-white/10"></div>
          </div>

          {/* Team 2 Logo Placeholder */}
          <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center border-2 border-white/10 shadow-lg">
            <span className="font-poppins font-bold text-lg sm:text-xl text-gray-400">
              {featuredMatch.team2.name.charAt(0)}
            </span>
          </div>
        </div>

        <button 
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="h-8 w-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors focus:outline-none"
        >
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center relative z-10">
        <div className="bg-background rounded-xl p-3 border border-white/5">
          <div className="text-[10px] sm:text-xs text-gray-400 mb-1 truncate">{featuredMatch.team1.name}</div>
          <div className="font-bold text-lg sm:text-xl">{featuredMatch.team1.score}</div>
          <div className="text-[10px] sm:text-xs text-gray-500">({featuredMatch.team1.overs})</div>
        </div>
        <div className="bg-background rounded-xl p-3 border border-white/5">
          <div className="text-[10px] sm:text-xs text-gray-400 mb-1 truncate">{featuredMatch.team2.name}</div>
          <div className="font-bold text-lg sm:text-xl">{featuredMatch.team2.score}</div>
          <div className="text-[10px] sm:text-xs text-gray-500">({featuredMatch.team2.overs})</div>
        </div>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-1.5 mt-6">
        {featuredMatches.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'w-4 bg-primary' : 'w-1.5 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
