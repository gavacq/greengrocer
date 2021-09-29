import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {
  React, useEffect, useRef, useState,
} from 'react';

export default function Earth() {
  const [reference, setReference] = useState(true);
  const mountRef = useRef(null);

  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  // SCENE
  const scene = new THREE.Scene();

  // TEXTURES
  const textureLoader = new THREE.TextureLoader();

  const earthTexture = textureLoader.load('./images/textures/earthmap.jpg');
  const earthDisplacement = textureLoader.load('./images/textures/occulantearth.jpg');
  const earthAmbient = textureLoader.load('./images/textures/occulantearth.jpg');

  const cloudsTreansparency = textureLoader.load('./images/textures/fairweather.jpeg');

  const clouds = new THREE.Mesh(
    new THREE.SphereGeometry(3.05, 700, 700),
    new THREE.MeshStandardMaterial({
      transparent: true,
      color: 0xffffff,
      alphaMap: cloudsTreansparency,
    }),
  );
  clouds.castShadow = true;

  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(3, 700, 700),
    new THREE.MeshStandardMaterial({
      normalMap: earthAmbient,
      displacementMap: earthDisplacement,
      displacementScale: 0.2,
      map: earthTexture,
    }),
  );
  earth.rotation.y = -Math.PI / 2;
  earth.recieveShadow = true;

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  const moonLight1 = new THREE.DirectionalLight('#ffffff', 0.3);
  moonLight1.position.set(4, 5, 5);

  const moonLight2 = new THREE.DirectionalLight('#ffffff', 0.3);
  moonLight2.position.set(-4, -5, -5);

  const moonLight3 = new THREE.DirectionalLight('#ffffff', 0.3);
  moonLight3.position.set(-4, -5, 5);

  const moonLight4 = new THREE.DirectionalLight('#ffffff', 0.3);
  moonLight4.position.set(4, -5, 5);

  const newPoint = (lat, long) => {
    const z = Math.cos(lat) * Math.cos(long) * 3;
    const x = Math.cos(lat) * Math.sin(long) * 3;
    const y = Math.sin(lat) * 3;

    const point = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xff0000 }),
    );

    // MOTION FOR POINT TO ORIGIN
    // NEED SOLUTION FOR PARABOLIC PATH

    point.position.x = x;
    point.position.y = y;
    point.position.z = z;

    return point;
  };

  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100,
  );
  camera.position.z = 8;

  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const myAnimation = (callback) => {
    requestAnimationFrame(callback);
  };

  const clock = new THREE.Clock();

  const tick = () => {
    if (!reference) {
      console.log('!!!!!!!!!THIS IS THE REFEREENCE');
      return;
    }
    myAnimation(tick);
    const elapsedTime = clock.getElapsedTime();

    //   // Update controls
    //   controls.update();

    clouds.rotation.y = elapsedTime / 40;
    clouds.rotation.x = Math.sin(elapsedTime / 30);

    // MOTION FOR LOCATION POINTS

    // for (const point of points) {
    //     point.position.x = point.position.x * Math.sin(elapsedTime / 10)
    //     point.position.y = point.position.y * Math.sin(elapsedTime / 10)
    //     point.position.z = point.position.z * Math.sin(elapsedTime / 10)
    // }
    console.log('hello');

    // Render
    renderer.render(scene, camera);
  };

  const paris = {
    lat: 48.8566 * (Math.PI / 180),
    long: 2.3522 * (Math.PI / 180),
  };
  const vancouver = {
    lat: 49.2827 * (Math.PI / 180),
    long: (360 - 123.1207) * (Math.PI / 180),
  };
  const rio = {
    lat: -22.9068 * (Math.PI / 180),
    long: (360 - 43.1729) * (Math.PI / 180),
  };
  const dehli = {
    lat: 28.6139 * (Math.PI / 180),
    long: 77.2090 * (Math.PI / 180),
  };

  useEffect(() => {
    /**
 * EARTH
 */
    scene.add(earth);

    // CLOUDS
    scene.add(clouds);

    // const globalZ = Math.cos(vancouver.lat) * Math.cos(vancouver.long) * 3;
    // const globalX = Math.cos(vancouver.lat) * Math.sin(vancouver.long) * 3;
    // const globalY = Math.sin(vancouver.lat) * 3;
    const points = [];

    points.push(newPoint(paris.lat, paris.long));
    points.push(newPoint(vancouver.lat, vancouver.long));
    points.push(newPoint(rio.lat, rio.long));
    points.push(newPoint(dehli.lat, dehli.long));

    // eslint-disable-next-line no-restricted-syntax
    for (const point of points) {
      scene.add(point);
    }

    /**
 * Lights
 */

    scene.add(moonLight1, moonLight2, moonLight3, moonLight4);

    /**
 * Sizes
 */

    /**
 * Camera
 */
    // Base camera
    scene.add(camera);

    /**
 * Renderer
 */
    mountRef.current.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    /**
 * Animate
 */

    window.addEventListener('resize', () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    tick();

    return () => {
      setReference(false);
      cancelAnimationFrame(myAnimation);
    };
  }, []);

  // if (!mountRef.current) {
  //   return null;
  // }
  // eslint-disable-next-line react/self-closing-comp
  return <div ref={mountRef}></div>;
}
