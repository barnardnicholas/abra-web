import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import { toggleMixer } from '../actions/mixer';

const initialState = {
  showMixer: false,
};

interface MixerState {
  showMixer: boolean;
}

/* eslint-disable */

function handleToggleShowMixer(state: MixerState, action: PayloadAction<boolean>) {
  state.showMixer = action.payload;
}

/* eslint-enable */

export default createReducer(initialState, {
  [toggleMixer.type]: handleToggleShowMixer,
});
