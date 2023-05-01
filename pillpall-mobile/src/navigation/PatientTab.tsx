import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";

import Welcome from "../screens/welcome";
import ContactInfo from "../screens/contactinfo";
import AnthropometricMeasurements from "../screens/measurements";
import EmergencyContact from "../screens/emergencycontact";
import VitalSigns from "../screens/vitalsigns";
import MedicalHistory from "../screens/medicalhistory";
import MedicationsAndHabits from "../screens/medicationshabits";
import Report from "../screens/report";
// import EditReport from "../screens/editreport"
import MedicationSchedule from "../screens/medicationschedule";
import AddMedicine from "../screens/addmedicine";
import DeleteMedicine from "../screens/deletemedicine";
import NearbyPharms from "../screens/nearbypharms";
import BudgetTracker from "../screens/budgettracker";
import PersonalAssistant from "../screens/personalassistant";
import FileNum from "../screens/filenumbers";
import AddFileNumber from "../screens/addfilenumber";
import MedicalResults from "../screens/medicalresults";
import AddMedicalResult from "../screens/addmedicalresult";
import PatientSearch from "../screens/patientseach";
import ChangePassword from "../screens/changepassword";

const PatientTabStack = () => {
  const Tabs = createBottomTabNavigator();
  return (
    <Tabs.Navigator screenOptions={{ headerShown: false }}>
        <Tabs.Screen
            options={{
            tabBarIcon: () => (
                <Image
                    source={require('../../assets/navReportPatient.png')}
                    // style={{ width: 20, height: 20 }}
                />
            ),
            }}
            name="Report"
            component={Report}
        />
        <Tabs.Screen
            options={{
                tabBarIcon: () => (
                    <Image
                        source={require('../../assets/navMedSchedule.png')}
                        // style={{ width: 20, height: 20 }}
                    />
                ),
                }}
                name="Med"
                component={MedicationSchedule}
        />
        <Tabs.Screen
        options={{
            tabBarIcon: () => (
                <Image
                    source={require('../../assets/navSearchDoc.png')}
                    // style={{ width: 20, height: 20 }}
                />
            ),
            }}
            name="Search"
            component={PatientSearch}
        />
        <Tabs.Screen
            options={{
                tabBarIcon: () => (
                <Image
                    source={require('../assets/navRobot.png')}
                    // style={{ width: 20, height: 20 }}
                />
                ),
            }}
            name="Robot"
            component={PersonalAssistant}
        />
        <Tabs.Screen
            options={{
                tabBarIcon: () => (
                <Image
                    source={require('../assets/navSettings.png')}
                    // style={{ width: 20, height: 20 }}
                />
                ),
            }}
            name="Settings"
            component={ChangePassword}
        />
    </Tabs.Navigator>
  );
};

export default PatientTabStack;