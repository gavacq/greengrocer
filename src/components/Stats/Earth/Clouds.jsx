/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
import { React, useRef } from 'react';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function Planet() {
  const mesh = useRef();
  const cloudsTransparency = useTexture('./images/textures/fairweather.jpeg');

  useFrame(() => {
    mesh.current.rotation.x += 0.0005;
    mesh.current.rotation.y += 0.0008;
  });

  return (
    <mesh ref={mesh}>
      <sphereBufferGeometry attach="geometry" args={[3.05, 700, 700]} />
      <meshStandardMaterial attach="material" color={0xffffff} transparent alphaMap={cloudsTransparency} />
    </mesh>
  );
}
