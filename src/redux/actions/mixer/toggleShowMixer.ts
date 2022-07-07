import { createAction, Dispatch } from '@reduxjs/toolkit';

export const toggleMixer = createAction<boolean>('toggleMixer');

export const toggleShowMixer = (showMixer: boolean) => (dispatch: Dispatch) => {
  return dispatch(toggleMixer(showMixer));
};
