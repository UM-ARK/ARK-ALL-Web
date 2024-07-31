import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three';

export function Cube1() {
  const boxref1 = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime(); // Get the elapsed time

    // Calculate the rotation
    boxref1.current.rotation.y += 0.01;
    boxref1.current.rotation.z += 0.001;
  });

  const textureLoader = new TextureLoader();
  const texture0 = textureLoader.load('/img/icon/Sans Pixels.png');
  const texture1 = textureLoader.load('/img/icon/hot.png');
  const texture2 = textureLoader.load('/img/icon/Christmas.png');
  const texture3 = textureLoader.load('/img/icon/Neon Fantasy.png');
  const texture4 = textureLoader.load('/img/icon/Summer.png');
  const texture5 = textureLoader.load('/img/icon/Spring.png');

  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

      <mesh ref={boxref1} position={[0,0,0]}>
        <boxGeometry args={[3, 3, 3]} />
        <meshBasicMaterial attach="material-0" map={texture0} />
        <meshBasicMaterial attach="material-1" map={texture1} />
        <meshBasicMaterial attach="material-2" map={texture2} />
        <meshBasicMaterial attach="material-3" map={texture3} />
        <meshBasicMaterial attach="material-4" map={texture4} />
        <meshBasicMaterial attach="material-5" map={texture5} />
      </mesh>
    </>
  );
}