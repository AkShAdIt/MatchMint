import React from 'react';

export const MatchCommentary = () => {
  const events = [
    { over: '19.3', bowler: 'Vikram S.', batter: 'Rahul K.', runs: '4', text: 'FOUR! Smashed down the ground. Full length outside off, and Rahul creams it straight past the bowler. What a shot!', type: 'boundary' },
    { over: '19.2', bowler: 'Vikram S.', batter: 'Rahul K.', runs: '2', text: 'Good running. Worked away to deep square leg for a couple.', type: 'normal' },
    { over: '19.1', bowler: 'Vikram S.', batter: 'Amit P.', runs: '1', text: 'Yorker length, squeezed out to point for a quick single.', type: 'normal' },
    { over: '19.0', text: 'End of over 19. Agumbe Avengers 148/7. Vikram S. to bowl the final over.', type: 'over_summary' },
    { over: '18.6', bowler: 'Darshan B.', batter: 'Suresh M.', runs: 'W', text: 'OUT! Caught at deep mid-wicket! Suresh tries to clear the boundary but doesn\'t get the distance. Easy catch for the fielder.', type: 'wicket' },
    { over: '18.5', bowler: 'Darshan B.', batter: 'Suresh M.', runs: '6', text: 'SIX! Massive! Short ball pulled brilliantly over deep square leg.', type: 'boundary' },
  ];

  return (
    <div className="bg-card border border-white/5 rounded-2xl p-6 animate-in fade-in duration-500">
      <h3 className="font-poppins font-bold text-white mb-6">Live Commentary</h3>
      
      <div className="space-y-6">
        {events.map((evt, idx) => (
          <div key={idx} className="flex gap-4 items-start relative">
            {/* Timeline line */}
            {idx !== events.length - 1 && (
              <div className="absolute top-8 bottom-[-24px] left-5 w-px bg-white/10"></div>
            )}
            
            {/* Event Ball / Indicator */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm z-10 shrink-0 ${
              evt.type === 'over_summary' ? 'bg-[#1a1a1a] border border-white/20 text-white' :
              evt.type === 'wicket' ? 'bg-red-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.4)]' :
              evt.type === 'boundary' ? 'bg-primary text-white shadow-[0_0_10px_rgba(255,90,0,0.4)]' :
              'bg-white/10 border border-white/20 text-gray-300'
            }`}>
              {evt.type === 'over_summary' ? 'OV' : evt.runs}
            </div>

            {/* Content */}
            <div className="flex-1 bg-[#1a1a1a] rounded-xl p-4 border border-white/5">
              {evt.type === 'over_summary' ? (
                <div className="font-medium text-gray-300">{evt.text}</div>
              ) : (
                <>
                  <div className="flex gap-2 text-xs font-bold text-gray-500 mb-2">
                    <span className="text-white">{evt.over}</span>
                    <span>•</span>
                    <span>{evt.bowler} to {evt.batter}</span>
                  </div>
                  <div className={`text-sm leading-relaxed ${evt.type === 'wicket' ? 'text-red-400 font-medium' : 'text-gray-300'}`}>
                    {evt.text}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
