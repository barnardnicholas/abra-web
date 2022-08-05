import dayjs from 'dayjs';
import { useRef, useEffect } from 'react';
import { Vector3 } from 'three';
import { Scenario, Sound, SoundChannel, soundTypes, soundTypeValues } from '../types/Scenario';
import { minLowFreq, maxLowFreq, minHighFreq, maxHighFreq } from '../constants/timers';

/* eslint-disable */
export function usePrevious(value: any) {
  const ref = useRef<any>(value);
  /* eslint-enable */

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

export function isObjEmpty(obj: Record<string, unknown>): boolean {
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i += 1) {
    if (Object.prototype.hasOwnProperty.call(obj, keys[i])) return false;
  }
  return true;
}

/* eslint-disable */
export function isEmpty(item: any): boolean {
  /* eslint-enable */
  if (Array.isArray(item)) return !item.length;
  if (typeof item === 'string') return !item.trim().length;
  if (item instanceof Date) return Number.isNaN(item.valueOf());
  if (typeof item === 'object') return isObjEmpty(item);
  if (typeof item === 'number') return false;

  return !item;
}

export function areArraysEqual(arr1: any[], arr2: any[]): boolean {
  // Compare two non-nested arrays
  if (arr1.length !== arr2.length) return false;
  return arr1.reduce((acc: boolean, curr: any, i: number) => {
    let localAcc = acc;
    if (arr2[i] !== curr) localAcc = false;
    return localAcc;
  }, true);
}

export function getRandomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function trimFreq(freq: number, deviation = 0.03): number {
  if (freq > 1 - deviation) return 1 - deviation;
  if (freq < deviation) return deviation;
  return freq;
}

export function isChannelPlaying(channel: SoundChannel) {
  return Object.values(channel.isPlaying).some(p => !!p);
}

export function buildSoundChannels(sounds: Record<string, Sound>): Record<string, SoundChannel> {
  const channels: Record<string, SoundChannel> = {};
  Object.values(sounds).forEach((sound: Sound) => {
    const isPlayingObj = sound.paths.reduce(
      (acc: Record<string, boolean>, curr: string) => ({
        ...acc,
        [`/audio/${soundTypeValues[sound.type]}/${curr}`]: false,
      }),
      {},
    );

    channels[sound.slug] = {
      id: sound.id,
      name: sound.name,
      slug: sound.slug,
      position: new Vector3(0, 0, 0),
      isPlaying: isPlayingObj,
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
  return channels;
}

export function buildSoundPool(sounds: Record<string, SoundChannel>, currentScenario: Scenario) {
  const filteredSounds = Object.keys(sounds).filter(slug => {
    return (
      !!currentScenario.sounds[slug] && currentScenario.sounds[slug].type === soundTypes.random
    );
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

export function getRandomSound(soundChannels: Record<string, SoundChannel>, soundPool: string[]) {
  const aRandomSound: SoundChannel =
    soundChannels[soundPool[Math.floor(Math.random() * soundPool.length)]];
  // if (aRandomSound.slug === lastSound && Object.keys(soundChannels).length > 1)
  //   return getRandomSound();
  return aRandomSound.slug;
} // Pull random sound from pool - cannot be the same as lastSound

export function getPosition(area: [number[], number[]]): Vector3 {
  // area = [minX, minY, minZ], [maxX, maxY, maxZ]
  const pos = [0, 0, 0].map((_, i: number) => {
    return Math.random() * (area[1][i] - area[0][i]) + area[0][i];
  });
  return new Vector3(pos[0], pos[1], pos[2]);
}

export function getRandomPath(channel: SoundChannel, prevPath?: string): string {
  const newPath =
    channel.paths[Math.floor(Math.random() * channel.paths.length)] || channel.paths[0];
  if (prevPath && newPath === prevPath) return getRandomPath(channel, prevPath);
  return newPath;
}

function buildWeightedTimerArray(minMs: number, maxMs: number): number[] {
  // create an array containing 100 possible times at equal increments
  // make more low values than high ones according to a curve
  const length = 100;
  return new Array(length).fill(minMs).reduce((acc: number[], curr: number, index: number) => {
    const multiplier = Math.ceil((Math.sqrt(length - index) * (length + index) * 1.5) / 100); // how many elements to add?
    const thisValue = curr + (index / length) * (maxMs - minMs);
    return acc.concat(new Array(multiplier).fill(thisValue));
  }, []);
}

export function getNewChannelDelay(frequency: number) {
  const invFreq = 1 - frequency; // Invert freq for use in maths
  const minTime = minHighFreq + (minLowFreq - minHighFreq) * invFreq;
  const maxTime = maxHighFreq + (maxLowFreq - maxHighFreq) * invFreq;
  const timeArr = buildWeightedTimerArray(minTime, maxTime);
  return timeArr[Math.floor(Math.random() * timeArr.length)];
}

export function getPlayPositionPercent(durationMs: number, lastPlayedMs: number | null): number {
  if (!durationMs || !lastPlayedMs || Number.isNaN(lastPlayedMs) || Number.isNaN(durationMs))
    return 0;
  const now = dayjs().valueOf(); // MS now
  const dMs = now - lastPlayedMs;
  if (dMs > durationMs) return 100;
  return Math.floor(dMs / (durationMs / 100));
}

export function getMouseDistanceFromCenter(x: number, y: number): number {
  let localX = x;
  let localY = y;
  if (localX < 0) localX *= -1;
  if (localY < 0) localY *= -1;
  return Math.sqrt(localX * localX + localY * localY);
}
