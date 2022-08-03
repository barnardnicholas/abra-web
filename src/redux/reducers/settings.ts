import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import { toggleSettings } from '../actions/settings';

const initialState = {
  showSettings: false,
};

interface SettingsState {
  showSettings: boolean;
}

/* eslint-disable */

function handleToggleShowSettings(state: SettingsState, action: PayloadAction<boolean>) {
  state.showSettings = action.payload;
}

/* eslint-enable */

export default createReducer(initialState, {
  [toggleSettings.type]: handleToggleShowSettings,
});
