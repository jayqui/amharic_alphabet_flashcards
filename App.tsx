import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

    function renderStuff() {
      return(
        <>
          <Text style={[styles.fontSize96]}>{currentLetter?.character}</Text>
          <Text style={[styles.fontSize48]}>
            {shouldShowHelp ? currentLetter?.transliteration : "_"}
          </Text>
        </>
      )
    }

  function renderSuccess() {
    return (
      <>
        <Text style={[styles.fontSize96]}>Yay!</Text>
        <Button title="Restart" onPress={handleRestartPress}></Button>
      </>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {queue.length ? renderStuff() : renderSuccess()}
      {!!queue.length && <Text style={styles.fontSize16}>{queue.length} left</Text>}
      {!!queue.length && <View style={styles.buttonArea}>
        <TouchableOpacity style={styles.xButtonOpacity} onPress={handleXPress}>
          <Text style={styles.fontSize24}>❌</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.checkButtonOpacity} onPress={handleCheckPress}>
          <Text style={styles.fontSize24}>✅</Text>
        </TouchableOpacity>
      </View>}

      {!!queue.length && <TouchableOpacity style={styles.helpButtonOpacity} onPress={() => setShouldShowHelp(!shouldShowHelp)}>
        <Text style={[styles.fontSize16, { color: secondaryTextColor }]}>Toggle Help</Text>
      </TouchableOpacity>}
    </View>
  );
}

const primaryTextColor = '#fff';
const secondaryTextColor = '#999';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  fontSize96: { fontSize: 96 },
  fontSize48: { fontSize: 48 },
  fontSize24: { fontSize: 24 },
  fontSize16: { fontSize: 16 },
  buttonArea: {
    flexDirection: 'row',
  },
  xButtonOpacity: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 96,
    width: '50%',
    backgroundColor: '#f88',
    borderRadius: 40,
    margin: 5,
  },
  checkButtonOpacity: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 96,
    width: '50%',
    backgroundColor: '#0f8',
    borderRadius: 40,
    margin: 5,
  },
  helpButtonOpacity: {
    borderWidth: 5,
    borderColor: secondaryTextColor,
    width: '80%',
    minHeight: 96,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
});
