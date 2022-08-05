import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { Vector3 } from 'three';
// import { getConcurrentAudio } from '../../redux/selectors/debug';
import { SoundChannel, soundTypes } from '../../types/Scenario';
import useSavedAndPresetScenarios from './useSavedAndPresetScenarios';
import {
  buildSoundChannels,
  getNewChannelDelay,
  getPosition,
  getRandomPath,
  isChannelPlaying,
  isEmpty,
  usePrevious,
} from '../../utils/utils';

/* eslint-disable */
let playTimers: ReturnType<typeof setTimeout>[] = []; // Keep refs to timeouts here - gets cleared on stop
/* eslint-enable */

const channelClocks: Record<string, ReturnType<typeof setTimeout>> = {}; // channel clocks for concurrent timing

interface ChannelRef {
  frequency: number;
  isPlaying: boolean;
}
let channelRefs: Record<string, ChannelRef> = {}; // hoisted ref for frequency/isPlaying - tick doesn't read updated state

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

const useScenario = (scenarioSlug: string): UseScenarioProps => {
  const { currentScenario } = useSavedAndPresetScenarios(scenarioSlug);
  const [soundChannels, setSoundChannels] = useState<Record<string, SoundChannel>>({});
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  /* eslint-disable */
  const masterTimer = useRef<ReturnType<typeof setTimeout>>(setTimeout(() => {}, 1)); // Main tick for triggering sounds
  /* eslint-enable */

  const prevProps = usePrevious({ scenarioName: scenarioSlug, soundChannels, isPlaying });

  /**
   * Set the position of a sound in scenario state
   * @param {string} slug - ID slug of channel
   * @param {Vector3} position - new position of channel
   * @return {void} Nothing
   */
  function setPosition(slug: string, position: Vector3) {
    setSoundChannels((prevSoundChannels: Record<string, SoundChannel>) => {
      return { ...prevSoundChannels, [slug]: { ...prevSoundChannels[slug], position } };
    });
  }

  /**
   * Stop a sound channel
   * @param {string} slug - ID slug of channel
   * @return {void} Nothing
   */
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

  /**
   * Play a sound channel
   * @param {string} slug - ID slug of channel
   * @param {Vector3} [position] - Optional position to set
   * @param {string} [path] - Optional audio path
   * @return {void} Nothing
   */
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
      playTimers.push(intTimer);

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

  /**
   * Update the volume of a channel
   * @param {string} slug - ID slug of channel
   * @param {float} volume - New volume
   * @return {void} Nothing
   */
  function setVolume(slug: string, volume: number) {
    setSoundChannels((prevSoundChannels: Record<string, SoundChannel>) => {
      return {
        ...prevSoundChannels,
        [slug]: { ...prevSoundChannels[slug], volume },
      };
    });
  }

  /**
   * Update the frequency of a channel
   * @param {string} slug - ID slug of channel
   * @param {float} frequency - New frequency
   * @return {void} Nothing
   */
  function setFrequency(slug: string, frequency: number) {
    setSoundChannels((prevSoundChannels: Record<string, SoundChannel>) => {
      return {
        ...prevSoundChannels,
        [slug]: { ...prevSoundChannels[slug], frequency },
      };
    });
  }

  /**
   * Update the mute state of a channel
   * @param {string} slug - ID slug of channel
   * @param {boolean} mute - New mute state
   * @return {void} Nothing
   */
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

  /**
   * When sounds have loaded, this callback reports the durations of the audio files
   * @param {string} slug - ID slug of channel
   * @param {number} duration - duration in MS
   * @param {number} index - index of the sound file
   * @return {void} Nothing
   */
  function reportDuration(slug: string, duration: number, index = 0) {
    setSoundChannels((prevSoundChannels: Record<string, SoundChannel>) => {
      const { durations } = prevSoundChannels[slug];
      durations[index] = duration;
      return { ...prevSoundChannels, [slug]: { ...prevSoundChannels[slug], durations } };
    });
  }

  /**
   * Start the scenario playing
   * @return {void} Nothing
   */
  const startScenario = useCallback(() => {
    Object.keys(soundChannels).forEach((slug: string) => {
      const { type } = soundChannels[slug];

      if (type === soundTypes.background) {
        if (!isChannelPlaying(soundChannels[slug])) play(slug);
      } else {
        /* eslint-disable */
        channelClocks[slug] = setTimeout(() => {}, 1);
        /* eslint-enable */

        const tick = () => {
          clearTimeout(channelClocks[slug]); // Clear out old timer
          if (!isChannelPlaying(soundChannels[slug]))
            play(
              slug,
              getPosition(soundChannels[slug].area) as Vector3,
              getRandomPath(soundChannels[slug]),
            );

          const newDelay = getNewChannelDelay(channelRefs[slug].frequency);
          console.log(`${slug} - ${channelRefs[slug].frequency} - ${newDelay}`);
          channelClocks[slug] = setTimeout(tick, newDelay); // Set new timer
        };

        const channelToPlay: SoundChannel = soundChannels[slug];
        const newDelay = getNewChannelDelay(channelToPlay.frequency);
        console.log(`${slug} - ${channelToPlay.frequency} - ${newDelay}`);
        channelClocks[slug] = setTimeout(
          tick,
          getNewChannelDelay(
            channelToPlay.frequency + Math.random() * (1 - channelToPlay.frequency),
          ),
        ); // Set first timer - delays will be shorter for first time around
      }
    }); // Play all background sounds, start clocks for random sounds
    /* eslint-disable */
  }, [play, soundChannels]);
  /* eslint-enable */

  /**
   * Stop the scenario
   * @return {void} Nothing
   */
  /* eslint-disable */
  function stopScenario() {
    Object.values(channelClocks).forEach(value => clearTimeout(value)); // Clear out channel clocks

    playTimers.forEach(t => clearTimeout(t)); // Clear out play timers

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
    if (soundChannels !== prevProps.soundChannels) {
      const newRefs = Object.keys(soundChannels).reduce((acc, curr: string) => {
        return {
          ...acc,
          [curr]: {
            frequency: soundChannels[curr].frequency,
            isPlaying: soundChannels[curr].isPlaying,
          },
        };
      }, {});
      channelRefs = newRefs;
    }
  }, [soundChannels, prevProps.soundChannels]);

  useEffect(() => {
    stopScenario(); // Stop scenario on load (precaution)
    const channels: Record<string, SoundChannel> = buildSoundChannels(currentScenario.sounds);
    setSoundChannels(channels);
    /* eslint-disable */
  }, []);
  /* eslint-enable */

  useEffect(() => {
    if (scenarioSlug !== prevProps.scenarioName) {
      stopScenario();
      const channels: Record<string, SoundChannel> = buildSoundChannels(currentScenario.sounds);
      setSoundChannels(channels);
    }
    /* eslint-disable */
  }, [scenarioSlug, prevProps.scenarioName]);
  /* eslint-enable */

  useEffect(() => {
    if (!isEmpty(soundChannels) && isPlaying && !prevProps.isPlaying) startScenario();
    else if (!isEmpty(soundChannels) && !isPlaying && prevProps.isPlaying) stopScenario();
    /* eslint-disable */
  }, [soundChannels, prevProps, isPlaying]);
  /* eslint-enable */

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

export default useScenario;
