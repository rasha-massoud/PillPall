import React, { FC, useState } from 'react'
import { SafeAreaView, ScrollView, Alert } from 'react-native';
import { colors } from '../../constants/palette';
import NavBar from '../../components/NavBar';
import TwoCustomButton from '../../components/TwoCustomButton';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import AddImage from '../../components/AddImage';
import SubTitleText from '../../components/SubTitleText';
import GenderCheckBox from '../../components/GenderCheckBox';
import HabitsMultiSelectChecklist from '../../components/HabitsMultiSelectCheckList';
import axios from 'axios';
import { useNavigation } from '@react-navigation/core';
import API_URL from '../../constants/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from "react-redux";
import { setName, setEmail, setImage, setPhoneNumber, setDob, setAddress, setGender, setBloodType, setHeight, setWeight, setEmergencyName,  setEmergencyNumber,
     setEmergencyEmail, setEmergencyContactRelation, setBodyTemperature, setPulseRate, setRespirationRate, setSystolicBloodPressure, setChronicConditions, 
     setPastSurgeries, setFamilyMedicalHistory, setAllergies, setLifeStyleHabits, setMedications } from "../../store/slices/reportSlice";

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

const EditReport: FC = () => {
      
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [imageUri, setImageUri] = useState<string | null>(null);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [currentMedicationsHistory, setCurrentMedications] = useState<string>('');

    const handleImageSelected = async (imageFile: File | null) => {
      if (imageFile) {
        const url = URL.createObjectURL(imageFile);
        setImageUri(url);
        dispatch(setImage(url));
      } else {
        setImageUri(null);
        dispatch(setImage(null));
      }
    };

    const handleNameChange = async (value: string) => {
        dispatch(setName(value));
    };

    const handleEmailChange = async (value: string) => {
        dispatch(setEmail(value));
    };

    const handleGenderSelect = async (selectedGender: string) => {
        dispatch(setGender(selectedGender));
    };

    const handlePhoneNumberChange = async (value: string) => {
        dispatch(setPhoneNumber(value));
      }
    
      const handleAddressChange = async (value: string) => {
        dispatch(setAddress(value));
      }
    
      const handleDoBChange = async (value: string) => {
        dispatch(setDob(value));
      }

      const handleHeightChange = async (value: string) => {
        dispatch(setHeight(value));
      }
    
      const handleWeightChange = async (value: string) => {
        dispatch(setWeight(value));
      }
    
      const handleBloodTypeChange = async (value: string) => {
        dispatch(setBloodType(value));
      }

      const handleEmergencyNameChange = async (value: string) => {
        dispatch(setEmergencyName(value));
      }
    
      const handleEmergencyPhoneNumberChange = async (value: string) => {
        dispatch(setEmergencyNumber(value));
      }
    
      const handleEmergencyEmailChange = async(value: string) => {
        dispatch(setEmergencyEmail(value));
      }
    
      const handleEmergencyRelationChange = async (value: string) => {
        dispatch(setEmergencyContactRelation(value));
      }

      const handleTemperatureChange = async (value: string) => {
        dispatch(setBodyTemperature(value));
      }
    
      const handlePulseChange = async (value: string) => {
        dispatch(setPulseRate(value));
      }
    
      const handleRespirationRateChange = async(value: string) => {
        dispatch(setRespirationRate(value));
      }
    
      const handleBloodPressureChange = async (value: string) => {
        dispatch(setSystolicBloodPressure(value));
      }

      const handleChronicConditionsChange = async (value: string) => {
        dispatch(setChronicConditions(value));
      }
    
      const handlePastSurgeriesChange = async (value: string) => {
        dispatch(setPastSurgeries(value));
      }
    
      const handleFamilyMedicalHistoryChange = async(value: string) => {
        dispatch(setFamilyMedicalHistory(value));
      }
    
      const handleAllergiesChange = async (value: string) => {
        dispatch(setAllergies(value));
      }
    
      const handleSelectOption = (options: string[]) => {
        dispatch(setLifeStyleHabits(options));
      };
    
      const handleCurrentMedicationsChange = (value: string) => {
        dispatch(setMedications(value));
      };


      const name = useSelector(
        (state: RootState) => state.report.name
      );
    
      const email = useSelector(
        (state: RootState) => state.report.email
      );
    
      const image = useSelector(
        (state: RootState) => state.report.image
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
    
      const handleEditPress = async () => {
    
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
        data.append('image', image);

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
          if (response.data.status == 'success'){
            Alert.alert(
                'Success',
                'The report is successfully created.',
                [
                  { 
                    text: 'OK',
                    onPress: () => {
                      navigation.navigate("Report" as never, {} as never);
                  },
                  }
                ],
                { cancelable: false }
            );
          }
          else{
            Alert.alert(
              "Failure",
              "Update Fails",
              [
                  {
                      text: "Ok",
                      style: "cancel",
                  },
              ]
          );
          }
        })
        .catch((error) => {
            console.error('An error occurred while editing the report.');
        });
    };

    const handleCancelPress = () => {
      Alert.alert(
        "Confirmation",
        "Are you sure you want to cancel? All unsaved data will be lost.",
        [
            {
                text: "Stay",
                style: "cancel",
            },
            {
                text: "Accept",
                onPress: () => {
                    navigation.navigate("Report" as never, {} as never);
                },
            },
        ]
    );    
    };

    return (
    
        <SafeAreaView style={styles.container}>
            <NavBar
                title="Edit Report"
            />

            <ScrollView>

                <AddImage onImageSelected={handleImageSelected} />
                <TextInputwithLabel label='Name' placeholder='Enter your Username' textinputprops={{ secureTextEntry: false}} onChangeText= {handleNameChange} />
                <TextInputwithLabel label='Email' keyboardType="email-address" placeholder='Enter your Email' textinputprops={{ secureTextEntry: false}} onChangeText= {handleEmailChange} />
                <TextInputwithLabel label="Phone Number" keyboardType="numeric" placeholder='Enter your Phone Number' textinputprops={{ secureTextEntry: false }} onChangeText= {handlePhoneNumberChange} />
                <TextInputwithLabel label="Date of Birth" placeholder='YYYY-MM-DD' textinputprops={{ secureTextEntry: false }} onChangeText= {handleDoBChange} />
                <TextInputwithLabel label="Address" placeholder='Enter your Address' textinputprops={{ secureTextEntry: false }} onChangeText= {handleAddressChange} />
                <GenderCheckBox selectedGender={gender} onGenderSelect={handleGenderSelect} />
      
                <SubTitleText title='Anthropometric Measurements' color={colors.blue} />
                <TextInputwithLabel label="Blood Type" placeholder='Enter your Blood Type' textinputprops={{ secureTextEntry: false }} onChangeText= {handleBloodTypeChange} />
                <TextInputwithLabel label="Height (cm)" keyboardType="numeric" placeholder='Enter your Height' textinputprops={{ secureTextEntry: false }} onChangeText= {handleHeightChange} />
                <TextInputwithLabel label="Weight (Kg)" keyboardType="numeric" placeholder='Enter your Weight' textinputprops={{ secureTextEntry: false }} onChangeText= {handleWeightChange} />

                <SubTitleText title='Emergency Contact Info Measurements' color={colors.blue}/>
                <TextInputwithLabel label="Name" placeholder='Enter your Name' textinputprops={{ secureTextEntry: false }} onChangeText= {handleEmergencyNameChange} />
                <TextInputwithLabel label="Phone Number" keyboardType="numeric" placeholder='Enter your Phone Number' textinputprops={{ secureTextEntry: false }} onChangeText= {handleEmergencyPhoneNumberChange} />
                <TextInputwithLabel label="Email" keyboardType="email-address" placeholder='Enter your Email' textinputprops={{ secureTextEntry: false }} onChangeText= {handleEmergencyEmailChange} />
                <TextInputwithLabel label="Relation" placeholder='Enter your Relation with the Contact' textinputprops={{ secureTextEntry: false }} onChangeText= {handleEmergencyRelationChange} />

                <SubTitleText title='Vital Signs' color={colors.blue} />
                <TextInputwithLabel label="Normal Body Temperature (°C)" keyboardType="numeric" placeholder='Enter your Normal Body Temperature' textinputprops={{ secureTextEntry: false }} onChangeText= {handleTemperatureChange} />
                <TextInputwithLabel label="Normal Pulse Rate " keyboardType="numeric" placeholder='Enter your Normal Pulse Rate' textinputprops={{ secureTextEntry: false }} onChangeText= {handlePulseChange} />
                <TextInputwithLabel label="Normal Respiration Rate" keyboardType="numeric" placeholder='Enter your Normal Respiration Rate' textinputprops={{ secureTextEntry: false }} onChangeText= {handleRespirationRateChange} />
                <TextInputwithLabel label="Normal Systolic Blood Pressure" keyboardType="numeric" placeholder='Enter your Normal Systolic Blood Pressure' textinputprops={{ secureTextEntry: false }} onChangeText= {handleBloodPressureChange} />

                <SubTitleText title='Medical History' color={colors.blue} />
                <TextInputwithLabel label="Chronic Condition or Illness" placeholder='Enter your Chronic Condition or Illness if any' textinputprops={{ secureTextEntry: false }} onChangeText= {handleChronicConditionsChange} />
                <TextInputwithLabel label="Past Surgeries or Hospitalizations" placeholder='Enter your Past Surgeries or Hospitalizations if any' textinputprops={{ secureTextEntry: false }} onChangeText= {handlePastSurgeriesChange} />
                <TextInputwithLabel label="Family Medical History" placeholder='Enter your Family Medical History if any' textinputprops={{ secureTextEntry: false }} onChangeText= {handleFamilyMedicalHistoryChange} />
                <TextInputwithLabel label="Allergies" placeholder='Enter your Allergies if any' textinputprops={{ secureTextEntry: false }} onChangeText= {handleAllergiesChange} />

                <SubTitleText title='Current Medications' color={colors.blue} />
                <TextInputwithLabel label="Current Medications" placeholder='Enter your Current Medications if any' textinputprops={{ secureTextEntry: false }} onChangeText= {handleCurrentMedicationsChange} />
      
                <SubTitleText title='Life Style Habits' color={colors.blue} />
                <HabitsMultiSelectChecklist selectedOptions={selectedOptions} onSelectOption={handleSelectOption}/>            
            </ScrollView>

            <TwoCustomButton containerStyle={{ alignSelf: 'center'}} buttonprops2={{ title: "Cancel", onPress: handleCancelPress }} buttonprops1={{ title: "Edit", onPress: handleEditPress  }}></TwoCustomButton>

        </SafeAreaView>
    );
};

export default EditReport;