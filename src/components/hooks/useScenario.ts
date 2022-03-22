import { useEffect, useState } from 'react';
import { Vector3 } from 'three';
import scenarios from '../../constants/scenarios';
import { Scenario, Sound, SoundChannel, soundTypeValues } from '../../types/Scenario';

const useScenario = (scenarioName: string): UseScenarioProps => {
    const scenario: Scenario = scenarios[scenarioName];
    const [soundChannels, setSoundChannels] = useState<Record<string, SoundChannel>>({});

    useEffect(() => {
        Object.values(scenario.sounds).forEach((sound: Sound) => {
            setSoundChannels((prevSoundChannels: Record<string, SoundChannel>) => ({
                ...prevSoundChannels,
                [sound.slug]: {
                    id: sound.id,
                    name: sound.name,
                    slug: sound.slug,
                    position: new Vector3(0, 0, 0),
                    isPlaying: false,
                    duration: null,
                    type: sound.type,
                    path: `/audio/${soundTypeValues[sound.type]}/${sound.path}`,
                },
            }));
        });
    }, []);

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
