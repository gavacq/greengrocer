import { React, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import Planet from './Planet';
import Clouds from './Clouds';

export default function Earth() {
  return (
    <Canvas>
      <ambientLight intensity={0.8} />
      <Suspense fallback={null}>
        <Planet />
        <Clouds />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}
