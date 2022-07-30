import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as globalStyles from '../styleConstants';

type SettingsProps = {
  flashcardBatchSize: number,
  setFlashcardBatchSize: Function,
}

export default function Settings({ flashcardBatchSize, setFlashcardBatchSize }: SettingsProps) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
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
  ]);

  function pickValue(getPickedValue: Function) {
    setFlashcardBatchSize(Number(getPickedValue()))
  }

  return (
    <>
      <View style={styles.batchSizePicker}>
        <Text style={styles.optionLabelText}>Flashcard Batch Size</Text>
        <DropDownPicker
          style={styles.dropDownPicker}
          open={open}
          value={String(flashcardBatchSize)}
          items={items}
          setOpen={setOpen}
          setValue={pickValue}
          setItems={setItems}
        />
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
