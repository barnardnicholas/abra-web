import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Vector3 } from 'three';
import { Sound, SoundChannel, soundTypes, soundTypeValues } from '../../types/Scenario';
import { isChannelPlaying, isEmpty, usePrevious } from '../../utils/utils';
import useSavedAndPresetScenarios from './useSavedAndPresetScenarios';

const useScenario = (scenarioSlug: string): UseScenarioProps => {
  const { currentScenario } = useSavedAndPresetScenarios(scenarioSlug);
  const [soundChannels, setSoundChannels] = useState<Record<string, SoundChannel>>({});
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [soundPool, setSoundPool] = useState<string[]>([]);
  const [lastSound, setLastSound] = useState<string | null>(null);

  let masterTimer = useRef<ReturnType<typeof setTimeout>>(setTimeout(() => {}, 1));

  const prevProps = usePrevious({ scenarioName: scenarioSlug, soundChannels, isPlaying });

  useEffect(() => {
    masterTimer.current = setTimeout(() => {}, 1); // Init master timer on mount

    return () => {
      stopScenario(); // Stop scenario on unmount
      clearTimeout(masterTimer.current); // Clear master timer on unmount
    };
  }, []);

  useEffect(() => {
    stopScenario(); // Stop scenario on load (precaution)
    const channels: Record<string, SoundChannel> = buildSoundChannels(currentScenario.sounds);
    setSoundPool(buildSoundPool(channels));
    setSoundChannels(channels);
  }, []);

  useEffect(() => {
    if (scenarioSlug !== prevProps.scenarioName) {
      stopScenario();
      console.log('Rebuilding...');
      const channels: Record<string, SoundChannel> = buildSoundChannels(currentScenario.sounds);
      setSoundPool(buildSoundPool(channels));
      setSoundChannels(channels);
    }
  }, [scenarioSlug, prevProps.scenarioName]);

  useEffect(() => {
    if (!isEmpty(soundChannels) && isPlaying && !prevProps.isPlaying) startScenario();
    else if (!isEmpty(soundChannels) && !isPlaying && prevProps.isPlaying) stopScenario();

    if (!isEmpty(soundChannels)) {
      const channelFreqs: string = Object.values(soundChannels)
        .map((c: SoundChannel) => c.frequency)
        .join('');
      const prevChannelFreqs: string = Object.values(
        prevProps.soundChannels as Record<string, SoundChannel>,
      )
        .map((c: SoundChannel) => c.frequency)
        .join('');
      if (prevChannelFreqs !== channelFreqs) setSoundPool(buildSoundPool(soundChannels)); // Rebuild soundPool on freq changes
    }
  }, [soundChannels, prevProps, isPlaying]);

  function buildSoundChannels(sounds: Record<string, Sound>): Record<string, SoundChannel> {
    const channels: Record<string, SoundChannel> = {};
    Object.values(sounds).forEach((sound: Sound) => {
      const isPlaying = sound.paths.reduce(
        (acc: Record<string, boolean>, curr: string) => ({ ...acc, [curr]: false }),
        {},
      );

      channels[sound.slug] = {
        id: sound.id,
        name: sound.name,
        slug: sound.slug,
        position: new Vector3(0, 0, 0),
        isPlaying,
        durations: new Array(sound.paths.length).fill(0),
        type: sound.type,
        paths: sound.paths.map((path: string) => `/audio/${soundTypeValues[sound.type]}/${path}`),
        currentPath: sound.paths[Math.floor(Math.random() * sound.paths.length)] || sound.paths[0],
        frequency: sound.frequency,
        area: sound.area,
        volume: sound.volume,
        mute: sound.mute,
      };
    });
    console.log(channels);
    return channels;
  }

  function buildSoundPool(sounds: Record<string, SoundChannel>) {
    const filteredSounds = Object.keys(sounds).filter(slug => {
      return currentScenario.sounds[slug].type === soundTypes.random;
    }); // Filter out background sounds
    const soundFreqs = filteredSounds.reduce((acc: Record<string, number>, curr: string) => {
      acc[curr] = Math.round(sounds[curr].frequency * 100);
      return acc;
    }, {}); // Get workable numbers from frequencies
    const result = Object.keys(soundFreqs).reduce((acc: string[], curr: string) => {
      const newItems = new Array(soundFreqs[curr]).fill(curr);
      return acc.concat(newItems);
    }, []); // Build array of proprtional amounts of each sound
    return result;
  } // Build pool of sounds, weighted by frequency

  function getRandomSound(): string {
    const aRandomSound: SoundChannel =
      soundChannels[soundPool[Math.floor(Math.random() * soundPool.length)]];
    // if (aRandomSound.slug === lastSound && Object.keys(soundChannels).length > 1)
    //   return getRandomSound();
    return aRandomSound.slug;
  } // Pull random sound from pool - cannot be the same as lastSound

  function setPosition(slug: string, position: Vector3) {
    setSoundChannels((prevSoundChannels: Record<string, SoundChannel>) => {
      return { ...prevSoundChannels, [slug]: { ...prevSoundChannels[slug], position } };
    });
  }

  function play(slug: string, position?: Vector3, path?: string) {
    if (soundChannels[slug].mute) return;

    let _path: string = soundChannels[slug].paths[0]; // Fallback
    if (path) _path = path;

    const duration = soundChannels[slug].durations
      ? soundChannels[slug].durations[soundChannels[slug].paths.indexOf(_path)]
      : 5000;
    console.log(`Playing ${slug} with duration ${duration}`);

    setTimeout(() => {
      stop(slug);
    }, (duration as number) + 100);
    setSoundChannels((prevSoundChannels: Record<string, SoundChannel>) => {
      const newChannel: SoundChannel = {
        ...prevSoundChannels[slug],
        isPlaying: { ...prevSoundChannels[slug].isPlaying, [_path]: true },
        currentPath: path ? path : prevSoundChannels[slug].paths[0],
      };
      if (!!position) newChannel.position = position;
      return { ...prevSoundChannels, [slug]: newChannel };
    });
  }

  function stop(slug: string) {
    setSoundChannels((prevSoundChannels: Record<string, SoundChannel>) => {
      const isPlaying: Record<string, boolean> = Object.keys(
        prevSoundChannels[slug].isPlaying,
      ).reduce((acc: Record<string, boolean>, curr: string) => ({ ...acc, [curr]: false }), {});
      return {
        ...prevSoundChannels,
        [slug]: { ...prevSoundChannels[slug], isPlaying },
      };
    });
  }

  function setVolume(slug: string, volume: number) {
    setSoundChannels((prevSoundChannels: Record<string, SoundChannel>) => {
      return {
        ...prevSoundChannels,
        [slug]: { ...prevSoundChannels[slug], volume },
      };
    });
  }

  function setFrequency(slug: string, frequency: number) {
    setSoundChannels((prevSoundChannels: Record<string, SoundChannel>) => {
      return {
        ...prevSoundChannels,
        [slug]: { ...prevSoundChannels[slug], frequency },
      };
    });
  }

  function setMute(slug: string, mute: boolean) {
    setSoundChannels((prevSoundChannels: Record<string, SoundChannel>) => {
      const newChannel = { ...prevSoundChannels[slug], mute };
      if (isChannelPlaying(prevSoundChannels[slug]) && mute) {
        const isPlaying = prevSoundChannels[slug].paths.reduce(
          (acc: Record<string, boolean>, curr: string) => ({ ...acc, [curr]: false }),
          {},
        );
        newChannel.isPlaying = isPlaying;
      } else if (
        prevSoundChannels[slug].type === soundTypes.background &&
        isPlaying &&
        !isChannelPlaying(prevSoundChannels[slug]) &&
        !mute
      ) {
        const isPlaying = prevSoundChannels[slug].paths.reduce(
          (acc: Record<string, boolean>, curr: string) => ({ ...acc, [curr]: false }),
          {},
        );
        newChannel.isPlaying = isPlaying;
      }
      return {
        ...prevSoundChannels,
        [slug]: newChannel,
      };
    });
  }

  function reportDuration(slug: string, duration: number, index: number = 0) {
    console.log('report duration ', duration);
    setSoundChannels((prevSoundChannels: Record<string, SoundChannel>) => {
      const durations = prevSoundChannels[slug].durations;
      durations[index] = duration;
      return { ...prevSoundChannels, [slug]: { ...prevSoundChannels[slug], durations } };
    });
  }

  function getPosition(area: [number[], number[]]): Vector3 {
    // area = [minX, minY, minZ], [maxX, maxY, maxZ]
    const pos = [0, 0, 0].map((_, i: number) => {
      return Math.random() * (area[1][i] - area[0][i]) + area[0][i];
    });
    return new Vector3(pos[0], pos[1], pos[2]);
  }

  function getRandomPath(channel: SoundChannel, prevPath?: string): string {
    const newPath =
      channel.paths[Math.floor(Math.random() * channel.paths.length)] || channel.paths[0];
    if (prevPath && newPath === prevPath) return getRandomPath(channel, prevPath);
    return newPath;
  }

  function getNewTimerDelay() {
    return Math.random() * 5000 + 1000;
  }

  // function getNewDelay(channel: SoundChannel): number {
  //     const { duration, frequency } = channel;
  //     // Duration in ms
  //     // Frequency between 0 and 1 - 0 is never, 1 is always

  //     // If frequency is 0 or 1, it breaks everything, so trim 30ms off it
  //     const trimmedFreq = trimFreq(frequency, 0.03);

  //     // Set hard bounds for the delay and calculate range between them
  //     const hardMin = duration + 5000; // sound duration + 5 seconds
  //     const hardMax = duration + 30000; // sound duration +  30 seconds
  //     const hardDiff = hardMax - hardMin;

  //     // Get the opposite of the frequency, so that the lower the frequency, the higher the delay
  //     const inverseFrequency = 1 - trimmedFreq;

  //     // Establish seed point based on the inverse frequency and the range
  //     const seedPoint = hardMin + hardDiff * inverseFrequency;

  //     // Generate random number between +1 and -1
  //     const seed = Math.random() * 2 - 1;

  //     // Deviate from the seed point by 10% of the range * the seed
  //     const deviation = (hardDiff / 10) * seed;

  //     // Calculate delay based on seed point and deviation - clamp to hard bounds
  //     let delay = clamp(seedPoint + deviation, hardMin, hardMax);

  //     // If frequency is very high, delay is too low, so make some of the low ones higher by adding duration
  //     if (delay <= hardMin && Math.random() < 0.5) delay += duration;

  //     // console.log({
  //     //     hardMin: hardMin / 1000 + 's',
  //     //     hardMax: hardMax / 1000 + 's',
  //     //     seedPoint: seedPoint / 1000 + 's',
  //     //     seed,
  //     //     deviation: deviation / 1000 + 's',
  //     //     delay: delay / 1000 + 's',
  //     // });

  //     console.log((delay / 1000).toFixed(2) + 's');

  //     return delay;
  // }

  function startScenario() {
    console.log('starting scenario');

    Object.keys(soundChannels).forEach((slug: string) => {
      const { type } = soundChannels[slug];

      if (type === soundTypes.background) {
        console.log(`Playing ${slug}`);

        if (!isChannelPlaying(soundChannels[slug])) play(slug);
      }
    }); // Play all background sounds

    function tick() {
      clearTimeout(masterTimer.current); // Clear out old timer
      const slug: string = getRandomSound(); // Get new sound slug from pool
      const channelToPlay: SoundChannel = soundChannels[slug];
      console.log(`Playing ${slug}`); // Play
      if (!isChannelPlaying(channelToPlay))
        play(slug, getPosition(channelToPlay.area) as Vector3, getRandomPath(channelToPlay));
      setLastSound(slug);
      masterTimer.current = setTimeout(tick, getNewTimerDelay()); // Set new timer
    }

    masterTimer.current = setTimeout(tick, getNewTimerDelay()); // Set first timer
  }

  function stopScenario() {
    console.log('stopping scenario');
    global.clearTimeout(masterTimer.current);
    const newSoundChannels: Record<string, SoundChannel> = { ...soundChannels };
    Object.keys(soundChannels).forEach((slug: string) => {
      console.log(`Stopping ${slug}`);
      const isPlaying = newSoundChannels[slug].paths.reduce(
        (acc: Record<string, boolean>, curr: string) => ({ ...acc, [curr]: false }),
        {},
      );
      newSoundChannels[slug] = { ...newSoundChannels[slug], isPlaying };
    });
    setSoundChannels(newSoundChannels);
    setIsPlaying(false);
  }

  return {
    soundChannels,
    setPosition,
    play,
    stop,
    setVolume,
    setFrequency,
    setMute,
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
  setVolume: (slug: string, volume: number) => void;
  setFrequency: (slug: string, frequency: number) => void;
  setMute: (slug: string, mute: boolean) => void;
  reportDuration: (slug: string, duration: number) => void;
  startScenario: () => void;
  stopScenario: () => void;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
}

export default useScenario;
