import * as THREE from 'three';
import React, { Dispatch, SetStateAction, Suspense, useEffect, useState } from 'react';
import { Canvas as ThreeCanvas, useThree } from 'react-three-fiber';
import LoopingSoundFile from '../assets/audio/background/rain-1.ogg';
import SingleSoundFile from '../assets/audio/random/thunder/thunder-1.mp3';
import LoopingSound from './LoopingSound';
import SingleSound from './SingleSound';
import Controls from './Controls';
import SphereMesh from './SphereMesh';
import useScenario, { UseScenarioProps } from './hooks/useScenario';
import { Vector3, AudioListener, MeshLambertMaterial } from 'three';
import GroundPlane from './GroundPlane';
import { SoundChannel, soundTypes } from '../types/Scenario';

const sphereScale = new Vector3(0.25, 0.25, 0.25);

interface CanvasContentProps {
    scenario: UseScenarioProps;
}

const CanvasContent: React.FC<CanvasContentProps> = ({ scenario }) => {
    const { soundChannels, setPosition, play, stop, reportDuration, startScenario } = scenario;
    const { camera } = useThree();
    const [listener] = useState(() => new AudioListener());

    useEffect(() => {
        camera.add(listener);
        return () => {
            camera.remove(listener);
        };
    }, []);

    return (
        <>
            <Suspense fallback={<></>}>
                <color attach="background" args={['#101010']} />
                <fog attach="fog" args={['#101010', 5, 20]} />
                <ambientLight />
                <spotLight
                    castShadow
                    intensity={8}
                    angle={Math.PI / 10}
                    position={[10, 10, 10]}
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                />
                {/* Sounds */}
                {Object.values(soundChannels).map((channel: SoundChannel, i: number) => {
                    if (channel.type === soundTypes.background)
                        return (
                            <SphereMesh key={i} color="green" scale={sphereScale}>
                                <LoopingSound
                                    slug={channel.slug}
                                    duration={channel.duration}
                                    reportDuration={reportDuration}
                                    soundFile={channel.path}
                                    listener={listener}
                                    isPlaying={channel.isPlaying}
                                />
                            </SphereMesh>
                        );
                    else if (channel.type === soundTypes.random)
                        return (
                            <SphereMesh
                                key={i}
                                scale={sphereScale}
                                position={channel.position}
                                color="red"
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
                                />
                            </SphereMesh>
                        );
                    else return <></>;
                })}

                <GroundPlane />
            </Suspense>
            <Controls />
        </>
    );
};

const Canvas: React.FC = () => {
    const scenario = useScenario('rainstorm');

    const canvasProps = { camera: { fov: 75, position: new Vector3(0, 0, 3) } };
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
        </>
    );
};

export default Canvas;
