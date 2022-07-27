import { Scenario, soundTypes } from '../../types/Scenario';

const ocean: Scenario = {
  id: 1,
  name: 'Ocean',
  slug: 'ocean',
  description: 'Ocean waves with seagulls',
  sounds: {
    waves1: {
      id: 0,
      slug: 'waves1',
      name: 'Waves 1',
      type: soundTypes.background,
      paths: ['ocean-waves-1.mp3'],
      volume: 0.75,
      frequency: 0,
      area: [
        [-0.25, 0, 0],
        [-0.25, 0, 0],
      ],
      mute: false,
    },
    waves2: {
      id: 1,
      slug: 'waves2',
      name: 'Waves 2',
      type: soundTypes.background,
      paths: ['ocean-waves-2.mp3'],
      volume: 0.75,
      frequency: 0,
      area: [
        [0.25, 0, 0],
        [0.25, 0, 0],
      ],
      mute: false,
    },
    seagulls: {
      id: 2,
      slug: 'seagulls',
      name: 'Seagulls',
      type: soundTypes.random,
      paths: [
        'seagull/seagull-1.mp3',
        'seagull/seagull-2.mp3',
        'seagull/seagull-3.mp3',
        'seagull/seagull-4.mp3',
        'seagull/seagull-5.mp3',
        'seagull/seagull-6.mp3',
        'seagull/seagull-7.mp3',
        'seagull/seagull-8.mp3',
        'seagull/seagull-9.mp3',
        'seagull/seagull-10.mp3',
        'seagull/seagull-11.mp3',
        'seagull/seagull-12.mp3',
        'seagull/seagull-13.mp3',
        'seagull/seagull-14.mp3',
        'seagull/gull-1.mp3',
        'seagull/gull-2.mp3',
        'seagull/gull-3.mp3',
        'seagull/seagulls-flap.mp3',
      ],
      volume: 0.5,
      frequency: 0.25,
      area: [
        [-2, 2, -2],
        [2, 2, 2],
      ],
      mute: false,
    },
  },
};

export default ocean;
