import { createAction } from '@reduxjs/toolkit';

export const setSelectedScenario = createAction<string | null>('setSelectedScenario');

export const setScenario = (slug: string | number | null) => {
  return setSelectedScenario(slug as string | null);
};
