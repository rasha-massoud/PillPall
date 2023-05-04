import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from '../screens/welcome';
import ContactInfo from '../screens/contactinfo';
import AnthropometricMeasurements from '../screens/measurements';
import EmergencyContact from '../screens/emergencycontact';
import VitalSigns from '../screens/vitalsigns';
import MedicalHistory from '../screens/medicalhistory';
import MedicationsAndHabits from '../screens/medicationshabits';
import Report from "../screens/report";
import EditReport from "../screens/editreport"
import MedicationSchedule from '../screens/medicationschedule';
import AddMedicine from '../screens/addmedicine';
import DeleteMedicine from '../screens/deletemedicine';
import NearbyPharms from '../screens/nearbypharms';
import BudgetTracker from '../screens/budgettracker';
import PersonalAssistant from '../screens/personalassistant';
import FileNum from '../screens/filenumbers';
import AddFileNumber from '../screens/addfilenumber';
import MedicalResults from '../screens/medicalresults';
import AddMedicalResult from '../screens/addmedicalresult';
import PatientSearch from "../screens/patientseach";

const Stack = createStackNavigator();

export const WelcomePatientStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="ContactInfo" component={ContactInfo} />
        <Stack.Screen name="AnthropometricMeasurements" component={AnthropometricMeasurements} />
        <Stack.Screen name="EmergencyContact" component={EmergencyContact} />
        <Stack.Screen name="VitalSigns" component={VitalSigns} />
        <Stack.Screen name="MedicalHistory" component={MedicalHistory} />
        <Stack.Screen name="MedicationsAndHabits" component={MedicationsAndHabits} />
        </Stack.Navigator>
    );
};

export const ReportStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Report" component={Report} />
            <Stack.Screen name="EditReport" component={EditReport} />
        </Stack.Navigator>
    );
};

export const MedicationScheduleStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MedicationSchedule" component={MedicationSchedule} />
        <Stack.Screen name="AddMedicine" component={AddMedicine} />
        <Stack.Screen name="DeleteMedicine" component={DeleteMedicine} />
        <Stack.Screen name="NearbyPharms" component={NearbyPharms} />
        <Stack.Screen name="BudgetTracker" component={BudgetTracker} />
        </Stack.Navigator>
    );
};

export const MedicalStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="PatientSearch" component={PatientSearch} />
            <Stack.Screen name="FileNum" component={FileNum} />
            <Stack.Screen name="AddFileNumber" component={AddFileNumber} />
            <Stack.Screen name="MedicalResults" component={MedicalResults} />
            <Stack.Screen name="AddMedicalResult" component={AddMedicalResult} />
        </Stack.Navigator>
    );
};

