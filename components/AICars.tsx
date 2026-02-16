
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AICarsProps {
  count: number;
}

export const AICars: React.FC<AICarsProps> = ({ count }) => {
  const cars = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      offset: (i + 1) * (1 / (count + 1)),
      sideOffset: (Math.random() - 0.5) * 4,
      speed: 0.1 + Math.random() * 0.05,
      color: i % 2 === 0 ? '#ff0055' : '#7700ff'
    }));
  }, [count]);

  return (
    <>
      {cars.map((car) => (
        <AICar key={car.id} {...car} />
      ))}
    </>
  );
};

const AICar: React.FC<{ offset: number; sideOffset: number; speed: number; color: string }> = ({ offset, sideOffset, speed, color }) => {
  const ref = useRef<THREE.Group>(null);
  const progress = useRef(offset);

  // Reuse track logic or simplified pathing
  const radius = 100;

  useFrame((state, delta) => {
    if (!ref.current) return;
    
    progress.current += speed * delta;
    if (progress.current > 1) progress.current = 0;

    const angle = progress.current * Math.PI * 2;
    const x = Math.cos(angle) * radius + Math.sin(angle * 3) * 10;
    const y = Math.sin(angle * 2) * 5 + 0.5;
    const z = Math.sin(angle) * radius;

    ref.current.position.set(x, y, z);
    
    // Simple look-ahead for rotation
    const nextAngle = (progress.current + 0.01) * Math.PI * 2;
    const nx = Math.cos(nextAngle) * radius + Math.sin(nextAngle * 3) * 10;
    const ny = Math.sin(nextAngle * 2) * 5 + 0.5;
    const nz = Math.sin(nextAngle) * radius;
    
    ref.current.lookAt(nx, ny, nz);
    ref.current.translateX(sideOffset);
  });

  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[1.2, 0.4, 2.5]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, -1.2]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
};
