import { RootState } from '../store';

export const getShowSettings = (state: RootState) => state.settingsReducer.showSettings;
