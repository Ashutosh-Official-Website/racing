
import React from 'react';
import { useGameStore } from '../hooks/useGameStore';

export const PauseMenu: React.FC = () => {
  const { setGameState, resetRace } = useGameStore();

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-lg">
      <div className="text-center">
        <h2 className="text-6xl font-orbitron font-black text-white mb-12 tracking-widest">PAUSED</h2>
        
        <div className="flex flex-col gap-6 items-center">
          <button 
            onClick={() => setGameState('RACING')}
            className="w-64 py-4 bg-cyan-600 text-white font-bold tracking-widest hover:bg-cyan-500 transition-colors"
          >
            RESUME
          </button>
          
          <button 
            onClick={() => resetRace()}
            className="w-64 py-4 border border-white/20 text-white font-bold tracking-widest hover:bg-white/10 transition-colors"
          >
            RESTART
          </button>
          
          <button 
            onClick={() => setGameState('START_MENU')}
            className="w-64 py-4 border border-red-500/50 text-red-500 font-bold tracking-widest hover:bg-red-500/10 transition-colors"
          >
            QUIT TO MENU
          </button>
        </div>
      </div>
    </div>
  );
};
