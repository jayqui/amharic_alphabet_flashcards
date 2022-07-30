import { Button, Text } from 'react-native';

type SuccessPageProps = {
  handleRestartPress: Function,
  styles: {
    fontSize96: object,
  },
}

export default function SuccessPage({ handleRestartPress, styles }: SuccessPageProps) {
  return (
    <>
      <Text style={[styles.fontSize96]}>Yay!</Text>
      <Button title="Restart" onPress={handleRestartPress}></Button>
    </>
  )
}
