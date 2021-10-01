import { React, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import Planet from './Planet';
import Clouds from './Clouds';
import Location from './Location';

export default function Earth() {
  const origin = {
    z: Math.cos(49.2827 * (Math.PI / 180)) * Math.cos((360 - 123.1207) * (Math.PI / 180)) * 3,
    x: Math.cos(49.2827 * (Math.PI / 180)) * Math.sin((360 - 123.1207) * (Math.PI / 180)) * 3,
    y: Math.sin(49.2827 * (Math.PI / 180)) * 3,
  };
  return (
    <div style={{ width: '100vw', height: '90vh' }}>
      <Canvas>
        <ambientLight intensity={0.8} />
        <Suspense fallback={null}>
          <Planet />
          <Clouds />
          <Location lat={0} long={0} origin={origin} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
