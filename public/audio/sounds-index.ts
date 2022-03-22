import background from './background/background-index';
// import random from './random/random-index';

const audioData: Record<string, AudioObject> = {
    background,
    // random,
};

export interface AudioObject {
    [key: string]: AudioBuffer;
}

export default audioData;
