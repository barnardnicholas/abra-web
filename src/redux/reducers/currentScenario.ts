import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { Scenario, SoundChannel } from '../../types/Scenario';

import {
  setSoundChannels,
  setSoundPool,
  setLastSound,
  setIsPlaying,
} from '../actions/currentScenario';

interface ScenarioState {
  soundChannels: Record<string, SoundChannel>;
  isPlaying: boolean;
  soundPool: string[];
  lastSound: string | null;
}

const initialState = {
  soundChannels: {},
  isPlaying: false,
  soundPool: [],
  lastSound: null,
};

export default createReducer(initialState, {
  [setSoundChannels.type]: handleSetSoundChannels,
  [setSoundPool.type]: handleSetSoundPool,
  [setIsPlaying.type]: handleSetIsPlaying,
  [setLastSound.type]: handleSetLastSound,
});

function handleSetSoundChannels(
  state: ScenarioState,
  action: PayloadAction<Record<string, SoundChannel>>,
) {
  state.soundChannels = action.payload;
}

function handleSetSoundPool(state: ScenarioState, action: PayloadAction<string[]>) {
  state.soundPool = action.payload;
}

function handleSetIsPlaying(state: ScenarioState, action: PayloadAction<boolean>) {
  state.isPlaying = action.payload;
}

function handleSetLastSound(state: ScenarioState, action: PayloadAction<string | null>) {
  state.lastSound = action.payload;
}
