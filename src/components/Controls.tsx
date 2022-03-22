import React, { useRef } from "react";
import { extend, useThree, useFrame, ReactThreeFiber } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
import { Vector3 } from "three";

extend({ OrbitControls });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Object3DNode<
        OrbitControls,
        typeof OrbitControls
      >;
    }
  }
}

const Controls: React.FC = () => {
  const { camera, gl } = useThree();
  const ref = useRef<OrbitControls>(null!);
  const position = new THREE.Vector3(0, 0, 0);

  useFrame(() => ref.current.update());

  return (
    <orbitControls
      ref={ref}
      target={position}
      enableDamping
      args={[camera, gl.domElement]}
    />
  );
};

// interface Props {}

export default Controls;
