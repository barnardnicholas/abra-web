import { createAction, Dispatch } from '@reduxjs/toolkit';

export const toggleDebug = createAction<boolean>('toggleDebug');

export const toggleDebugState = (debug: boolean) => (dispatch: Dispatch) => {
  return dispatch(toggleDebug(debug));
};
