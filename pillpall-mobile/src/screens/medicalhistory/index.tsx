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

interface MedicalHistoryData {
  chronic_conditions: string;
  past_surgeries: string;
  family_medical_history: string;
  allergies: string;
}

const MedicalHistory: FC = () => {

  const [medicalHistoryData, setMedicalHistoryData] = useState<MedicalHistoryData>({
    chronic_conditions: '',
    past_surgeries: '',
    family_medical_history: '',
    allergies: '',
  });

  const handleChronicConditionsChange = async (value: string) => {
    setMedicalHistoryData({...medicalHistoryData, chronic_conditions: value});
    await AsyncStorage.setItem('chronic_conditions', value);
  }

  const handlePastSurgeriesChange = async (value: string) => {
    setMedicalHistoryData({...medicalHistoryData, past_surgeries: value});
    await AsyncStorage.setItem('past_surgeries', value);
  }

  const handleFamilyMedicalHistoryChange = async(value: string) => {
    setMedicalHistoryData({...medicalHistoryData, family_medical_history: value});
    await AsyncStorage.setItem('family_medical_history', value);
  }

  const handleAllergiesChange = async (value: string) => {
    setMedicalHistoryData({...medicalHistoryData, allergies: value});
    await AsyncStorage.setItem('allergies', value);
  }

  const handleContinuePress = () => {
    console.log("success");
    AsyncStorage.getAllKeys().then(keys => {
      AsyncStorage.multiGet(keys).then((result) => {
        console.log(result);
      });
    });    
    // Navigate to Step 6 
  }

  return (
  
  <SafeAreaView style={styles.container}>
    <PageTitle title='Medical History' />
    <StepText title='Step 5' color={colors.blue}></StepText>

    <Body1Text context="To provide personalized care, we'll need your medical history, which includes chronic conditions or illnesses, past surgeries or hospitalizations, family medical history, and allergies. This information is important for healthcare professionals to determine the patient's current health status, as well as to determine any potential risk factors for treatment."></Body1Text>

    <TextInputwithLabel label="Chronic Condition or Illness" placeholder='Enter your Chronic Condition or Illness if any' textinputprops={{ secureTextEntry: false }} onChangeText= {handleChronicConditionsChange} />

    <TextInputwithLabel label="Past Surgeries or Hospitalizations" placeholder='Enter your Past Surgeries or Hospitalizations if any' textinputprops={{ secureTextEntry: false }} onChangeText= {handlePastSurgeriesChange} />

    <TextInputwithLabel label="Family Medical History" placeholder='Enter your Family Medical History if any' textinputprops={{ secureTextEntry: false }} onChangeText= {handleFamilyMedicalHistoryChange} />
    
    <TextInputwithLabel label="Allergies" placeholder='Enter your Allergies if any' textinputprops={{ secureTextEntry: false }} onChangeText= {handleAllergiesChange} />

    <CustomButton containerStyle={{ alignSelf: 'center', marginTop: 40 }} buttonprops={{ title: "Continue", onPress: handleContinuePress }}  />

  </SafeAreaView>
  );
};

export default MedicalHistory;