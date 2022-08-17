export type SettingsProps = {
  settings: {
    flashcardBatchSize: number,
    keepMissed: boolean,
    shouldSpeak: boolean,
    showVisualHint: boolean,
  }
  setSettings: Function,
};

export const DEFAULT_SETTINGS = {
  flashcardBatchSize: 3,
  keepMissed: true,
  shouldSpeak: true,
  showVisualHint: true,
};
