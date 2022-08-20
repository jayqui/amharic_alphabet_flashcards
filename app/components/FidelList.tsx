import { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import * as globalStyles from '../globalStyles.js';
import fidels from '../data/fidel.js';
import { Audio } from 'expo-av';
import { forceOrientationLandscape, forceOrientationPortraitUp, unlockForcedOrientation } from '../utils/forceOrientation';

type Fidel = {
  character: string,
  transliteration: string,
  consonant: string,
  vowel: string,
  file: object,
}

type consonantGroup = {
  [index: string]: Array<Fidel>,
}

const STANDARD_VOWELS = ['ə', 'u', 'i', 'a', 'ē', 'ih', 'o'];

const styles = StyleSheet.create({
  dataTable: {
    marginTop: 1,
    marginBottom: 20,
  },
  dataCell: {
    borderColor: globalStyles.charcoal110,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataCellGray: {
    backgroundColor: globalStyles.charcoal110,
  },
  dataCellGreen: {
    backgroundColor: globalStyles.green0,
  },
  dataCellText: {
    ...globalStyles.fontSize28,
  },
});

export default function FidelList() {
  const [diphthongFree, setDiphthongFree] = useState(true);
  const [sound, setSound] = useState();

  async function playSound(fidel: Fidel) {
    const { sound } = await Audio.Sound.createAsync(fidel.file);
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    forceOrientationLandscape();

    return function cleanup() {
      forceOrientationPortraitUp();
      unlockForcedOrientation();
    };
  }, []);

  useEffect(() => {
    return sound ? () => { sound.unloadAsync(); } : undefined;
  }, [sound]);

  const consonantGroups = fidels.reduce((accum: consonantGroup, fidel: Fidel) => {
    const consonantGroup = (accum[fidel.consonant] || []);
    const isDiphthong = !STANDARD_VOWELS.includes(fidel.vowel);

    if (!diphthongFree || !isDiphthong) consonantGroup.push(fidel);
    accum[fidel.consonant] = consonantGroup;

    return accum;
  }, {});

  return(
    <DataTable style={styles.dataTable}>
      <ScrollView>
        {Object.keys(consonantGroups).map((consonant: string, rowIndex: number) => {
          const consonantGroup = consonantGroups[consonant];

          return(
            <DataTable.Row key={consonant}>
              {consonantGroup.map((fidel: Fidel) => (
                <DataTable.Cell
                  key={fidel.character}
                  style={[styles.dataCell, rowIndex % 2 === 0 ? styles.dataCellGray : styles.dataCellGreen]}
                  textStyle={styles.dataCellText}
                  onPress={() => playSound(fidel)}
                >
                  {fidel.character}
                </DataTable.Cell>
              ))}
            </DataTable.Row>
          );
        })}
      </ScrollView>
    </DataTable>
  );
}
