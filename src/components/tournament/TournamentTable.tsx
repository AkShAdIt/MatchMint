import React from 'react';

export const TournamentTable = () => {
  const standings = [
    { team: 'Royal Strikers', m: 5, w: 4, l: 1, pts: 8, nrr: '+1.240' },
    { team: 'Nadavara Kings', m: 5, w: 3, l: 2, pts: 6, nrr: '+0.850' },
    { team: 'Coastal Riders', m: 5, w: 3, l: 2, pts: 6, nrr: '-0.120' },
    { team: 'Malpe Blasters', m: 5, w: 2, l: 3, pts: 4, nrr: '-0.450' },
    { team: 'Udupi Titans', m: 5, w: 1, l: 4, pts: 2, nrr: '-1.520' },
  ];

  return (
    <div className="w-full overflow-x-auto bg-card border border-white/5 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-white/5 border-b border-white/10">
            <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Team</th>
            <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">M</th>
            <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">W</th>
            <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">L</th>
            <th className="p-4 text-xs font-bold text-primary uppercase tracking-wider text-center">Pts</th>
            <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">NRR</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((row, idx) => (
            <tr key={idx} className="border-b border-white/5 hover:bg-[#1a1a1a] transition-colors group">
              <td className="p-4 flex items-center gap-3">
                <span className="text-gray-500 text-xs font-bold w-4">{idx + 1}</span>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                  {row.team.charAt(0)}
                </div>
                <span className="font-semibold text-white">{row.team}</span>
              </td>
              <td className="p-4 text-center text-gray-300">{row.m}</td>
              <td className="p-4 text-center text-gray-300">{row.w}</td>
              <td className="p-4 text-center text-gray-300">{row.l}</td>
              <td className="p-4 text-center font-bold text-primary">{row.pts}</td>
              <td className="p-4 text-center text-gray-400 text-sm">{row.nrr}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
