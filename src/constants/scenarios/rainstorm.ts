import { Scenario, soundTypes } from '../../types/Scenario';

const rainstorm: Scenario = {
  id: 1,
  name: 'Rainstorm',
  slug: 'rainstorm',
  description: 'Calming rainstorm',
  sounds: {
    rain1: {
      id: 0,
      slug: 'rain1',
      name: 'Rain 1',
      type: soundTypes.background,
      paths: ['rain-1.ogg'],
      volume: 0.75,
      frequency: 0,
      area: [
        [-0.5, 0, 0],
        [-0.5, 0, 0],
      ],
      mute: false,
    },
    rain2: {
      id: 1,
      slug: 'rain2',
      name: 'Rain 2',
      type: soundTypes.background,
      paths: ['rain-2.ogg'],
      volume: 0.5,
      frequency: 0,
      area: [
        [0.5, 0, 0],
        [0.5, 0, 0],
      ],
      mute: false,
    },
    thunder: {
      id: 2,
      slug: 'thunder',
      name: 'Thunder',
      type: soundTypes.random,
      paths: ['thunder/thunder-1.mp3', 'thunder/thunder-2.mp3', 'thunder/thunder-3.mp3'],
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

export default rainstorm;
