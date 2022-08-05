import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import { toggleConcurrentAudio, toggleDebug } from '../actions/debug';

const initialState = {
  debug: false,
  concurrentAudio: true,
};

interface DebugState {
  debug: boolean;
  concurrentAudio: boolean;
}

/* eslint-disable */

function handleToggleDebug(state: DebugState, action: PayloadAction<boolean>) {
  state.debug = action.payload;
}

function handleToggleConcurrentAudio(state: DebugState, action: PayloadAction<boolean>) {
  state.concurrentAudio = action.payload;
}

/* eslint-enable */

export default createReducer(initialState, {
  [toggleDebug.type]: handleToggleDebug,
  [toggleConcurrentAudio.type]: handleToggleConcurrentAudio,
});
