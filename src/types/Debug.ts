export interface SoundsTallyItem {
  fullPath: string;
  fileName: string;
  isPlaying: boolean;
  displayDuration: string;
}

export type SoundsTally = Record<string, SoundsTallyItem>;

export type LastPlayed = Record<string, number | null>;
