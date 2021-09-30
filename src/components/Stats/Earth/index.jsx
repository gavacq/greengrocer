import { React, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import Planet from './Planet';
import Clouds from './Clouds';
import Location from './Location';

export default function Earth() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas>
        <ambientLight intensity={0.8} />
        <Suspense fallback={null}>
          <Planet />
          <Clouds />
          <Location lat={49.2827} long={(360 - 123.1207)} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
