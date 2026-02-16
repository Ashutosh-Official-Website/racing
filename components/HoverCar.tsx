
import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Box, Trail, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useGameStore } from '../hooks/useGameStore';

export const HoverCar: React.FC = () => {
  const carRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const updateRaceStats = useGameStore((state) => state.updateRaceStats);
  const gameState = useGameStore((state) => state.gameState);

  // Movement State
  const velocity = useRef(new THREE.Vector3());
  const rotation = useRef(new THREE.Euler(0, 0, 0));
  const [keys, setKeys] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleDown = (e: KeyboardEvent) => setKeys(prev => ({ ...prev, [e.code]: true }));
    const handleUp = (e: KeyboardEvent) => setKeys(prev => ({ ...prev, [e.code]: false }));
    window.addEventListener('keydown', handleDown);
    window.addEventListener('keyup', handleUp);
    return () => {
      window.removeEventListener('keydown', handleDown);
      window.removeEventListener('keyup', handleUp);
    };
  }, []);

  useFrame((state, delta) => {
    if (gameState !== 'RACING' || !carRef.current) return;

    // Acceleration & Braking
    const accel = keys['ArrowUp'] || keys['KeyW'] ? 40 : 0;
    const brake = keys['ArrowDown'] || keys['KeyS'] ? -30 : 0;
    const drag = -velocity.current.z * 0.9;
    
    velocity.current.z += (accel + brake + drag) * delta;
    
    // Steering
    const steerDir = (keys['ArrowLeft'] || keys['KeyA'] ? 1 : 0) - (keys['ArrowRight'] || keys['KeyD'] ? 1 : 0);
    carRef.current.rotation.y += steerDir * 2.5 * delta;
    
    // Tilt effect
    carRef.current.rotation.z = THREE.MathUtils.lerp(carRef.current.rotation.z, steerDir * 0.2, 0.1);

    // Apply Velocity
    const direction = new THREE.Vector3(0, 0, 1).applyEuler(carRef.current.rotation);
    carRef.current.position.addScaledVector(direction, velocity.current.z * delta);

    // Update Store
    updateRaceStats({ 
      speed: Math.abs(Math.round(velocity.current.z * 10)),
      time: state.clock.getElapsedTime()
    });

    // Camera follow
    const idealOffset = new THREE.Vector3(0, 2.5, -6).applyEuler(carRef.current.rotation);
    const idealLookat = new THREE.Vector3(0, 1, 5).applyEuler(carRef.current.rotation);
    
    camera.position.lerp(carRef.current.position.clone().add(idealOffset), 0.1);
    camera.lookAt(carRef.current.position.clone().add(idealLookat));
  });

  return (
    <group ref={carRef} position={[0, 0.5, 0]}>
      {/* Car Body */}
      <mesh castShadow>
        <boxGeometry args={[1.5, 0.5, 3]} />
        <meshStandardMaterial color="#222" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Cockpit */}
      <mesh position={[0, 0.4, 0.3]}>
        <boxGeometry args={[0.8, 0.4, 1.2]} />
        <meshStandardMaterial color="#00f2ff" transparent opacity={0.6} emissive="#00f2ff" emissiveIntensity={0.5} />
      </mesh>

      {/* Glow Rails */}
      <mesh position={[0.7, -0.2, 0]}>
        <boxGeometry args={[0.1, 0.1, 3.2]} />
        <meshStandardMaterial emissive="#ff00ff" emissiveIntensity={2} />
      </mesh>
      <mesh position={[-0.7, -0.2, 0]}>
        <boxGeometry args={[0.1, 0.1, 3.2]} />
        <meshStandardMaterial emissive="#ff00ff" emissiveIntensity={2} />
      </mesh>

      {/* Thrusters */}
      <group position={[0, 0, -1.6]}>
         <Trail width={1} length={4} color={new THREE.Color('#00f2ff')} attenuation={(t) => t}>
            <mesh>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshBasicMaterial color="#00f2ff" />
            </mesh>
         </Trail>
      </group>
    </group>
  );
};
