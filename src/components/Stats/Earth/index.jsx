/* eslint-disable react/require-default-props */
import { React, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import Planet from './Planet';
import Clouds from './Clouds';
import Location from './Location';

import { listType } from '../../../types';

// eslint-disable-next-line no-unused-vars
export default function Earth({ products }) {
  const origin = {
    z: Math.cos(49.2827 * (Math.PI / 180)) * Math.cos((360 - 123.1207) * (Math.PI / 180)) * 3,
    x: Math.cos(49.2827 * (Math.PI / 180)) * Math.sin((360 - 123.1207) * (Math.PI / 180)) * 3,
    y: Math.sin(49.2827 * (Math.PI / 180)) * 3,
  };

  const mappedLocations = products.map((product) => (
    <Location lat={product.lat} long={product.long} origin={origin} />
  ));

  return (
    <div style={{ width: '100vw', height: '90vh' }}>
      <Canvas>
        <ambientLight intensity={0.8} />
        <Suspense fallback={null}>
          <Planet />
          <Clouds />
          {mappedLocations}
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

Earth.propTypes = {
  products: listType,

};
