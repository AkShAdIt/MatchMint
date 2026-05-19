import React, { useState } from 'react';

export const MatchScorecard = () => {
  const [activeInnings, setActiveInnings] = useState(1);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Innings Toggle */}
      <div className="flex bg-background p-1 rounded-full border border-white/5 w-fit">
        <button 
          className={`px-6 py-2 rounded-full text-sm font-bold transition-colors ${activeInnings === 1 ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}
          onClick={() => setActiveInnings(1)}
        >
          Agumbe Avengers
        </button>
        <button 
          className={`px-6 py-2 rounded-full text-sm font-bold transition-colors ${activeInnings === 2 ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}
          onClick={() => setActiveInnings(2)}
        >
          Sringeri Strikers
        </button>
      </div>

      {activeInnings === 1 ? (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Innings 1 */}
      <div className="bg-card border border-white/5 rounded-2xl overflow-hidden">
        <div className="bg-[#1a1a1a] px-6 py-4 border-b border-white/5 flex justify-between items-center">
          <h3 className="font-poppins font-bold text-white">Agumbe Avengers Innings</h3>
          <span className="font-bold text-white">155/7 <span className="text-gray-500 font-medium text-sm">(19.3)</span></span>
        </div>
        
        {/* Batting Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-xs text-gray-500 uppercase tracking-wider">
                <th className="p-4 font-bold">Batter</th>
                <th className="p-4 font-bold w-[30%]">Dismissal</th>
                <th className="p-4 font-bold text-right">R</th>
                <th className="p-4 font-bold text-right">B</th>
                <th className="p-4 font-bold text-right">4s</th>
                <th className="p-4 font-bold text-right">6s</th>
                <th className="p-4 font-bold text-right">SR</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-white/5 hover:bg-[#1a1a1a] transition-colors">
                <td className="p-4 text-white font-medium">Rahul K.</td>
                <td className="p-4 text-gray-400 text-xs">not out</td>
                <td className="p-4 text-right font-bold text-white">45</td>
                <td className="p-4 text-right text-gray-400">28</td>
                <td className="p-4 text-right text-gray-400">3</td>
                <td className="p-4 text-right text-gray-400">2</td>
                <td className="p-4 text-right text-gray-400">160.71</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-[#1a1a1a] transition-colors">
                <td className="p-4 text-white font-medium">Suresh M.</td>
                <td className="p-4 text-gray-400 text-xs">c Vikram b Darshan</td>
                <td className="p-4 text-right font-bold text-white">32</td>
                <td className="p-4 text-right text-gray-400">21</td>
                <td className="p-4 text-right text-gray-400">4</td>
                <td className="p-4 text-right text-gray-400">1</td>
                <td className="p-4 text-right text-gray-400">152.38</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-[#1a1a1a] transition-colors">
                <td className="p-4 text-white font-medium">Amit P.</td>
                <td className="p-4 text-gray-400 text-xs">b Vikram</td>
                <td className="p-4 text-right font-bold text-white">12</td>
                <td className="p-4 text-right text-gray-400">9</td>
                <td className="p-4 text-right text-gray-400">1</td>
                <td className="p-4 text-right text-gray-400">0</td>
                <td className="p-4 text-right text-gray-400">133.33</td>
              </tr>
              {/* Extras & Total */}
              <tr className="border-t border-white/10 bg-[#1a1a1a]/50">
                <td colSpan={2} className="p-4 text-gray-400 font-bold">Extras</td>
                <td colSpan={5} className="p-4 text-right font-bold text-white">14 <span className="text-xs font-normal text-gray-500">(b 2, lb 4, w 8, nb 0)</span></td>
              </tr>
              <tr className="bg-[#1a1a1a]">
                <td colSpan={2} className="p-4 text-white font-bold uppercase tracking-wider">Total</td>
                <td colSpan={5} className="p-4 text-right font-black text-white text-lg">155/7 <span className="text-xs font-normal text-gray-500">(19.3 Overs)</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Bowling Table */}
      <div className="bg-card border border-white/5 rounded-2xl overflow-hidden">
        <div className="bg-[#1a1a1a] px-6 py-4 border-b border-white/5">
          <h3 className="font-poppins font-bold text-white">Sringeri Strikers Bowling</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-xs text-gray-500 uppercase tracking-wider">
                <th className="p-4 font-bold">Bowler</th>
                <th className="p-4 font-bold text-right">O</th>
                <th className="p-4 font-bold text-right">M</th>
                <th className="p-4 font-bold text-right">R</th>
                <th className="p-4 font-bold text-right text-primary">W</th>
                <th className="p-4 font-bold text-right">ECON</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-white/5 hover:bg-[#1a1a1a] transition-colors">
                <td className="p-4 text-white font-medium">Vikram S.</td>
                <td className="p-4 text-right text-gray-400">3.3</td>
                <td className="p-4 text-right text-gray-400">0</td>
                <td className="p-4 text-right text-gray-400">24</td>
                <td className="p-4 text-right font-bold text-primary">2</td>
                <td className="p-4 text-right text-gray-400">6.85</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-[#1a1a1a] transition-colors">
                <td className="p-4 text-white font-medium">Darshan B.</td>
                <td className="p-4 text-right text-gray-400">4.0</td>
                <td className="p-4 text-right text-gray-400">1</td>
                <td className="p-4 text-right text-gray-400">28</td>
                <td className="p-4 text-right font-bold text-primary">1</td>
                <td className="p-4 text-right text-gray-400">7.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </div>
      ) : (
        <div className="bg-card border border-white/5 rounded-2xl p-12 text-center text-gray-500 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <p className="font-poppins text-lg text-white mb-2">Sringeri Strikers Innings</p>
          <p>Yet to bat.</p>
        </div>
      )}
    </div>
  );
};
