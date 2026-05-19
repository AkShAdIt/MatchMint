import React, { useMemo } from 'react';

export const MatchScoreboard = () => {
  // Generate 20 mock overs to simulate a full innings timeline
  const mockOvers = useMemo(() => {
    const ballsTypes = [
      { label: '0', class: 'border border-white/20 text-gray-300' },
      { label: '1', class: 'border border-white/20 text-gray-300' },
      { label: '2', class: 'border border-white/20 text-gray-300' },
      { label: '4', class: 'bg-[#0e7490] text-white shadow-sm' },
      { label: '6', class: 'bg-[#15803d] text-white shadow-sm' },
      { label: 'W', class: 'bg-[#991b1b] text-white shadow-sm' },
      { label: 'wd', class: 'border border-white/20 text-gray-300' },
    ];

    return Array.from({ length: 20 }, (_, i) => {
      // Over 20 is ongoing (3 balls), others are 6 balls
      const numBalls = i === 19 ? 3 : 6;
      const balls = Array.from({ length: numBalls }, () => ballsTypes[Math.floor(Math.random() * ballsTypes.length)]);
      
      // Calculate runs (mock logic)
      const runs = balls.reduce((acc, b) => {
        if (b.label === 'W') return acc;
        if (b.label === 'wd') return acc + 1;
        return acc + (parseInt(b.label) || 0);
      }, 0);

      return { overNumber: i + 1, balls, runs };
    });
  }, []);
  return (
    <div className="bg-card border border-white/10 rounded-3xl p-6 sm:p-8 mb-6 relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none"></div>
      
      <div className="flex justify-between items-center mb-6 relative z-10">
        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">
          Qualifier 2 • Agumbe Ground
        </div>
        <div className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
          <div className="w-2 h-2 rounded-full bg-live-gradient animate-pulse"></div>
          <span className="text-xs font-bold text-primary uppercase tracking-wider">Live</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        {/* Team 1 */}
        <div className="flex-1 flex flex-col md:flex-row items-center gap-6 w-full">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-3xl text-white">
            AA
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-xl sm:text-2xl font-poppins font-bold text-white mb-1">Agumbe Avengers</h2>
            <div className="flex items-baseline justify-center md:justify-start gap-2">
              <span className="text-4xl sm:text-5xl font-black text-white leading-none">155/7</span>
              <span className="text-lg text-gray-400 font-medium">(19.3)</span>
            </div>
            <div className="text-sm text-gray-500 mt-2">CRR: 7.95</div>
          </div>
        </div>

        {/* VS / Info */}
        <div className="flex flex-col items-center justify-center px-4">
          <div className="text-sm font-bold text-gray-500 bg-white/5 px-4 py-2 rounded-full mb-4">VS</div>
          <div className="text-xs text-secondary text-center max-w-[200px]">
            Sringeri Strikers need 156 runs to win from 120 balls.
          </div>
        </div>

        {/* Team 2 */}
        <div className="flex-1 flex flex-col md:flex-row-reverse items-center gap-6 w-full">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-3xl text-white">
            SS
          </div>
          <div className="text-center md:text-right">
            <h2 className="text-xl sm:text-2xl font-poppins font-bold text-gray-400 mb-1">Sringeri Strikers</h2>
            <div className="flex items-baseline justify-center md:justify-end gap-2 opacity-50">
              <span className="text-4xl sm:text-5xl font-black text-white leading-none">0/0</span>
              <span className="text-lg text-gray-400 font-medium">(0)</span>
            </div>
            <div className="text-sm text-gray-500 mt-2">Yet to bat</div>
          </div>
        </div>
      </div>
      
      {/* Current Batter/Bowler Mini Stats */}
      <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
        <div className="flex justify-between items-center bg-[#1a1a1a] p-4 rounded-xl">
          <div>
            <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">Batter</div>
            <div className="text-white font-medium flex items-center gap-2">
              Rahul K. <span className="text-primary text-[10px]">★</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-white font-bold text-lg">45 <span className="text-xs text-gray-500 font-normal">(28)</span></div>
            <div className="text-[10px] text-gray-500">4s: 3 | 6s: 2</div>
          </div>
        </div>
        <div className="flex justify-between items-center bg-[#1a1a1a] p-4 rounded-xl">
          <div>
            <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">Bowler</div>
            <div className="text-white font-medium">Vikram S.</div>
          </div>
          <div className="text-right">
            <div className="text-white font-bold text-lg">2/24 <span className="text-xs text-gray-500 font-normal">(3.3)</span></div>
            <div className="text-[10px] text-gray-500">Econ: 6.85</div>
          </div>
        </div>
      </div>
      
      {/* Recent Overs (Scrollable Timeline) */}
      <div className="mt-6 pt-6 border-t border-white/5 relative z-10 flex flex-row items-center gap-6 overflow-x-auto hide-scrollbar pb-2">
        {mockOvers.map((over, idx) => (
          <React.Fragment key={idx}>
            <div className="flex items-center gap-2 whitespace-nowrap shrink-0">
              <span className="text-gray-400 font-medium mr-2">Over {over.overNumber}</span>
              {over.balls.map((ball, bIdx) => (
                <span 
                  key={bIdx} 
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${ball.class}`}
                >
                  {ball.label}
                </span>
              ))}
              <span className="text-gray-400 ml-2 text-sm">= {over.runs}</span>
            </div>
            
            {idx < mockOvers.length - 1 && (
              <div className="w-px h-8 bg-white/10 shrink-0"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
