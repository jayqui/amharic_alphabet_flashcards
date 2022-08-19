import { ScrollView, Text, TouchableOpacity } from 'react-native';

import * as globalStyles from '../globalStyles.js';
import fidels from '../data/fidel.js';

type Fidel = {
  character: string,
  transliteration: string,
  consonant: string,
  vowel: string,
  file: object,
}

export default function FidelList() {
  const consonantGroups = fidels.reduce((accum, fidel: Fidel) => {
    const consonantGroup = (accum[fidel.consonant] || []);
    consonantGroup.push(fidel);
    accum[fidel.consonant] = consonantGroup;

    return accum;
  }, {});

  return(
    <ScrollView>
      {Object.keys(consonantGroups).map((consonant) => {
        const fidelsInConsonantGroup = consonantGroups[consonant];

        return(
          <Text key={consonant}>
            {fidelsInConsonantGroup.map((fidel) => (
              <TouchableOpacity key={fidel.character} style={{ ...globalStyles.standardButton, backgroundColor: globalStyles.green20 }}>
                <Text
                  key={fidel.character}
                  style={globalStyles.fontSize24}
                >
                  {fidel.character}
                </Text>
              </TouchableOpacity>
            ))}
          </Text>
        );
      })}
    </ScrollView>
  );
}
