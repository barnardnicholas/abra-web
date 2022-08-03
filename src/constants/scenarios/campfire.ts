import { Scenario, soundTypes } from '../../types/Scenario';

const campfire: Scenario = {
  id: 1,
  name: 'Campfire',
  slug: 'campfire',
  description: 'Campfire with crickets',
  sounds: {
    rumblingFire: {
      id: 0,
      slug: 'rumblingFire',
      name: 'Rumbling Fire',
      type: soundTypes.background,
      paths: ['rumbling-fire.mp3'],
      volume: 0.9,
      frequency: 0,
      area: [
        [0, 0, 0],
        [0, 0, 0],
      ],
      mute: false,
    },
    campfire: {
      id: 1,
      slug: 'campfire',
      name: 'Campfire',
      type: soundTypes.background,
      paths: ['campfire.mp3'],
      volume: 0.75,
      frequency: 0,
      area: [
        [-0.5, 0, 0],
        [-0.5, 0, 0],
      ],
      mute: false,
    },
    crickets: {
      id: 2,
      slug: 'crickets',
      name: 'Crickets',
      type: soundTypes.background,
      paths: ['crickets.mp3'],
      volume: 0.1,
      frequency: 0,
      area: [
        [0.5, 0, 0],
        [0.5, 0, 0],
      ],
      mute: false,
    },
    fireBurst: {
      id: 3,
      slug: 'fireBurst',
      name: 'Fire Burst',
      type: soundTypes.random,
      paths: [
        'fire-burst/fire-burst-1.mp3',
        'fire-burst/fire-burst-2.mp3',
        'fire-burst/fire-burst-3.mp3',
      ],
      volume: 0.75,
      frequency: 0.1,
      area: [
        [-2, 1, -2],
        [2, 2, 2],
      ],
      mute: false,
    },
  },
};

export default campfire;
