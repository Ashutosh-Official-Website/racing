
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Track } from './Track';
import { HoverCar } from './HoverCar';
import { AICars } from './AICars';
import { WorldEnvironment } from './WorldEnvironment';
import { useGameStore } from '../hooks/useGameStore';

export const GameView: React.FC = () => {
  const gameState = useGameStore((state) => state.gameState);

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        shadows
        gl={{ antialias: true, stencil: false, depth: true }}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 5, 12]} fov={75} />
          
          {/* Lighting */}
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 20, 10]} intensity={1.5} color="#00f2ff" />
          <spotLight position={[0, 50, 0]} angle={0.3} penumbra={1} intensity={2} castShadow color="#ff00ff" />
          
          {/* Environment */}
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <WorldEnvironment />
          
          {/* Game Entities */}
          <Track />
          <HoverCar />
          <AICars count={6} />

          {/* Post Processing */}
          <EffectComposer>
            <Bloom 
              luminanceThreshold={1.2} 
              mipmapBlur 
              intensity={0.8} 
              radius={0.4}
            />
          </EffectComposer>

          {gameState === 'START_MENU' && <OrbitControls autoRotate />}
        </Suspense>
      </Canvas>
    </div>
  );
};
