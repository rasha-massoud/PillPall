import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import { colors } from '../constants/palette';
import Report from "../screens/report";
import MedicationSchedule from "../screens/medicationschedule";
import PersonalAssistant from "../screens/personalassistant";
import PatientSearch from "../screens/patientseach";
import ChangePassword from "../screens/changepassword";

const PatientButtonTab = () => {
  const Tabs = createBottomTabNavigator();
  return (
    <Tabs.Navigator 
        screenOptions={{ headerShown: false,  
            tabBarStyle: {backgroundColor: colors.blue, height: 85},
        }}       
    >
        <Tabs.Screen
            options={{
            tabBarIcon: () => (
                <Image
                    source={require('../../assets/navReportPatient.png')}
                    style={{ width: 40, height: 38 }}
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
                        style={{ width: 40, height: 38 }}
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
                    style={{ width: 40, height: 38 }}
                />
            ),
            }}
            name="Search"
            component={PatientSearch}
        />
        {/* <Tabs.Screen
            options={{
            tabBarIcon: () => (
                <Image
                    source={require('../../assets/navIot.png')}
                    style={{ width: 40, height: 38 }}
                />
            ),
            }}
            name="IoT"
            component={Report}                   
        /> */}
        <Tabs.Screen
            options={{
                tabBarIcon: () => (
                <Image
                    source={require('../../assets/navRobot.png')}
                    style={{ width: 40, height: 38 }}
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
                    source={require('../../assets/navSettings.png')}
                    style={{ width: 40, height: 38 }}
                />
                ),
            }}
            name="Settings"
            component={ChangePassword}
        />
    </Tabs.Navigator>
  );
};

export default PatientButtonTab;