import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/screens/login';
import React, { useState, useEffect } from 'react';
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
import EditReport from './src/screens/editreport';
import ChangePassword from './src/screens/changepassword';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MedicationSchedule from './src/screens/medicationschedule';
import AddMedicine from './src/screens/addmedicine';
import DeleteMedicine from './src/screens/deletemedicine';
import NearbyPharms from './src/screens/nearbypharms';
import BudgetTracker from './src/screens/budgettracker';
import PersonalAssistant from './src/screens/personalassistant';
import FileNum from './src/screens/filenumbers';
import AddFileNumber from './src/screens/addfilenumber';
import AddMedicalResult from './src/screens/addmedicalresult';
import MedicalResults from './src/screens/medicalresults';
import PatientSearch from './src/screens/patientseach';
import FillProfile from './src/screens/fillprofile';
import { Provider } from "react-redux";
import store from "./src/store";
import * as Font from 'expo-font';
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
