import { Button, Text } from 'react-native';
import * as globalStyles from '../globalStyles';

type SuccessPageProps = {
  handleRestartPress(): void,
}

export default function SuccessPage({ handleRestartPress }: SuccessPageProps) {
  return (
    <>
      <Text style={[globalStyles.fontSize96]}>Yay!</Text>
      <Button title="Restart" onPress={handleRestartPress}></Button>
    </>
  );
}
