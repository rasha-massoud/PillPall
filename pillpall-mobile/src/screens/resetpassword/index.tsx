import React, { FC, useState} from 'react'
import { SafeAreaView, Alert, Image } from 'react-native';
import CustomButton from '../../components/CustomButton';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import TextTitle from '../../components/TextTitle';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import API_URL from '../../constants/url';
import SubTitleText from '../../components/SubTitleText';

import styles from './styles'

const ResetPassword: FC = () => {

    const [token, setToken] = useState<string>('');
    const [email, setEmail] = useState<string>('');
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

    const handleTokenChange = (value: string) => {
        setToken(value);
    };

    const handleEmailChange = (value: string) => {
        setEmail(value);
    };

    const handlePasswordChange = (value: string) => {
        setPassword(value);
    };

    const handleConfirmPasswordChange = (value: string) => {
        setConfirmPassword(value);
    };

    const handleSavePress = async () => {
        if (!validatePassword(password)) {
            Alert.alert('Invalid password', 'Password must contain at least 8 characters including at least one uppercase letter, one lowercase letter, and one digit.');
            return;
        }
    
        if (password !== confirmPassword) {
            Alert.alert('Password mismatch', 'Please make sure the confirm password matches the password.');
            return;
        }

        const data = new FormData();
        data.append('token', token);
        data.append('email', email);
        data.append('password', password);
        data.append('confirm_password', confirmPassword);

        console.log(data);
        
        const endpoint = 'password/reset';
        await axios.post(`${API_URL}${endpoint}`, data, {
            headers: {
                'Content-Type': "application/x-www-form-urlencoded",
                'Accept': 'application/json',
            },
        })
        .then((response) => {
            console.log(response.data);
            Alert.alert(
                'Success',
                'The password was reset.',
                [
                  { text: 'OK' }
                ],
                { cancelable: false }
              );
        })
        .catch((error) => {
            console.error('An error occurred resetting the password');
        });
    }

    return (
    
    <SafeAreaView style={styles.container}>
        <Image
            source={require('../../../assets/resetpass.png')}
            style={styles.image}
        />

        <TextTitle title='Reset Password'></TextTitle>
        <SubTitleText title='Please, enter the token received by email and a new password.' />

        <TextInputwithLabel label="Token" placeholder='Enter the Received Token via email' textinputprops={{ secureTextEntry: false }} onChangeText= {handleTokenChange} />
        <TextInputwithLabel label='Email' keyboardType="email-address" placeholder='Enter your Email' textinputprops={{ secureTextEntry: false}} onChangeText= {handleEmailChange} />

        <TextInputwithLabel label="Password" placeholder='Enter your Password' textinputprops={{ secureTextEntry: true }} onChangeText= {handlePasswordChange} />
        <TextInputwithLabel label="ConfirmPassword" placeholder='Re-enter your Password' textinputprops={{ secureTextEntry: true }} onChangeText= {handleConfirmPasswordChange} />
        
        <CustomButton containerStyle={{ alignSelf: 'center' }} buttonprops={{ title: "Save", onPress: handleSavePress}}  />

    </SafeAreaView>
  );
};

export default ResetPassword;