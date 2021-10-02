import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export default function Location({ lat, long, origin }) {
  // POINT LOCATION MATHS
  const newLat = lat * (Math.PI / 180);
  const newLong = long * (Math.PI / 180);

  const z = Math.cos(newLat) * Math.cos(newLong) * 3;
  const x = Math.cos(newLat) * Math.sin(newLong) * 3;
  const y = Math.sin(newLat) * 3;

  // BEZIER CURVE BETWEEN POINT AND ORIGIN
  const line = new THREE.LineCurve3(
    new THREE.Vector3(x, y, z),
    new THREE.Vector3(origin.x, origin.y, origin.z),
  );
  const linePoints = line.getPoints(3);
  const lineLength = line.getLength() * 0.9;

  const bezier = new THREE.CubicBezierCurve3(
    linePoints[0],
    new THREE.Vector3(
      linePoints[1].x * lineLength,
      linePoints[1].y * lineLength,
      linePoints[1].z * lineLength,
    ),
    new THREE.Vector3(
      linePoints[2].x * lineLength,
      linePoints[2].y * lineLength,
      linePoints[2].z * lineLength,
    ),
    origin,
  );
  const bezierPoints = bezier.getPoints(500);
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(bezierPoints);

  const mesh = useRef();
  let clock1 = new THREE.Clock();

  useFrame(() => {
    const elapsedTime = Math.floor(clock1.getElapsedTime() * (lineLength ** 2));
    if (elapsedTime > 499) {
      clock1 = new THREE.Clock();
    }

    mesh.current.position.x = bezierPoints[elapsedTime].x;
    mesh.current.position.y = bezierPoints[elapsedTime].y;
    mesh.current.position.z = bezierPoints[elapsedTime].z;
  });
  return (
    <>
      <mesh ref={mesh}>
        <sphereBufferGeometry attach="geometry" args={[0.1, 32, 32]} />
        <meshPhongMaterial attach="material" color="#3bc05e" shininess={100} />
      </mesh>
      <line geometry={lineGeometry}>
        <lineBasicMaterial attach="material" color="#9c88ff" linewidth={100} />
      </line>
    </>
  );
}

// declare the prop type for the ListProducts component
Location.propTypes = {
  lat: PropTypes.number.isRequired,
  long: PropTypes.number.isRequired,
  // eslint-disable-next-line react/require-default-props
  origin: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number,
  }),
};
