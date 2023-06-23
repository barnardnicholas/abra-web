import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import { toggleDebug } from '../actions/debug';

const initialState = {
  debug: false,
};

interface DebugState {
  debug: boolean;
}

/* eslint-disable */

function handleToggleDebug(state: DebugState, action: PayloadAction<boolean>) {
  state.debug = action.payload;
}

/* eslint-enable */

export default createReducer(initialState, {
  [toggleDebug.type]: handleToggleDebug,
});
