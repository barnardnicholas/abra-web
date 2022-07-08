import { createAction } from '@reduxjs/toolkit';
import { Scenario } from '../../../types/Scenario';

export const saveScenario = createAction<Scenario>('saveScenario');
