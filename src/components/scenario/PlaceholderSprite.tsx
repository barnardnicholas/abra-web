import React from 'react';
import { Euler, MeshBasicMaterial, TextureLoader } from 'three';
import useIsSmallScreen from '../hooks/useIsSmallScreen';

interface PlaceholderProps {
  visible: boolean;
}

function PlaceholderSprite({ visible }: PlaceholderProps) {
  const isSmallScreen = useIsSmallScreen();
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
      <planeGeometry attach="geometry" args={isSmallScreen ? [2, 2] : [4, 4]} />
    </mesh>
  );
}

export default PlaceholderSprite;
