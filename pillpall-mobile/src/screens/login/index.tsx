import React, { FC } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import CustomButton from '../../components/CustomButton';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import TextTitle from '../../components/TextTitle';
import SubTitleText from '../../components/SubTitleText';
import LoginSignupSwitch from '../../components/LoginSignupSwitch';

import styles from './styles'

const Login: FC = () => {

    const handleSignUpPress = () => {
        // Navigate to sign up screen
    };

    return (
    
    <SafeAreaView style={styles.container}>
        <Image
            source={require('../../../assets/logo.png')}
            style={styles.image}
        />
        <TextTitle title='Login'></TextTitle>
        <SubTitleText title='Please sign in to continue.'></SubTitleText>

        <TextInputwithLabel label="Email" keyboardType="email-address" placeholder='Enter your Email' textinputprops={{ secureTextEntry: false }}/>

        <TextInputwithLabel label="Password" placeholder='Enter your Password' textinputprops={{ secureTextEntry: true }} />

        <CustomButton containerStyle={{ alignSelf: 'center' }} buttonprops={{ title: "Login", onPress: () => console.log('Login') }}  />
        
        <TouchableOpacity style={styles.forgotPassword}> 
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <LoginSignupSwitch textTitle="Don't have an account?" action="Sign Up" onPress={handleSignUpPress}></LoginSignupSwitch>
    </SafeAreaView>
  );
};

export default Login;