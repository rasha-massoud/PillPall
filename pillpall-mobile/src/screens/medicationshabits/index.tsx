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

import styles from './styles';

const MedicationsAndHabits: FC = () => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [currentMedicationsHistory, setCurrentMedications] = useState<string>('');

    const handleSelectOption = (option: string) => {
        const index = selectedOptions.indexOf(option);
        if (index > -1) {
          setSelectedOptions([...selectedOptions.slice(0, index), ...selectedOptions.slice(index + 1)]);
        } else {
          setSelectedOptions([...selectedOptions, option]);
        }
    };

    const handleCurrentMedicationsChange = (value: string) => {
      setCurrentMedications(value);
    };

    const handleSubmitPress = async () => {
      const name = await AsyncStorage.getItem('name');
      const email = await AsyncStorage.getItem('email');

      const phone_number = await AsyncStorage.getItem('phone_number');
      const address = await AsyncStorage.getItem('address');
      const dob = await AsyncStorage.getItem('dob');
      const gender = await AsyncStorage.getItem('gender');
      
      const blood_type = await AsyncStorage.getItem('blood_type');
      const height = await AsyncStorage.getItem('height');
      const weight = await AsyncStorage.getItem('weight');

      const emergency_name = await AsyncStorage.getItem('emergency_name');
      const emergency_number = await AsyncStorage.getItem('emergency_number');
      const emergency_email = await AsyncStorage.getItem('emergency_email');
      const emergency_contact_relation = await AsyncStorage.getItem('emergency_contact_relation');
      
      const body_temperature = await AsyncStorage.getItem('body_temperature');
      const pulse_rate = await AsyncStorage.getItem('pulse_rate');
      const respiration_rate = await AsyncStorage.getItem('respiration_rate');
      const systolic_blood_pressure = await AsyncStorage.getItem('systolic_blood_pressure');
      const chronic_conditions = await AsyncStorage.getItem('chronic_conditions');
      const past_surgeries = await AsyncStorage.getItem('past_surgeries');
      const family_medical_history = await AsyncStorage.getItem('family_medical_history');
      const allergies = await AsyncStorage.getItem('allergies');
    

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
        data.append('life_style_habits', selectedOptions);
        data.append('medications', currentMedicationsHistory);

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
                'The password was changed.',
                [
                  { text: 'OK' }
                ],
                { cancelable: false }
              );
        })
        .catch((error) => {
            console.error('An error occurred while changing the password');
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