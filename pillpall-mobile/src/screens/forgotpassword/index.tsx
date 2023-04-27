import React, { FC } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import TwoCustomButton from '../../components/TwoCustomButton';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import TextTitle from '../../components/TextTitle';
import SubTitleText from '../../components/SubTitleText';

import styles from './styles'

const ForgotPassword: FC = () => {

    return (
    
    <SafeAreaView style={styles.container}>
        <Image
            source={require('../../../assets/email.png')}
            style={styles.image}
        />

        <TextTitle title='Forgot Password?'></TextTitle>
        <SubTitleText title='Please enter your email address below to reset your email password'></SubTitleText>

        <TextInputwithLabel label="Email" keyboardType="email-address" placeholder='Enter your Email' textinputprops={{ secureTextEntry: false }}/>

        <TwoCustomButton containerStyle={{ alignSelf: 'center'}} buttonprops2={{ title: "Cancel", onPress: () => console.log('Cancel') }} buttonprops1={{ title: "Signup", onPress: () => console.log('Signup') }}></TwoCustomButton>
        
    </SafeAreaView>
  );
};

export default ForgotPassword;