import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { Vector3 } from 'three';
import { SoundChannel, soundTypes } from '../../types/Scenario';
import {
  buildSoundChannels,
  buildSoundPool,
  getNewTimerDelay,
  getPosition,
  getRandomPath,
  getRandomSound,
  isChannelPlaying,
  isEmpty,
  usePrevious,
} from '../../utils/utils';
import useSavedAndPresetScenarios from './useSavedAndPresetScenarios';

/* eslint-disable */
let timers: ReturnType<typeof setTimeout>[] = []; // Keep refs to timeouts here - gets cleared on stop
/* eslint-enable */

const useScenario = (scenarioSlug: string): UseScenarioProps => {
  const { currentScenario } = useSavedAndPresetScenarios(scenarioSlug);
  const [soundChannels, setSoundChannels] = useState<Record<string, SoundChannel>>({});
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [soundPool, setSoundPool] = useState<string[]>([]);

  /* eslint-disable */
  const masterTimer = useRef<ReturnType<typeof setTimeout>>(setTimeout(() => {}, 1)); // Main tick for triggering sounds
  /* eslint-enable */

  const prevProps = usePrevious({ scenarioName: scenarioSlug, soundChannels, isPlaying });

  function setPosition(slug: string, position: Vector3) {
    setSoundChannels((prevSoundChannels: Record<string, SoundChannel>) => {
      return { ...prevSoundChannels, [slug]: { ...prevSoundChannels[slug], position } };
    });
  }

  const stop = useCallback(
    (slug: string) => {
      if (!isEmpty(soundChannels)) {
        setSoundChannels((prevSoundChannels: Record<string, SoundChannel>) => {
          const isThisPlaying: Record<string, boolean> = Object.keys(
            prevSoundChannels[slug].isPlaying,
          ).reduce((acc: Record<string, boolean>, curr: string) => ({ ...acc, [curr]: false }), {});
          return {
            ...prevSoundChannels,
            [slug]: { ...prevSoundChannels[slug], isPlaying: isThisPlaying },
          };
        });
      }
    },
    [soundChannels],
  );

  const play = useCallback(
    (slug: string, position?: Vector3, path?: string) => {
      if (soundChannels[slug].mute) return;

      let intPath: string = soundChannels[slug].paths[0]; // Fallback
      if (path) intPath = path;

      const duration = soundChannels[slug].durations
        ? soundChannels[slug].durations[soundChannels[slug].paths.indexOf(intPath)]
        : 5000;

      const intTimer = setTimeout(() => {
        if (soundChannels[slug].type === soundTypes.random)
          try {
            stop(slug);
          } catch (e) {
            console.warn(`Failed to stop ${slug} in setTimeout`);
          }
      }, (duration as number) + 100);
      timers.push(intTimer);

      setSoundChannels((prevSoundChannels: Record<string, SoundChannel>) => {
        const newChannel: SoundChannel = {
          ...prevSoundChannels[slug],
          isPlaying: { ...prevSoundChannels[slug].isPlaying, [intPath]: true },
          currentPath: path || prevSoundChannels[slug].paths[0],
        };
        if (position) newChannel.position = position;
        return { ...prevSoundChannels, [slug]: newChannel };
      });
    },
    [soundChannels, stop],
  );

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
        const isThisPlaying = prevSoundChannels[slug].paths.reduce(
          (acc: Record<string, boolean>, curr: string) => ({ ...acc, [curr]: false }),
          {},
        );
        newChannel.isPlaying = isThisPlaying;
      } else if (
        prevSoundChannels[slug].type === soundTypes.background &&
        isPlaying &&
        !isChannelPlaying(prevSoundChannels[slug]) &&
        !mute
      ) {
        const isThisPlaying = prevSoundChannels[slug].paths.reduce(
          (acc: Record<string, boolean>, curr: string) => ({ ...acc, [curr]: true }),
          {},
        );
        newChannel.isPlaying = isThisPlaying;
      }
      return {
        ...prevSoundChannels,
        [slug]: newChannel,
      };
    });
  }

  function reportDuration(slug: string, duration: number, index = 0) {
    setSoundChannels((prevSoundChannels: Record<string, SoundChannel>) => {
      const { durations } = prevSoundChannels[slug];
      durations[index] = duration;
      return { ...prevSoundChannels, [slug]: { ...prevSoundChannels[slug], durations } };
    });
  }

  const startScenario = useCallback(() => {
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
      const slug: string = getRandomSound(soundChannels, soundPool); // Get new sound slug from pool
      const channelToPlay: SoundChannel = soundChannels[slug];
      console.log(`Playing ${slug}`); // Play
      if (!isChannelPlaying(channelToPlay))
        play(slug, getPosition(channelToPlay.area) as Vector3, getRandomPath(channelToPlay));
      masterTimer.current = setTimeout(tick, getNewTimerDelay()); // Set new timer
    }

    masterTimer.current = setTimeout(tick, getNewTimerDelay()); // Set first timer
  }, [play, soundChannels, soundPool]);

  /* eslint-disable */
  function stopScenario() {
    console.log('stopping scenario');
    global.clearTimeout(masterTimer.current);
    timers.forEach(t => clearTimeout(t));
    const newSoundChannels: Record<string, SoundChannel> = { ...soundChannels };
    Object.keys(soundChannels).forEach((slug: string) => {
      console.log(`Stopping ${slug}`);
      const isThisPlaying = newSoundChannels[slug].paths.reduce(
        (acc: Record<string, boolean>, curr: string) => ({ ...acc, [curr]: false }),
        {},
      );
      newSoundChannels[slug] = { ...newSoundChannels[slug], isPlaying: isThisPlaying };
    });
    setSoundChannels(newSoundChannels);
    setIsPlaying(false);
  }
  /* eslint-enable */

  useEffect(() => {
    /* eslint-disable */
    masterTimer.current = setTimeout(() => {}, 1); // Init master timer on mount
    /* eslint-enable */

    return () => {
      stopScenario(); // Stop scenario on unmount
      clearTimeout(masterTimer.current); // Clear master timer on unmount
    };
    /* eslint-disable */
  }, []);
  /* eslint-enable */

  useEffect(() => {
    stopScenario(); // Stop scenario on load (precaution)
    const channels: Record<string, SoundChannel> = buildSoundChannels(currentScenario.sounds);
    setSoundPool(buildSoundPool(channels, currentScenario));
    setSoundChannels(channels);
    /* eslint-disable */
  }, []);
  /* eslint-enable */

  useEffect(() => {
    if (scenarioSlug !== prevProps.scenarioName) {
      stopScenario();
      console.log('Rebuilding...');
      const channels: Record<string, SoundChannel> = buildSoundChannels(currentScenario.sounds);
      setSoundPool(buildSoundPool(channels, currentScenario));
      setSoundChannels(channels);
    }
    /* eslint-disable */
  }, [scenarioSlug, prevProps.scenarioName]);
  /* eslint-enable */

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
      if (prevChannelFreqs !== channelFreqs)
        setSoundPool(buildSoundPool(soundChannels, currentScenario)); // Rebuild soundPool on freq changes
    }
    /* eslint-disable */
  }, [soundChannels, prevProps, isPlaying]);
  /* eslint-enable */

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
