import React from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Mesh, Color, DirectionalLight, Object3D, Event, PointLight, SpotLight } from 'three';

interface TestSceneProps {
  visible?: boolean;
  meshColor: Color;
}

type LightType = DirectionalLight | PointLight | SpotLight;

function TestScene({ visible = true, meshColor }: TestSceneProps) {
  console.log(meshColor);
  const gltf = useLoader(GLTFLoader, '/models/test-scene.gltf');
  // console.dir(gltf);
  const lights = gltf.scene.children.filter((child: Object3D<Event>) => {
    const intChild = { ...child } as Record<string, unknown>;
    if (intChild?.isLight) return true;
    return false;
  });
  return (
    <>
      {/* Meshes */}
      {(Object.values(gltf.nodes) as Mesh[]).map((node: Mesh) => {
        return (
          <mesh
            key={`${node.uuid}`}
            position={node.position}
            scale={node.scale}
            rotation={node.rotation}
            geometry={node.geometry}
            material={node.material}
            castShadow
            receiveShadow
            visible={visible}
          />
        );
      })}
      {/* Lights */}
      {(lights as LightType[]).map((light: LightType) => {
        if (light.type === 'DirectionalLight')
          return (
            <directionalLight
              position={light.position}
              scale={light.scale}
              color={light.color}
              rotation={light.rotation}
              intensity={light.intensity / 3000}
              quaternion={light.quaternion}
              castShadow
            />
          );
        if (light.type === 'SpotLight')
          return (
            <spotLight
              position={light.position}
              scale={light.scale}
              color={light.color}
              rotation={light.rotation}
              intensity={light.intensity / 400000}
              quaternion={light.quaternion}
              castShadow
            />
          );
        return null;
      })}
    </>
  );
  return <primitive object={gltf.scene} material castShadow receiveShadow />;
}

TestScene.defaultProps = {
  visible: true,
};

export default TestScene;
