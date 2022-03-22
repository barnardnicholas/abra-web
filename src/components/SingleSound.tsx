import React, { useRef, useEffect } from "react";
import { useLoader } from "react-three-fiber";
import { usePrevious } from "../utils/utils";
import { PositionalAudio, AudioListener, AudioLoader } from "three";

const SingleSound: React.FC<Props> = ({
  SoundFile,
  isPlaying,
  onPlaybackEnd = () => {},
  listener,
}) => {
  const prevPlaying = usePrevious(isPlaying);
  const sound = useRef<PositionalAudio>(null!);
  const buffer = useLoader(AudioLoader, SoundFile);

  useEffect(() => {
    sound.current.setBuffer(buffer);
    sound.current.setRefDistance(2);
  }, []);

  useEffect(() => {
    if (!prevPlaying && isPlaying && !!sound.current) {
      sound.current.play();
      let duration = 5;
      if (sound.current.buffer) duration = sound.current.buffer.duration;
      setTimeout(onPlaybackEnd, duration * 1000 + 100);
    }
  }, [isPlaying, prevPlaying, sound, onPlaybackEnd]);

  return <positionalAudio ref={sound} args={[listener]} />;
};

interface Props {
  SoundFile: string;
  isPlaying: boolean;
  onPlaybackEnd?: () => void;
  listener: AudioListener;
}
export default SingleSound;
