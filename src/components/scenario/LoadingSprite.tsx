import React, { useRef } from 'react';
import { TextureLoader } from 'three';
import * as THREE from 'three';

const LoadingSprite: React.FC = () => {
  const spriteRef = useRef<THREE.Sprite>(null);
  const loader = new TextureLoader();
  const texture = loader.load('sprites/loading.gif');

  return (
    <sprite position={[0, 0, 0]} ref={spriteRef}>
      <spriteMaterial attach="material" map={texture} />
    </sprite>
  );
};

export default LoadingSprite;
