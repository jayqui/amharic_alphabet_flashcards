import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { sample, sampleSize } from 'lodash';

import SuccessPage from './SuccessPage';

import fidel from './fidel.json';

export default function App() {
  const [shouldShowHelp, setShouldShowHelp] = useState(false);
  const [queue, setQueue] = useState(generateFidelSample());
  const [currentLetter, setCurrentLetter] = useState(sample(queue));

  console.log('queue.length', queue.length)
  console.log('currentLetter?.character', currentLetter?.character)
  console.log('queue:', queue.map((x) => x.character));

  function generateFidelSample() {
    return sampleSize(fidel, 3);
  }

  function handleXPress() {
    console.log(`❌ was pressed for ${currentLetter?.character}`, new Date())

    setShouldShowHelp(true);
    setTimeout(() => {
      setShouldShowHelp(false);
      const nextLetter = queue.length === 1 ? sample(queue) : sample(queueWithoutCurrentLetter());
      setCurrentLetter(nextLetter);
    }, 1000)
  }

  function handleCheckPress() {
    console.log(`✅ was pressed for ${currentLetter?.character}`, new Date())

    const newQueue = queueWithoutCurrentLetter();

    setShouldShowHelp(false);
    setQueue(newQueue);
    setCurrentLetter(sample(newQueue));
  }

  function handleRestartPress() {
    const newQueue = generateFidelSample();
    setQueue(newQueue);
    setCurrentLetter(sample(newQueue));
  }

  function queueWithoutCurrentLetter() {
    return queue.filter((ele: { character: string; }) => (
      ele.character !== currentLetter?.character)
    );
  }

  if (!queue.length) return <SuccessPage handleRestartPress={handleRestartPress} styles={styles}/>;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text style={[styles.fontSize96]}>{currentLetter?.character}</Text>
      <Text style={[styles.fontSize48]}>
        {shouldShowHelp ? currentLetter?.transliteration : "_"}
      </Text>

      <Text style={[styles.fontSize16, { color: secondaryTextColor }]}>{queue.length} left</Text>
      <View style={styles.allButtonsContainer}>

        <View style={styles.answerButtonsContainer}>
          <TouchableOpacity style={styles.xButtonOpacity} onPress={handleXPress}>
            <Text style={styles.fontSize24}>❌</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.checkButtonOpacity} onPress={handleCheckPress}>
            <Text style={styles.fontSize24}>✅</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={styles.helpButtonOpacity} onPress={() => setShouldShowHelp(!shouldShowHelp)}>
            <Text style={[styles.fontSize16, { color: secondaryTextColor }]}>Show Answer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

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
  allButtonsContainer: {
    width: '80%',
  },
  answerButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  xButtonOpacity: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 96,
    width: '48.5%',
    backgroundColor: '#f88',
    borderRadius: 40,
  },
  checkButtonOpacity: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 96,
    width: '48.5%',
    backgroundColor: '#0f8',
    borderRadius: 40,
  },
  helpButtonOpacity: {
    borderWidth: 5,
    borderColor: secondaryTextColor,
    marginTop: 12,
    minHeight: 96,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
});
