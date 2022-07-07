import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import { toggleMixer } from '../actions/mixer';

const initialState = {
  showMixer: false,
};

interface MixerState {
  showMixer: boolean;
}

export default createReducer(initialState, {
  [toggleMixer.type]: handleToggleShowMixer,
});

function handleToggleShowMixer(state: MixerState, action: PayloadAction<boolean>) {
  state.showMixer = action.payload;
}
