import { Scenario } from '../../types/Scenario';
import { RootState } from '../store';

/* eslint-disable */

export const getSavedScenarios = (state: RootState): Record<string, Scenario> =>
  state.userDataReducer.savedScenarios;

/* eslint-enable */
