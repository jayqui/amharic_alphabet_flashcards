import { Text, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import * as globalStyles from '../globalStyles';

export default function MainMenu() {
  return(
    <>
      <Link to='/flashcards' underlayColor={globalStyles.green40} style={styles.flashcardButton}>
        <Text style={globalStyles.fontSize20}>Flashcards</Text>
      </Link>
    </>
  );
}

const styles = StyleSheet.create({
  flashcardButton: {
    ...globalStyles.standardButton,
    backgroundColor: globalStyles.green20,
  }
});
