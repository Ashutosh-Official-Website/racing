
import React from 'react';
import { Float, Text, MeshDistortMaterial } from '@react-three/drei';

export const WorldEnvironment: React.FC = () => {
  return (
    <group>
      {/* Distant Buildings */}
      {Array.from({ length: 40 }).map((_, i) => {
        const angle = (i / 40) * Math.PI * 2;
        const dist = 150 + Math.random() * 100;
        return (
          <Building 
            key={i} 
            position={[Math.cos(angle) * dist, -50, Math.sin(angle) * dist]} 
            height={50 + Math.random() * 100}
            color={i % 3 === 0 ? '#001a33' : '#0d0d0d'}
          />
        );
      })}

      {/* Floating Adverts */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <group position={[20, 30, -50]}>
          <mesh>
             <planeGeometry args={[20, 10]} />
             <meshStandardMaterial emissive="#00f2ff" emissiveIntensity={0.5} transparent opacity={0.3} color="#00f2ff" />
          </mesh>
          <Text
            fontSize={2}
            color="#00f2ff"
            anchorX="center"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/orbitron/v25/yYqxRnd6CQ8G2Ou8jV5_YOnP.woff"
          >
            NEO-VELOCITY
          </Text>
        </group>
      </Float>
    </group>
  );
};

const Building: React.FC<{ position: [number, number, number], height: number, color: string }> = ({ position, height, color }) => {
  return (
    <mesh position={[position[0], height/2 + position[1], position[2]]}>
      <boxGeometry args={[15, height, 15]} />
      <meshStandardMaterial color={color} metalness={0.5} roughness={0.5} />
      {/* Window lights */}
      <mesh position={[0, 0, 7.6]}>
        <planeGeometry args={[10, height - 10]} />
        <meshBasicMaterial color="#0044ff" transparent opacity={0.1} />
      </mesh>
    </mesh>
  );
};
