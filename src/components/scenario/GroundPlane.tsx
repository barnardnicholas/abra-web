import React from "react";
import { MeshLambertMaterial, Euler } from "three";

interface GroundPlaneProps {
  visible?: boolean
}

const GroundPlane: React.FC<GroundPlaneProps> = ({ visible = true }) => {
  const planeMaterial = new MeshLambertMaterial({ color: "blue" });

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
};

export default GroundPlane;
