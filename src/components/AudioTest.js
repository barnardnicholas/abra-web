import * as THREE from "three";
import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useThree } from "react-three-fiber";
import LoopingSoundFile from "../sounds/rain-1.ogg";
import SingleSoundFile from "../sounds/thunder-1.mp3";
import LoopingSound from "./LoopingSound";
import SingleSound from "./SingleSound";
import Controls from "./Controls";
import SphereMesh from "./SphereMesh";
import useScenario from "./hooks/useScenario";

const sphereScale = [0.25, 0.25, 0.25];

const CanvasContent = ({ isPlaying, setIsPlaying, soundPosition }) => {
  const { camera } = useThree();
  const [listener] = useState(() => new THREE.AudioListener());

  const planeMaterial = new THREE.MeshLambertMaterial({ color: "blue" });

  useEffect(() => {
    camera.add(listener);
    return () => camera.remove(listener);
  }, []);

  return (
    <>
      <Suspense fallback={<></>}>
        <color attach="background" args={["#101010"]} />
        <fog attach="fog" args={["#101010", 5, 20]} />
        <ambientLight />
        {/* <pointLight position={[10, 10, 10]} /> */}
        <spotLight
          castShadow
          intensity={8}
          angle={Math.PI / 10}
          position={[10, 10, 10]}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <SphereMesh color="green" scale={sphereScale}>
          <LoopingSound SoundFile={LoopingSoundFile} listener={listener} />
        </SphereMesh>
        <SphereMesh
          scale={sphereScale}
          position={soundPosition}
          color="red"
          visible={isPlaying}
        >
          <SingleSound
            SoundFile={SingleSoundFile}
            isPlaying={isPlaying}
            onPlaybackEnd={() => setIsPlaying(false)}
            listener={listener}
          />
        </SphereMesh>
        <mesh
          receiveShadow
          castShadow
          position={[0, -2, 0]}
          rotation={new THREE.Euler((Math.PI / 2) * -1, 0, 0)}
          material={planeMaterial}
        >
          <planeGeometry attach="geometry" args={[15, 15]} />
        </mesh>
      </Suspense>
      <Controls />
    </>
  );
};

function Lights() {
  return (
    <>
      <color attach="background" args={["#f0f0f0"]} />
      <ambientLight intensity={1} />
      <pointLight position={[20, 30, 10]} />
      <pointLight position={[-10, -10, -10]} color="blue" />
    </>
  );
}

function AudioTests() {
  const { isPlaying, setIsPlaying, soundPosition, handlePlay } = useScenario();

  const canvasProps = { camera: { fov: 75, position: [0, 0, 3] } };
  const contentProps = { isPlaying, setIsPlaying, handlePlay, soundPosition };

  return (
    <>
      <Canvas {...canvasProps} shadows dpr={[1, 2]}>
        <CanvasContent {...contentProps} />
      </Canvas>
      <div className="floating-controls">
        <button onClick={handlePlay} disabled={isPlaying}>
          Play sound
        </button>
      </div>
    </>
  );
}

export default AudioTests;
