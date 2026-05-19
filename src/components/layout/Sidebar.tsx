import React from 'react';
import { useNavigate } from 'react-router-dom';
import { tournaments } from '../../data/mockData';

export const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="w-64 flex-shrink-0 hidden lg:block">
      <div className="bg-card border border-white/5 rounded-2xl p-5 h-[calc(100vh-8rem)] flex flex-col sticky top-24">
        <h2 className="text-xl font-poppins font-semibold mb-6 flex items-center gap-2">
          Tournaments
        </h2>
        
        <div className="flex-1 overflow-y-auto pr-2 space-y-2">
          {tournaments.map((tournament) => (
            <div 
              key={tournament.id}
              onClick={() => navigate(`/tournament/${tournament.id}`)}
              className="px-4 py-3 rounded-xl border border-transparent hover:border-primary/30 hover:bg-white/5 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(255,90,0,0.1)] transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="font-poppins font-medium text-gray-200 group-hover:text-white transition-colors">
                  {tournament.name}
                </span>
                {tournament.status === 'ongoing' && (
                  <span className="h-2 w-2 rounded-full bg-live-gradient animate-pulse shadow-[0_0_8px_rgba(255,90,0,0.6)]"></span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1 truncate">
                {tournament.fullName}
              </p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
