import React from 'react';
import { useTexture } from '@react-three/drei';

export default function Planet() {
  const [earthMap, displacementMap] = useTexture(['./images/textures/earthmap.jpg', './images/textures/occulantearth.jpg']);

  return (
    <mesh>
      <sphereBufferGeometry attach="geometry" args={[3, 700, 700]} />
      <meshStandardMaterial attach="material" roughness={1} map={earthMap} displacementMap={displacementMap} displacementScale={0.5} />
    </mesh>
  );
}
