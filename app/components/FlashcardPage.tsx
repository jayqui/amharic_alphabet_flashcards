import { useState, useEffect } from 'react';
import {  StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { sample, sampleSize } from 'lodash';
import * as globalStyles from '../globalStyles';
import { Audio } from 'expo-av';

import SuccessPage from '../components/SuccessPage';

import fidel from '../data/fidel.js';

type FlashcardProps = {
  settings: {
    flashcardBatchSize: number,
    keepMissed: boolean,
    shouldSpeak: boolean,
    showVisualHint: boolean,
  }
}

export default function FlashcardPage({ settings: { flashcardBatchSize, keepMissed, shouldSpeak, showVisualHint }}: FlashcardProps) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [queue, setQueue] = useState(generateFidelSample());
  const [currentLetter, setCurrentLetter] = useState(sample(queue));
  const [sound, setSound] = useState();

  async function playSound() {
    if (!shouldSpeak) { return; }
    const { sound } = await Audio.Sound.createAsync(currentLetter.file);
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    return sound ? () => { sound.unloadAsync(); } : undefined;
  }, [sound]);

  function generateFidelSample() {
    return sampleSize(fidel, flashcardBatchSize);
  }

  function handleXPress() {
    const timeoutDuration = showAnswer ? 0 : 1000;

    if (!showAnswer) playSound();
    if (showVisualHint) setShowAnswer(true);

    setTimeout(() => {
      setShowAnswer(false);
      let nextLetter;
      if (keepMissed) {
        nextLetter = queue.length === 1 ? sample(queue) : sample(queueWithoutCurrentLetter());
        setCurrentLetter(nextLetter);
      } else {
        removeCurrentLetter();
      }
    }, timeoutDuration);
  }

  function handleCheckPress() {
    removeCurrentLetter();
  }

  function removeCurrentLetter() {
    const newQueue = queueWithoutCurrentLetter();

    setShowAnswer(false);
    setQueue(newQueue);
    setCurrentLetter(sample(newQueue));
  }

  function handleHelpPress() {
    if (!showAnswer) playSound();
    if (showVisualHint) setShowAnswer(!showAnswer);
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

  function renderHelpButtonText() {
    if (showVisualHint) {
      return `${showAnswer ? 'Hide' : 'Show'} Answer`;
    } else {
      return 'Play Audio';
    }
  }

  if (!queue.length) return <SuccessPage handleRestartPress={handleRestartPress} />;

  return (
    <>
      <Text style={[globalStyles.fontSize96]}>{currentLetter?.character}</Text>
      <Text style={[globalStyles.fontSize48]}>
        {showAnswer ? currentLetter?.transliteration : '_'}
      </Text>

      <Text style={[globalStyles.fontSize16, { color: globalStyles.secondaryTextColor }]}>{queue.length} left</Text>
      <View style={styles.allButtonsContainer}>

        <View style={styles.answerButtonsContainer}>
          <TouchableOpacity style={styles.xOpacity} onPress={handleXPress}>
            <Text style={globalStyles.fontSize24}>❌</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.checkOpacity} onPress={handleCheckPress}>
            <Text style={globalStyles.fontSize24}>✅</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={styles.toggleAnswerOpacity} onPress={handleHelpPress}>
            <Text style={[globalStyles.fontSize16, { color: globalStyles.secondaryTextColor }]}>
              {renderHelpButtonText()}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  allButtonsContainer: {
    width: '80%',
  },
  answerButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  xOpacity: {
    ...globalStyles.standardButton,
    backgroundColor: globalStyles.red10,
  },
  checkOpacity: {
    ...globalStyles.standardButton,
    backgroundColor: globalStyles.green10,
  },
  toggleAnswerOpacity: {
    borderWidth: 5,
    borderColor: globalStyles.secondaryTextColor,
    marginTop: 12,
    minHeight: 96,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
});
