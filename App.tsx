import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { sample, sampleSize } from 'lodash';

import fidel from './fidel.json';

export default function App() {
  const [shouldShowHelp, setShouldShowHelp] = useState(false);
  const [queue, setQueue] = useState(generateFidelSample());
  const [currentLetter, setCurrentLetter] = useState(sample(queue));

  console.log('queue.length', queue.length)
  console.log('queue:', queue.map((x) => x.character));

  function generateFidelSample() {
    return sampleSize(fidel, 3);
  }

  function handleXPress() {
    console.log(`❌ was pressed for ${currentLetter?.character}`, new Date())

    setShouldShowHelp(true);
    setTimeout(() => {
      setShouldShowHelp(false);
      setCurrentLetter(sample(queue));
    }, 1000)
  }

  function handleCheckPress() {
    console.log(`✅ was pressed for ${currentLetter?.character}`, new Date())

    const newQueue = queue.filter((ele: { character: string; }) =>
      ele.character !== currentLetter?.character);

    setQueue(newQueue);
    setCurrentLetter(sample(queue));
  }

  function handleRestartPress() {
    const newQueue = generateFidelSample();
    setQueue(newQueue);
    setCurrentLetter(sample(newQueue));
  }

  function renderSuccess() {
    return (
      <>
        <Text>Yay!</Text>
        <Button title="Restart" onPress={handleRestartPress}></Button>
      </>
    )
  }

  function renderStuff() {
    return(
      <>
        <Text style={[styles.text, styles.character]}>{currentLetter?.character}</Text>
        <Text style={[styles.text, styles.transliteration]}>
          {shouldShowHelp ? currentLetter?.transliteration : "_"}
        </Text>
      </>
    )
  }

  return (
    <View style={styles.container}>
      {queue.length ? renderStuff() : renderSuccess()}
      <StatusBar style="auto" />
      {queue.length > 0 && <View style={styles.buttonArea}>
        <Button title="❌" onPress={handleXPress}></Button>
        <Button title="✅" onPress={handleCheckPress}></Button>
      </View>}
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
