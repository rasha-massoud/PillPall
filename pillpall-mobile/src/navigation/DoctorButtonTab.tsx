import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import { colors } from '../constants/palette';
import ChangePassword from "../screens/changepassword";
import Profile from "../screens/profile";
import DoctorSearch from "../screens/doctorsearch";

const DoctorButtonTab = () => {
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
                        source={require('../../assets/navDoctor.png')}
                        style={{ width: 55, height: 52 }}
                    />
                ),
                }}
                name="Profile"
                component={Profile}
            />
            <Tabs.Screen
            options={{
                tabBarIcon: () => (
                    <Image
                        source={require('../../assets/navUsers.png')}
                        style={{ width: 70, height: 52 }}
                    />
                ),
                }}
                name="Search"
                component={DoctorSearch}
            />
            <Tabs.Screen
                options={{
                    tabBarIcon: () => (
                    <Image
                        source={require('../../assets/navSettings.png')}
                        style={{ width: 55, height: 52 }}
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