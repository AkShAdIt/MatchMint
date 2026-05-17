import React from 'react';
import { X, MapPin, Calendar, ChevronRight } from 'lucide-react';

export interface Tournament {
  id: string;
  name: string;
  location: string;
  date: string;
}

interface TournamentSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (tournament: Tournament) => void;
}

export const TournamentSelectionModal: React.FC<TournamentSelectionModalProps> = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  const tournaments: Tournament[] = [
    {
      id: 't1',
      name: 'Karavali Coastal Cup',
      location: 'Malpe Beach Ground, Udupi',
      date: 'Dec 15 - Dec 20, 2024'
    },
    {
      id: 't2',
      name: 'Malenadu Monsoon Trophy',
      location: 'Agumbe Ground, Shimoga',
      date: 'Jan 10 - Jan 15, 2025'
    },
    {
      id: 't3',
      name: 'KVPL Season 4',
      location: 'Barkur Village Stadium',
      date: 'Feb 01 - Feb 05, 2025'
    }
  ];

  return (
    <div className="fixed inset-0 z-[105] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-background border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Header Ambient Glow */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none"></div>

        <button onClick={onClose} className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors focus:outline-none z-20">
          <X className="h-5 w-5" />
        </button>

        <div className="px-6 pt-10 pb-6 sm:px-10 border-b border-white/5 relative z-10 text-center sm:text-left">
          <h2 className="text-3xl font-poppins font-bold text-white mb-2 tracking-tight">Select Tournament</h2>
          <p className="text-sm text-gray-400">Choose an active tournament to enter the auction pool.</p>
        </div>

        <div className="p-6 sm:p-10 relative z-10 bg-card/30">
          <div className="space-y-4">
            {tournaments.map(t => (
              <div 
                key={t.id} 
                onClick={() => onSelect(t)}
                className="bg-card border border-white/5 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(255,90,0,0.1)] rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer group transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-live-gradient animate-pulse"></span>
                      Registrations Open
                    </span>
                  </div>
                  <h3 className="text-xl font-poppins font-bold text-white mb-3 group-hover:text-primary transition-colors">{t.name}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-gray-500" />{t.location}</span>
                    <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-gray-500" />{t.date}</span>
                  </div>
                </div>
                <div className="flex-shrink-0 mt-4 sm:mt-0">
                  <button className="w-full sm:w-auto bg-white/5 group-hover:bg-primary text-white font-medium py-3 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                    Select <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
