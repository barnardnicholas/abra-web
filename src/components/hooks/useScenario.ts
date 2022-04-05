import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Vector3 } from 'three';
import scenarios from '../../constants/scenarios';
import { Scenario, Sound, SoundChannel, soundTypes, soundTypeValues } from '../../types/Scenario';
import { isEmpty, usePrevious } from '../../utils/utils';

const timers: Record<string, NodeJS.Timer | number> = {};

const useScenario = (scenarioName: string): UseScenarioProps => {
    const scenario: Scenario = scenarios[scenarioName];
    const [soundChannels, setSoundChannels] = useState<Record<string, SoundChannel>>({});
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const prevProps = usePrevious({ soundChannels, isPlaying });

    useEffect(() => {
        const channels: Record<string, SoundChannel> = {};

        Object.values(scenario.sounds).forEach((sound: Sound) => {
            channels[sound.slug] = {
                id: sound.id,
                name: sound.name,
                slug: sound.slug,
                position: new Vector3(0, 0, 0),
                isPlaying: false,
                duration: 0,
                type: sound.type,
                path: `/audio/${soundTypeValues[sound.type]}/${sound.path}`,
                frequency: sound.frequency,
                tick: undefined,
                area: sound.area,
            };
        });

        setSoundChannels(channels);
    }, []);

    useEffect(() => {
        if (!isEmpty(soundChannels) && isPlaying && !prevProps.isPlaying) startScenario();
        else if (!isEmpty(soundChannels) && !isPlaying && prevProps.isPlaying) stopScenario();
    }, [soundChannels, prevProps, isPlaying]);

    function setPosition(slug: string, position: Vector3) {
        setSoundChannels((prevSoundChannels: Record<string, SoundChannel>) => {
            return { ...prevSoundChannels, [slug]: { ...prevSoundChannels[slug], position } };
        });
    }

    function play(slug: string, position?: Vector3) {
        if (!!position) {
            const duration = soundChannels[slug].duration ? soundChannels[slug].duration : 5000;
            setTimeout(() => {
                stop(slug);
            }, (duration as number) + 100);
        }
        setSoundChannels((prevSoundChannels: Record<string, SoundChannel>) => {
            const newChannel = { ...prevSoundChannels[slug], isPlaying: true };
            if (!!position) newChannel.position = position;
            return { ...prevSoundChannels, [slug]: newChannel };
        });
    }

    function stop(slug: string) {
        setSoundChannels((prevSoundChannels: Record<string, SoundChannel>) => {
            return {
                ...prevSoundChannels,
                [slug]: { ...prevSoundChannels[slug], isPlaying: false },
            };
        });
    }

    function reportDuration(slug: string, duration: number) {
        setSoundChannels((prevSoundChannels: Record<string, SoundChannel>) => {
            return { ...prevSoundChannels, [slug]: { ...prevSoundChannels[slug], duration } };
        });
    }

    function getPosition(area: [number[], number[]]): Vector3 {
        // area = [minX, minY, minZ], [maxX, maxY, maxZ]
        const pos = [0, 0, 0].map((_, i: number) => {
            return Math.random() * (area[1][i] - area[0][i]) + area[0][i];
        });
        return new Vector3(pos[0], pos[1], pos[2]);
    }

    function startScenario() {
        console.log('starting scenario');

        Object.keys(soundChannels).forEach((slug: string) => {
            const { type, duration, isPlaying, area } = soundChannels[slug];

            if (type === soundTypes.background) {
                console.log(`Playing ${slug}`);

                if (!isPlaying) play(slug);
            } else {
                const maxDelay = 30000;
                let minDelay = maxDelay / 4;

                if (!Number.isNaN(duration)) {
                    if (maxDelay / 4 < duration) minDelay = duration + 100;
                }

                const delayDiff = maxDelay - minDelay;

                const event = () => {
                    console.log(`Playing ${slug}`);
                    clearTimeout(timers[slug] as NodeJS.Timer);
                    if (!isPlaying) play(slug, getPosition(area) as Vector3);
                    timers[slug] = setTimeout(event, Math.random() * delayDiff + minDelay);
                };

                console.log(`start ${slug}`);
                timers[slug] = setTimeout(event, Math.random() * delayDiff + minDelay);
            }
        });
    }

    function stopScenario() {
        console.log('stopping scenario');
        const newSoundChannels: Record<string, SoundChannel> = { ...soundChannels };
        Object.keys(soundChannels).forEach((slug: string) => {
            console.log(`Stopping ${slug}`);
            newSoundChannels[slug] = { ...newSoundChannels[slug], isPlaying: false };
            clearInterval(timers[slug] as NodeJS.Timer);
        });
        setSoundChannels(newSoundChannels);
    }

    return {
        soundChannels,
        setPosition,
        play,
        stop,
        reportDuration,
        startScenario,
        isPlaying,
        setIsPlaying,
        stopScenario,
    };
};

export interface UseScenarioProps {
    soundChannels: Record<string, SoundChannel>;
    setPosition: (slug: string, position: Vector3) => void;
    play: (slug: string, position?: Vector3) => void;
    stop: (slug: string) => void;
    reportDuration: (slug: string, duration: number) => void;
    startScenario: () => void;
    stopScenario: () => void;
    isPlaying: boolean;
    setIsPlaying: Dispatch<SetStateAction<boolean>>;
}

export default useScenario;
