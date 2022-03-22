import * as THREE from "three";
import React, {
  Dispatch,
  SetStateAction,
  Suspense,
  useEffect,
  useState,
} from "react";
import { Canvas, useThree } from "react-three-fiber";
import LoopingSoundFile from "../assets/audio/background/rain-1.ogg";
import SingleSoundFile from "../assets/audio/random/thunder/thunder-1.mp3";
import LoopingSound from "./LoopingSound";
import SingleSound from "./SingleSound";
import Controls from "./Controls";
import SphereMesh from "./SphereMesh";
import useScenario from "./hooks/useScenario";
import { Vector3, AudioListener, MeshLambertMaterial } from "three";

const sphereScale = new Vector3(0.25, 0.25, 0.25);

interface CanvasContentProps {
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  soundPosition: Vector3;
}

const CanvasContent: React.FC<CanvasContentProps> = ({
  isPlaying,
  setIsPlaying,
  soundPosition,
}) => {
  const { camera } = useThree();
  const [listener] = useState(() => new AudioListener());

  const planeMaterial = new MeshLambertMaterial({ color: "blue" });

  useEffect(() => {
    camera.add(listener);
    return () => {
      camera.remove(listener);
    };
  }, []);

  return (
    <>
      <Suspense fallback={<></>}>
        <color attach="background" args={["#101010"]} />
        <fog attach="fog" args={["#101010", 5, 20]} />
        <ambientLight />
        <spotLight
          castShadow
          intensity={8}
          angle={Math.PI / 10}
          position={[10, 10, 10]}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <SphereMesh color="green" scale={sphereScale}>
          <LoopingSound soundFile={LoopingSoundFile} listener={listener} />
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

const AudioTests: React.FC = () => {
  console.log("Canvas mounting");
  const { isPlaying, setIsPlaying, soundPosition, handlePlay } = useScenario();

  const canvasProps = { camera: { fov: 75, position: new Vector3(0, 0, 3) } };
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
};

export default AudioTests;
