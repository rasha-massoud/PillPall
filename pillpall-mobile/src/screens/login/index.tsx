import React, { FC, useState } from 'react'
import { SafeAreaView, Alert, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import CustomButton from '../../components/CustomButton';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import TextTitle from '../../components/TextTitle';
import SubTitleText from '../../components/SubTitleText';
import LoginSignupSwitch from '../../components/LoginSignupSwitch';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles'

const Login: FC = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const validateEmail = (email: string): boolean => {
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return regex.test(email.trim());
    }
    
    const validatePassword = (password: string): boolean => {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        return regex.test(password);
    }

    const handleEmailChange = (value: string) => {
        setEmail(value);
    };

    const handlePasswordChange = (value: string) => {
        setPassword(value);
    };

    const handleLoginPress = async () => {
        const data = new FormData();
        data.append('email', email);
        data.append('password', password);

        console.log(data);

        const endpoint = 'login';
        console.log(`${API_URL}${endpoint}`)
        await axios.post(`${API_URL}${endpoint}`, data, {
            headers: {
                'Content-Type': "multipart/form-data",
                'Accept': 'application/json',
            },
        })
        .then( async (response) => {
            AsyncStorage.setItem('token', response.data.authorisation.token);
            AsyncStorage.setItem('role', response.data.user.role);
            AsyncStorage.setItem('first_login', response.data.user.first_login.toString());
            console.log(response.data);
        })
        .catch((error) => {
            console.error('An error occurred during login');
        });
    };

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
        
        <TextInputwithLabel label='Email' keyboardType="email-address" placeholder='Enter your Email' textinputprops={{ secureTextEntry: false}} onChangeText= {handleEmailChange} />

        <TextInputwithLabel label="Password" placeholder='Enter your Password' textinputprops={{ secureTextEntry: true}} onChangeText= {handlePasswordChange} />
        
        <CustomButton containerStyle={{ alignSelf: 'center' }} buttonprops={{ title: "Login", onPress: handleLoginPress }}  />
        
        <TouchableOpacity style={styles.forgotPassword}> 
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <LoginSignupSwitch fontWeight= 'bold' textTitle="Don't have an account?" action="Sign Up" onPress={handleSignUpPress}></LoginSignupSwitch>
    </SafeAreaView>
  );
};

export default Login;