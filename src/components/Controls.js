import React, { useRef } from "react";
import { extend, useThree, useFrame } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls });

const Controls = () => {
  const { camera, gl } = useThree();
  const ref = useRef();
  useFrame(() => ref.current.update());
  return (
    <orbitControls
      ref={ref}
      target={[0, 0, 0]}
      enableDamping
      args={[camera, gl.domElement]}
    />
  );
};

export default Controls;
