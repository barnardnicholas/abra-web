import { combineReducers } from 'redux';

import darkModeReducer from '../reducers/darkMode';
import debugReducer from './debug';
import scenariosReducer from './scenarios';
import settingsReducer from './settings';
import mixerReducer from './mixer';
import userDataReducer from './userData';
import currentScenarioReducer from './currentScenario';

const rootReducer = combineReducers({
  darkModeReducer,
  debugReducer,
  scenariosReducer,
  settingsReducer,
  mixerReducer,
  userDataReducer,
  currentScenarioReducer,
});

export default rootReducer;
