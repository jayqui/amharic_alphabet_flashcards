import React from 'react'
import { Image, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { Link } from 'react-router-native';

type Props = {}

export default function Navbar({}: Props) {
  return (
    <>
      <StatusBar style="auto" />
      <TouchableOpacity onPress={() => {
        console.log('tapped settings icon');
        // history.push('/settings')
      }} style={styles.topNav}>
        <Link to="/settings">
          <Image style={{ width: 24, height: 24 }} source={require('../assets/images/icons/settings.png')} />
        </Link>
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  topNav: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    width: '80%',
  },
});
