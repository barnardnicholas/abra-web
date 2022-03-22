import React, { useRef, useEffect } from 'react';
import { useLoader } from 'react-three-fiber';
import { PositionalAudio, AudioListener, AudioLoader } from 'three';

const LoopingSound: React.FC<Props> = ({
    slug,
    soundFile,
    listener,
    duration,
    reportDuration = () => {},
}) => {
    const sound = useRef<PositionalAudio>(null!);
    const buffer = useLoader(AudioLoader, soundFile);

    useEffect(() => {
        sound.current.setBuffer(buffer);
        sound.current.setRefDistance(2);
        sound.current.setVolume(0.66);
        sound.current.setLoop(true);
        sound.current.play();
    }, []);

    useEffect(() => {
        if (sound.current.buffer && !duration)
            reportDuration(slug, sound.current.buffer.duration * 1000);
    }, [sound, reportDuration, duration, slug]);

    return <positionalAudio ref={sound} args={[listener]} />;
};

interface Props {
    slug: string;
    soundFile: string;
    listener: AudioListener;
    reportDuration?: (slug: string, duration: number) => void;
    duration: number | null;
}
export default LoopingSound;
