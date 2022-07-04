import { RootState } from '../store';

export const getSelectedScenario = (state: RootState) => state.scenariosReducer.selectedScenario;
