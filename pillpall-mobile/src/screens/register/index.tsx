import React, { FC, useState} from 'react'
import { SafeAreaView } from 'react-native';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import TextTitle from '../../components/TextTitle';
import SubTitleText from '../../components/SubTitleText';
import LoginSignupSwitch from '../../components/LoginSignupSwitch';
import TwoCustomButton from '../../components/TwoCustomButton';
import RoleCheckBox from '../../components/RoleCheckBox';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

import styles from './styles'

const Register: FC = () => {

    const [role, setRole] = useState<string>('patient');
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const handleNameChange = (value: string) => {
        setName(value);
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

    const handleRoleSelect = (role: string) => {
        setRole(role);
    };

    const handleLoginPress = () => {
        // Navigate to Login in screen
    };

    const handleSignupPress = async () => {
        const data = new FormData();
        data.append('name', name);
        data.append('email', email);
        data.append('password', password);
        data.append('confirm_password', confirmPassword);
        data.append('role', role);
         
        console.log(data);
        await axios.post('http://192.168.0.103:8000/api/v0.0.0/register', data, {
            headers: {
                'Content-Type': "multipart/form-data",
                'Accept': 'application/json',
            },
            timeout: 15000,
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error('An error occurred during signup', error);
        });
    };

    return (
    
    <SafeAreaView style={styles.container}>
        <TextTitle title='Create Account'></TextTitle>
        <SubTitleText title='Please fill the input below here.'></SubTitleText>

        <TextInputwithLabel label='Name' placeholder='Enter your Username' textinputprops={{ secureTextEntry: false}} onChangeText= {handleNameChange} />
        <TextInputwithLabel label='Email' keyboardType="email-address" placeholder='Enter your Email' textinputprops={{ secureTextEntry: false}} onChangeText= {handleEmailChange} />

        <TextInputwithLabel label="Password" placeholder='Enter your Password' textinputprops={{ secureTextEntry: true}} onChangeText= {handlePasswordChange} />
        <TextInputwithLabel label="ConfirmPassword" placeholder='Re-enter your Password' textinputprops={{ secureTextEntry: true}} onChangeText= {handleConfirmPasswordChange} />
        
        <RoleCheckBox selectedRole={role} onRoleSelect={handleRoleSelect} />

        <TwoCustomButton containerStyle={{ alignSelf: 'center'}} buttonprops2={{ title: "Cancel", onPress: () => console.log('Cancel') }} buttonprops1={{ title: "Signup", onPress: handleSignupPress  }}></TwoCustomButton>

        <LoginSignupSwitch style={{ marginTop: '12%' }} fontWeight= 'bold' textTitle="Already have an account?" action="Login" onPress={handleLoginPress}></LoginSignupSwitch>
    </SafeAreaView>
  );
};

export default Register;