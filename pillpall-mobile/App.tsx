import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Provider } from "react-redux";
import store from "./src/store";
import loadFonts from './src/constants/font';
import StackSwitcher from './src/navigation/StackSwitcher';

export default function App() {

  const [isFontLoaded, setIsFontLoaded] = useState(false);

  useEffect(() => {
    const loadFontsAsync = async () => {
      await loadFonts();
      setIsFontLoaded(true);
    };

    loadFontsAsync();
  }, []);

  if (!isFontLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <StackSwitcher/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
