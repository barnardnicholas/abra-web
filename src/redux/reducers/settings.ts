import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import { toggleSettings } from '../actions/settings';

const initialState = {
    showSettings: false,
};

interface SettingsState {
    showSettings: boolean;
}

export default createReducer(initialState, {
    [toggleSettings.type]: handleToggleShowSettings,
});

function handleToggleShowSettings(state: SettingsState, action: PayloadAction<boolean>) {
    state.showSettings = action.payload;
}
