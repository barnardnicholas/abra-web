import * as THREE from "three";
import React, { useRef, useEffect } from "react";
import { useLoader } from "react-three-fiber";

function LoopingSound({ SoundFile, listener }) {
  const sound = useRef();
  const buffer = useLoader(THREE.AudioLoader, SoundFile);

  useEffect(() => {
    sound.current.setBuffer(buffer);
    sound.current.setRefDistance(2);
    sound.current.setVolume(0.66);
    sound.current.setLoop(true);
    sound.current.play();
  }, []);

  return <positionalAudio ref={sound} args={[listener]} />;
}
export default LoopingSound;
