import React, { FC, useState } from 'react'
import { SafeAreaView, Alert } from 'react-native';
import CustomButton from '../../components/CustomButton';
import PageTitle from '../../components/PageTitle';
import Body1Text from '../../components/Body1Text';
import { colors } from '../../constants/palette';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import StepText from '../../components/StepText';
import { useNavigation } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import { setChronicConditions, setPastSurgeries, setFamilyMedicalHistory, setAllergies, } from '../../store/slices/reportSlice';

import styles from './styles';

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
      <StepText title='Step 5' color={colors.blue} />

      <Body1Text context="Unlock tailored care! Share your medical history to help healthcare professionals assess your current health and identify any potential treatment risks." />

      <TextInputwithLabel label="Chronic Condition or Illness" placeholder='Enter your Chronic Condition or Illness if any' textinputprops={{ secureTextEntry: false }} onChangeText= {handleChronicConditionsChange} />

      <TextInputwithLabel label="Past Surgeries or Hospitalizations" placeholder='Enter your Past Surgeries or Hospitalizations if any' textinputprops={{ secureTextEntry: false }} onChangeText= {handlePastSurgeriesChange} />

      <TextInputwithLabel label="Family Medical History" placeholder='Enter your Family Medical History if any' textinputprops={{ secureTextEntry: false }} onChangeText= {handleFamilyMedicalHistoryChange} />
      
      <TextInputwithLabel label="Allergies" placeholder='Enter your Allergies if any' textinputprops={{ secureTextEntry: false }} onChangeText= {handleAllergiesChange} />

      <CustomButton containerStyle={{ alignSelf: 'center', marginTop: 45, height: 45 }} buttonprops={{ title: "Continue", onPress: handleContinuePress }}  />

    </SafeAreaView>
  );
};

export default MedicalHistory;