import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three';

export function Cube2() {
  const boxref1 = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime(); // Get the elapsed time

    // Calculate the rotation
    boxref1.current.rotation.y += 0.01;
    boxref1.current.rotation.z += 0.001;

  });

  const textureLoader = new TextureLoader();
  const texture0 = textureLoader.load('/img/icon/Pride.png');
  const texture1 = textureLoader.load('/img/icon/Newspaper.png');
  const texture2 = textureLoader.load('/img/icon/Space.png');
  const texture3 = textureLoader.load('/img/icon/VIP.png');
  const texture4 = textureLoader.load('/img/icon/original.png');
  const texture5 = textureLoader.load('/img/icon/中秋.png');

  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={2.45} />
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