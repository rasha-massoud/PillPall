import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Patients from '../screens/patients';
import ApprovedDoctors from '../screens/approveddoctors';
import UnapprovedDoctors from '../screens/unapproveddoctors';
import PatientReportByAdmin from '../screens/patientreportbyadmin';

const Stack = createStackNavigator();

export const PatientsStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: 'white' } }}>
            <Stack.Screen name="Patients" component={Patients} />
            <Stack.Screen name="PatientReportByAdmin" component={PatientReportByAdmin} />
        </Stack.Navigator>
    );
};

export const ApprovedDoctorsStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: 'white' } }}>
            <Stack.Screen name="ApprovedDoctors" component={ApprovedDoctors} />
        </Stack.Navigator>
    );
};

export const UnapprovedDoctorsStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: 'white' } }}>
            <Stack.Screen name="UnapprovedDoctors" component={UnapprovedDoctors} />
        </Stack.Navigator>
    );
};

