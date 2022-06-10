import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas as ThreeCanvas, useFrame, useThree } from 'react-three-fiber';
import LoopingSound from './LoopingSound';
import SingleSound from './SingleSound';
import Controls from './Controls';
import SphereMesh from './SphereMesh';
import useScenario, { UseScenarioProps } from './hooks/useScenario';
import { Vector3, AudioListener, Mesh, MeshLambertMaterial } from 'three';
import GroundPlane from './GroundPlane';
import { SoundChannel, soundTypes } from '../types/Scenario';
import Debug from './Debug';
import { isEmpty, usePrevious } from '../utils/utils';
import CameraRig from './CameraRig';

const sphereScale = new Vector3(0.25, 0.25, 0.25);

const colors = ['green', 'red', 'yellow', 'purple', 'orange'];

interface CanvasContentProps {
    scenario: UseScenarioProps;
}

const CanvasContent: React.FC<CanvasContentProps> = ({ scenario }) => {
    const { soundChannels, reportDuration } = scenario;
    const [listener] = useState(() => new AudioListener());

    const cameraTarget = useRef<Mesh>(null!);

    const prevProps = usePrevious({ cameraTarget });

    useEffect(() => {
        if (!prevProps.cameraTarget && cameraTarget.current) {
            cameraTarget.current.add(listener);
        }
        return () => {
            if (!!cameraTarget.current) cameraTarget.current.remove(listener);
        };
    }, [cameraTarget, prevProps]);

    return (
        <>
            <Suspense fallback={<></>}>
                <color attach="background" args={['#000000']} />
                {/* <fog attach="fog" args={['#000000', 5, 20]} /> */}
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
                    ref={cameraTarget}
                    position={new Vector3(0, 0.5, 0)}
                    scale={sphereScale}
                    material={new MeshLambertMaterial({ color: 'purple' })}
                    castShadow
                >
                    <sphereBufferGeometry attach="geometry" />
                </mesh>
                {/* Sounds */}
                {Object.values(soundChannels).map((channel: SoundChannel, i: number) => {
                    if (channel.type === soundTypes.background)
                        return (
                            <SphereMesh
                                key={i}
                                color={colors[i]}
                                scale={sphereScale}
                                position={
                                    new Vector3(
                                        channel.area[0][0],
                                        channel.area[0][1],
                                        channel.area[0][2],
                                    )
                                }
                            >
                                <LoopingSound
                                    slug={channel.slug}
                                    duration={channel.duration}
                                    reportDuration={reportDuration}
                                    soundFile={channel.path}
                                    listener={listener}
                                    isPlaying={channel.isPlaying}
                                    volume={channel.volume}
                                />
                            </SphereMesh>
                        );
                    else if (channel.type === soundTypes.random)
                        return (
                            <SphereMesh
                                key={i}
                                scale={sphereScale}
                                position={channel.position}
                                color={colors[i % colors.length]}
                                visible={channel.isPlaying}
                            >
                                <SingleSound
                                    slug={channel.slug}
                                    duration={channel.duration}
                                    reportDuration={reportDuration}
                                    soundFile={channel.path}
                                    isPlaying={channel.isPlaying}
                                    onPlaybackEnd={() => {}}
                                    listener={listener}
                                    volume={channel.volume}
                                />
                            </SphereMesh>
                        );
                    else return <React.Fragment key={i} />;
                })}

                <GroundPlane />
            </Suspense>
            {/* <Controls /> */}
            <CameraRig />
        </>
    );
};

const Canvas: React.FC = () => {
    const scenario = useScenario('ocean');

    const canvasProps = { camera: { fov: 75, position: new Vector3(0, 0, 4) } };
    const contentProps = { scenario };

    return (
        <>
            <ThreeCanvas {...canvasProps} shadows dpr={[1, 2]}>
                <CanvasContent {...contentProps} />
            </ThreeCanvas>
            <div className="floating-controls">
                <button onClick={() => scenario.setIsPlaying(!scenario.isPlaying)}>
                    {scenario.isPlaying ? 'Stop' : 'Play'}
                </button>
            </div>
            {!isEmpty(scenario.soundChannels) && <Debug scenario={scenario} />}
        </>
    );
};

export default Canvas;