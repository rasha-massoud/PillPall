import React, { FC, useState} from 'react'
import { SafeAreaView, Alert, Image } from 'react-native';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import TextTitle from '../../components/TextTitle';
import TwoCustomButton from '../../components/TwoCustomButton';
import LogoutButton from '../../components/LogoutButton';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import API_URL from '../../constants/url';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles'

const ChangePassword: FC = () => {

    const [previousPassword, setPreviousPassword] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const validatePassword = (password: string): boolean => {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        return regex.test(password);
    }

    const handleOldPasswordChange = (value: string) => {
        setPreviousPassword(value);
    };

    const handleNew1PasswordChange = (value: string) => {
        setPassword(value);
    };

    const handleNew2PasswordChange = (value: string) => {
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
        data.append('previous_password', previousPassword);
        data.append('password', password);
        data.append('confirm_password', confirmPassword);
        
        const token = await AsyncStorage.getItem('token');

        const endpoint = 'password/change';
        await axios.post(`${API_URL}${endpoint}`, data, {
            headers: {
                'Content-Type': "application/x-www-form-urlencoded",
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        .then((response) => {
            console.log(response.data);
            Alert.alert(
                'Success',
                'The password was changed.',
                [
                  { text: 'OK' }
                ],
                { cancelable: false }
              );
        })
        .catch((error) => {
            console.error('An error occurred while changing the password');
        });
    };

    const handleLogout = async () => {
        await AsyncStorage.clear();

        const endpoint = 'logout';
        await axios.post(`${API_URL}${endpoint}`, {
            headers: {
                'Accept': 'application/json',
            },
        })
        .then((response) => {
            //Navigate to the login SCREEN
        })
        .catch((error) => {
            console.error('An error occurred during logout');
        });

    }

    return (
    
        <SafeAreaView style={styles.container}>

            <LogoutButton style={styles.logout} onPress={handleLogout} />

            <Image
                source={require('../../../assets/changepass.png')}
                style={styles.image}
            />

            <TextTitle title='Change Password'></TextTitle>

            <TextInputwithLabel label="Old Password" placeholder='Enter your Old Password' textinputprops={{ secureTextEntry: true }} onChangeText= {handleOldPasswordChange}  />
            <TextInputwithLabel label="New Password" placeholder='Enter a New Password' textinputprops={{ secureTextEntry: true }} onChangeText= {handleNew1PasswordChange}  />
            <TextInputwithLabel label="Confirm New Password" placeholder='Re-enter the New Password' textinputprops={{ secureTextEntry: true }} onChangeText= {handleNew2PasswordChange}  />
            
            <TwoCustomButton containerStyle={{ alignSelf: 'center'}} buttonprops2={{ title: "Cancel", onPress: () => console.log('Cancel') }} buttonprops1={{ title: "Save", onPress: handleSavePress }}></TwoCustomButton>

        </SafeAreaView>
    );
};

export default ChangePassword;