import { SoundChannel } from '../../types/Scenario';
import { RootState } from '../store';

export const getSoundChannels = (state: RootState): Record<string, SoundChannel> =>
  state.currentScenarioReducer.soundChannels || {};

export const getSoundPool = (state: RootState): string[] =>
  state.currentScenarioReducer.soundPool || [];

export const getIsPlaying = (state: RootState): boolean =>
  state.currentScenarioReducer.isPlaying || false;

export const getLastSound = (state: RootState): string | null =>
  state.currentScenarioReducer.lastSound || null;
