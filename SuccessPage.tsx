import { StatusBar } from 'expo-status-bar';
import { Button, Text, View } from 'react-native';

type SuccessPageProps = {
  handleRestartPress: Function,
  styles: {
    container: object,
    fontSize96: object,
  },
}

export default function SuccessPage({ handleRestartPress, styles }: SuccessPageProps) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={[styles.fontSize96]}>Yay!</Text>
      <Button title="Restart" onPress={handleRestartPress}></Button>
    </View>
  )
}
