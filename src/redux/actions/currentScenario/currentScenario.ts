import { createAction } from '@reduxjs/toolkit';
import { SoundChannel } from '../../../types/Scenario';

export const setSoundChannels = createAction<Record<string, SoundChannel>>('setSoundChannels');

export const setIsPlaying = createAction<boolean>('setIsPlaying');

export const setSoundPool = createAction<string[]>('setSoundPool');

export const setLastSound = createAction<string | null>('setLastSound');
