import React from 'react';
import { Vector3 } from 'three';
import * as THREE from 'three';

interface Props {
  castShadow?: boolean;
  color: string;
  scale?: Vector3;
  visible?: boolean;
  position?: Vector3;
  children?: JSX.Element;
}

function SphereMesh({
  castShadow = true,
  visible = true,
  position = new Vector3(0, 0, 0),
  color,
  children,
  scale = new Vector3(1, 1, 1),
}: Props) {
  const material = new THREE.MeshPhongMaterial({ color });

  return (
    <mesh
      scale={scale}
      castShadow={castShadow}
      visible={visible}
      position={position as Vector3}
      material={material}
    >
      <sphereBufferGeometry attach="geometry" />
      {children}
    </mesh>
  );
}

SphereMesh.defaultProps = {
  position: new Vector3(0, 0, 0),
  visible: true,
  scale: new Vector3(1, 1, 1),
  castShadow: true,
  children: null,
};

export default SphereMesh;
