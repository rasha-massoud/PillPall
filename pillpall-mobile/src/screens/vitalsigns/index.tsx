import React, { FC, useState } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import CustomButton from '../../components/CustomButton';
import PageTitle from '../../components/PageTitle';
import Body1Text from '../../components/Body1Text';
import { colors } from '../../constants/palette';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import StepText from '../../components/StepText';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import API_URL from '../../constants/url';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles';

const VitalSigns: FC = () => {

  const [bodyTemperature, setBodyTemperture] = useState<string>('');
  const [pulseRate, setPulseRate] = useState<string>('');
  const [respiraionRate, setRespirationRate] = useState<string>('');
  const [systolicBloodPressure, setSystolicBloodPressure] = useState<string>('');

  const handleTemperatureChange = async (value: string) => {
    setBodyTemperture(value);
    await AsyncStorage.setItem('body_temperature', value);
  }

  const handlePulseChange = async (value: string) => {
    setPulseRate(value);
    await AsyncStorage.setItem('pulse_rate', value);
  }

  const handleRespirationRateChange = async(value: string) => {
    setRespirationRate(value);
    await AsyncStorage.setItem('respiration_rate', value);
  }

  const handleBloodPressureChange = async (value: string) => {
    setSystolicBloodPressure(value);
    await AsyncStorage.setItem('systolic_blood_pressure', value);
  }

  const handleContinuePress = () => {
    //Navigate to Step 5
  }

  return (
  
  <SafeAreaView style={styles.container}>
    <PageTitle title='Vital Signs' />
    <StepText title='Step 4' color={colors.blue}></StepText>

    <Body1Text context="You are asked to provide your vital signs normal ranges, such as your respiratory rate, pulse rate, systolic blood pressure, and body temperature. These indicators give us an idea of your overall health and help us monitor any changes that may occur."></Body1Text>

    <TextInputwithLabel label="Normal Body Temperature (°C)" keyboardType="numeric" placeholder='Enter your Normal Body Temperature' textinputprops={{ secureTextEntry: false }} onChangeText= {handleTemperatureChange} />

    <TextInputwithLabel label="Normal Pulse Rate " keyboardType="numeric" placeholder='Enter your Normal Pulse Rate' textinputprops={{ secureTextEntry: false }} onChangeText= {handlePulseChange} />

    <TextInputwithLabel label="Normal Respiration Rate" keyboardType="numeric" placeholder='Enter your Normal Respiration Rate' textinputprops={{ secureTextEntry: false }} onChangeText= {handleRespirationRateChange} />
    
    <TextInputwithLabel label="Normal Systolic Blood Pressure" keyboardType="numeric" placeholder='Enter your Normal Systolic Blood Pressure' textinputprops={{ secureTextEntry: false }} onChangeText= {handleBloodPressureChange} />

    <CustomButton containerStyle={{ alignSelf: 'center', marginTop: 40 }} buttonprops={{ title: "Continue", onPress: () => console.log('Continue') }}  />

  </SafeAreaView>
  );
};

export default VitalSigns;