import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, View } from 'react-native';
import { NativeRouter, Routes, Route, Link } from 'react-router-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cloneDeep, merge } from 'lodash';

import FlashcardPage from './app/components/FlashcardPage';
import Settings from './app/components/Settings';
import { SettingsProps, DEFAULT_SETTINGS } from './app/types/SettingsProps';

export default function AppContainer() {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  useEffect(() => {
    getSettings()
  }, [])

  async function getSettings() {
    try {
      const jsonValue = await AsyncStorage.getItem('settings');
      const settingsParsedJson = jsonValue != null ? JSON.parse(jsonValue) : {}
      const finalSettingsValue = merge(cloneDeep(DEFAULT_SETTINGS), settingsParsedJson);

      setSettings(finalSettingsValue);
      setLoading(false);
    } catch (error) {
      alert(`error retrieving saved settings: ${error}`)
    }
  }

  if (loading) return <h1>Loading . . .</h1>
  return <App settings={settings} setSettings={setSettings} />
}

function App({ settings, setSettings }: SettingsProps) {
  return (
    <NativeRouter>
      <StatusBar style="auto" />
      <View style={styles.outermostContainer}>
        <View style={styles.nav}>
          <Link to='/' underlayColor='#eee' style={styles.navItem}>
            <Image style={styles.navImage} source={require('./app/assets/images/icons/hamburger.png')} />
          </Link>
          <Link to='/settings' underlayColor='#eee' style={styles.navItem}>
            <Image style={styles.navImage} source={require('./app/assets/images/icons/settings.png')} />
          </Link>
        </View>

        <View style={styles.mainContentContainer}>
          <Routes>
            <Route path='/' element={<FlashcardPage settings={settings} />} />
            <Route path='/settings' element={
              <Settings settings={settings} setSettings={setSettings} />}
            />
          </Routes>
        </View>
      </View>
    </NativeRouter>
  )
}

const styles = StyleSheet.create({
  outermostContainer: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  nav: {
    flexDirection: 'row',
    backgroundColor: '#0f8',
    justifyContent: 'space-between',
    height: '11%',
    width: '100%',
    paddingTop: 44,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  mainContentContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: '89%',
    width: '100%',
  },
  navImage: {
    width: 24,
    height: 24,
  },
});
