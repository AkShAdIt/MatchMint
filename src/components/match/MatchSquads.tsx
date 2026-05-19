import React from 'react';

export const MatchSquads = () => {
  const team1 = ['Rahul K.', 'Suresh M.', 'Amit P.', 'Vinay D.', 'Karthik S.', 'Nithin R.', 'Darshan B.', 'Vikram S.', 'Praveen T.', 'Naveen R.', 'Manoj P.'];
  const team2 = ['Arjun B.', 'Sandeep K.', 'Prakash M.', 'Rakshith R.', 'Deepak S.', 'Santhosh N.', 'Chetan P.', 'Manju K.', 'Kiran D.', 'Ramesh T.', 'Uday S.'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">
      {/* Team 1 Squad */}
      <div className="bg-card border border-white/5 rounded-2xl overflow-hidden">
        <div className="bg-[#1a1a1a] px-6 py-4 border-b border-white/5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white">AA</div>
          <h3 className="font-poppins font-bold text-white">Agumbe Avengers</h3>
        </div>
        <div className="divide-y divide-white/5">
          {team1.map((player, idx) => (
            <div key={idx} className="px-6 py-3 hover:bg-[#1a1a1a] transition-colors flex items-center gap-3">
              <span className="text-gray-500 text-xs w-4">{idx + 1}</span>
              <span className="text-gray-300 font-medium">{player}</span>
              {idx === 0 && <span className="px-2 py-0.5 rounded bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider ml-auto border border-primary/20">C</span>}
              {idx === 1 && <span className="px-2 py-0.5 rounded bg-white/10 text-gray-400 text-[10px] font-bold uppercase tracking-wider ml-auto border border-white/20">WK</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Team 2 Squad */}
      <div className="bg-card border border-white/5 rounded-2xl overflow-hidden">
        <div className="bg-[#1a1a1a] px-6 py-4 border-b border-white/5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white">SS</div>
          <h3 className="font-poppins font-bold text-gray-400">Sringeri Strikers</h3>
        </div>
        <div className="divide-y divide-white/5">
          {team2.map((player, idx) => (
            <div key={idx} className="px-6 py-3 hover:bg-[#1a1a1a] transition-colors flex items-center gap-3">
              <span className="text-gray-500 text-xs w-4">{idx + 1}</span>
              <span className="text-gray-400 font-medium">{player}</span>
              {idx === 0 && <span className="px-2 py-0.5 rounded bg-white/10 text-gray-400 text-[10px] font-bold uppercase tracking-wider ml-auto border border-white/20">C</span>}
              {idx === 3 && <span className="px-2 py-0.5 rounded bg-white/10 text-gray-400 text-[10px] font-bold uppercase tracking-wider ml-auto border border-white/20">WK</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
