export type SettingsProps = {
  settings: {
    flashcardBatchSize: Number,
    shouldSpeak: boolean,
    showVisualHint: boolean,
  }
  setSettings: Function,
};

export const DEFAULT_SETTINGS = {
  flashcardBatchSize: 3,
  shouldSpeak: true,
  showVisualHint: true,
}
