import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import { colors } from '../constants/palette';
import Report from "../screens/report";
import MedicationSchedule from "../screens/medicationschedule";
import PersonalAssistant from "../screens/personalassistant";
import PatientSearch from "../screens/patientseach";
import ChangePassword from "../screens/changepassword";

import { ChangePasswordStack } from '../navigation/PatientStacks'
import { AssistStack } from '../navigation/PatientStacks'
import { ReportStack } from '../navigation/PatientStacks'
import { MedicationScheduleStack } from '../navigation/PatientStacks'
import { MedicalStack } from '../navigation/PatientStacks'

const PatientButtonTab = () => {
  const Tabs = createBottomTabNavigator();
  return (
    <Tabs.Navigator 
        screenOptions={({ route }) => ({
            headerShown: false,  
            tabBarStyle: {backgroundColor: colors.blue, height: 92},
            tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold' },
            tabBarActiveTintColor: 'white',
            tabBarIcon: ({ focused, color, size }) => {
                let iconSource;

                if (route.name === "Report") {
                    iconSource = focused
                        ? require('../../assets/navReportPatientFocused.png')
                        : require('../../assets/navReportPatient.png');
                } else if (route.name === "Med") {
                    iconSource = focused
                        ? require('../../assets/navMedScheduleFocused.png')
                        : require('../../assets/navMedSchedule.png');
                } else if (route.name === "Search") {
                    iconSource = focused
                        ? require('../../assets/navSearchDocFocused.png')
                        : require('../../assets/navSearchDoc.png');
                } else if (route.name === "Robot") {
                    iconSource = focused
                        ? require('../../assets/navRobotFocused.png')
                        : require('../../assets/navRobot.png');
                } else if (route.name === "Settings") {
                    iconSource = focused
                        ? require('../../assets/navSettingsFocused.png')
                        : require('../../assets/navSettings.png');
                }

                return (
                    <Image
                        source={iconSource}
                        style={{ width: 40, height: 38 }}
                    />
                );
            },
        })}
    >
        <Tabs.Screen
            name="Report"
            component={ReportStack}
        />
        <Tabs.Screen
            name="Med"
            component={MedicationScheduleStack}
        />
        <Tabs.Screen
            name="Search"
            component={MedicalStack}
        />
        {/* <Tabs.Screen
            name="IoT"
            component={Report}                   
        /> */}
        <Tabs.Screen
            name="Robot"
            component={AssistStack}
        />
        <Tabs.Screen
            name="Settings"
            component={ChangePasswordStack}
        />
    </Tabs.Navigator>
  );
};

export default PatientButtonTab;
