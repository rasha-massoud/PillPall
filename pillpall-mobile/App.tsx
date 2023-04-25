import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CustomButton from './src/components/CustomButton';
import React, { useEffect } from 'react';
import { loadFonts } from './src/constants/font';

export default function App() {
  useEffect(() => {
    loadFonts();
  }, []);
  
  const handlePress = () => {
    console.log('Button pressed');
  }
  
  return (
    <View style={styles.container}>
      <CustomButton buttonprops={{ title: 'Press me', onPress: handlePress }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
