import React, { FC, useState } from 'react'
import { SafeAreaView, Alert } from 'react-native';
import CustomButton from '../../components/CustomButton';
import PageTitle from '../../components/PageTitle';
import Body1Text from '../../components/Body1Text';
import { colors } from '../../constants/palette';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import StepText from '../../components/StepText';
import { useNavigation } from '@react-navigation/core';
import { useDispatch, useSelector } from "react-redux";
import { setChronicConditions, setPastSurgeries, setFamilyMedicalHistory, setAllergies, } from "../../store/slices/reportSlice";

import styles from './styles';

interface MedicalHistoryData {
  chronic_conditions: string;
  past_surgeries: string;
  family_medical_history: string;
  allergies: string;
}

const MedicalHistory: FC = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [condition, setConditions] = useState<string>("");
  const [surgery, setSurgery] = useState<string>("");
  const [hisory, setHistory] = useState<string>("");
  const [allergy, setAllergy] = useState<string>("");

  const handleChronicConditionsChange = async (value: string) => {
    setConditions(value);
    dispatch(setChronicConditions(value));
  }

  const handlePastSurgeriesChange = async (value: string) => {
    setSurgery(value);
    dispatch(setPastSurgeries(value));
  }

  const handleFamilyMedicalHistoryChange = async(value: string) => {
    setHistory(value);
    dispatch(setFamilyMedicalHistory(value));
  }

  const handleAllergiesChange = async (value: string) => {
    setAllergy(value);
    dispatch(setAllergies(value));
  }

  const handleContinuePress = () => {
    if(condition && surgery && hisory && allergy){
      navigation.navigate("MedicationsAndHabits" as never, {} as never);
    }
    else{
      Alert.alert(
        'Fails',
        'Missing Field. Please may sure to fill all fields.',
        [
          { text: 'OK' }
        ],
        { cancelable: false }
      );
    }
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