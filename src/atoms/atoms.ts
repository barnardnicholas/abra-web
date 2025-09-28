import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const darkModeAtom = atomWithStorage<boolean>('darkModeAtom', true);
export const debugAtom = atom<boolean>(false);
export const showSettingsAtom = atom<boolean>(false);
export const showMixerAtom = atom<boolean>(false);
export const selectedScenarioAtom = atom<string | null>(null);
