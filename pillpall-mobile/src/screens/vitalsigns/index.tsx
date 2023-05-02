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

interface VitalSignsData {
  body_temperature: string;
  pulse_rate: string;
  respiration_rate: string;
  systolic_blood_pressure: string;
}

const VitalSigns: FC = () => {

  const [vitalSignsData, setVitalSignsData] = useState<VitalSignsData>({
    body_temperature: '',
    pulse_rate: '',
    respiration_rate: '',
    systolic_blood_pressure: '',
  });

  const handleTemperatureChange = async (value: string) => {
    setVitalSignsData({...vitalSignsData, body_temperature: value});
    await AsyncStorage.setItem('body_temperature', value);
  }

  const handlePulseChange = async (value: string) => {
    setVitalSignsData({...vitalSignsData, pulse_rate: value});
    await AsyncStorage.setItem('pulse_rate', value);
  }

  const handleRespirationRateChange = async(value: string) => {
    setVitalSignsData({...vitalSignsData, respiration_rate: value});
    await AsyncStorage.setItem('respiration_rate', value);
  }

  const handleBloodPressureChange = async (value: string) => {
    setVitalSignsData({...vitalSignsData, systolic_blood_pressure: value});
    await AsyncStorage.setItem('systolic_blood_pressure', value);
  }

  const handleContinuePress = () => {
    console.log("success");
    AsyncStorage.getAllKeys().then(keys => {
      AsyncStorage.multiGet(keys).then((result) => {
        console.log(result);
      });
    });    
    // Navigate to Step 5
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

    <CustomButton containerStyle={{ alignSelf: 'center', marginTop: 40 }} buttonprops={{ title: "Continue", onPress: handleContinuePress }}  />

  </SafeAreaView>
  );
};

export default VitalSigns;