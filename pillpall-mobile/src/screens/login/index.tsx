import React, { FC, useState } from 'react'
import { SafeAreaView, Alert, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import CustomButton from '../../components/CustomButton';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import TextTitle from '../../components/TextTitle';
import SubTitleText from '../../components/SubTitleText';
import LoginSignupSwitch from '../../components/LoginSignupSwitch';
import axios from 'axios';

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
        // if ( !validateEmail(email) || !validatePassword(password) ) {
        //     Alert.alert('Invalid Credentials.');
        //     return;
        // }

        console.log(email, password);
        const data = new FormData();
        data.append('email', email);
        data.append('password', password);

        console.log(data);

        await axios.post('http://192.168.0.103:8000/api/v0.0.0/login', data, {
            headers: {
                'Content-Type': "multipart/form-data",
                'Accept': 'application/json',
            },
        })
        .then((response) => {
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