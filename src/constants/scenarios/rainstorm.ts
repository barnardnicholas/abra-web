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
            path: 'rain-1.ogg',
            volume: 0.75,
            frequency: 0,
            area: [
                [-0.5, 0, 0],
                [-0.5, 0, 0],
            ],
        },
        rain2: {
            id: 1,
            slug: 'rain2',
            name: 'Rain 2',
            type: soundTypes.background,
            path: 'rain-2.ogg',
            volume: 0.5,
            frequency: 0,
            area: [
                [0.5, 0, 0],
                [0.5, 0, 0],
            ],
        },
        thunder1: {
            id: 2,
            slug: 'thunder1',
            name: 'Thunder 1',
            type: soundTypes.random,
            path: 'thunder/thunder-1.mp3',
            volume: 0.75,
            frequency: 0,
            area: [
                [-2, 1, -2],
                [2, 2, 2],
            ],
        },
        thunder2: {
            id: 3,
            slug: 'thunder2',
            name: 'Thunder 2',
            type: soundTypes.random,
            path: 'thunder/thunder-2.mp3',
            volume: 0.75,
            frequency: 0,
            area: [
                [0, 1, -2],
                [2, 2, 2],
            ],
        },
        thunder3: {
            id: 4,
            slug: 'thunder3',
            name: 'Thunder 3',
            type: soundTypes.random,
            path: 'thunder/thunder-3.mp3',
            volume: 0.75,
            frequency: 0,
            area: [
                [-2, 1, -2],
                [0, 2, 2],
            ],
        },
    },
};

export default rainstorm;
