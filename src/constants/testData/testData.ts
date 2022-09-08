import { Vector3 } from 'three';
import { SoundChannel, soundTypes, soundTypeValues } from '../../types/Scenario';

export const paths = ['slug1.mp3', 'slug2.mp3', 'slug3.mp3'];

export const testChannel: SoundChannel = {
  id: 0,
  name: 'Name',
  slug: 'slug',
  position: new Vector3(0, 0, 0),
  isPlaying: paths.reduce((acc: Record<string, boolean>, curr: string, index: number) => {
    return { ...acc, [curr]: index === 1 ? true : false };
  }, {}),
  durations: new Array(paths.length).fill(0),
  type: soundTypes.random,
  paths: paths.map((path: string) => `/audio/${soundTypeValues[soundTypes.random]}/${path}`),
  currentPath: paths[Math.floor(Math.random() * paths.length)] || paths[0],
  frequency: 0.5,
  area: [
    [0, 0, 0],
    [0, 0, 0],
  ],
  volume: 0.5,
  mute: false,
};
