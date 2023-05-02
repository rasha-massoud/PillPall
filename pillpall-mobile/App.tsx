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
import ChangePassword from './src/screens/changepassword';
import OnboardingStack from './src/navigation/AuthNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MedicationSchedule from './src/screens/medicationschedule';
import AddMedicine from './src/screens/addmedicine';
import DeleteMedicine from './src/screens/deletemedicine';
import NearbyPharms from './src/screens/nearbypharms';
import BudgetTracker from './src/screens/budgettracker';
import PersonalAssitant from './src/screens/personalassistant';
import FileNum from './src/screens/filenumbers';
import AddFileNumber from './src/screens/addfilenumber';
import AddMedicalResult from './src/screens/addmedicalresult';
import MedicalResults from './src/screens/medicalresults';
import PatientSearch from './src/screens/patientseach';

export default function App() {
  useEffect(() => {
    loadFonts();
  }, []);
  
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <EmergencyContact/>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
