import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { DataTable } from 'react-native-paper';

import * as globalStyles from '../globalStyles.js';
import fidels from '../data/fidel.js';

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

const STANDARD_LETTERS = ['ə', 'u', 'i', 'a', 'ē', 'ih', 'o'];

const styles = StyleSheet.create({
  fidelButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    backgroundColor: globalStyles.green20,
  }
});

export default function FidelList() {
  const [diphthongFree, setDiphthongFree] = useState(true);

  const consonantGroups = fidels.reduce((accum: consonantGroup, fidel: Fidel) => {
    const consonantGroup = (accum[fidel.consonant] || []);
    const isDiphthong = !STANDARD_LETTERS.includes(fidel.vowel);

    if (!diphthongFree || !isDiphthong) consonantGroup.push(fidel);
    accum[fidel.consonant] = consonantGroup;

    return accum;
  }, {});

  return(
    <DataTable>
      <ScrollView>
        {Object.keys(consonantGroups).map((consonant: string) => {
          const consonantGroup = consonantGroups[consonant];

          return(
            <DataTable.Row key={consonant}>
              {consonantGroup.map((fidel: Fidel) => (
                <DataTable.Cell key={fidel.character}>
                  <TouchableOpacity style={styles.fidelButton}>
                    <Text>{fidel.character}</Text>
                  </TouchableOpacity>
                </DataTable.Cell>
              ))}
            </DataTable.Row>
          );
        })}
      </ScrollView>
    </DataTable>
  );
}
