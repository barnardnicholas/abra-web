import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { Scenario } from '../../types/Scenario';

import { saveScenario } from '../actions/userData';

interface UserDataState {
  savedScenarios: Record<string, Scenario>;
}

const initialState = {
  savedScenarios: {},
};

export default createReducer(initialState, {
  [saveScenario.type]: handleSaveScenario,
});

function handleSaveScenario(state: UserDataState, action: PayloadAction<Scenario>) {
  state.savedScenarios[action.payload.slug] = action.payload;
}
