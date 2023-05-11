import React, { FC, useState } from 'react'
import { SafeAreaView, ScrollView, Alert, View, TouchableOpacity, Image, Text } from 'react-native';
import CustomButton from '../../components/CustomButton';
import PageTitle from '../../components/PageTitle';
import Body1Text from '../../components/Body1Text';
import { colors } from '../../constants/palette';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import StepText from '../../components/StepText';
import HabitsMultiSelectChecklist from '../../components/HabitsMultiSelectCheckList';
import axios from 'axios';
import { useNavigation } from '@react-navigation/core';
import API_URL from '../../constants/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setFirstLogin, setLifeStyleHabits, setMedications, } from '../../store/slices/reportSlice';
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerResult } from 'expo-image-picker/build/ImagePicker.types';
import { Ionicons } from '@expo/vector-icons';

import styles from './styles';

interface RootState {
  report: {
    name: string;
    email: string;
    image: string;
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
  const navigation = useNavigation();

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [currentMedicationsHistory, setCurrentMedications] = useState<string>('');

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImage = async () => {
      let result: ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      setSelectedImage(result.uri);
  };
  
    const clearImage = () => {
      setSelectedImage(null);
  };

  const handleSelectOption = (options: string[]) => {
    setSelectedOptions(options);
    dispatch(setLifeStyleHabits(options));
  };

  const handleCurrentMedicationsChange = (value: string) => {
    setCurrentMedications(value);
    dispatch(setMedications(value));
  };

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

  const handleSubmitPress = async () => {

    const data = new FormData();
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
      const fileExtension = selectedImage.split('.').pop() || '';
      const fileName = `image_${Date.now()}.${fileExtension}`;
  
      const file = {
        uri: selectedImage,
        name: fileName,
        type: `image/${fileExtension}`,
      };
        
      data.append('image', file);

      const token = await AsyncStorage.getItem('token');

      const endpoint = 'patient/report';
      await axios.post(`${API_URL}${endpoint}`, data, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Content-Type': "multipart/form-data",
          },
      })
      .then((response) => {
        if(response.data.status == 'success'){
          dispatch(setFirstLogin('0'));
          navigation.navigate("Report" as never, {} as never);
          Alert.alert(
            'Success',
            'The report is successfully created.',
            [
              { text: 'OK' }
            ],
            { cancelable: false }
          );
        }
        else{
          Alert.alert(
            'Fails',
            'Request Fails.',
            [
                { text: 'OK' }
            ],
            { cancelable: false }
          );
        }
      })
      .catch((error) => {
          console.error('An error occurred while creating the report', error);
      });
  };



  return (
  
    <SafeAreaView style={styles.container}>
      <PageTitle title='Medications And Habits' />
      <StepText title='Step 6' color={colors.blue}></StepText>

      <Body1Text context="Power up your care! Share your current medications and lifestyle habits to help healthcare professionals identify potential drug interactions and offer guidance on healthy habits for a boosted well-being." />


      <View style={styles.container1}>
        {selectedImage ? (
          <>
            <TouchableOpacity onPress={pickImage} style={styles.changeImage}>
                <Ionicons name="camera-outline" size={24} color="#fff" />
                <Text style={styles.changeImageText}>Change Image</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={clearImage}>
                <Image source={{ uri: selectedImage }} style={styles.image} />
            </TouchableOpacity>
          </>
          ) : (
            <TouchableOpacity onPress={pickImage} style={styles.addImage}>
              <Ionicons name="add-outline" size={24} color="#fff" />
              <Text style={styles.addImageText}>Add Image</Text>
            </TouchableOpacity>
          )
        } 
      </View>

      <TextInputwithLabel label="Current Medications" placeholder='Enter your Current Medications if any' textinputprops={{ secureTextEntry: false }} onChangeText= {handleCurrentMedicationsChange} />
      
      <HabitsMultiSelectChecklist selectedOptions={selectedOptions} onSelectOption={handleSelectOption}/>
      
      <CustomButton containerStyle={{ alignSelf: 'center', marginTop: 40, height: 45 }} buttonprops={{ title: "Submit", onPress: handleSubmitPress }}  />

    </SafeAreaView>
  );
};

export default MedicationsAndHabits;