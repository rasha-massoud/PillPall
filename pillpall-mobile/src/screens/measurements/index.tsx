import React, { FC, useState } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import CustomButton from '../../components/CustomButton';
import PageTitle from '../../components/PageTitle';
import Body1Text from '../../components/Body1Text';
import { colors } from '../../constants/palette';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import StepText from '../../components/StepText';

import styles from './styles';

const AnthropometricMeasurements: FC = () => {

  return (
  
  <SafeAreaView style={styles.container}>
    <PageTitle title='Anthropometric Measurements' />
    <StepText title='Step 2' color={colors.blue}></StepText>

    <Body1Text context="As a patient you are requested to provide your anthropometric measurements, including blood type, height, and weight. These measurements help us assess your overall health status and provide a baseline for future visits."></Body1Text>

    <TextInputwithLabel label="Blood Type" placeholder='Enter your Blood Type' textinputprops={{ secureTextEntry: false }}/>

    <TextInputwithLabel label="Height (cm)" keyboardType="numeric" placeholder='Enter your Height' textinputprops={{ secureTextEntry: false }} />

    <TextInputwithLabel label="Weight (Kg)" keyboardType="numeric" placeholder='Enter your Weight' textinputprops={{ secureTextEntry: false }}/>

    <CustomButton containerStyle={{ alignSelf: 'center', marginTop: 40 }} buttonprops={{ title: "Continue", onPress: () => console.log('Continue') }}  />

  </SafeAreaView>
  );
};

export default AnthropometricMeasurements;