import * as THREE from "three";
import React, { useRef, useEffect } from "react";
import { useLoader } from "react-three-fiber";
import { usePrevious } from "../utils";

function SingleSound({
  SoundFile,
  isPlaying,
  onPlaybackEnd = () => {},
  listener,
}) {
  const prevPlaying = usePrevious(isPlaying);
  const sound = useRef();
  const buffer = useLoader(THREE.AudioLoader, SoundFile);

  useEffect(() => {
    sound.current.setBuffer(buffer);
    sound.current.setRefDistance(2);
  }, []);

  useEffect(() => {
    if (!prevPlaying && isPlaying && !!sound.current) {
      sound.current.play();
      setTimeout(onPlaybackEnd, sound.current.buffer.duration * 1000 + 100);
    }
  }, [isPlaying, prevPlaying, sound, onPlaybackEnd]);

  return <positionalAudio ref={sound} args={[listener]} />;
}
export default SingleSound;
