import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import { toggleDarkMode } from '../actions/darkMode';

const initialState = {
  darkMode: true,
};

interface DarkModeState {
  darkMode: boolean;
}

/* eslint-disable */

function handleToggleDarkMode(state: DarkModeState, action: PayloadAction<boolean>) {
  state.darkMode = action.payload;
}

/* eslint-enable */

export default createReducer(initialState, {
  [toggleDarkMode.type]: handleToggleDarkMode,
});
