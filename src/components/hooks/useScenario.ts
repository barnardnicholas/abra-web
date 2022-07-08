import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Vector3 } from 'three';
import scenarios from '../../constants/scenarios';
import {
  setIsPlaying,
  setLastSound,
  setSoundChannels,
  setSoundPool,
} from '../../redux/actions/currentScenario';
import {
  getIsPlaying,
  getLastSound,
  getSoundChannels,
  getSoundPool,
} from '../../redux/selectors/currentScenario';
import { Scenario, Sound, SoundChannel, soundTypes, soundTypeValues } from '../../types/Scenario';
import { isEmpty, usePrevious } from '../../utils/utils';

const useScenario = (scenarioName: string): UseScenarioProps => {
  const dispatch = useDispatch();

  const soundChannels = useSelector(getSoundChannels);
  const isPlaying = useSelector(getIsPlaying);
  const soundPool = useSelector(getSoundPool);
  const lastSound = useSelector(getLastSound);

  const scenario: Scenario = scenarios[scenarioName];
  // const [soundChannels, setSoundChannels] = useState<Record<string, SoundChannel>>({});
  // const [isPlaying, setIsPlaying] = useState<boolean>(false);
  // const [soundPool, setSoundPool] = useState<string[]>([]);
  // const [lastSound, setLastSound] = useState<string | null>(null);

  let masterTimer = useRef<ReturnType<typeof setTimeout>>(setTimeout(() => {}, 1));

  const prevProps = usePrevious({ scenarioName, soundChannels, isPlaying });

  useEffect(() => {
    masterTimer.current = setTimeout(() => {}, 1);

    return () => {
      stopScenario();
      clearTimeout(masterTimer.current);
    };
  }, []);

  useEffect(() => {
    stopScenario();
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
        area: sound.area,
        volume: sound.volume,
        mute: sound.mute,
      };
    });

    dispatch(setSoundPool(buildSoundPool(scenario.sounds)));
    dispatch(setSoundChannels(channels));
  }, []);

  useEffect(() => {
    if (scenarioName !== prevProps.scenarioName) {
      stopScenario();
      console.log('Rebuilding...');
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
          area: sound.area,
          volume: sound.volume,
          mute: sound.mute,
        };
      });

      dispatch(setSoundPool(buildSoundPool(scenario.sounds)));
      dispatch(setSoundChannels(channels));
    }
  }, [scenarioName, prevProps.scenarioName]);

  useEffect(() => {
    if (!isEmpty(soundChannels) && isPlaying && !prevProps.isPlaying) startScenario();
    else if (!isEmpty(soundChannels) && !isPlaying && prevProps.isPlaying) stopScenario();
  }, [soundChannels, prevProps, isPlaying]);

  function buildSoundPool(sounds: Record<string, Sound>) {
    const filteredSounds = Object.keys(sounds).filter(slug => {
      return scenario.sounds[slug].type === soundTypes.random;
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
    if (aRandomSound.slug === lastSound) return getRandomSound();
    return aRandomSound.slug;
  } // Pull random sound from pool - cannot be the same as lastSound

  function setPosition(slug: string, position: Vector3) {
    dispatch(setSoundChannels({ ...soundChannels, [slug]: { ...soundChannels[slug], position } }));
  }

  function play(slug: string, position?: Vector3) {
    if (soundChannels[slug].mute) return;
    if (!!position) {
      const duration = soundChannels[slug].duration ? soundChannels[slug].duration : 5000;
      setTimeout(() => {
        stop(slug);
      }, (duration as number) + 100);
    }
    const prevSoundChannels = { ...soundChannels };
    const newChannel = { ...prevSoundChannels[slug], isPlaying: true };
    if (!!position) newChannel.position = position;
    dispatch(setSoundChannels({ ...soundChannels, [slug]: newChannel }));
  }

  function stop(slug: string) {
    dispatch(
      setSoundChannels({
        ...soundChannels,
        [slug]: { ...soundChannels[slug], isPlaying: false },
      }),
    );
  }

  function setVolume(slug: string, volume: number) {
    dispatch(
      setSoundChannels({
        ...soundChannels,
        [slug]: { ...soundChannels[slug], volume },
      }),
    );
  }

  function setFrequency(slug: string, frequency: number) {
    dispatch(
      setSoundChannels({
        ...soundChannels,
        [slug]: { ...soundChannels[slug], frequency },
      }),
    );
  }

  function setMute(slug: string, mute: boolean) {
    const prevSoundChannels = { ...soundChannels };
    const newChannel = { ...prevSoundChannels[slug], mute };
    if (prevSoundChannels[slug].isPlaying && mute) newChannel.isPlaying = false;
    else if (
      prevSoundChannels[slug].type === soundTypes.background &&
      isPlaying &&
      !prevSoundChannels[slug].isPlaying &&
      !mute
    )
      newChannel.isPlaying = true;
    dispatch(
      setSoundChannels({
        ...prevSoundChannels,
        [slug]: newChannel,
      }),
    );
  }

  function reportDuration(slug: string, duration: number) {
    dispatch(setSoundChannels({ ...soundChannels, [slug]: { ...soundChannels[slug], duration } }));
  }

  function getPosition(area: [number[], number[]]): Vector3 {
    // area = [minX, minY, minZ], [maxX, maxY, maxZ]
    const pos = [0, 0, 0].map((_, i: number) => {
      return Math.random() * (area[1][i] - area[0][i]) + area[0][i];
    });
    return new Vector3(pos[0], pos[1], pos[2]);
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
      const { type, isPlaying } = soundChannels[slug];

      if (type === soundTypes.background) {
        console.log(`Playing ${slug}`);

        if (!isPlaying) play(slug);
      }
    }); // Play all background sounds

    function tick() {
      clearTimeout(masterTimer.current); // Clear out old timer
      const slug: string = getRandomSound(); // Get new sound slug from pool
      const channelToPlay: SoundChannel = soundChannels[slug];
      console.log(`Playing ${slug}`); // Play
      const { isPlaying, area } = channelToPlay;
      if (!isPlaying) play(slug, getPosition(area) as Vector3);
      dispatch(setLastSound(slug));
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
      newSoundChannels[slug] = { ...newSoundChannels[slug], isPlaying: false };
    });
    dispatch(setSoundChannels(newSoundChannels));
    dispatch(setIsPlaying(false));
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
    // setIsPlaying,
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
  // setIsPlaying: Dispatch<SetStateAction<boolean>>;
}

export default useScenario;
