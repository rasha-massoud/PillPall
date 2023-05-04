import React, { FC, useState} from 'react'
import { SafeAreaView, Alert } from 'react-native';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import TextTitle from '../../components/TextTitle';
import SubTitleText from '../../components/SubTitleText';
import LoginSignupSwitch from '../../components/LoginSignupSwitch';
import TwoCustomButton from '../../components/TwoCustomButton';
import RoleCheckBox from '../../components/RoleCheckBox';
import axios from 'axios';
import { useNavigation } from '@react-navigation/core';
import API_URL from '../../constants/url';
import { useDispatch, useSelector } from "react-redux";
import { setName, setEmail } from "../../store/slices/reportSlice";

import styles from './styles'

const Register: FC = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [role, setRole] = useState<string>('patient');
    const [username, setUsername] = useState<string>('');
    const [emailAddress, setEmailAddress] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const validateEmail = (email: string): boolean => {
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return regex.test(email.trim());
    }
    
    const validatePassword = (password: string): boolean => {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        return regex.test(password);
    }

    const handleNameChange = (value: string) => {
        setUsername(value);
        dispatch(setName(value));
    };

    const handleEmailChange = (value: string) => {
        setEmailAddress(value);
        dispatch(setEmail(value));
    };

    const handlePasswordChange = (value: string) => {
        setPassword(value);
    };

    const handleConfirmPasswordChange = (value: string) => {
        setConfirmPassword(value);
    };

    const handleRoleSelect = (role: string) => {
        setRole(role);
    };

    const handleLoginPress = () => {
        navigation.navigate("Login" as never, {} as never);
    };

    const handleCancelPress = () => {
        
        Alert.alert(
            "Confirmation",
            "Are you sure you want to cancel? All unsaved data will be lost.",
            [
                {
                    text: "Stay",
                    style: "cancel",
                },
                {
                    text: "Accept",
                    onPress: () => {
                        navigation.navigate("Login" as never, {} as never);
                    },
                },
            ]
        );    
    };
        

    const handleSignupPress = async () => {
        
        if (!validateEmail(emailAddress)) {
            Alert.alert('Invalid email', 'Please enter a valid email address.');
            return;
        }
          
        if (!validatePassword(password)) {
            Alert.alert('Invalid password', 'Password must contain at least 8 characters including at least one uppercase letter, one lowercase letter, and one digit.');
            return;
        }
    
        if (password !== confirmPassword) {
            Alert.alert('Password mismatch', 'Please make sure the confirm password matches the password.');
            return;
        }

        const data = new FormData();
        data.append('name', username);
        data.append('email', emailAddress);
        data.append('password', password);
        data.append('confirm_password', confirmPassword);
        data.append('role', role);

        const endpoint = 'register';
        await axios.post(`${API_URL}${endpoint}`, data, {
            headers: {
                'Content-Type': "multipart/form-data",
                'Accept': 'application/json',
            },
        })
        .then((response) => {
            if (response.data.status == 'success'){
                navigation.navigate("Login" as never, {} as never);
            }
            else {
                Alert.alert(
                    "Failure",
                    "An error occured while creating the account.",
                    [
                        {
                            text: "Stay",
                            style: "cancel",
                        },
                        {
                            text: "Accept",
                            onPress: () => {
                                navigation.navigate("Login" as never, {} as never);
                            },
                        },
                    ]
                );   
            }
        })
        .catch((error) => {
            console.error('An error occurred during registration or incorrect entries during signup');
        });
    };

    return (
    
    <SafeAreaView style={styles.container}>
        <TextTitle title='Create Account'></TextTitle>
        <SubTitleText title='Please fill the input below here.'></SubTitleText>

        <TextInputwithLabel label='Name' placeholder='Enter your Username' textinputprops={{ secureTextEntry: false}} onChangeText= {handleNameChange} />
        <TextInputwithLabel label='Email' keyboardType="email-address" placeholder='Enter your Email' textinputprops={{ secureTextEntry: false}} onChangeText= {handleEmailChange} />

        <TextInputwithLabel label="Password" placeholder='Enter your Password' textinputprops={{ secureTextEntry: true}} onChangeText= {handlePasswordChange} />
        <TextInputwithLabel label="Confirm Password" placeholder='Re-enter your Password' textinputprops={{ secureTextEntry: true}} onChangeText= {handleConfirmPasswordChange} />
        
        <RoleCheckBox selectedRole={role} onRoleSelect={handleRoleSelect} />

        <TwoCustomButton containerStyle={{ alignSelf: 'center'}} buttonprops2={{ title: "Cancel", onPress: handleCancelPress }} buttonprops1={{ title: "Signup", onPress: handleSignupPress  }}></TwoCustomButton>

        <LoginSignupSwitch style={{ marginTop: '12%' }} fontWeight= 'bold' textTitle="Already have an account?" action="Login" onPress={handleLoginPress}></LoginSignupSwitch>
    </SafeAreaView>
  );
};

export default Register;