import { Text } from 'react-native';
import { Button } from 'react-native-paper';

import * as globalStyles from '../globalStyles';

type SuccessPageProps = {
  handleRestartPress(): void,
}

export default function SuccessPage({ handleRestartPress }: SuccessPageProps) {
  return (
    <>
      <Text style={[globalStyles.fontSize96]}>Yay!</Text>
      <Button
        mode='contained'
        onPress={handleRestartPress}
        style={globalStyles.standardButton}
        contentStyle={globalStyles.standardButtonContent}
        labelStyle={globalStyles.standardButtonLabel}
      >
          Restart
      </Button>
    </>
  );
}
