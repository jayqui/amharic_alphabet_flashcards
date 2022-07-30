import { Button, Text } from 'react-native';
import * as globalStyles from '../styleConstants';

type SuccessPageProps = {
  handleRestartPress: Function,
  styles: {
    fontSize96: object,
  },
}

export default function SuccessPage({ handleRestartPress, styles }: SuccessPageProps) {
  return (
    <>
      <Text style={[globalStyles.fontSize96]}>Yay!</Text>
      <Button title="Restart" onPress={handleRestartPress}></Button>
    </>
  )
}
