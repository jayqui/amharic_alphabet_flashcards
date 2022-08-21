import fidelsObject from '../data/fidelsObject';

const STANDARD_VOWELS = ['ə', 'u', 'i', 'a', 'ē', 'ih', 'o'];
const DIPHTHONGS = ['diphthong_1', 'diphthong_2', 'uah', 'diphthong_4', 'uuh'];

export function fidelsObjectNoDiphthongs() {
  const accum = {};

  Object.keys(fidelsObject).forEach((consonant) => {
    const allFidelsForConsonant = fidelsObject[consonant];
    const nonDiphthongFidelsForConsonant = STANDARD_VOWELS.map((vowel) => allFidelsForConsonant[vowel]);
    accum[consonant] = nonDiphthongFidelsForConsonant;
  });

  return accum;
}

export function fidelsObjectWithDiphthongs() {
  const accum = {};

  const allVowelsAndDiphthongs = STANDARD_VOWELS.concat(DIPHTHONGS);
  const fakeFidel = (consonant: string, vowelOrDiphthong: string) => ({
    character: '',
    transliteration: '',
    consonant,
    vowel: vowelOrDiphthong,
    file: null,
  });

  Object.keys(fidelsObject).forEach((consonant) => {
    const allFidelsForConsonant = fidelsObject[consonant];
    const paddedFidelListForConsonant = allVowelsAndDiphthongs.map((vowelOrDiphthong) => {
      if (allFidelsForConsonant.hasOwnProperty(vowelOrDiphthong)) {
        return allFidelsForConsonant[vowelOrDiphthong];
      } else {
        return fakeFidel(consonant, vowelOrDiphthong);
      }
    });
    accum[consonant] = paddedFidelListForConsonant;
  });

  return accum;
}
