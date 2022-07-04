import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import { setSelectedScenario } from '../actions/scenario';

const initialState = {
    selectedScenario: null,
};

interface ScenarioState {
    selectedScenario: string | null;
}

export default createReducer(initialState, {
    [setSelectedScenario.type]: handleSetScenario,
});

function handleSetScenario(state: ScenarioState, action: PayloadAction<string | null>) {
    state.selectedScenario = action.payload;
}
