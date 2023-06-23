import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import { setSelectedScenario } from '../actions/scenario';

const initialState = {
  selectedScenario: null,
};

interface ScenarioState {
  selectedScenario: string | null;
}

/* eslint-disable */

function handleSetScenario(state: ScenarioState, action: PayloadAction<string | null>) {
  state.selectedScenario = action.payload;
}

/* eslint-enable */

export default createReducer(initialState, {
  [setSelectedScenario.type]: handleSetScenario,
});
