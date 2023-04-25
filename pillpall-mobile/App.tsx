import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CustomButton from './src/components/CustomButton';
import React from 'react';

export default function App() {
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
