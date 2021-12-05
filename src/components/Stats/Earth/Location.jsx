import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export default function Location({
  lat, long, title, origin, setCurrentTitle, setCurrentLat, setCurrentLong,
}) {
  const [hover, setHover] = useState(false);

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

  useEffect(() => {
    document.body.style.cursor = hover ? 'pointer' : 'auto';
  }, [hover]);

  const mesh = useRef();
  const clock1 = new THREE.Clock();

  useFrame(() => {
    let elapsedTime = Math.floor(clock1.getElapsedTime() * (lineLength ** 2));
    if (elapsedTime > 495 || bezierPoints[elapsedTime] === undefined) {
      clock1.start();
    }
    elapsedTime = Math.floor(clock1.getElapsedTime() * (lineLength ** 2));
    mesh.current.position.x = bezierPoints[elapsedTime].x;
    mesh.current.position.y = bezierPoints[elapsedTime].y;
    mesh.current.position.z = bezierPoints[elapsedTime].z;
  });
  return (
    <>
      <mesh
        position={[x, y, z]}
        onClick={() => {
          setCurrentTitle(title);
          setCurrentLat(lat);
          setCurrentLong(long);
        }}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <sphereBufferGeometry attach="geometry" args={[0.3, 32, 32]} />
        <meshStandardMaterial attach="material" color="red" transparent opacity={0.1} />
      </mesh>
      <mesh ref={mesh}>
        <sphereBufferGeometry attach="geometry" args={[0.1, 32, 32]} />
        <meshPhongMaterial attach="material" color="#3bc05e" shininess={100} />
      </mesh>
      <line geometry={lineGeometry} onUpdate={(linear) => linear.computeLineDistances()}>
        <lineBasicMaterial attach="material" color="red" linewidth={1} transparent opacity={0.2} />
      </line>
    </>
  );
}

// declare the prop type for the ListProducts component
Location.propTypes = {
  lat: PropTypes.number.isRequired,
  long: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  origin: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number,
  }).isRequired,
  setCurrentTitle: PropTypes.func.isRequired,
  setCurrentLat: PropTypes.func.isRequired,
  setCurrentLong: PropTypes.func.isRequired,
};
