import React, { useRef, useEffect } from 'react';
import { PositionalAudio, AudioListener, AudioLoader } from 'three';
import { useLoader } from '@react-three/fiber';
import { usePrevious } from '../../utils/utils';

interface Props {
  slug: string;
  soundFile: string;
  isPlaying: boolean;
  onPlaybackEnd?: () => void;
  listener: AudioListener;
  reportDuration?: (slug: string, duration: number, index?: number) => void;
  duration: number | null;
  volume: number;
  index: number;
}

function SingleSound({
  duration,
  slug,
  soundFile,
  isPlaying,
  onPlaybackEnd,
  listener,
  reportDuration,
  volume = 0.5,
  index,
}: Props) {
  const sound = useRef<PositionalAudio>(null!);
  const buffer = useLoader(AudioLoader, soundFile);
  const prevProps = usePrevious({ isPlaying, sound, volume });

  useEffect(() => {
    sound.current.setBuffer(buffer);
    sound.current.setVolume(volume);
    sound.current.setRefDistance(2);
  }, [buffer, volume]);

  useEffect(() => {
    if (!!sound.current && prevProps.volume !== volume) {
      if (isPlaying) sound.current.pause();
      sound.current.setVolume(volume);
      if (isPlaying) sound.current.play();
    }
  }, [volume, prevProps.volume, isPlaying]);

  useEffect(() => {
    if (!prevProps.isPlaying && isPlaying && !!sound.current) {
      sound.current.play();
      let intDuration = 5;
      if (sound.current.buffer) intDuration = sound.current.buffer.duration;
      if (onPlaybackEnd) setTimeout(onPlaybackEnd, intDuration * 1000 + 100);
    } else if (prevProps.isPlaying && !isPlaying && !!sound.current) {
      sound.current.stop();
    } else if (prevProps.volume !== volume) {
      sound.current.setVolume(volume);
    }
  }, [isPlaying, prevProps.isPlaying, sound, onPlaybackEnd, slug, volume, prevProps.volume]);

  useEffect(() => {
    if (sound.current.buffer && !duration)
      if (reportDuration) reportDuration(slug, sound.current.buffer.duration * 1000, index);
  }, [sound, reportDuration, duration, slug, index]);

  return <positionalAudio ref={sound} args={[listener]} />;
}

SingleSound.defaultProps = {
  reportDuration: undefined,
  onPlaybackEnd: undefined,
};

export default SingleSound;
