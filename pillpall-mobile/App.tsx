import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/screens/login';
import React, { useEffect } from 'react';
import { loadFonts } from './src/constants/font';
import Register from './src/screens/register';
import Welcome from './src/screens/welcome';
import ContactInfo from './src/screens/contactinfo';
import AnthropometricMeasurements from './src/screens/measurements';
import EmergencyContact from './src/screens/emergencycontact';
import VitalSigns from './src/screens/vitalsigns';
import MedicalHistory from './src/screens/medicalhistory';
import MedicationsAndHabits from './src/screens/medicationshabits';
import ForgotPassword from './src/screens/forgotpassword';
import ResetPassword from './src/screens/resetpassword';
import Report from './src/screens/report';

export default function App() {
  useEffect(() => {
    loadFonts();
  }, []);
  
  return (
    <View style={styles.container}>
      <Report/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
