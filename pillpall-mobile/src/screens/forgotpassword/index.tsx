import React, { FC, useState} from 'react'
import { SafeAreaView, Alert , Image } from 'react-native';
import TwoCustomButton from '../../components/TwoCustomButton';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import TextTitle from '../../components/TextTitle';
import SubTitleText from '../../components/SubTitleText';
import axios from 'axios';
import { useNavigation } from '@react-navigation/core';
import API_URL from '../../constants/url';

import styles from './styles'

const ForgotPassword: FC = () => {

    const navigation = useNavigation();
    const [email, setEmail] = useState<string>('');

    const validateEmail = (email: string): boolean => {
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return regex.test(email.trim());
    }

    const handleEmailChange = (value: string) => {
        setEmail(value);
    };

    const handleResetPress = async () => {
        if (!validateEmail(email)) {
            Alert.alert('Invalid email', 'Please enter a valid email address.');
            return;
        }

        const data = new FormData();
        data.append('email', email);


        const endpoint = 'password/forgot';
        await axios.post(`${API_URL}${endpoint}`, data, {
            headers: {
                'Content-Type': "application/x-www-form-urlencoded",
                'Accept': 'application/json',
            },
        })
        .then((response) => {
            if (response.data.message === 'Reset password link sent on your email id.') {
                Alert.alert(
                    'Success',
                    'An email has been sent to your email address to reset your password.',
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                navigation.navigate("ResetPassword" as never, {} as never);
                            },
                        }
                    ],
                    { cancelable: false }
                );
            }
            else {
                Alert.alert(
                    "Failure",
                    "Request Fails",
                    [
                        {
                            text: "Ok",
                            style: "cancel",
                        },
                    ]
                );
            }
        })
        .catch((error) => {
            console.error('An error has occurred.');
        });
    }

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
    
    return (
    
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../../../assets/email.png')}
                style={styles.image}
            />

            <TextTitle title='Forgot Password?' />
            <SubTitleText title='Please fill your email address below to reset your password' />

            <TextInputwithLabel label='Email' keyboardType="email-address" placeholder='Enter your Email' textinputprops={{ secureTextEntry: false}} onChangeText= {handleEmailChange} />

            <TwoCustomButton containerStyle={{ alignSelf: 'center'}} buttonprops2={{ title: "Cancel", onPress: handleCancelPress }} buttonprops1={{ title: "Reset", onPress: handleResetPress }} />
            
        </SafeAreaView>
  );
};

export default ForgotPassword;