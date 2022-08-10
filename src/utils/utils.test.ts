import { Vector3 } from 'three';
import { Sound, SoundChannel, soundTypes, soundTypeValues } from '../types/Scenario';
import {
  isObjEmpty,
  isEmpty,
  isChannelPlaying,
  buildSoundChannels,
  areArraysEqual,
  areObjectsEqual,
  getPosition,
  getRandomPath,
} from './utils';

// ------------------------------------------------------------------------

describe('isObjEmpty', () => {
  const emptyObj = {};
  const singleKeyObj = { testKey: 'testValue' };
  const multiKeyObj = { testKey: 'testValue', anotherKey: 'anotherValue' };

  test('Returns a boolean', () => {
    expect([true, false]).toContain(isObjEmpty(emptyObj));
    expect([true, false]).toContain(isObjEmpty(singleKeyObj));
    expect([true, false]).toContain(isObjEmpty(multiKeyObj));
  });

  test('Returns true for an empty object', () => {
    expect(isObjEmpty(emptyObj)).toBeTruthy();
    expect(isObjEmpty(emptyObj)).toBe(true);
  });

  test('Returns false for an non-empty object', () => {
    expect(isObjEmpty(singleKeyObj)).toBeFalsy();
    expect(isObjEmpty(singleKeyObj)).toBe(false);
    expect(isObjEmpty(multiKeyObj)).toBeFalsy();
    expect(isObjEmpty(multiKeyObj)).toBe(false);
  });
});

// ------------------------------------------------------------------------

describe('isEmpty', () => {
  const emptyObj = {};
  const singleKeyObj: Record<string, string> = { testKey: 'testValue' };
  const multiKeyObj: Record<string, string> = { testKey: 'testValue', anotherKey: 'anotherValue' };
  const emptyArray: unknown[] = [];
  const numberArray: number[] = [1, 2, 3];
  const stringArray: string[] = ['a', 'b', 'c'];
  const emptyString: string = '';
  const string: string = 'abc';
  const validDate: Date = new Date();
  const invalidDate: Date = new Date('nothing');

  test('Returns a boolean', () => {
    expect([true, false]).toContain(isEmpty(emptyObj));
    expect([true, false]).toContain(isEmpty(multiKeyObj));
  });

  test('Returns true for empty object', () => {
    expect(isEmpty(emptyObj)).toEqual(true);
  });

  test('Returns false for non-empty object', () => {
    expect(isEmpty(singleKeyObj)).toEqual(false);
    expect(isEmpty(multiKeyObj)).toEqual(false);
  });

  test('Returns true for empty array', () => {
    expect(isEmpty(emptyArray)).toEqual(true);
  });

  test('Returns false for non-empty array', () => {
    expect(isEmpty(stringArray)).toEqual(false);
    expect(isEmpty(numberArray)).toEqual(false);
  });

  test('Returns true for an invalid Date', () => {
    expect(isEmpty(invalidDate)).toEqual(true);
  });

  test('Returns false for valid Date', () => {
    expect(isEmpty(validDate)).toEqual(false);
  });

  test('Returns true for an empty string', () => {
    expect(isEmpty(emptyString)).toEqual(true);
  });

  test('Returns false for string', () => {
    expect(isEmpty(string)).toEqual(false);
  });

  test('Returns false for any number', () => {
    expect(isEmpty(0)).toEqual(false);
    expect(isEmpty(10)).toEqual(false);
    expect(isEmpty(-10)).toEqual(false);
  });
});

// ------------------------------------------------------------------------

describe('areArraysEqual', () => {
  const nonNested1 = [1, 2, 3];
  const nonNested2 = ['a', 'b', 'c'];
  const nonNested3 = [1, 2, 3];
  const nonNested4 = ['1', '2', '3'];

  test('Returns true for 2 empty arrays', () => {
    expect(areArraysEqual([], [])).toEqual(true);
  });
  test('Returns false for different Array lengths', () => {
    expect(areArraysEqual([1, 2, 3], [1, 2])).toEqual(false);
  });
  test('Returns false for same Array lengths but different values', () => {
    expect(areArraysEqual(nonNested1, nonNested2)).toEqual(false);
  });
  test('Returns true for equal, non-nested arrays', () => {
    expect(areArraysEqual(nonNested1, nonNested3)).toEqual(true);
  });
  test('Returns false for equal, non-nested arrays with same values but different types', () => {
    expect(areArraysEqual(nonNested1, nonNested4)).toEqual(false);
  });
  test('Returns true for equal, nested arrays', () => {
    expect(
      areArraysEqual([[...nonNested2], [...nonNested2]], [[...nonNested2], [...nonNested2]], 2),
    ).toEqual(true);
  });
  test('Returns false for non-equal, nested arrays', () => {
    expect(
      areArraysEqual([[...nonNested2], [...nonNested2]], [[...nonNested1], [...nonNested1]], 2),
    ).toEqual(false);
  });
  test('Returns false for non-equal, nested arrays with same values but different types (depth of 2)', () => {
    expect(
      areArraysEqual([[...nonNested1, nonNested4]], [[...nonNested1], [...nonNested1]], 2),
    ).toEqual(false);
  });
  test('Returns true for equal, nested arrays (depth of 3)', () => {
    expect(
      areArraysEqual(
        [
          [[...nonNested1], [...nonNested1]],
          [[...nonNested1], [...nonNested3]],
        ],
        [
          [[...nonNested1], [...nonNested1]],
          [[...nonNested1], [...nonNested3]],
        ],
        3,
      ),
    ).toEqual(true);
  });
});

// ------------------------------------------------------------------------

describe('areObjectsEqual', () => {
  const nonNested1 = { key1: 'value1', key2: 'value2' };
  const nonNested2 = { keyA: 1, keyB: 2 };

  test('Returns true for 2 empty objects', () => {
    expect(areObjectsEqual({}, {})).toEqual(true);
  });
  test('Returns true for 2 identical objects', () => {
    expect(areObjectsEqual({ ...nonNested1 }, { ...nonNested1 })).toEqual(true);
  });
  test('Returns false for 2 different objects', () => {
    expect(areObjectsEqual({ ...nonNested1 }, { ...nonNested2 })).toEqual(false);
  });
  test('Returns true for 2 different nested objects', () => {
    expect(
      areObjectsEqual(
        { first: { ...nonNested1 }, second: { ...nonNested2 } },
        { first: { ...nonNested1 }, second: { ...nonNested2 } },
        2,
      ),
    ).toEqual(true);
  });
  test('Returns false for 2 different nested objects', () => {
    expect(
      areObjectsEqual(
        { first: { ...nonNested1 }, second: { ...nonNested2 } },
        { first: { ...nonNested1 }, second: { ...nonNested1 } },
        2,
      ),
    ).toEqual(false);
  });
});

// ------------------------------------------------------------------------

describe('isChannelPlaying', () => {
  const paths = ['slug1.mp3', 'slug2.mp3', 'slug3.mp3'];
  const testChannel: SoundChannel = {
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
  const isPlayingObj = paths.reduce((acc: Record<string, boolean>, curr: string, index: number) => {
    return { ...acc, [curr]: index === 1 ? true : false };
  }, {});
  const isNotPlayingObj = paths.reduce(
    (acc: Record<string, boolean>, curr: string, index: number) => {
      return { ...acc, [curr]: index === 1 ? true : false };
    },
    {},
  );
  const isNotPlayingChannel: SoundChannel = {
    ...testChannel,
    isPlaying: isNotPlayingObj,
  };
  const isPlayingChannel: SoundChannel = {
    ...testChannel,
    isPlaying: isPlayingObj,
  };

  test('Returns true for a channel which is playing', () => {
    expect(isChannelPlaying(isPlayingChannel)).toEqual(true);
  });
  test('Returns false for a channel which is not playing', () => {
    expect(isChannelPlaying(isNotPlayingChannel)).toEqual(true);
  });
});

// ------------------------------------------------------------------------

describe('buildSoundChannels', () => {
  const testSounds: Record<string, Sound> = {
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
      ],
      volume: 0.5,
      frequency: 0.5,
      area: [
        [-2, 2, -2],
        [2, 2, 2],
      ],
      mute: false,
    },
    waterDrops: {
      id: 3,
      slug: 'waterDrops',
      name: 'Water Drops',
      type: soundTypes.random,
      paths: [
        'water-drops/water-drops-1.mp3',
        'water-drops/water-drops-2.mp3',
        'water-drops/water-drops-3.mp3',
        'water-drops/water-drops-4.mp3',
        'water-drops/water-drops-5.mp3',
        'water-drops/water-drops-6.mp3',
      ],
      volume: 0.3,
      frequency: 0.75,
      area: [
        [-2, -2, -2],
        [2, 0, 2],
      ],
      mute: false,
    },
  };

  const result = buildSoundChannels(testSounds);

  test('Returns an object with all the correct keys', () => {
    Object.keys(testSounds).forEach((key: string) => {
      expect(result).toHaveProperty(key);
    });
  });
  test('Returned object values have correct attributes', () => {
    Object.entries(testSounds).forEach(([key, value]: [string, Sound]) => {
      expect(result[key].id).toEqual(value.id);
      expect(result[key].name).toEqual(value.name);
      expect(result[key].slug).toEqual(value.slug);
      expect(result[key].position.x).toEqual(0);
      expect(result[key].position.y).toEqual(0);
      expect(result[key].position.z).toEqual(0);
      expect(result[key].durations.length).toEqual(value.paths.length);
      expect(result[key].paths.length).toEqual(value.paths.length);
      expect(value.paths.map(p => `/audio/${soundTypeValues[value.type]}/${p}`)).toContain(
        result[key].currentPath,
      );
      expect(result[key].type).toEqual(value.type);
      expect(result[key].frequency).toEqual(value.frequency);
      expect(areArraysEqual(result[key].area, value.area, 2)).toEqual(true);
      expect(result[key].volume).toEqual(value.volume);
      expect(result[key].mute).toEqual(value.mute);
    });
  });
});

// ------------------------------------------------------------------------

describe('getPosition', () => {
  const area1: [number[], number[]] = [
    [-2, -2, -2],
    [2, 2, 2],
  ];
  const area2: [number[], number[]] = [
    [-2, -2, -2],
    [0, 0, 0],
  ];
  const area3: [number[], number[]] = [
    [0, 0, 0],
    [2, 2, 2],
  ];

  test('Returns a Vector3', () => {
    expect(getPosition(area1)).toBeInstanceOf(Vector3);
  });
  test('Returns a value within bounds', () => {
    [area1, area2, area3].forEach(area => {
      expect(getPosition(area).x).toBeLessThanOrEqual(area[1][0]);
      expect(getPosition(area).x).toBeGreaterThanOrEqual(area[0][0]);
      expect(getPosition(area).y).toBeLessThanOrEqual(area[1][1]);
      expect(getPosition(area).y).toBeGreaterThanOrEqual(area[0][1]);
      expect(getPosition(area).z).toBeLessThanOrEqual(area[1][2]);
      expect(getPosition(area).z).toBeGreaterThanOrEqual(area[0][2]);
    });
  });
});

// ------------------------------------------------------------------------

describe('getRandomPath', () => {
  const paths = ['slug1.mp3', 'slug2.mp3', 'slug3.mp3'];
  const prevPath = `/audio/${soundTypeValues[soundTypes.random]}/${paths[2]}`;
  const testChannel: SoundChannel = {
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
  test('Returns a vaid path from channel paths', () => {
    expect(paths.map(path => `/audio/${soundTypeValues[soundTypes.random]}/${path}`)).toContain(
      getRandomPath(testChannel),
    );
  });
  test(`If prevPath is provided, result shouldn't match it`, () => {
    let results: string[] = [];
    for (let i = 0; i < 100; i++) {
      results.push(getRandomPath(testChannel, prevPath));
    }
    expect(
      results.reduce((acc: boolean, curr: string) => {
        if (curr === prevPath) return true;
        return acc;
      }, false),
    ).toEqual(false);
  });
});

// ------------------------------------------------------------------------
