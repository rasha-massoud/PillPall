import React, { FC, useState} from 'react'
import { SafeAreaView, Alert, Image } from 'react-native';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import TextTitle from '../../components/TextTitle';
import TwoCustomButton from '../../components/TwoCustomButton';
import LogoutButton from '../../components/LogoutButton';
import axios from 'axios';
import { useNavigation } from '@react-navigation/core';
import API_URL from '../../constants/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn } from "../../store/slices/reportSlice";
import styles from './styles'

const ChangePassword: FC = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

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
            if (response.data.status == 'success'){
                Alert.alert(
                    'Success',
                    'The password was changed.',
                    [
                      { text: 'OK' }
                    ],
                    { cancelable: false }
                );
            }
            else{
                Alert.alert(
                    'Failure',
                    'Password change fails.',
                    [
                      { text: 'OK' }
                    ],
                    { cancelable: false }
                );
            }
        })
        .catch((error) => {
            console.error('An error occurred while changing the password');
        });
    };

    const handleLogout = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          const endpoint = 'logout';
          
          const headers = {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          };
          
          await axios.post(`${API_URL}${endpoint}`, {}, { headers })
            .then(async (response) => {
                await AsyncStorage.clear();
                navigation.navigate('Login' as never, {} as never);
            
                    if (response.data.status === 'success') {
                        dispatch(setIsLoggedIn('0'));
                        Alert.alert(
                        'Confirmation',
                        'Are you sure you want to logout?',
                        [
                            {
                                text: 'Stay',
                                style: 'cancel',
                            },
                            {
                                text: 'Accept',
                                onPress: () => {
                                    navigation.navigate('Login' as never, {} as never);
                                },
                            },
                        ]
                        );
                    }
            })
            .catch((error) => {
                console.error('An error occurred during logout', error);
            });
        } catch (error) {
            console.error(error);
        }
    };
      

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