import { createAction, Dispatch } from '@reduxjs/toolkit';

export const toggleDarkMode = createAction<boolean>('toggleDarkMode');

export const toggleTheme = (darkMode: boolean) => (dispatch: Dispatch) => {
  return dispatch(toggleDarkMode(darkMode));
};
