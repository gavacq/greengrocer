/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
import { React, useUpdate } from 'react';
import * as THREE from 'three';

export default function Bezier() {
  const curve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(-10, 0, 0),
    new THREE.Vector3(20, 15, 0),
    new THREE.Vector3(10, 0, 0),
  );
  const points = curve.getPoints(50);
  const ref = useUpdate((geometry) => {
    geometry.setFromPoints(points);
  }, []);
  return (
    <line>
      <bufferGeometry attach="geometry" ref={ref} />
      <lineBasicMaterial attach="material" color={0xff0000} />
    </line>
  );
}
