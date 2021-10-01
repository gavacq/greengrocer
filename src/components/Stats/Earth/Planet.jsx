import React from 'react';
import { useTexture } from '@react-three/drei';

export default function Planet() {
  const [earthMap, displacementMap] = useTexture(['./images/textures/earthmap.jpg', './images/textures/occulantearth.jpg']);

  return (
    <mesh rotation={[0, (-Math.PI / 2), 0]}>
      <sphereBufferGeometry attach="geometry" args={[3, 700, 700]} />
      <meshStandardMaterial attach="material" roughness={1} map={earthMap} displacementMap={displacementMap} displacementScale={0.2} transparent opacity={0.2} />
    </mesh>
  );
}
