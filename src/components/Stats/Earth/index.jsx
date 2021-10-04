import { React, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Loader } from '@react-three/drei';
import PropTypes from 'prop-types';

import Main from './Main';

// eslint-disable-next-line no-unused-vars
export default function Earth({ products }) {
  const origin = {
    z: Math.cos(49.2827 * (Math.PI / 180)) * Math.cos((360 - 123.1207) * (Math.PI / 180)) * 3,
    x: Math.cos(49.2827 * (Math.PI / 180)) * Math.sin((360 - 123.1207) * (Math.PI / 180)) * 3,
    y: Math.sin(49.2827 * (Math.PI / 180)) * 3,
  };

  return (
    <div className="earth-canvas-container" style={{ width: '80vw', height: '80vh' }}>
      <Canvas className="earth-canvas" camera={{ position: [0, 0, 10] }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 2]} intensity={1} />
          <Main origin={origin} products={products} />
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
      <Loader />
    </div>
  );
}

Earth.propTypes = {
  products: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    long: PropTypes.number.isRequired,
  }).isRequired,
};
