
import React, { useState, useEffect } from 'react';
import { GameView } from './components/GameView';
import { StartMenu } from './components/StartMenu';
import { HUD } from './components/HUD';
import { PauseMenu } from './components/PauseMenu';
import { LoadingScreen } from './components/LoadingScreen';
import { useGameStore } from './hooks/useGameStore';

const App: React.FC = () => {
  const { gameState, setGameState } = useGameStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial asset loading
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden select-none">
      {/* 3D Scene Layer */}
      {gameState !== 'START_MENU' && <GameView />}

      {/* UI Overlays */}
      {gameState === 'START_MENU' && <StartMenu />}
      {gameState === 'RACING' && <HUD />}
      {gameState === 'PAUSED' && <PauseMenu />}
      
      {/* Audio Element could be here */}
    </div>
  );
};

export default App;
