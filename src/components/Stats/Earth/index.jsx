import {
  React, Suspense, useRef, useState,
} from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Loader } from '@react-three/drei';
import PropTypes from 'prop-types';

import Main from './Main';

// eslint-disable-next-line no-unused-vars
export default function Earth({ products }) {
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentLat, setCurrentLat] = useState(0);
  const [currentLong, setCurrentLong] = useState(0);

  const origin = {
    z: Math.cos(49.2827 * (Math.PI / 180)) * Math.cos((360 - 123.1207) * (Math.PI / 180)) * 3,
    x: Math.cos(49.2827 * (Math.PI / 180)) * Math.sin((360 - 123.1207) * (Math.PI / 180)) * 3,
    y: Math.sin(49.2827 * (Math.PI / 180)) * 3,
  };

  const canvasRef = useRef();

  const fullscreen = () => {
    if (!canvasRef.current.fullscreenElement) {
      canvasRef.current.requestFullscreen();
    } else {
      console.log('leave full screen');
    }
  };

  return (
    <div className="earth-canvas-container" style={{ width: '80vw', height: '80vh' }}>
      <Canvas
        className="earth-canvas"
        camera={{ position: [0, 0, 8] }}
        ref={canvasRef}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 2]} intensity={1} />
          <Main
            origin={origin}
            products={products}
            setCurrentTitle={setCurrentTitle}
            setCurrentLat={setCurrentLat}
            setCurrentLong={setCurrentLong}
          />
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
      <Loader
        containerStyles={{ background: 'white' }}
        barStyles={{
          height: '20px', width: '200px', color: 'green', background: 'green',
        }}
      />
      <div className="globe-products-container">
        <h3>Product Information</h3>
        <h5>
          Label:
          {` ${currentTitle}`}
        </h5>
        <h5>
          Latitude:
          {` ${currentLat}`}
        </h5>
        <h5>
          Longitude:
          {` ${currentLong}`}
        </h5>
        <button className="fullscreen-btn" onClick={fullscreen} type="button">Fullscreen</button>
      </div>
    </div>
  );
}

Earth.propTypes = {
  products: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    long: PropTypes.number.isRequired,
  }).isRequired,
};
