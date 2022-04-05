import { Scenario, soundTypes } from '../../types/Scenario';

const ocean: Scenario = {
    id: 1,
    name: 'Rainstorm',
    slug: 'rainstorm',
    description: 'Calming rainstorm',
    sounds: {
        waves1: {
            id: 0,
            slug: 'waves1',
            name: 'Waves 1',
            type: soundTypes.background,
            path: 'ocean-waves-1.ogg',
            volume: 0.75,
            frequency: 0,
            area: [
                [-0.25, 0, 0],
                [-0.25, 0, 0],
            ],
        },
        waves2: {
            id: 1,
            slug: 'waves2',
            name: 'Waves 2',
            type: soundTypes.background,
            path: 'ocean-waves-2.ogg',
            volume: 0.75,
            frequency: 0,
            area: [
                [0.25, 0, 0],
                [0.25, 0, 0],
            ],
        },
        seagull1: {
            id: 2,
            slug: 'seagull1',
            name: 'Seagull 1',
            type: soundTypes.random,
            path: 'seagull/seagull-1.mp3',
            volume: 0.25,
            frequency: 0.25,
            area: [
                [-2, 2, -2],
                [2, 2, 2],
            ],
        },
        // seagull2: {
        //     id: 3,
        //     slug: 'seagull2',
        //     name: 'Seagull 2',
        //     type: soundTypes.random,
        //     path: 'seagull/seagull-2.mp3',
        //     volume: 0.25,
        //     frequency: 0.1,
        //     area: [
        //         [0, 2, -2],
        //         [2, 2, 2],
        //     ],
        // },
        // seagull3: {
        //     id: 4,
        //     slug: 'seagull3',
        //     name: 'Seagull 3',
        //     type: soundTypes.random,
        //     path: 'seagull/seagull-3.mp3',
        //     volume: 0.25,
        //     frequency: 0.1,
        //     area: [
        //         [-2, 2, -2],
        //         [0, 2, 2],
        //     ],
        // },
        // seagull4: {
        //     id: 5,
        //     slug: 'seagull4',
        //     name: 'Seagull 4',
        //     type: soundTypes.random,
        //     path: 'seagull/seagull-4.mp3',
        //     volume: 0.25,
        //     frequency: 0.1,
        //     area: [
        //         [-2, 2, -2],
        //         [0, 2, 2],
        //     ],
        // },
        // seagull5: {
        //     id: 6,
        //     slug: 'seagull5',
        //     name: 'Seagull 5',
        //     type: soundTypes.random,
        //     path: 'seagull/seagull-5.mp3',
        //     volume: 0.25,
        //     frequency: 0.1,
        //     area: [
        //         [-2, 2, -2],
        //         [0, 2, 2],
        //     ],
        // },
        // seagull6: {
        //     id: 7,
        //     slug: 'seagull6',
        //     name: 'Seagull 6',
        //     type: soundTypes.random,
        //     path: 'seagull/seagull-6.mp3',
        //     volume: 0.25,
        //     frequency: 0.1,
        //     area: [
        //         [-2, 2, -2],
        //         [0, 2, 2],
        //     ],
        // },
    },
};

export default ocean;
