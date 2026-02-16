
import React, { useState } from 'react';
import { useGameStore } from '../hooks/useGameStore';
import { generateRaceFlavorText } from '../services/gemini';

export const StartMenu: React.FC = () => {
  const { setGameState, resetRace } = useGameStore();
  const [flavorText, setFlavorText] = useState("Welcome to the Neo-Velocity League. Prepare for acceleration.");
  const [loadingFlavor, setLoadingFlavor] = useState(false);

  const fetchFlavor = async () => {
    setLoadingFlavor(true);
    try {
      const text = await generateRaceFlavorText();
      setFlavorText(text);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingFlavor(false);
    }
  };

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-sm font-rajdhani">
      <div className="max-w-4xl w-full p-12 flex flex-col md:flex-row gap-12 items-center">
        
        {/* Left Side - Brand & Flavor */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-7xl font-orbitron font-black text-white tracking-tighter italic">
            NEO<br/>
            <span className="text-cyan-500">VELOCITY</span>
          </h1>
          <p className="text-pink-500 font-bold tracking-[0.3em] mt-2 ml-1">AFTERGLOW EDITION</p>
          
          <div className="mt-12 p-6 bg-cyan-950/20 border-l-4 border-cyan-500 text-cyan-200 italic text-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
               <button onClick={fetchFlavor} disabled={loadingFlavor} className="text-xs border border-cyan-500/50 px-2 py-1 rounded">REFRESH INTRO</button>
            </div>
            "{loadingFlavor ? 'Transmitting data from the grid...' : flavorText}"
          </div>
        </div>

        {/* Right Side - Actions */}
        <div className="w-full md:w-80 flex flex-col gap-4">
          <MenuButton 
            onClick={() => resetRace()}
            primary 
            label="QUICK RACE" 
            sub="Standard AI competition" 
          />
          <MenuButton label="TIME TRIAL" sub="Record your best laps" disabled />
          <MenuButton label="CHAMPIONSHIP" sub="Climb the world rankings" disabled />
          <MenuButton label="GARAGE" sub="Customize your hovercraft" disabled />
          <MenuButton label="SETTINGS" sub="Interface & Graphics" />
          
          <div className="mt-8 text-white/40 text-xs uppercase tracking-widest text-center">
            &copy; 2025 Synthetic Circuits Lab
          </div>
        </div>
      </div>
    </div>
  );
};

const MenuButton: React.FC<{ label: string; sub?: string; primary?: boolean; onClick?: () => void; disabled?: boolean }> = ({ 
  label, sub, primary, onClick, disabled 
}) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`
        group relative px-6 py-4 text-left transition-all duration-300
        ${disabled ? 'opacity-30 cursor-not-allowed' : 'hover:translate-x-2'}
        ${primary ? 'bg-cyan-600' : 'bg-white/5 hover:bg-white/10'}
        border-r-4 ${primary ? 'border-white' : 'border-transparent hover:border-cyan-500'}
      `}
    >
      <div className={`text-xl font-orbitron font-bold tracking-widest ${primary ? 'text-white' : 'text-cyan-400 group-hover:text-white'}`}>
        {label}
      </div>
      {sub && <div className="text-[10px] text-white/50 tracking-wider font-medium">{sub}</div>}
      
      {/* Decorative Glitch Effect on hover */}
      {!disabled && (
        <div className="absolute inset-0 border-2 border-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity scale-105 pointer-events-none" />
      )}
    </button>
  );
};
