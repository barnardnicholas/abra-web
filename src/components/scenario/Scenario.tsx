import React, { Fragment, Suspense, useEffect, useRef, useState, useMemo } from 'react';
import { useAtom } from 'jotai';
import * as THREE from 'three';
import { Vector3, AudioListener, Mesh, MeshPhongMaterial } from 'three';
import { Canvas as ThreeCanvas } from '@react-three/fiber';
import LoopingSound from './LoopingSound';
import SingleSound from './SingleSound';
import SphereMesh from './SphereMesh';
// import GroundPlane from './GroundPlane';
import { SoundChannel, soundTypes } from '../../types/Scenario';
import Debug from '../debug/Debug';
import { usePrevious } from '../../utils/utils';
import CameraRig from './CameraRig';
import { UseScenarioReturnType } from '../hooks/useScenario';
import PlaceholderSprite from './PlaceholderSprite';
import TestScene from './TestScene';
import { darkModeAtom, debugAtom, selectedScenarioAtom } from '../../atoms/atoms';

const sphereScale = new Vector3(0.25, 0.25, 0.25);

const colors = ['green', 'red', 'yellow', 'purple', 'orange'];

interface CanvasContentProps {
  scenario: UseScenarioReturnType;
  debug: boolean;
  isDarkBackground: boolean;
  selectedScenario: string | null;
}

function CanvasContent({
  scenario,
  debug,
  isDarkBackground,
  selectedScenario,
}: CanvasContentProps) {
  const { soundChannels, reportDuration } = scenario;
  const [listener] = useState(() => new AudioListener());
  const bgColor = useMemo<THREE.Color>(
    () => new THREE.Color(isDarkBackground ? '#272730' : '#f7f7f7'),
    [isDarkBackground],
  );
  const meshColor = useMemo<THREE.Color>(() => {
    const resultColor = new THREE.Color(isDarkBackground ? '#f7f7f7' : '#272730');
    if (isDarkBackground) resultColor.sub(new THREE.Color('#DDDDDD'));
    else resultColor.add(new THREE.Color('#888888'));
    return resultColor;
  }, [isDarkBackground]);

  const cameraTarget = useRef<Mesh>(null!);

  const prevProps = usePrevious({ cameraTarget });

  useEffect(() => {
    const target = cameraTarget.current;
    if (!prevProps.cameraTarget && target) {
      target.add(listener);
    }
    return () => {
      if (target) target.remove(listener);
    };
  }, [cameraTarget, prevProps, listener]);

  return (
    <>
      <color attach="background" args={[bgColor]} />
      <Suspense fallback={null}>
        <fog attach="fog" args={['#000000', 5, 20]} />
        {/* <ambientLight /> */}
        {/* <spotLight
          castShadow
          intensity={8}
          angle={Math.PI / 10}
          position={[10, 10, 10]}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        /> */}
        <mesh
          ref={cameraTarget}
          position={new Vector3(0, 0.5, 0)}
          scale={sphereScale}
          material={new MeshPhongMaterial({ color: 'purple' })}
          castShadow
          visible={debug}
        >
          <sphereBufferGeometry attach="geometry" />
        </mesh>
        <PlaceholderSprite visible={!debug && !!selectedScenario} />
        <TestScene visible={debug && !!selectedScenario} meshColor={meshColor} />
        {/* <GroundPlane visible={debug} /> */}

        {/* Sounds */}
        {Object.values(soundChannels).map((channel: SoundChannel, i: number) => {
          if (channel.type === soundTypes.background)
            return (
              <SphereMesh
                key={channel.id}
                color={colors[i]}
                scale={sphereScale}
                position={new Vector3(channel.area[0][0], channel.area[0][1], channel.area[0][2])}
                visible={debug && channel.isPlaying[channel.paths[0]] && scenario.isPlaying}
              >
                <LoopingSound
                  slug={channel.slug}
                  duration={channel.durations[0]}
                  reportDuration={reportDuration}
                  soundFile={channel.paths[0]}
                  listener={listener}
                  isPlaying={channel.isPlaying[channel.paths[0]]}
                  volume={channel.volume}
                />
              </SphereMesh>
            );
          if (channel.type === soundTypes.random)
            return channel.paths.map((path: string, j: number) => (
              <SphereMesh
                key={path}
                scale={sphereScale}
                position={channel.position}
                color={colors[j % colors.length]}
                visible={
                  debug &&
                  channel.isPlaying[path] &&
                  channel.currentPath === path &&
                  scenario.isPlaying
                }
              >
                <SingleSound
                  slug={channel.slug}
                  duration={channel.durations[j]}
                  reportDuration={reportDuration}
                  soundFile={path}
                  isPlaying={channel.isPlaying[path] && channel.currentPath === path}
                  listener={listener}
                  volume={channel.volume}
                  index={j}
                />
              </SphereMesh>
            ));

          return (
            /* eslint-disable */
            <Fragment key={i} />
            /*  eslint-enable */
          );
        })}
      </Suspense>
      <CameraRig />
    </>
  );
}

interface CanvasProps {
  scenario: UseScenarioReturnType;
}

function Canvas({ scenario }: CanvasProps) {
  const [debug] = useAtom(debugAtom);
  const [isDarkMode] = useAtom(darkModeAtom);
  const [selectedScenario] = useAtom(selectedScenarioAtom);
  const prevProps = usePrevious({ isDarkMode, selectedScenario });
  const [isDarkBackground, setIsDarkBackground] = useState<boolean>(isDarkMode);
  const [showBackgroundBlocker, setShowBackgroundBlocker] = useState<boolean>(false);

  useEffect(() => {
    if (isDarkMode !== prevProps.isDarkMode) {
      setShowBackgroundBlocker(true);
      setTimeout(() => setIsDarkBackground(isDarkMode), 510);
      setTimeout(() => setShowBackgroundBlocker(false), 520);
    }
    if (selectedScenario && !prevProps.selectedScenario) {
      setTimeout(() => setShowBackgroundBlocker(false), 520);
    }
  }, [isDarkMode, selectedScenario, prevProps.isDarkMode, prevProps.selectedScenario]);

  const cameraProps = { fov: 75, position: new Vector3(0, 0, 4) };

  return (
    <div className="three-container">
      <ThreeCanvas
        camera={cameraProps}
        legacy
        shadows
        dpr={[1, 2]}
        style={{ background: isDarkBackground ? '#272730' : '#f7f7f7' }}
      >
        <CanvasContent
          scenario={scenario}
          debug={debug}
          isDarkBackground={isDarkBackground}
          selectedScenario={selectedScenario}
        />
      </ThreeCanvas>
      <div className={`background-blocker ${showBackgroundBlocker ? '' : 'hidden'}`} />
      {debug && <Debug scenario={scenario} />}
    </div>
  );
}

export default Canvas;
