
import { create } from 'zustand';

export type GameState = 'START_MENU' | 'LOADING' | 'RACING' | 'PAUSED' | 'FINISHED';

interface GameStore {
  gameState: GameState;
  score: number;
  lap: number;
  maxLaps: number;
  speed: number;
  boost: number;
  position: number;
  totalParticipants: number;
  time: number;
  bestTime: number;
  
  setGameState: (state: GameState) => void;
  updateRaceStats: (stats: Partial<Pick<GameStore, 'lap' | 'speed' | 'boost' | 'position' | 'time'>>) => void;
  resetRace: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  gameState: 'START_MENU',
  score: 0,
  lap: 1,
  maxLaps: 3,
  speed: 0,
  boost: 100,
  position: 1,
  totalParticipants: 8,
  time: 0,
  bestTime: 0,

  setGameState: (state) => set({ gameState: state }),
  updateRaceStats: (stats) => set((state) => ({ ...state, ...stats })),
  resetRace: () => set({
    lap: 1,
    speed: 0,
    boost: 100,
    position: 1,
    time: 0,
    gameState: 'RACING'
  }),
}));
