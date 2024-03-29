import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { getMouseDistanceFromCenter } from '../../utils/utils';

const CameraRig = () => {
  const { camera, mouse } = useThree();
  const origin = new THREE.Vector3(0, 0.5, 0);
  const vec = new THREE.Vector3();
  const pZ = 4;
  return useFrame(() => {
    camera.position.lerp(
      vec.set(mouse.x * -1, mouse.y * -1, pZ + -0.2 * getMouseDistanceFromCenter(mouse.x, mouse.y)),
      0.05,
    );
    camera.lookAt(origin);
  });
};

export default CameraRig;
