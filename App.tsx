import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { NativeRouter, Routes, Route, Link } from 'react-router-native';

import FlashcardPage from './app/components/FlashcardPage';
import Navbar from './app/components/Navbar';
import Settings from './app/components/Settings';

function Layout() {
  return(
    <View>
      <Navbar />
    </View>
  )
}

export default function App() {
  return (
    <View style={styles.container}>
      <NativeRouter>
        <View>
          <Link to="/">Flashcards</Link>
          <Link to="/settings">Settings</Link>
        </View>
        <Routes>
          <Route path="/" element={<FlashcardPage />} />
          <Route element={<Layout />}>
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </NativeRouter>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
