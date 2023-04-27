import React, { FC, useState } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import CustomButton from '../../components/CustomButton';
import PageTitle from '../../components/PageTitle';
import Body1Text from '../../components/Body1Text';
import { colors } from '../../constants/palette';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import StepText from '../../components/StepText';

import styles from './styles';

const VitalSigns: FC = () => {

  return (
  
  <SafeAreaView style={styles.container}>
    <PageTitle title='Vital Signs' />
    <StepText title='Step 4' color={colors.blue}></StepText>

    <Body1Text context="You are asked to provide your vital signs normal ranges, such as your respiratory rate, pulse rate, systolic blood pressure, and body temperature. These indicators give us an idea of your overall health and help us monitor any changes that may occur."></Body1Text>

    <TextInputwithLabel label="Normal Body Temperature (°C)" keyboardType="numeric" placeholder='Enter your Normal Body Temperature' textinputprops={{ secureTextEntry: false }}/>

    <TextInputwithLabel label="Normal Pulse Rate " keyboardType="numeric" placeholder='Enter your Normal Pulse Rate' textinputprops={{ secureTextEntry: false }} />

    <TextInputwithLabel label="Normal Respiration Rate" keyboardType="numeric" placeholder='Enter your Normal Respiration Rate' textinputprops={{ secureTextEntry: false }}/>
    
    <TextInputwithLabel label="Normal Systolic Blood Pressure" keyboardType="numeric" placeholder='Enter your Normal Systolic Blood Pressure' textinputprops={{ secureTextEntry: false }}/>

    <CustomButton containerStyle={{ alignSelf: 'center', marginTop: 40 }} buttonprops={{ title: "Continue", onPress: () => console.log('Continue') }}  />

  </SafeAreaView>
  );
};

export default VitalSigns;