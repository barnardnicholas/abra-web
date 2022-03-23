import React, { useRef, useEffect } from 'react';
import { useLoader } from 'react-three-fiber';
import { PositionalAudio, AudioListener, AudioLoader } from 'three';
import { usePrevious } from '../utils/utils';

const LoopingSound: React.FC<Props> = ({
    slug,
    soundFile,
    listener,
    duration,
    isPlaying,
    reportDuration = () => {},
}) => {
    const sound = useRef<PositionalAudio>(null!);
    const buffer = useLoader(AudioLoader, soundFile);
    const prevProps = usePrevious({ isPlaying });

    useEffect(() => {
        sound.current.setBuffer(buffer);
        sound.current.setRefDistance(2);
        sound.current.setVolume(1);
        sound.current.setLoop(true);
    }, []);

    useEffect(() => {
        if (sound.current.buffer && !duration)
            reportDuration(slug, sound.current.buffer.duration * 1000);
    }, [sound, reportDuration, duration, slug]);

    useEffect(() => {
        if (!prevProps.isPlaying && isPlaying && !!sound.current) {
            sound.current.play();
        } else if (prevProps.isPlaying && !isPlaying && !!sound.current) {
            sound.current.stop();
        }
    }, [isPlaying, prevProps.isPlaying, sound, slug]);

    return <positionalAudio ref={sound} args={[listener]} />;
};

interface Props {
    slug: string;
    soundFile: string;
    listener: AudioListener;
    reportDuration?: (slug: string, duration: number) => void;
    duration: number | null;
    isPlaying: boolean;
}
export default LoopingSound;
