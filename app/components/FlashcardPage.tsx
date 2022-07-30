import { useState } from 'react';
import {  StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { sample, sampleSize } from 'lodash';
import { secondaryTextColor } from '../constants';

import SuccessPage from '../components/SuccessPage';

import fidel from '../data/fidel.json';

export default function FlashcardPage() {
  const [showAnswer, setShowAnswer] = useState(false);
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

    const timeoutDuration = showAnswer ? 0 : 1000

    setShowAnswer(true);
    setTimeout(() => {
      setShowAnswer(false);
      const nextLetter = queue.length === 1 ? sample(queue) : sample(queueWithoutCurrentLetter());
      setCurrentLetter(nextLetter);
    }, timeoutDuration)
  }

  function handleCheckPress() {
    console.log(`✅ was pressed for ${currentLetter?.character}`, new Date())

    const newQueue = queueWithoutCurrentLetter();

    setShowAnswer(false);
    setQueue(newQueue);
    setCurrentLetter(sample(newQueue));
  }

  function handleHelpPress() {
    setShowAnswer(!showAnswer);
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
    <>
      <Text style={[styles.fontSize96]}>{currentLetter?.character}</Text>
      <Text style={[styles.fontSize48]}>
        {showAnswer ? currentLetter?.transliteration : "_"}
      </Text>

      <Text style={[styles.fontSize16, { color: secondaryTextColor }]}>{queue.length} left</Text>
      <View style={styles.allButtonsContainer}>

        <View style={styles.answerButtonsContainer}>
          <TouchableOpacity style={styles.xOpacity} onPress={handleXPress}>
            <Text style={styles.fontSize24}>❌</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.checkOpacity} onPress={handleCheckPress}>
            <Text style={styles.fontSize24}>✅</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={styles.toggleAnswerOpacity} onPress={handleHelpPress}>
            <Text style={[styles.fontSize16, { color: secondaryTextColor }]}>
              {showAnswer ? 'Hide' : 'Show'} Answer
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
  xOpacity: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 96,
    width: '48.5%',
    backgroundColor: '#f88',
    borderRadius: 40,
  },
  checkOpacity: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 96,
    width: '48.5%',
    backgroundColor: '#0f8',
    borderRadius: 40,
  },
  toggleAnswerOpacity: {
    borderWidth: 5,
    borderColor: secondaryTextColor,
    marginTop: 12,
    minHeight: 96,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
});
