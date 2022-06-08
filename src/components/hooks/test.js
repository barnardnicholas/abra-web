// RULES:
// Sounds will never overlap themselves. Min interval between the same sound being triggered is 2x the duration
// Sounds with a higher frequency will be triggered more often than ones with a lower frequency
// Sounds with a frequency of 0 will never play
// Sounds with a frequency of 1 will play often but not continuously. Will still have some randomness and obey the overlap rule

const randomSounds = {
  bird1: {
    frequency: 0.1,
    sound: "bird1.wav",
    durationMs: 1400,
  },
  bird2: {
    frequency: 0.3,
    sound: "bird2.wav",
    durationMs: 850,
  },
  bird3: {
    frequency: 0.7,
    sound: "bird3.wav",
    durationMs: 3900,
  },
  bird4: {
    frequency: 0,
    sound: "bird4.wav",
    durationMs: 2100,
  },
  bird5: {
    frequency: 1,
    sound: "bird5.wav",
    durationMs: 400,
  },
};
// bird4 will never play, bird5 will play very often

let timer;
let lastSound;

const getNewDelay = () => Math.random() * 5000 + 1000;

const getRandomSound = () => {
  const aRandomSound =
    randomSounds[pool[Math.floor(Math.random() * pool.length)]];
  if (aRandomSound.sound === lastSound) return getRandomSound();
  return aRandomSound;
}; // Pull random sound from pool - cannot be the same as lastSound

const buildSoundPool = (sounds) => {
  const soundFreqs = Object.keys(sounds).reduce((acc, curr) => {
    acc[curr] = Math.round(sounds[curr].frequency * 100);
    return acc;
  }, {}); // Get workable numbers from frequencies
  const result = Object.keys(soundFreqs).reduce((acc, curr) => {
    const newItems = new Array(soundFreqs[curr]).fill(curr);
    return acc.concat(newItems);
  }, []); // Build array of proprtional amounts of each sound
  return result;
};

// =============================== Sound Pool ===============================
const pool = buildSoundPool(randomSounds); // Build pool from sounds

// =============================== Play ===============================
function play() {
  const tick = () => {
    clearTimeout(timer); // Clear out old timer
    const aRandomSound = getRandomSound(); // Get new sound from pool
    console.log(`Playing ${aRandomSound.sound}`); // Play
    lastSound = aRandomSound.sound;
    timer = setTimeout(tick, getNewDelay()); // Set new timer
  };
  timer = setTimeout(tick, getNewDelay()); // Set first timer
} // Start timer

// =============================== Debug ===============================
const debug = (iterations) => {
  let counter = 0;
  let tally = Object.keys(randomSounds).reduce((acc, curr) => {
    acc[curr] = 0;
    return acc;
  }, {});
  while (counter < iterations) {
    counter++;
    const aRandomSound = getRandomSound();
    tally[aRandomSound]++;
  }
  console.log(tally);
}; // Count occurrences over n iterations

// debug(1000)
play();
