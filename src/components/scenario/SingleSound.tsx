import React, { useRef, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { usePrevious } from '../../utils/utils';
import { PositionalAudio, AudioListener, AudioLoader } from 'three';

const SingleSound: React.FC<Props> = ({
  duration,
  slug,
  soundFile,
  isPlaying,
  onPlaybackEnd = () => {},
  listener,
  reportDuration = () => {},
  volume = 0.5,
}) => {
  const sound = useRef<PositionalAudio>(null!);
  const buffer = useLoader(AudioLoader, soundFile);
  const prevProps = usePrevious({ isPlaying, sound, volume });

  useEffect(() => {
    sound.current.setBuffer(buffer);
    sound.current.setVolume(volume);
    sound.current.setRefDistance(2);
  }, []);

  useEffect(() => {
    if (!!sound.current && prevProps.volume !== volume) {
      if (isPlaying) sound.current.pause();
      sound.current.setVolume(volume);
      if (isPlaying) sound.current.play();
    }
  }, [volume, prevProps.volume]);

  useEffect(() => {
    if (!prevProps.isPlaying && isPlaying && !!sound.current) {
      sound.current.play();
      let duration = 5;
      if (sound.current.buffer) duration = sound.current.buffer.duration;
      setTimeout(onPlaybackEnd, duration * 1000 + 100);
    } else if (prevProps.isPlaying && !isPlaying && !!sound.current) {
      sound.current.stop();
    } else if (prevProps.volume !== volume) {
      sound.current.setVolume(volume);
    }
  }, [isPlaying, prevProps.isPlaying, sound, onPlaybackEnd, slug, volume]);

  useEffect(() => {
    if (sound.current.buffer && !duration)
      reportDuration(slug, sound.current.buffer.duration * 1000);
  }, [sound, reportDuration, duration, slug]);

  return <positionalAudio ref={sound} args={[listener]} />;
};

interface Props {
  slug: string;
  soundFile: string;
  isPlaying: boolean;
  onPlaybackEnd?: () => void;
  listener: AudioListener;
  reportDuration?: (slug: string, duration: number) => void;
  duration: number | null;
  volume: number;
}
export default SingleSound;
