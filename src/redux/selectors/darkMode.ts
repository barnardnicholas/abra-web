import { RootState } from '../store';

export const getDarkMode = (state: RootState) => state.darkModeReducer.darkMode;
