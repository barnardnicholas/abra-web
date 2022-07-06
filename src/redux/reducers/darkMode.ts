import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import { toggleDarkMode } from '../actions/darkMode';

const initialState = {
  darkMode: true,
};

interface DarkModeState {
  darkMode: boolean;
}

export default createReducer(initialState, {
  [toggleDarkMode.type]: handleToggleDarkMode,
});

function handleToggleDarkMode(state: DarkModeState, action: PayloadAction<boolean>) {
  state.darkMode = action.payload;
}
