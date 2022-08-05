import { createAction, Dispatch } from '@reduxjs/toolkit';

export const toggleDebug = createAction<boolean>('toggleDebug');
export const toggleConcurrentAudio = createAction<boolean>('toggleConcurrentAudio');

export const toggleDebugState = (debug: boolean) => (dispatch: Dispatch) => {
  return dispatch(toggleDebug(debug));
};

export const toggleConcurrentAudioState = (debug: boolean) => (dispatch: Dispatch) => {
  return dispatch(toggleConcurrentAudio(debug));
};
