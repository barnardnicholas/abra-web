import { combineReducers } from 'redux';

import darkModeReducer from '../reducers/darkMode';
import debugReducer from './debug';
import scenariosReducer from './scenarios';
import settingsReducer from './settings';
import mixerReducer from './mixer';

const rootReducer = combineReducers({
  darkModeReducer,
  debugReducer,
  scenariosReducer,
  settingsReducer,
  mixerReducer,
});

export default rootReducer;
