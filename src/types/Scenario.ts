import { Vector3 } from 'three';

export interface Scenario {
  id: number;
  name: string;
  slug: string;
  description: string;
  sounds: Record<string, Sound>;
}

export interface Sound {
  id: number;
  slug: string;
  name: string;
  type: soundTypes;
  paths: string[];
  volume: number;
  frequency: number;
  area: [number[], number[]]; // [minX, minY, minZ], [maxX, maxY, maxZ]
  mute: boolean;
}

export interface SoundChannel {
  id: number;
  name: string;
  slug: string;
  position: Vector3;
  isPlaying: boolean;
  durations: number[];
  type: soundTypes;
  paths: string[];
  currentPath: string | null;
  frequency: number;
  area: [number[], number[]];
  volume: number;
  mute: boolean;
}

export enum soundTypes {
  background = 1,
  random = 2,
}

export const soundTypeValues = {
  [soundTypes.background]: 'background',
  [soundTypes.random]: 'random',
};
