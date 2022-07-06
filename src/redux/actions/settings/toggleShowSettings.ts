import { createAction, Dispatch } from '@reduxjs/toolkit';

export const toggleSettings = createAction<boolean>('toggleSettings');

export const toggleShowSettings = (showSettings: boolean) => (dispatch: Dispatch) => {
    return dispatch(toggleSettings(showSettings));
};
