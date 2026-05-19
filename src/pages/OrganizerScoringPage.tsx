import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, RotateCcw, User, ShieldAlert } from 'lucide-react';

export const OrganizerScoringPage = () => {
  const navigate = useNavigate();
  
  // Mock State for demonstration
  const [score, setScore] = useState(155);
  const [wickets, setWickets] = useState(7);
  const [balls, setBalls] = useState(117); // 19.3 overs
  const [currentOverBalls, setCurrentOverBalls] = useState<string[]>(['1', '4', 'W']);
  const [extraType, setExtraType] = useState<string | null>(null);

  const getOvers = () => {
    const fullOvers = Math.floor(balls / 6);
    const extraBalls = balls % 6;
    return `${fullOvers}.${extraBalls}`;
  };

  const handleRun = (runs: number) => {
    if (wickets >= 10 || balls >= 120) return;
    
    let displayBall = runs.toString();
    if (extraType) {
       displayBall = extraType + (runs > 0 ? runs.toString() : '');
       setScore(prev => prev + runs + (extraType === 'wd' || extraType === 'nb' ? 1 : 0));
       if (extraType !== 'wd' && extraType !== 'nb') {
         setBalls(prev => prev + 1);
       }
       setExtraType(null);
    } else {
       setScore(prev => prev + runs);
       setBalls(prev => prev + 1);
    }

    if (currentOverBalls.length >= 6 && !extraType && displayBall !== 'wd' && displayBall !== 'nb') {
        setCurrentOverBalls([displayBall]);
    } else {
        setCurrentOverBalls(prev => [...prev, displayBall]);
    }
  };

  const handleWicket = () => {
    if (wickets >= 10 || balls >= 120) return;
    setWickets(prev => prev + 1);
    setBalls(prev => prev + 1);
    
    if (currentOverBalls.length >= 6) {
        setCurrentOverBalls(['W']);
    } else {
        setCurrentOverBalls(prev => [...prev, 'W']);
    }
  };

  const handleUndo = () => {
    // Basic mock undo - just removes the last visual ball for demo
    if (currentOverBalls.length > 0) {
      setCurrentOverBalls(prev => prev.slice(0, -1));
    }
  };

  const extraClasses = (type: string) => 
    `flex-1 py-4 rounded-xl font-bold text-sm transition-all border ${
      extraType === type 
        ? 'bg-primary text-white border-primary' 
        : 'bg-card border-white/10 text-gray-400 hover:border-white/30'
    }`;

  const runClasses = (runs: number) => {
      let base = "w-full py-6 rounded-2xl font-black text-2xl sm:text-3xl transition-all shadow-lg border border-white/5 active:scale-95 flex flex-col items-center justify-center ";
      if (runs === 4) return base + "bg-[#0e7490] text-white hover:bg-[#0891b2]";
      if (runs === 6) return base + "bg-[#15803d] text-white hover:bg-[#16a34a]";
      if (runs === 0) return base + "bg-card text-gray-400 hover:bg-white/5";
      return base + "bg-[#1a1a1a] text-white hover:bg-white/10";
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-poppins">
      
      {/* Top Header */}
      <div className="bg-card border-b border-white/10 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <div className="text-center">
          <div className="text-xs text-gray-400 font-bold tracking-wider uppercase">Qualifier 2</div>
          <div className="text-sm font-medium text-white">AA vs SS</div>
        </div>
        <div className="w-10"></div> {/* Spacer for center alignment */}
      </div>

      {/* Main Scoring Area */}
      <div className="flex-1 overflow-y-auto pb-6">
        
        {/* Score Dashboard */}
        <div className="bg-card border-b border-white/5 p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px]"></div>
          
          <div className="text-center relative z-10">
            <h2 className="text-gray-400 font-bold mb-2">Agumbe Avengers</h2>
            <div className="flex justify-center items-baseline gap-2 mb-2">
              <span className="text-6xl sm:text-7xl font-black text-white">{score}</span>
              <span className="text-4xl sm:text-5xl font-black text-primary">/{wickets}</span>
            </div>
            <div className="text-xl font-bold text-gray-300">
              Overs: {getOvers()}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6 relative z-10">
            <div className="bg-[#1a1a1a] p-3 rounded-xl border border-white/5 flex items-center gap-3">
              <div className="bg-primary/20 p-2 rounded-lg"><User className="h-4 w-4 text-primary" /></div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase font-bold">Striker</div>
                <div className="text-sm font-bold text-white">Rahul K.</div>
              </div>
            </div>
            <div className="bg-[#1a1a1a] p-3 rounded-xl border border-white/5 flex items-center gap-3">
              <div className="bg-white/5 p-2 rounded-lg"><User className="h-4 w-4 text-gray-400" /></div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase font-bold">Bowler</div>
                <div className="text-sm font-bold text-white">Vikram S.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Current Over Feed */}
        <div className="px-4 py-4 border-b border-white/5 bg-[#0a0a0a]">
          <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar snap-x max-w-lg mx-auto">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest shrink-0 mr-2">This Over</span>
            {currentOverBalls.map((b, i) => (
              <span 
                key={i} 
                className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center font-bold text-sm shadow-sm snap-end ${
                  b === 'W' ? 'bg-[#991b1b] text-white' :
                  b === '4' ? 'bg-[#0e7490] text-white' :
                  b === '6' ? 'bg-[#15803d] text-white' :
                  'border-2 border-white/10 text-white'
                }`}
              >
                {b}
              </span>
            ))}
            {/* Empty slots */}
            {Array.from({ length: Math.max(0, 6 - currentOverBalls.length) }).map((_, i) => (
              <span key={`empty-${i}`} className="w-10 h-10 shrink-0 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center snap-end"></span>
            ))}
          </div>
        </div>

        {/* Scoring Pad Container */}
        <div className="px-4 py-6 max-w-lg mx-auto w-full">
          
          {/* Extras Row */}
          <div className="flex gap-2 mb-6">
            <button className={extraClasses('wd')} onClick={() => setExtraType(prev => prev === 'wd' ? null : 'wd')}>WD</button>
            <button className={extraClasses('nb')} onClick={() => setExtraType(prev => prev === 'nb' ? null : 'nb')}>NB</button>
            <button className={extraClasses('b')} onClick={() => setExtraType(prev => prev === 'b' ? null : 'b')}>B</button>
            <button className={extraClasses('lb')} onClick={() => setExtraType(prev => prev === 'lb' ? null : 'lb')}>LB</button>
          </div>

          {/* Runs Grid */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <button className={runClasses(0)} onClick={() => handleRun(0)}>0</button>
            <button className={runClasses(1)} onClick={() => handleRun(1)}>1</button>
            <button className={runClasses(2)} onClick={() => handleRun(2)}>2</button>
            <button className={runClasses(3)} onClick={() => handleRun(3)}>3</button>
            <button className={runClasses(4)} onClick={() => handleRun(4)}>4</button>
            <button className={runClasses(6)} onClick={() => handleRun(6)}>6</button>
          </div>

          {/* Actions Row */}
          <div className="grid grid-cols-3 gap-3">
             <button 
                onClick={handleUndo}
                className="col-span-1 bg-card border border-white/10 py-4 rounded-xl flex flex-col items-center justify-center gap-1 hover:bg-white/5 active:scale-95 transition-all text-gray-400"
             >
               <RotateCcw className="h-5 w-5" />
               <span className="text-xs font-bold uppercase">Undo</span>
             </button>
             
             <button 
                onClick={handleWicket}
                className="col-span-2 bg-[#991b1b] py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#b91c1c] active:scale-95 transition-all shadow-[0_0_20px_rgba(153,27,27,0.4)]"
             >
               <ShieldAlert className="h-5 w-5 text-white" />
               <span className="text-lg font-black text-white uppercase tracking-wider">Wicket</span>
             </button>
          </div>

        </div>

      </div>
    </div>
  );
};
