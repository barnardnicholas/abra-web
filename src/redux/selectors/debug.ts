import { RootState } from '../store';

export const getDebug = (state: RootState) => state.debugReducer.debug;
