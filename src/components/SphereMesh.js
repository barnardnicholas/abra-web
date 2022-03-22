import React from "react";
import * as THREE from "three";

const SphereMesh = ({
  color,
  scale,
  children,
  visible = true,
  position = [0, 0, 0],
}) => {
  const material = new THREE.MeshLambertMaterial({ color });
  return (
    <mesh
      castShadow
      scale={scale}
      visible={visible}
      position={position}
      material={material}
    >
      <sphereBufferGeometry attach="geometry" />
      {children}
    </mesh>
  );
};

export default SphereMesh;
