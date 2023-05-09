import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, Text } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { colors } from '../constants/palette';
import ChangePassword from "../screens/changepassword";
import Profile from "../screens/profile";
import DoctorSearch from "../screens/doctorsearch";

import { ProfileStack } from '../navigation/DoctorStacks'
import { PatientStack } from '../navigation/DoctorStacks'
import { ChangePasswordStack } from '../navigation/DoctorStacks'

const DoctorButtonTab = () => {
    const Tabs = createBottomTabNavigator();

    return (
        <Tabs.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: { backgroundColor: colors.blue, height: 92 },
                tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold' },
                tabBarActiveTintColor: 'white',
                tabBarIcon: ({ focused }) => {
                    let imageSource;
                    let imageStyle;

                    if (route.name === 'Profile') {
                        imageSource = focused
                            ? require('../../assets/navDoctorFocused.png')
                            : require('../../assets/navDoctor.png');
                        imageStyle = { width: 32, height: 38 };
                    } else if (route.name === 'Search') {
                        imageSource = focused
                            ? require('../../assets/navUsersFocused.png')
                            : require('../../assets/navUsers.png');
                        imageStyle = { width: 80, height: 35 };
                    } else if (route.name === 'Settings') {
                        imageSource = focused
                            ? require('../../assets/navSettingsFocused.png')
                            : require('../../assets/navSettings.png');
                        imageStyle = { width: 40, height: 38 };
                    }

                    return <Image source={imageSource} style={imageStyle} />;
                },
            })}
        >
            <Tabs.Screen name="Profile" component={ProfileStack} />
            <Tabs.Screen name="Search" component={PatientStack} />
            <Tabs.Screen name="Settings" component={ChangePasswordStack} />
        </Tabs.Navigator>
    );
};

export default DoctorButtonTab;
