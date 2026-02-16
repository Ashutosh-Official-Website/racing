
import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export const Track: React.FC = () => {
  // Create a large loop track
  const trackPath = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const radius = 100;
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      points.push(new THREE.Vector3(
        Math.cos(angle) * radius + Math.sin(angle * 3) * 10,
        Math.sin(angle * 2) * 5,
        Math.sin(angle) * radius
      ));
    }
    return new THREE.CatmullRomCurve3(points);
  }, []);

  const tubeArgs = [trackPath, 100, 6, 8, true] as const;

  return (
    <group>
      {/* Main Track Surface */}
      <mesh receiveShadow position={[0, -1, 0]}>
        <tubeGeometry args={tubeArgs} />
        <meshStandardMaterial 
          color="#111" 
          roughness={0.2} 
          metalness={0.8}
          wireframe={false}
        />
      </mesh>

      {/* Neon Borders */}
      <mesh position={[0, -1, 0]}>
        <tubeGeometry args={[trackPath, 100, 6.2, 8, true]} />
        <meshStandardMaterial 
          color="#00f2ff" 
          emissive="#00f2ff" 
          emissiveIntensity={2} 
          wireframe 
          transparent 
          opacity={0.3} 
        />
      </mesh>

      {/* Floating Rings */}
      {Array.from({ length: 20 }).map((_, i) => (
        <TrackRing key={i} position={trackPath.getPoint(i / 20)} rotation={new THREE.Euler().setFromQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), trackPath.getTangent(i / 20)))} />
      ))}
    </group>
  );
};

const TrackRing: React.FC<{ position: THREE.Vector3, rotation: THREE.Euler }> = ({ position, rotation }) => {
  return (
    <mesh position={position} rotation={rotation}>
      <torusGeometry args={[8, 0.1, 16, 50]} />
      <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={5} />
    </mesh>
  );
};
