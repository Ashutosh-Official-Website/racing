
import React from 'react';
import { useGameStore } from '../hooks/useGameStore';

export const HUD: React.FC = () => {
  const { speed, lap, maxLaps, boost, position, time, setGameState } = useGameStore();

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 font-orbitron text-cyan-400">
      {/* Top Bar */}
      <div className="flex justify-between items-start">
        <div className="bg-black/40 backdrop-blur-md border border-cyan-500/30 p-4 skew-x-[-12deg]">
           <div className="skew-x-[12deg]">
              <div className="text-xs opacity-60">LAP</div>
              <div className="text-3xl font-black">{lap} <span className="text-sm opacity-40">/ {maxLaps}</span></div>
           </div>
        </div>
        
        <div className="text-center">
            <div className="text-4xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
               {time.toFixed(2)}
            </div>
            <div className="text-xs tracking-widest opacity-60">SESSION TIME</div>
        </div>

        <div className="bg-black/40 backdrop-blur-md border border-pink-500/30 p-4 skew-x-[12deg]">
           <div className="skew-x-[-12deg] text-right">
              <div className="text-xs opacity-60">POS</div>
              <div className="text-3xl font-black text-pink-500">{position} <span className="text-sm opacity-40">/ 8</span></div>
           </div>
        </div>
      </div>

      {/* Center - Speed & Boost */}
      <div className="flex flex-col items-center mb-12">
        <div className="relative">
           <svg className="w-64 h-32" viewBox="0 0 200 100">
              <path d="M 20,80 A 80,80 0 0 1 180,80" fill="none" stroke="rgba(0, 242, 255, 0.1)" strokeWidth="8" />
              <path d="M 20,80 A 80,80 0 0 1 180,80" fill="none" stroke="currentColor" strokeWidth="8" 
                    strokeDasharray={`${(speed / 400) * 251}, 1000`} />
           </svg>
           <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
              <div className="text-5xl font-black text-white">{speed}</div>
              <div className="text-xs tracking-tighter opacity-60">KILOMETERS / H</div>
           </div>
        </div>

        <div className="w-80 mt-4 flex flex-col gap-1">
           <div className="flex justify-between text-[10px] tracking-widest px-1">
              <span>BOOST CAPACITY</span>
              <span>{boost}%</span>
           </div>
           <div className="h-2 w-full bg-cyan-950/50 rounded-full overflow-hidden border border-cyan-500/20">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 transition-all duration-300"
                style={{ width: `${boost}%` }}
              />
           </div>
        </div>
      </div>

      {/* Bottom Controls Hint */}
      <div className="absolute bottom-8 left-8 text-[10px] opacity-40 tracking-widest">
         WASD / ARROWS TO STEER & ACCEL <br/> ESC TO PAUSE
      </div>

      <button 
        onClick={() => setGameState('PAUSED')}
        className="absolute top-8 left-1/2 -translate-x-1/2 pointer-events-auto opacity-0"
      >
        Pause
      </button>
    </div>
  );
};
