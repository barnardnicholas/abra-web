import { useRef, useEffect } from 'react';
import { Vector3 } from 'three';
import { Sound, SoundChannel, soundTypeValues } from '../types/Scenario';
import { minLowFreq, maxLowFreq, minHighFreq, maxHighFreq } from '../constants/timers';

/**
 * Use in React Components for prevProps
 * @param {any} value - Value to reference
 * @return {any} Reference to value
 */
/* eslint-disable */
export function usePrevious(value: any) {
  const ref = useRef<any>(value);
  /* eslint-enable */

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

/**
 * Helper for detecting objects (not arrays or null)
 * @param {Object} obj - Obj to examine
 * @return {boolean} True if object, false if not object
 */
export function isObj(obj: Record<string, unknown>): boolean {
  return typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
}

/**
 * Helper for detecting empty objects
 * @param {Object} obj - Obj to examine
 * @return {boolean} True if empty, false if not empty
 */
export function isObjEmpty(obj: Record<string, unknown>): boolean {
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i += 1) {
    if (Object.prototype.hasOwnProperty.call(obj, keys[i])) return false;
  }
  return true;
}

/**
 * General helper for measuring emptiness of variables - can mean empty or falsy, depending on type
 * @param {any} item - variable to examine
 * @return {boolean} True
 */
export function isEmpty(item: unknown): boolean {
  if (Array.isArray(item)) return !item.length;
  if (typeof item === 'string') return !item.trim().length;
  if (item instanceof Date) return Number.isNaN(item.valueOf());
  if (typeof item === 'object') return isObjEmpty(item as Record<string, unknown>);
  if (typeof item === 'number') return false;

  return !item;
}

/**
 * General helper to compre two arrays to a set depth of nesting
 * @param {Array} arr1 - first array to compare
 * @param {Array} arr2 - second array to compare
 * @param {number} [depth] - level of nesting (optional)
 * @return {boolean} True if equal, false if not equal
 */
export function areArraysEqual(arr1: unknown[], arr2: unknown[], depth?: number) {
  if (arr1.length !== arr2.length) return false;
  let intDepth = 1;
  /* eslint-disable */
  if (!!depth) intDepth = depth;
  const check = (arr1: unknown[], arr2: unknown[], depth: number): boolean => {
    /* eslint-enable */
    return arr1.reduce((acc: boolean, curr: unknown, index: number) => {
      if (typeof arr2[index] !== typeof curr) return false;
      if (depth <= 1 && arr2[index] !== curr) return false;
      if (depth > 1 && Array.isArray(arr2[index]) && Array.isArray(curr)) {
        return check(arr2[index] as unknown[], curr as unknown[], depth - 1);
      }
      return acc;
    }, true);
  };

  return check(arr1, arr2, intDepth);
}

/**
 * General helper to compre two objects to a set depth of nesting
 * @param {Array} arr1 - first array to compare
 * @param {Array} arr2 - second array to compare
 * @param {number} [depth] - level of nesting (optional)
 * @return {boolean} True if equal, false if not equal
 */
export function areObjectsEqual(
  obj1: Record<string, unknown>,
  obj2: Record<string, unknown>,
  depth?: number,
) {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
  if (!areArraysEqual(Object.keys(obj1), Object.keys(obj2))) return false;

  let intDepth = 1;
  /* eslint-disable */
  if (!!depth) intDepth = depth;

  const check = (
    obj1: Record<string, unknown>,
    obj2: Record<string, unknown>,
    depth: number,
  ): boolean => {
    /* eslint-enable */
    return Object.keys(obj1).reduce((acc: boolean, curr: string) => {
      if (typeof obj2[curr] !== typeof obj1[curr]) return false;
      if (depth <= 1 && obj2[curr] !== obj1[curr]) return false;
      if (
        depth > 1 &&
        isObj(obj2[curr] as Record<string, unknown>) &&
        isObj(obj1[curr] as Record<string, unknown>)
      ) {
        return check(
          obj2[curr] as Record<string, unknown>,
          obj1[curr] as Record<string, unknown>,
          depth - 1,
        );
      }
      return acc;
    }, true);
  };

  return check(obj1, obj2, intDepth);
}

/**
 * Given a channel object, determine whether any sound for that channel is playing
 * @param {SoundChannel} channel - Value to clamp
 * @return {boolean} True if playing, false if not playing
 */
export function isChannelPlaying(channel: SoundChannel) {
  return Object.values(channel.isPlaying).some(p => !!p);
}

/**
 * Given a saved/preset scenarios sounds, construct channels object for state
 * @param {Record<string, Sound>} sounds - sounds array from scenario data
 * @return {Record<string, SoundChannel>} Constructed object to be saved to state
 */
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
      currentPath: `/audio/${soundTypeValues[sound.type]}/${
        sound.paths[Math.floor(Math.random() * sound.paths.length)] || sound.paths[0]
      }`,
      frequency: sound.frequency,
      area: sound.area,
      volume: sound.volume,
      mute: sound.mute,
    };
  });
  return channels;
}

/**
 * Given a channels area bounds, return a random useable position which Three can use to place sounds
 * @param {[number[], number[]]} area - The max area bounds from channel data
 * @return {Vector3} Randomly-generated Vector3 position within bounds
 */
export function getPosition(area: [number[], number[]]): Vector3 {
  // area = [minX, minY, minZ], [maxX, maxY, maxZ]
  const pos = [0, 0, 0].map((_, i: number) => {
    return Math.random() * (area[1][i] - area[0][i]) + area[0][i];
  });
  return new Vector3(pos[0], pos[1], pos[2]);
}

/**
 * Given a channel, select a random path from its list of sounds and return it. If prevPath is provided, will recursively re-run until different sound is selected
 * @param {SoundChannel} channel - The channel to reference
 * @return {string} A valid audio path from the channels list of sounds
 */
export function getRandomPath(channel: SoundChannel, prevPath?: string): string {
  const newPath =
    channel.paths[Math.floor(Math.random() * channel.paths.length)] || channel.paths[0];
  if (prevPath && newPath === prevPath) return getRandomPath(channel, prevPath);
  return newPath;
}

/**
 * Given min & max intervals in MS, generate a weighted array of possible intervals which favours shorter sounds according to a curve function
 * @param {number} minMs - Minimum MS interval
 * @param {number} maxMs - Maximum MS interval
 * @return {number[]} Array of incremental values - more favoured values will be duplicated according to curve
 */
export function buildWeightedTimerArray(minMs: number, maxMs: number): number[] {
  // create an array containing possible times at equal increments
  // make more low values than high ones according to a curve
  const length = 100;
  return new Array(length).fill(minMs).reduce((acc: number[], curr: number, index: number) => {
    const multiplier = Math.ceil((Math.sqrt(length - index) * (length + index) * 1.5) / 100); // how many elements to add?
    const thisValue = curr + (index / length) * (maxMs - minMs);
    return acc.concat(new Array(multiplier).fill(thisValue));
  }, []);
}

/**
 * Given a channel frequency (float), generate a new interval in MS for triggering the next sound event.
 * @param {float} frequency - Channel frequency - 1 = often, 0 = rarely
 * @param {number[]} [durations] - Array of sound durations in MS. If provided, result will not be less than max duration
 * @return {number} Time interval in MS
 */
export function getNewChannelDelay(frequency: number, durations?: number[]) {
  const invFreq = 1 - frequency; // Invert freq for use in maths
  let minTime = minHighFreq + (minLowFreq - minHighFreq) * invFreq;
  let maxTime = maxHighFreq + (maxLowFreq - maxHighFreq) * invFreq;
  if (Array.isArray(durations) && durations.length) {
    const highestDuration: number = durations.reduce((acc: number, curr: number) => {
      if (acc < curr) return curr;
      return acc;
    }, 0);
    if (minTime < highestDuration + 1000) minTime = highestDuration + 1000;
    if (maxTime < highestDuration + 4000) maxTime = highestDuration + 4000;
  } // Override min & max if durations invalidate them
  const timeArr = buildWeightedTimerArray(minTime, maxTime);
  return timeArr[Math.floor(Math.random() * timeArr.length)];
}

/**
 * For use on THREE mouse object - calculate the distance of the mouse pointer from the center of the canvas.
 * @param {float} x - THREE.mouse.x from useThree.mouse
 * @param {float} y - THREE.mouse.y from useThree.mouse
 * @return {float} Distance from canvas center - positive float number
 */
export function getMouseDistanceFromCenter(x: number, y: number): number {
  let localX = x;
  let localY = y;
  if (localX < 0) localX *= -1;
  if (localY < 0) localY *= -1;
  return Math.sqrt(localX * localX + localY * localY);
}
