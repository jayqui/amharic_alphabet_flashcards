import { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import * as globalStyles from '../globalStyles.js';
import { Audio } from 'expo-av';
import { forceOrientationLandscape, forceOrientationPortraitUp, unlockForcedOrientation } from '../utils/forceOrientation';
import { fidelsObjectNoDiphthongs, fidelsObjectWithDiphthongs } from '../utils/groupFidels';
import { Fidel, consonantGroup } from '../types/FidelType.js';

const styles = StyleSheet.create({
  outerView: {
    height: '100%',
    width: '100%',
  },
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

type FidelListProps = {
  settings: {
    diphthongFreeFidelList: boolean,
  }
}

export default function FidelsList({ settings: { diphthongFreeFidelList }}: FidelListProps) {
  const [sound, setSound] = useState();

  async function playSound(fidel: Fidel) {
    const { sound } = await Audio.Sound.createAsync(fidel.file);
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    if (!diphthongFreeFidelList) {
      forceOrientationLandscape();

      return function cleanup() {
        forceOrientationPortraitUp();
        unlockForcedOrientation();
      };
    }
  }, []);

  useEffect(() => {
    return sound ? () => { sound.unloadAsync(); } : undefined;
  }, [sound]);

  const consonantGroups: consonantGroup = diphthongFreeFidelList ? fidelsObjectNoDiphthongs() : fidelsObjectWithDiphthongs();

  function handleFidelPress(fidel: Fidel) {
    if (fidel.file) playSound(fidel);
  }

  return(
    <View style={styles.outerView}>
      <DataTable style={styles.dataTable}>
        <ScrollView>
          {Object.keys(consonantGroups).map((consonant: string, rowIndex: number) => {
            const consonantGroup: Array<Fidel> = consonantGroups[consonant];

            return(
              <DataTable.Row key={consonant}>
                {consonantGroup.map((fidel: Fidel) => (
                  <DataTable.Cell
                    key={`${fidel.character} ${fidel.consonant} ${fidel.vowel}`}
                    style={[styles.dataCell, rowIndex % 2 === 0 ? styles.dataCellGray : styles.dataCellGreen]}
                    textStyle={styles.dataCellText}
                    onPress={() => handleFidelPress(fidel)}
                  >
                    {fidel.character}
                  </DataTable.Cell>
                ))}
              </DataTable.Row>
            );
          })}
        </ScrollView>
      </DataTable>
    </View>
  );
}
