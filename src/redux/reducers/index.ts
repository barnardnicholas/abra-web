import { combineReducers } from 'redux';

import darkModeReducer from '../reducers/darkMode';
import debugReducer from './debug';
import scenariosReducer from './scenarios'

const rootReducer = combineReducers({
    darkModeReducer,
    debugReducer,
    scenariosReducer
});

export default rootReducer;
