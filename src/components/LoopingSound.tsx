import React, { useRef, useEffect } from "react";
import { useLoader } from "react-three-fiber";
import { PositionalAudio, AudioListener, AudioLoader } from "three";

const LoopingSound: React.FC<Props> = ({ soundFile, listener }) => {
  const sound = useRef<PositionalAudio>(null!);
  const buffer = useLoader(AudioLoader, soundFile);

  useEffect(() => {
    sound.current.setBuffer(buffer);
    sound.current.setRefDistance(2);
    sound.current.setVolume(0.66);
    sound.current.setLoop(true);
    sound.current.play();
  }, []);

  return <positionalAudio ref={sound} args={[listener]} />;
};

interface Props {
  soundFile: string;
  listener: AudioListener;
}
export default LoopingSound;
