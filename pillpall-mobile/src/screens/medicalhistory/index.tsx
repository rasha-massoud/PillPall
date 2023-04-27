import React, { FC, useState } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import CustomButton from '../../components/CustomButton';
import PageTitle from '../../components/PageTitle';
import Body1Text from '../../components/Body1Text';
import { colors } from '../../constants/palette';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import StepText from '../../components/StepText';

import styles from './styles';

const MedicalHistory: FC = () => {

  return (
  
  <SafeAreaView style={styles.container}>
    <PageTitle title='Medical History' />
    <StepText title='Step 5' color={colors.blue}></StepText>

    <Body1Text context="To provide personalized care, we'll need your medical history, which includes chronic conditions or illnesses, past surgeries or hospitalizations, family medical history, and allergies. This information is important for healthcare professionals to determine the patient's current health status, as well as to determine any potential risk factors for treatment."></Body1Text>

    <TextInputwithLabel label="Chronic Condition or Illness" placeholder='Enter your Chronic Condition or Illness if any' textinputprops={{ secureTextEntry: false }}/>

    <TextInputwithLabel label="Past Surgeries or Hospitalizations" placeholder='Enter your Past Surgeries or Hospitalizations if any' textinputprops={{ secureTextEntry: false }} />

    <TextInputwithLabel label="Family Medical History" placeholder='Enter your Family Medical History if any' textinputprops={{ secureTextEntry: false }}/>
    
    <TextInputwithLabel label="Allergies" placeholder='Enter your Allergies if any' textinputprops={{ secureTextEntry: false }}/>

    <CustomButton containerStyle={{ alignSelf: 'center', marginTop: 40 }} buttonprops={{ title: "Continue", onPress: () => console.log('Continue') }}  />

  </SafeAreaView>
  );
};

export default MedicalHistory;