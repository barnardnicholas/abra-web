import { combineReducers } from 'redux';

import darkModeReducer from './darkMode';
import debugReducer from './debug';
import scenariosReducer from './scenarios';
import settingsReducer from './settings';
import mixerReducer from './mixer';
import userDataReducer from './userData';

const rootReducer = combineReducers({
  darkModeReducer,
  debugReducer,
  scenariosReducer,
  settingsReducer,
  mixerReducer,
  userDataReducer,
});

export default rootReducer;
