import React, { Fragment } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {
  Mesh,
  Color,
  DirectionalLight,
  Object3D,
  Event,
  PointLight,
  SpotLight,
  MeshToonMaterial,
  NearestFilter,
  Vector2,
  MeshBasicMaterial,
  WireframeGeometry,
  LineBasicMaterial,
  LineSegments,
  EdgesGeometry,
  BufferGeometry,
  RepeatWrapping,
} from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

interface TestSceneProps {
  visible?: boolean;
  meshColor: Color;
  isDarkBackground: boolean;
}

type LightType = DirectionalLight | PointLight | SpotLight;

function TestScene({ visible = true, meshColor, isDarkBackground }: TestSceneProps) {
  console.log(isDarkBackground);
  const gltf = useLoader(GLTFLoader, '/models/city.gltf');
  console.dir(gltf);
  const texture = useLoader(TextureLoader, '/sprites/grid.png');
  texture.repeat = new Vector2(80, 80);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;
  console.log(texture);
  const threeTone = useLoader(TextureLoader, '/sprites/threetone.png');
  threeTone.minFilter = NearestFilter;
  threeTone.magFilter = NearestFilter;

  // const material = new MeshToonMaterial({
  //   color: '#999999',
  //   transparent: true,
  //   opacity: 0.5,
  //   // depthTest: true,
  //   // depthWrite: true,
  //   alphaMap: texture,
  //   gradientMap: threeTone,
  // });
  const material = new MeshBasicMaterial({
    color: '#888888',
    transparent: true,
    opacity: 0.9,
    // depthTest: true,
    // depthWrite: true,
    // alphaMap: texture,
    map: texture,
  });
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
          <React.Fragment key={`${node.uuid}`}>
            <mesh
              key={`${node.uuid}`}
              position={node.position}
              scale={node.scale}
              rotation={node.rotation}
              geometry={node.geometry}
              material={material}
              castShadow
              receiveShadow
              visible={visible}
            />
            <lineSegments
              position={node.position}
              scale={node.scale}
              visible={visible}
              rotation={node.rotation}
              args={[new EdgesGeometry(node.geometry), new LineBasicMaterial({ color: meshColor })]}
            />
          </React.Fragment>
        );
      })}
      {/* Lights */}
      {(lights as LightType[]).map((light: LightType) => {
        if (light.type === 'DirectionalLight')
          return (
            <directionalLight
              key={`${light.uuid}`}
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
              key={`${light.uuid}`}
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
      {/* Fog */}
      {/* <fog attach="fog" args={[isDarkBackground ? '#272730' : '#f7f7f7', 10, 40]} /> */}
    </>
  );
  return <primitive object={gltf.scene} material castShadow receiveShadow />;
}

TestScene.defaultProps = {
  visible: true,
};

export default TestScene;
