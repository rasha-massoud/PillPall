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
import { useDispatch, useSelector } from "react-redux";
import { setBloodType, setHeight, setWeight } from "../../store/slices/reportSlice";

import styles from './styles';

interface AnthropometricMeasurements {
  height: string;
  weight: string;
  blood_type: string;
}

const AnthropometricMeasurements: FC = () => {

  const dispatch = useDispatch();

  const [anthropometricMeasurements, setAnthropometricMeasurements] = useState<AnthropometricMeasurements>({
    height: '',
    weight: '',
    blood_type: ''
  });

  const handleHeightChange = async (value: string) => {
    setAnthropometricMeasurements({...anthropometricMeasurements, height: value});
    await AsyncStorage.setItem('height', value);

    dispatch(setHeight(value));
  }

  const handleWeightChange = async (value: string) => {
    setAnthropometricMeasurements({...anthropometricMeasurements, weight: value});
    await AsyncStorage.setItem('weight', value);

    dispatch(setWeight(value));
  }

  const handleBloodTypeChange = async (value: string) => {
    setAnthropometricMeasurements({...anthropometricMeasurements, blood_type: value});
    await AsyncStorage.setItem('blood_type', value);

    dispatch(setBloodType(value));
  }

  const handleContinuePress = () => {
    console.log("success");
    AsyncStorage.getAllKeys().then(keys => {
      AsyncStorage.multiGet(keys).then((result) => {
        console.log(result);
      });
    });    
    // Navigate to Step 3  
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