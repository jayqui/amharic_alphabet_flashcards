import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import fidel from './fidel.json';

export default function App() {
  const [displayOptionIndex, setDisplayOptionIndex] = useState(0);
  const [shouldShowHelp, setShouldShowHelp] = useState(true);

  function handlePreviousPress() {
    console.log('new Previous button press at', new Date())
    const newIndex = displayOptionIndex > 0 ? displayOptionIndex - 1 : displayOptionIndex;
    setDisplayOptionIndex(newIndex)
  }

  function handleNextPress() {
    console.log('new Next button press at', new Date())
    const newIndex = displayOptionIndex < fidel.length - 1 ? displayOptionIndex + 1 : displayOptionIndex;
    console.log('newIndex', newIndex)
    setDisplayOptionIndex(newIndex)
  }

  const currentLetter = fidel[displayOptionIndex];

  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.character]}>{currentLetter.character}</Text>
      <Text style={[styles.text, styles.transliteration]}>{shouldShowHelp ? currentLetter.transliteration : "_"}</Text>
      <StatusBar style="auto" />
      <View style={styles.buttonArea}>
        <Button title="❌" onPress={handlePreviousPress}></Button>
        <Button title="✅" onPress={handleNextPress}></Button>
      </View>
      <Button title="Toggle Help" onPress={() => setShouldShowHelp(!shouldShowHelp)}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  buttonArea: {
    backgroundColor: '#fff',
    height: 100,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  yesButton: {
    height: 100,
    width: '50%',
    backgroundColor: '#0f8',
  },
  text: {
    color: '#ff0000',
  },
  character: {
    fontSize: 100,
  },
  transliteration: {
    fontSize: 50,
  },
});
