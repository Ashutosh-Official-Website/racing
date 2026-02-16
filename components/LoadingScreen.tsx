
import React from 'react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center font-orbitron">
      <div className="relative">
        <div className="text-4xl font-black text-white tracking-widest animate-pulse">
          LOADING <span className="text-cyan-500">SYSTEMS</span>
        </div>
        <div className="absolute -bottom-4 left-0 w-full h-1 bg-white/10 overflow-hidden">
          <div className="h-full bg-cyan-500 animate-[loading_2s_ease-in-out_infinite]" />
        </div>
      </div>
      <div className="mt-8 text-xs text-white/30 tracking-[0.5em] uppercase">
        Initializing Neural Link ...
      </div>

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};
