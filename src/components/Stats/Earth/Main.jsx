import { React } from 'react';
// import { useFrame } from '@react-three/fiber';
import PropTypes from 'prop-types';

import Planet from './Planet';
import Clouds from './Clouds';
import Location from './Location';

export default function Main({
  products, origin, setCurrentTitle, setCurrentLat, setCurrentLong,
}) {
  const mappedLocations = products.map((product, i) => (
    <Location
      lat={product.lat}
      long={product.long}
      origin={origin}
      title={product.title}
      // eslint-disable-next-line react/no-array-index-key
      key={i}
      setCurrentTitle={setCurrentTitle}
      setCurrentLat={setCurrentLat}
      setCurrentLong={setCurrentLong}
    />
  ));

  // const group = useRef();
  // useFrame(() => {
  //   group.current.rotation.y += 0.003;
  // });
  return (
    <group position={[0, -1, 0]}>
      <Planet />
      <Clouds />
      {mappedLocations}
    </group>
  );
}

Main.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    lat: PropTypes.number.isRequired,
    long: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  origin: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    z: PropTypes.number.isRequired,
  }).isRequired,
  setCurrentTitle: PropTypes.func.isRequired,
  setCurrentLat: PropTypes.func.isRequired,
  setCurrentLong: PropTypes.func.isRequired,
};
