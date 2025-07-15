'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointsMaterial, BufferGeometry, BufferAttribute } from 'three';
import * as THREE from 'three';

interface ParticleSystemProps {
  count?: number;
  mousePosition?: { x: number; y: number };
}

export default function ParticleSystem({ count = 5000, mousePosition }: ParticleSystemProps) {
  const mesh = useRef<Points>(null);
  const materialRef = useRef<PointsMaterial>(null);

  // Generate particle positions
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      // Create gradient colors
      const color = new THREE.Color();
      color.setHSL(0.6 + Math.random() * 0.2, 0.7, 0.5 + Math.random() * 0.3);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return { positions, colors };
  }, [count]);

  // Animation loop
  useFrame((state) => {
    if (mesh.current) {
      const time = state.clock.getElapsedTime();
      const positions = mesh.current.geometry.attributes.position.array as Float32Array;
      
      // Animate particles
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        // Sine wave motion
        positions[i3] += Math.sin(time + i * 0.01) * 0.001;
        positions[i3 + 1] += Math.cos(time + i * 0.01) * 0.001;
        positions[i3 + 2] += Math.sin(time + i * 0.005) * 0.001;
        
        // Mouse interaction
        if (mousePosition) {
          const dx = mousePosition.x - positions[i3];
          const dy = mousePosition.y - positions[i3 + 1];
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 2) {
            positions[i3] += dx * 0.0001;
            positions[i3 + 1] += dy * 0.0001;
          }
        }
      }
      
      mesh.current.geometry.attributes.position.needsUpdate = true;
      
      // Rotate the entire system slowly
      mesh.current.rotation.x = time * 0.05;
      mesh.current.rotation.y = time * 0.02;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particlePositions.positions}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={particlePositions.colors}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.05}
        vertexColors
        blending={THREE.AdditiveBlending}
        transparent
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
} 