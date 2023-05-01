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

const AnthropometricMeasurements: FC = () => {

  const [blood_type, setBloodType] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');

  const handleBloodTypeChange = async (value: string) => {
    setBloodType(value);
    await AsyncStorage.setItem('blood_type', value);
  }

  const handleHeightChange = async (value: string) => {
    setHeight(value);
    await AsyncStorage.setItem('height', value);
  }

  const handleWeightChange = async (value: string) => {
    setWeight(value);
    await AsyncStorage.setItem('weight', weight);
  }

  const handleContinuePress = () => {
    //Navigate to Step 2
  }

  return (
  
  <SafeAreaView style={styles.container}>
    <PageTitle title='Anthropometric Measurements' />
    <StepText title='Step 2' color={colors.blue}></StepText>

    <Body1Text context="As a patient you are requested to provide your anthropometric measurements, including blood type, height, and weight. These measurements help us assess your overall health status and provide a baseline for future visits."></Body1Text>

    <TextInputwithLabel label="Blood Type" placeholder='Enter your Blood Type' textinputprops={{ secureTextEntry: false }} onChangeText= {handleBloodTypeChange} />

    <TextInputwithLabel label="Height (cm)" keyboardType="numeric" placeholder='Enter your Height' textinputprops={{ secureTextEntry: false }} onChangeText= {handleHeightChange} />

    <TextInputwithLabel label="Weight (Kg)" keyboardType="numeric" placeholder='Enter your Weight' textinputprops={{ secureTextEntry: false }} onChangeText= {handleWeightChange} />

    <CustomButton containerStyle={{ alignSelf: 'center', marginTop: 40 }} buttonprops={{ title: "Continue", onPress: handleContinuePress }} />

  </SafeAreaView>
  );
};

export default AnthropometricMeasurements;