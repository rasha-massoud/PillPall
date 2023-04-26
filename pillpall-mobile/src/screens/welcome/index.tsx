import React, { FC } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import CustomButton from '../../components/CustomButton';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import TextTitle from '../../components/TextTitle';
import SubTitleText from '../../components/SubTitleText';
import LoginSignupSwitch from '../../components/LoginSignupSwitch';
import TwoCustomButton from '../../components/TwoCustomButton';

import styles from './styles'

const Welcome: FC = () => {

    const handleLoginPress = () => {
        // Navigate to Login in screen
    };

    return (
    
    <SafeAreaView style={styles.container}>
        <TextTitle title='Hi PillPaller'></TextTitle>
        <SubTitleText title='Welcome to PillPall.'></SubTitleText>

        <Image
            source={require('../../../assets/into.gif')}
            style={styles.image}
        />

        <CustomButton containerStyle={{ alignSelf: 'center' }} buttonprops={{ title: "Continue", onPress: () => console.log('Continue') }}  />

    </SafeAreaView>
  );
};

export default Welcome;