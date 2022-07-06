import React, { Suspense } from 'react';
import { Canvas as ThreeCanvas, useLoader } from '@react-three/fiber';
import Controls from './Controls';
import { Vector3, MeshLambertMaterial } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const sphereScale = new Vector3(0.25, 0.25, 0.25);
const modelScale = new Vector3(2, 2, 2);

const CanvasContent = () => {
    const gltf = useLoader(GLTFLoader, '/models/mossy-rocks/scene.gltf');
    console.log(gltf);

    return (
        <>
            <color attach="background" args={['#f2f2f2']} />
            <fog attach="fog" args={['#f2f2f2', 1, 8]} />
            <ambientLight />
            <spotLight
                castShadow
                intensity={8}
                angle={Math.PI / 10}
                position={[10, 10, 10]}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />
            <mesh
                position={new Vector3(0, 0.5, 0)}
                scale={sphereScale}
                material={new MeshLambertMaterial({ color: 'purple' })}
                castShadow
                receiveShadow
            >
                <sphereBufferGeometry attach="geometry" />
            </mesh>
            <mesh position={new Vector3(0, -1, 0)} scale={modelScale} castShadow receiveShadow>
                <primitive object={gltf.scene} />
            </mesh>
            <Controls />
        </>
    );
};

const Canvas: React.FC = () => {
    const canvasProps = { camera: { fov: 75, position: new Vector3(0, 0, 8) } };

    return (
        <>
            <ThreeCanvas {...canvasProps} shadows dpr={[1, 2]}>
                <Suspense fallback={<></>}>
                    <CanvasContent />
                </Suspense>
            </ThreeCanvas>
        </>
    );
};

export default Canvas;
