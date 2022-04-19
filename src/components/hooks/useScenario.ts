import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Vector3 } from 'three';
import scenarios from '../../constants/scenarios';
import { Scenario, Sound, SoundChannel, soundTypes, soundTypeValues } from '../../types/Scenario';
import { isEmpty, usePrevious, getRandomBetween, trimFreq, clamp } from '../../utils/utils';

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
                volume: sound.volume,
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

    function getNewDelay(channel: SoundChannel): number {
        const { duration, frequency } = channel;
        // Duration in ms
        // Frequency between 0 and 1 - 0 is never, 1 is always

        // If frequency is 0 or 1, it breaks everything, so trim 30ms off it
        const trimmedFreq = trimFreq(frequency, 0.03);

        // Set hard bounds for the delay and calculate range between them
        const hardMin = duration + 5000; // sound duration + 5 seconds
        const hardMax = duration + 30000; // sound duration +  30 seconds
        const hardDiff = hardMax - hardMin;

        // Get the opposite of the frequency, so that the lower the frequency, the higher the delay
        const inverseFrequency = 1 - trimmedFreq;

        // Establish seed point based on the inverse frequency and the range
        const seedPoint = hardMin + hardDiff * inverseFrequency;

        // Generate random number between +1 and -1
        const seed = Math.random() * 2 - 1;

        // Deviate from the seed point by 10% of the range * the seed
        const deviation = (hardDiff / 10) * seed;

        // Calculate delay based on seed point and deviation - clamp to hard bounds
        let delay = clamp(seedPoint + deviation, hardMin, hardMax);

        // If frequency is very high, delay is too low, so make some of the low ones higher by adding duration
        if (delay <= hardMin && Math.random() < 0.5) delay += duration;

        // console.log({
        //     hardMin: hardMin / 1000 + 's',
        //     hardMax: hardMax / 1000 + 's',
        //     seedPoint: seedPoint / 1000 + 's',
        //     seed,
        //     deviation: deviation / 1000 + 's',
        //     delay: delay / 1000 + 's',
        // });

        console.log((delay / 1000).toFixed(2) + 's');

        return delay;
    }

    function startScenario() {
        console.log('starting scenario');

        Object.keys(soundChannels).forEach((slug: string) => {
            const { type, isPlaying, area } = soundChannels[slug];

            if (type === soundTypes.background) {
                console.log(`Playing ${slug}`);

                if (!isPlaying) play(slug);
            } else {
                const event = () => {
                    console.log(`Playing ${slug}`);
                    clearTimeout(timers[slug] as NodeJS.Timer);
                    if (!isPlaying) play(slug, getPosition(area) as Vector3);
                    timers[slug] = setTimeout(event, getNewDelay(soundChannels[slug]));
                };
                console.log(`start ${slug}`);
                timers[slug] = setTimeout(event, getNewDelay(soundChannels[slug]));
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
