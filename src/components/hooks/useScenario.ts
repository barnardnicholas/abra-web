import { useEffect, useState } from 'react';
import { Vector3 } from 'three';
import scenarios from '../../constants/scenarios';
import { Scenario, Sound, SoundChannel, soundTypes, soundTypeValues } from '../../types/Scenario';
import { isEmpty, usePrevious } from '../../utils/utils';

const useScenario = (scenarioName: string): UseScenarioProps => {
    const scenario: Scenario = scenarios[scenarioName];
    const [soundChannels, setSoundChannels] = useState<Record<string, SoundChannel>>({});

    const prevProps = usePrevious({ soundChannels });

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
            };
        });

        setSoundChannels(channels);
    }, []);

    useEffect(() => {
        if (!isEmpty(soundChannels) && isEmpty(prevProps.soundChannels)) startScenario();
    }, [soundChannels, prevProps]);

    const setPosition = (slug: string, position: Vector3) => {
        setSoundChannels((prevSoundChannels: Record<string, SoundChannel>) => ({
            ...prevSoundChannels,
            [slug]: {
                ...prevSoundChannels[slug],
                position,
            },
        }));
    };

    const play = (slug: string, position?: Vector3) => {
        setSoundChannels((prevSoundChannels: Record<string, SoundChannel>) => {
            const newChannel = { ...prevSoundChannels[slug], isPlaying: true };
            if (!!position) newChannel.position = position;
            return {
                ...prevSoundChannels,
                [slug]: newChannel,
            };
        });
        const duration = soundChannels[slug].duration ? soundChannels[slug].duration : 5000;
        setTimeout(() => {
            stop(slug);
        }, (duration as number) + 100);
    };

    const stop = (slug: string) => {
        setSoundChannels((prevSoundChannels: Record<string, SoundChannel>) => ({
            ...prevSoundChannels,
            [slug]: {
                ...prevSoundChannels[slug],
                isPlaying: false,
            },
        }));
    };

    const reportDuration = (slug: string, duration: number) => {
        setSoundChannels((prevSoundChannels: Record<string, SoundChannel>) => ({
            ...prevSoundChannels,
            [slug]: {
                ...prevSoundChannels[slug],
                duration,
            },
        }));
    };

    const startScenario = () => {
        console.log('starting scneario');
        Object.keys(soundChannels).forEach((slug: string) => {
            const { type, duration, isPlaying } = soundChannels[slug];
            if (type === soundTypes.background) return;
            const maxDelay = 30000;
            let minDelay = maxDelay / 4;
            if (!Number.isNaN(duration)) {
                if (maxDelay / 4 < duration) minDelay = duration + 100;
            }
            const delayDiff = maxDelay - minDelay;

            const event = () => {
                console.log(`Playing ${slug}`);
                if (!isPlaying)
                    play(
                        slug,
                        new Vector3(
                            Math.random() * 4 - 2,
                            Math.random() * 4 - 2,
                            Math.random() * 4 - 2,
                        ),
                    );
            };

            console.log(`start ${slug}`);

            setSoundChannels((prevSoundChannels: Record<string, SoundChannel>) => ({
                ...prevSoundChannels,
                [slug]: {
                    ...prevSoundChannels[slug],
                    tick: setInterval(() => {
                        // console.log(minDelay + (Math.random() * delayDiff))
                        setTimeout(event, Math.random() * delayDiff);
                    }, maxDelay),
                },
            }));
        });
    };

    return { soundChannels, setPosition, play, stop, reportDuration };
};

export interface UseScenarioProps {
    soundChannels: Record<string, SoundChannel>;
    setPosition: (slug: string, position: Vector3) => void;
    play: (slug: string, position?: Vector3) => void;
    stop: (slug: string) => void;
    reportDuration: (slug: string, duration: number) => void;
}

export default useScenario;
