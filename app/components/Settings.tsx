import { Button, Text, View } from 'react-native';

type SettingsProps = {
  flashcardBatchSize: number,
  setFlashcardBatchSize: Function,
}

export default function Settings({ flashcardBatchSize, setFlashcardBatchSize }: SettingsProps) {

  return (
    <>
      <Text>Flashcard Batch Size: {flashcardBatchSize}</Text>
    </>
  )
}
