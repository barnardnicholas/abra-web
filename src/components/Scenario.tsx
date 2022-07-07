import React, { Fragment, Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas as ThreeCanvas, useFrame, useThree } from '@react-three/fiber';
import LoopingSound from './LoopingSound';
import SingleSound from './SingleSound';
import SphereMesh from './SphereMesh';
import { Vector3, AudioListener, Mesh, MeshLambertMaterial } from 'three';
import GroundPlane from './GroundPlane';
import { SoundChannel, soundTypes } from '../types/Scenario';
import Debug from './Debug';
import { usePrevious } from '../utils/utils';
import CameraRig from './CameraRig';
import Loading from './Loading';
import { useSelector } from 'react-redux';
import { getDebug } from '../redux/selectors/debug';
import { UseScenarioProps } from './hooks/useScenario';
import { getDarkMode } from '../redux/selectors/darkMode';
import { getShowSettings } from '../redux/selectors/settings';

const sphereScale = new Vector3(0.25, 0.25, 0.25);

const colors = ['green', 'red', 'yellow', 'purple', 'orange'];

interface CanvasContentProps {
  scenario: UseScenarioProps;
  debug: boolean;
  isDarkBackground: boolean;
}

const CanvasContent: React.FC<CanvasContentProps> = ({ scenario, debug, isDarkBackground }) => {
  const { soundChannels, reportDuration } = scenario;
  const [listener] = useState(() => new AudioListener());
  const bgColor = new THREE.Color(isDarkBackground ? '#272730' : '#f7f7f7');

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
      <color attach="background" args={[bgColor]} />
      <Suspense fallback={<></>}>
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
          visible={debug}
        >
          <sphereBufferGeometry attach="geometry" />
        </mesh>
        {/* Sounds */}
        {Object.values(soundChannels).map((channel: SoundChannel, i: number) => {
          if (channel.type === soundTypes.background)
            return (
              <Fragment key={i}>
                <SphereMesh
                  // key={i}
                  color={colors[i]}
                  scale={sphereScale}
                  position={new Vector3(channel.area[0][0], channel.area[0][1], channel.area[0][2])}
                  visible={debug}
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
              </Fragment>
            );
          else if (channel.type === soundTypes.random)
            return (
              <SphereMesh
                key={i}
                scale={sphereScale}
                position={channel.position}
                color={colors[i % colors.length]}
                visible={debug && channel.isPlaying}
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
          else return <Fragment key={i} />;
        })}

        <GroundPlane visible={debug} />
      </Suspense>
      <CameraRig />
    </>
  );
};

interface CanvasProps {
  scenario: UseScenarioProps;
  selectedScenario: string;
}

const Canvas: React.FC<CanvasProps> = ({ scenario, selectedScenario }) => {
  const debug = useSelector(getDebug);
  const isShowingSettings = useSelector(getShowSettings);
  const isDarkMode = useSelector(getDarkMode);
  const prevIsDarkMode = usePrevious(isDarkMode);
  const [isDarkBackground, setIsDarkBackground] = useState<boolean>(isDarkMode);
  const [showBackgroundBlocker, setShowBackgroundBlocker] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      scenario.stopScenario();
    };
  }, []);

  useEffect(() => {
    if (isDarkMode !== prevIsDarkMode) {
      setShowBackgroundBlocker(true);
      setTimeout(() => setIsDarkBackground(isDarkMode), 510);
      setTimeout(() => setShowBackgroundBlocker(false), 520);
    }
  }, [isDarkMode, prevIsDarkMode]);

  const canvasProps = {
    camera: { fov: 75, position: new Vector3(0, 0, 4) },
    legacy: true,
    shadows: true,
  };
  const contentProps = { scenario, debug, isDarkBackground };

  return (
    <div className="three-container">
      <ThreeCanvas
        {...canvasProps}
        dpr={[1, 2]}
        style={{ background: isDarkBackground ? '#272730' : '#f7f7f7' }}
      >
        <CanvasContent {...contentProps} />
      </ThreeCanvas>
      <div className={`background-blocker ${showBackgroundBlocker ? '' : 'hidden'}`} />
      {debug && <Debug scenario={scenario} />}
      <div className={`background-blocker ${isShowingSettings ? 'semi-hidden' : ''}`} />
      <div className={`floating-controls ${selectedScenario === 'none' ? 'hidden' : ''}`}>
        <button className="button" onClick={() => scenario.setIsPlaying(!scenario.isPlaying)}>
          {scenario.isPlaying ? 'Stop' : 'Play'}
        </button>
      </div>
    </div>
  );
};

export default Canvas;
