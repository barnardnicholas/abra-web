import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const CameraRig = () => {
  const { camera, mouse } = useThree();
  const origin = new THREE.Vector3();
  const vec = new THREE.Vector3();
  return useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 1, mouse.y * 1, camera.position.z), 0.05);
    camera.lookAt(origin);
  });
};

export default CameraRig;
