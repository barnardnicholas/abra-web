import { Scenario } from '../../types/Scenario';
import { RootState } from '../store';

export const getSavedScenarios = (state: RootState): Record<string, Scenario> => state.userDataReducer.savedScenarios;
