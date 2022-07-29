import React from 'react';
import { MeshPhongMaterial, Euler } from 'three';

interface GroundPlaneProps {
  visible?: boolean;
}

function GroundPlane({ visible = true }: GroundPlaneProps) {
  const planeMaterial = new MeshPhongMaterial({ color: 'blue' });

  return (
    <mesh
      receiveShadow
      castShadow
      position={[0, -2, 0]}
      rotation={new Euler((Math.PI / 2) * -1, 0, 0)}
      material={planeMaterial}
      visible={visible}
    >
      <planeGeometry attach="geometry" args={[15, 15]} />
    </mesh>
  );
}

GroundPlane.defaultProps = {
  visible: true,
};

export default GroundPlane;
