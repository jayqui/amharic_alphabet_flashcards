import { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as globalStyles from '../styleConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SettingsProps } from '../types/SettingsProps';
import { cloneDeep } from 'lodash';

import fidel from '../data/fidel.js';

const FLASHCARD_BATCH_SIZE_CHOICES = [
  {label: '1', value: '1'},
  {label: '2', value: '2'},
  {label: '3', value: '3'},
  {label: '4', value: '4'},
  {label: '5', value: '5'},
  {label: '6', value: '6'},
  {label: '7', value: '7'},
  {label: '8', value: '8'},
  {label: '9', value: '9'},
  {label: '10', value: '10'},
  {label: '15', value: '15'},
  {label: '20', value: '20'},
  {label: '25', value: '25'},
  {label: '30', value: '30'},
  {label: '40', value: '40'},
  {label: '50', value: '50'},
  {label: '100', value: '100'},
  {label: '200', value: '200'},
  {label: `${fidel.length}`, value: `${fidel.length}`},
]

export default function Settings({ settings, setSettings }: SettingsProps) {
  const [open, setOpen] = useState(false);
  const [flashcardBatchSizeChoices, setFlashcardBatchSizeChoices] = useState(FLASHCARD_BATCH_SIZE_CHOICES);

  async function storeData(key: string, value: string) {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (error) {
      alert(`error saving settings: ${error}`)
    }
  }

  function adjustSetting(settingsKey: string, newValue: any) {
    const newSettings = cloneDeep(settings)
    newSettings[settingsKey] = newValue;
    storeData('settings', JSON.stringify(newSettings));
    setSettings(newSettings);
  }

  function toggleBooleanSetting(settingsKey: string) {
    adjustSetting(settingsKey, !settings[settingsKey])
  }

  return (
    <>
      <View style={styles.batchSizePicker}>
        <Text style={styles.optionLabelText}>Flashcard Batch Size</Text>
        <DropDownPicker
          style={styles.dropDownPicker}
          open={open}
          value={String(settings.flashcardBatchSize)}
          items={flashcardBatchSizeChoices}
          setOpen={setOpen}
          setValue={(choice: Function) => adjustSetting('flashcardBatchSize', choice())}
          setItems={setFlashcardBatchSizeChoices}
        />
        <Text style={styles.optionLabelText}>Keep Cards in Rotation Until Answered Correctly</Text>
        <Switch value={settings.keepMissed} onValueChange={() => toggleBooleanSetting('keepMissed')} />
        <Text style={styles.optionLabelText}>Play Sounds</Text>
        <Switch value={settings.shouldSpeak} onValueChange={() => toggleBooleanSetting('shouldSpeak')} />
        <Text style={styles.optionLabelText}>Show Visual Hint</Text>
        <Switch value={settings.showVisualHint} onValueChange={() => toggleBooleanSetting('showVisualHint')} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  batchSizePicker: {
    flex: 1,
    minWidth: '50%',
    maxWidth: '80%',
  },
  optionLabelText: {
    fontSize: globalStyles.fontSize20.fontSize,
    marginBottom: 8,
    marginTop: 24,
  },
  dropDownPicker: {
    backgroundColor: "#fff",
    padding: 8, // for web
    flexDirection: "row",
    borderRadius: 5,
  }
});
