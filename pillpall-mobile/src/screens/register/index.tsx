import React, { FC } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import CustomButton from '../../components/CustomButton';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import TextTitle from '../../components/TextTitle';
import SubTitleText from '../../components/SubTitleText';
import LoginSignupSwitch from '../../components/LoginSignupSwitch';
import TwoCustomButton from '../../components/TwoCustomButton';

import styles from './styles'

const Register: FC = () => {

    const handleLoginPress = () => {
        // Navigate to Login in screen
    };

    return (
    
    <SafeAreaView style={styles.container}>
        <TextTitle title='Create App'></TextTitle>
        <SubTitleText title='Please fill the input below here.'></SubTitleText>

        <TextInputwithLabel label="Name" textinputprops={{ secureTextEntry: false }}/>
        <TextInputwithLabel label="Email" textinputprops={{ secureTextEntry: false }}/>

        <TextInputwithLabel label="Password" textinputprops={{ secureTextEntry: true }} />
        <TextInputwithLabel label="ConfirmPassword" textinputprops={{ secureTextEntry: true }} />

        <TwoCustomButton containerStyle={{ alignSelf: 'center'}} buttonprops2={{ title: "Cancel", onPress: () => console.log('Cancel') }} buttonprops1={{ title: "Signup", onPress: () => console.log('Signup') }}></TwoCustomButton>

        <LoginSignupSwitch style={{ marginTop: '10%' }}textTitle="Already have an account?" action="Login" onPress={handleLoginPress}></LoginSignupSwitch>
    </SafeAreaView>
  );
};

export default Register;