import { createAction, Dispatch } from '@reduxjs/toolkit';

export const toggleDebug = createAction<boolean>('toggleDebug');

export const toggleTheme = (debug: boolean) => (dispatch: Dispatch) => {
    return dispatch(toggleDebug(debug));
};
