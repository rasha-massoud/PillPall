import React, { FC, useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, Image, Alert } from 'react-native';
import CustomButton from '../../components/CustomButton';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import TextTitle from '../../components/TextTitle';
import SubTitleText from '../../components/SubTitleText';
import LoginSignupSwitch from '../../components/LoginSignupSwitch';
import axios from 'axios';
import API_URL from '../../constants/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn, setFirstLogin, setRole } from "../../store/slices/reportSlice";
import Welcome from '../welcome';
import Report from '../report';
import FillProfile from '../fillprofile';
import Profile from '../profile';
import PatientButtonTab from '../../navigation/PatientButtonTab';

import styles from './styles'

interface RootState {
    report: {
       is_logged_in: string,
       first_login: string,
       role: string,
    };
 }

const Login: FC = () => {

    const navigation = useNavigation();

    const dispatch = useDispatch();

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

        if (!validateEmail(email) || !validatePassword(password)) {
            console.error('Invalid Credentials');
            return;
        }

        const data = new FormData();
        data.append('email', email);
        data.append('password', password);

        const endpoint = 'login';
        await axios.post(`${API_URL}${endpoint}`, data, {
            headers: {
                'Content-Type': "multipart/form-data",
                'Accept': 'application/json',
            },
        })
        .then( async (response) => {
            if (response.data.success){
                AsyncStorage.setItem('token', response.data.authorisation.token);
                AsyncStorage.setItem('name', response.data.user.name);
                AsyncStorage.setItem('email', response.data.user.email);
                AsyncStorage.setItem('role', response.data.user.role);
                AsyncStorage.setItem('first_login', response.data.user.first_login.toString());
                
                dispatch(setFirstLogin(response.data.user.first_login.toString()));
                dispatch(setRole(response.data.user.role));
                dispatch(setIsLoggedIn('1'));

                const is_logged_in = useSelector(
                    (state: RootState) => state.report.is_logged_in
                );
                const role = useSelector(
                    (state: RootState) => state.report.role
                );
                const first_login = useSelector(
                    (state: RootState) => state.report.first_login
                );

                if (is_logged_in === '1' && first_login === '1' && role === 'patient') {
                    navigation.navigate('Welcome')
                }
              
                if (is_logged_in === '1' && first_login === '0' && role === 'patient') {
                    navigation.navigate('Report')
                }
            
                if (is_logged_in === '1' && first_login === '1' && role === 'doctor') {
                    navigation.navigate('FillProfile')
                }
            
                if (is_logged_in === '1' && first_login === '0' && role === 'doctor') {
                    navigation.navigate('Profile')
                }
            }

            Alert.alert(
                'Success',
                'Successful Login.',
                [
                  { text: 'OK' }
                ],
                { cancelable: false }
              );
        })
        .catch((error) => {
            console.error('Error during Login or Invalid Credentials');
        });
    };

    // const navigation = useNavigation();

    const handleSignUpPress = () => {
        // navigation.navigate('Register');
    };

    const handleForgotPasswordPress = () => {
        // navigation.navigate('ForgotPassword'); 
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
            
            <TouchableOpacity style={styles.forgotPassword} onPress={handleForgotPasswordPress}> 
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <LoginSignupSwitch fontWeight= 'bold' textTitle="Don't have an account?" action="Sign Up" onPress={handleSignUpPress}></LoginSignupSwitch>
        </SafeAreaView>
  );
};

export default Login;