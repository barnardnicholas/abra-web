import { combineReducers } from 'redux';

import darkModeReducer from '../reducers/darkMode';
import debugReducer from './debug';

const rootReducer = combineReducers({
    darkModeReducer,
    debugReducer,
});

export default rootReducer;
