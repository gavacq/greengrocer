import React from 'react';
import PropTypes from 'prop-types';

export default function Location({ lat, long }) {
  const newLat = lat * (Math.PI / 180);
  const newLong = long * (Math.PI / 180);

  const z = Math.cos(newLat) * Math.cos(newLong) * 3;
  const x = Math.cos(newLat) * Math.sin(newLong) * 3;
  const y = Math.sin(newLat) * 3;
  return (
    <mesh position={[x, y, z]}>
      <sphereBufferGeometry attach="geometry" args={[0.1, 32, 32]} />
      <meshBasicMaterial attach="material" color={0xff0000} />
    </mesh>
  );
}

// declare the prop type for the ListProducts component
Location.propTypes = {
  lat: PropTypes.number.isRequired,
  long: PropTypes.number.isRequired,
};
