import { RootState } from '../store';

/* eslint-disable */

export const getDebug = (state: RootState) => state.debugReducer.debug;
export const getConcurrentAudio = (state: RootState) => state.debugReducer.concurrentAudio;

/* eslint-enable */
