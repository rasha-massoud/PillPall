import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import { colors } from '../constants/palette';

import { PatientsStack } from '../navigation/AdminStacks'
import { ApprovedDoctorsStack } from '../navigation/AdminStacks'
import { UnapprovedDoctorsStack } from '../navigation/AdminStacks'

const AdminButtonTab = () => {
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

                    if (route.name === 'Patients') {
                        imageSource = focused
                            ? require('../../assets/navPatientsFocused.png')
                            : require('../../assets/navPatients.png');
                        imageStyle = { width: 49, height: 42 };
                    } else if (route.name === 'ApprovedDoctors') {
                        imageSource = focused
                            ? require('../../assets/navApprovedDoctorsFocused.png')
                            : require('../../assets/navApprovedDoctors.png');
                        imageStyle = { width: 49, height: 42 };
                    } else if (route.name === 'UnapprovedDoctors') {
                        imageSource = focused
                            ? require('../../assets/navUnapprovedDoctorsFocused.png')
                            : require('../../assets/navUnapprovedDoctors.png');
                        imageStyle = { width: 49, height: 42 };
                    }

                    return <Image source={imageSource} style={imageStyle} />;
                },
            })}
        >
            <Tabs.Screen name="Patients" component={PatientsStack} />
            <Tabs.Screen name="ApprovedDoctors" component={ApprovedDoctorsStack} />
            <Tabs.Screen name="UnapprovedDoctors" component={UnapprovedDoctorsStack} />
        </Tabs.Navigator>
    );
};

export default AdminButtonTab;
