import { RootState } from '../store';

export const getShowMixer = (state: RootState) => state.mixerReducer.showMixer;
