import React from 'react';
import { Euler, MeshBasicMaterial, TextureLoader } from 'three';

interface PlaceholderProps {
  visible: boolean;
}

function PlaceholderSprite({ visible }: PlaceholderProps) {
  const loader = new TextureLoader();
  const texture = loader.load('sprites/placeholder.png');
  const material = new MeshBasicMaterial({ map: texture, transparent: true });

  return (
    <mesh
      position={[0, 0.5, 0.25]}
      rotation={new Euler(0, 0, 0)}
      material={material}
      visible={visible}
    >
      <planeGeometry attach="geometry" args={[4, 4]} />
    </mesh>
  );
}

export default PlaceholderSprite;
