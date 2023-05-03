import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import FillProfile from '../screens/fillprofile';
import Profile from '../screens/profile';
import EditProfile from '../screens/editprofile';
import DoctorSearch from '../screens/doctorsearch';
import PatientReport from '../screens/patientreport';
import PatientResult from '../screens/patientresult';

const Stack = createStackNavigator();

const WelcomeDoctorStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="FillProfile" component={FillProfile} />
        </Stack.Navigator>
    );
};

const ProfileStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
        </Stack.Navigator>
    );
};

const PatientStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="DoctorSearch" component={DoctorSearch} />
            <Stack.Screen name="PatientReport" component={PatientReport} />
            <Stack.Screen name="PatientResult" component={PatientResult} />
        </Stack.Navigator>
    );
};

export default {
    WelcomeDoctorStack,
    ProfileStack,
    PatientStack
}
