/* eslint-disable react/require-default-props */
<<<<<<< HEAD
import {
  React, Suspense,
} from 'react';
=======
import { React, Suspense } from 'react';
>>>>>>> ed2a2e9965a0864a0af034865970465830530b47
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import Main from './Main';

import { listType } from '../../../types';

// eslint-disable-next-line no-unused-vars
export default function Earth({ products }) {
  const origin = {
    z: Math.cos(49.2827 * (Math.PI / 180)) * Math.cos((360 - 123.1207) * (Math.PI / 180)) * 3,
    x: Math.cos(49.2827 * (Math.PI / 180)) * Math.sin((360 - 123.1207) * (Math.PI / 180)) * 3,
    y: Math.sin(49.2827 * (Math.PI / 180)) * 3,
  };

<<<<<<< HEAD
  return (
    <div style={{ width: '50vw', height: '90vh' }}>
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.8} />
        <Suspense fallback={null}>
          <Main origin={origin} products={products} />
=======
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
>>>>>>> ed2a2e9965a0864a0af034865970465830530b47
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}

Earth.propTypes = {
  products: listType,
<<<<<<< HEAD
=======

>>>>>>> ed2a2e9965a0864a0af034865970465830530b47
};
