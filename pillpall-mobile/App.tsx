import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/screens/login';
import React, { useEffect } from 'react';
import { loadFonts } from './src/constants/font';

export default function App() {
  useEffect(() => {
    loadFonts();
  }, []);
  
  return (
    <View style={styles.container}>
      <Login/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
