import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, Text} from "react-native";
import { colors } from '../constants/palette';
import ChangePassword from "../screens/changepassword";
import Profile from "../screens/profile";
import DoctorSearch from "../screens/doctorsearch";

import { ProfileStack } from '../navigation/DoctorStacks'
import { PatientStack } from '../navigation/DoctorStacks'

const DoctorButtonTab = () => {
    const Tabs = createBottomTabNavigator();
    return (
        <Tabs.Navigator 
            screenOptions={{ headerShown: false,  
                tabBarStyle: {backgroundColor: colors.blue, height: 92},
                tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold' }, 
            }}       
        >            
            <Tabs.Screen
                options={{
                    tabBarIcon: () => (
                        <Image
                            source={require('../../assets/navDoctor.png')}
                            style={{ width: 32, height: 38 }}
                        />
                    ),
                }}
                name="Profile"
                component={ProfileStack}
            />
            <Tabs.Screen
            options={{
                    tabBarIcon: () => (
                        <Image
                            source={require('../../assets/navUsers.png')}
                            style={{ width: 80, height: 35 }}
                        />
                    ),
                }}
                name="Search"
                component={PatientStack}
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

export default DoctorButtonTab;