import React, { FC } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import CustomButton from '../../components/CustomButton';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import TextTitle from '../../components/TextTitle';

import styles from './styles'

const ResetPassword: FC = () => {

    return (
    
    <SafeAreaView style={styles.container}>
        <Image
            source={require('../../../assets/resetpass.png')}
            style={styles.image}
        />

        <TextTitle title='Please, enter a new password below.'></TextTitle>

        <TextInputwithLabel label="Password" placeholder='Enter your Password' textinputprops={{ secureTextEntry: true }} />
        <TextInputwithLabel label="ConfirmPassword" placeholder='Re-enter your Password' textinputprops={{ secureTextEntry: true }} />
        
        <CustomButton containerStyle={{ alignSelf: 'center' }} buttonprops={{ title: "Reset", onPress: () => console.log('Reset') }}  />
    
    </SafeAreaView>
  );
};

export default ResetPassword;