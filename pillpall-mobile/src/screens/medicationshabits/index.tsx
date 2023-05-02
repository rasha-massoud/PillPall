import React, { FC, useState } from 'react'
import { SafeAreaView, Alert } from 'react-native';
import CustomButton from '../../components/CustomButton';
import PageTitle from '../../components/PageTitle';
import Body1Text from '../../components/Body1Text';
import { colors } from '../../constants/palette';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import StepText from '../../components/StepText';
import HabitsMultiSelectChecklist from '../../components/HabitsMultiSelectCheckList';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import API_URL from '../../constants/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from "react-redux";
import { setLifeStyleHabits, setMedications, } from "../../store/slices/reportSlice";

import styles from './styles';

interface RootState {
  report: {
    name: string;
    email: string;
    phone_number: string;
    address: string;
    dob: string;
    gender: string;
    blood_type: string;
    height: string;
    weight: string;
    emergency_name: string;
    emergency_number: string;
    emergency_email: string;
    emergency_contact_relation: string;
    body_temperature: string;
    pulse_rate: string;
    respiration_rate: string;
    systolic_blood_pressure: string;
    chronic_conditions: string;
    past_surgeries: string;
    family_medical_history: string;
    allergies: string;
    life_style_habits: string;
    medications: string;
  };
}

const MedicationsAndHabits: FC = () => {

  const dispatch = useDispatch();

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [currentMedicationsHistory, setCurrentMedications] = useState<string>('');

  const handleSelectOption = (option: string) => {
    const index = selectedOptions.indexOf(option);
    if (index > -1) {
      setSelectedOptions([...selectedOptions.slice(0, index), ...selectedOptions.slice(index + 1)]);
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
    dispatch(setLifeStyleHabits(option));
  };

  const handleCurrentMedicationsChange = (value: string) => {
    setCurrentMedications(value);

    dispatch(setMedications(value));
  };

  const handleSubmitPress = async () => {
    
    const name = useSelector(
      (state: RootState) => state.report.name
    );

    const email = useSelector(
      (state: RootState) => state.report.email
    );

    const phone_number = useSelector(
      (state: RootState) => state.report.phone_number
    );

    const address = useSelector(
      (state: RootState) => state.report.address
    );

    const dob = useSelector(
      (state: RootState) => state.report.dob
    );

    const gender = useSelector(
      (state: RootState) => state.report.gender
    );
    
    const blood_type = useSelector(
      (state: RootState) => state.report.blood_type
    );
    
    const height = useSelector(
      (state: RootState) => state.report.height
    );

    const weight = useSelector(
      (state: RootState) => state.report.weight
    );

    const emergency_name = useSelector(
      (state: RootState) => state.report.emergency_name
    );
    
    const emergency_number = useSelector(
      (state: RootState) => state.report.emergency_number
    );

    const emergency_email = useSelector(
      (state: RootState) => state.report.emergency_email
    );

    const emergency_contact_relation = useSelector(
      (state: RootState) => state.report.emergency_contact_relation
    );

    const body_temperature = useSelector(
      (state: RootState) => state.report.body_temperature
    );
    
    const pulse_rate = useSelector(
      (state: RootState) => state.report.pulse_rate
    );

    const respiration_rate = useSelector(
      (state: RootState) => state.report.respiration_rate
    );

    const systolic_blood_pressure = useSelector(
      (state: RootState) => state.report.systolic_blood_pressure
    );

    const chronic_conditions = useSelector(
      (state: RootState) => state.report.chronic_conditions
    );
    
    const past_surgeries = useSelector(
      (state: RootState) => state.report.past_surgeries
    );

    const family_medical_history = useSelector(
      (state: RootState) => state.report.family_medical_history
    );

    const allergies = useSelector(
      (state: RootState) => state.report.allergies
    );

    const life_style_habits = useSelector(
      (state: RootState) => state.report.life_style_habits
    );

    const medications = useSelector(
      (state: RootState) => state.report.medications
    );

    const data = new FormData();
      data.append('name', name);
      data.append('email', email);
      data.append('phone_number', phone_number);
      data.append('address', address);
      data.append('dob', dob);
      data.append('gender', gender);
      data.append('blood_type', blood_type);
      data.append('height', height);
      data.append('weight', weight);
      data.append('emergency_name', emergency_name);
      data.append('emergency_number', emergency_number);
      data.append('emergency_email', emergency_email);
      data.append('emergency_contact_relation', emergency_contact_relation);
      data.append('body_temperature', body_temperature);
      data.append('pulse_rate', pulse_rate);
      data.append('respiration_rate', respiration_rate);
      data.append('systolic_blood_pressure', systolic_blood_pressure);
      data.append('chronic_conditions', chronic_conditions);
      data.append('past_surgeries', past_surgeries);
      data.append('family_medical_history', family_medical_history);
      data.append('allergies', allergies);
      data.append('life_style_habits', life_style_habits);
      data.append('medications', medications);

      const token = await AsyncStorage.getItem('token');

      const endpoint = 'patient/report';
      await axios.post(`${API_URL}${endpoint}`, data, {
          headers: {
              'Content-Type': "application/json",
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`
          },
      })
      .then((response) => {
          console.log(response.data);
          Alert.alert(
              'Success',
              'The report is successfully created.',
              [
                { text: 'OK' }
              ],
              { cancelable: false }
            );
      })
      .catch((error) => {
          console.error('An error occurred while creating the report');
      });
  };



  return (
  
    <SafeAreaView style={styles.container}>
      <PageTitle title='Medications And Habits' />
      <StepText title='Step 6' color={colors.blue}></StepText>

      <Body1Text context="Finally, you are asked to fill your current medications and lifestyle habits. This information is important for healthcare professionals to determine potential drug interactions, as well as to provide guidance on healthy lifestyle habits that can help improve the patient's overall health."></Body1Text>

      <TextInputwithLabel label="Current Medications" placeholder='Enter your Current Medications if any' textinputprops={{ secureTextEntry: false }} onChangeText= {handleCurrentMedicationsChange} />
      
      <HabitsMultiSelectChecklist selectedOptions={selectedOptions} onSelectOption={handleSelectOption}/>
      
      <CustomButton containerStyle={{ alignSelf: 'center', marginTop: 40 }} buttonprops={{ title: "Submit", onPress: handleSubmitPress }}  />

    </SafeAreaView>
  );
};

export default MedicationsAndHabits;