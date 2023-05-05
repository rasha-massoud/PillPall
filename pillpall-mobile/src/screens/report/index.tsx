import React, { FC, useState, useEffect } from 'react'
import { SafeAreaView, View, Text, Image , TouchableOpacity, ScrollView} from 'react-native';
import CustomButton from '../../components/CustomButton';
import Body1Text from '../../components/Body1Text';
import axios from 'axios';
import DisplayData from '../../components/DisplayData';
import appStyles from '../../constants/appStyles';
import { useNavigation } from '@react-navigation/core';
import API_URL from '../../constants/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PageTitle from '../../components/PageTitle';
import TextTitle from '../../components/TextTitle';

import styles from './styles';

interface Patient {
  name: string;
  email: string;
  updated_at: Date;
  patients_info: {
    phone_number: string;
    dob: string;
    address: string;
    gender: string;
    blood_type: string;
    height: number;
    weight: number;
    emergency_name: string;
    emergency_number: string;
    emergency_email: string;
    emergency_contact_relation: string;
    body_temperature: number;
    pulse_rate: number;
    respiration_rate: number;
    systolic_blood_pressure: number;
    chronic_conditions: string;
    past_surgeries: string;
    family_medical_history: string;
    allergies: string;
    life_style_habits: string;
    medications: string;
  }
}

const Report: React.FC = () => {

  const navigation = useNavigation();
  const [allResult, setAllResult] = useState<any>();
  const [result, setResult] = useState<Patient>();
  
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      const token = await AsyncStorage.getItem('token');
      setLoading(true);
      try {
        const endpoint = 'patient/get_report';
        const response = await axios.get<{ user: Patient }>(
          `${API_URL}${endpoint}`,
          {
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setAllResult(response.data);
        setResult(response.data.user);
        console.log(response.data)
      } catch (error) {
        console.error('An error occurred while getting the report', error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const handleEditPress = () => {
    navigation.navigate("EditReport" as never, {} as never);
  }

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <View style={styles.topLeft}>
          <PageTitle title='PILL PALL' />
        </View>
        <View style={styles.topRight}>
          <Image
            source={require('../../../assets/logo.png')}
            style={styles.image}
          />
        </View>
      </View>

      {result && allResult.status === 'success' ? (

      <View>
        <ScrollView>
          <Body1Text context="The purpose of this report is to provide doctors with a comprehensive overview of a patient's medical history and current medications. The report is generated through the use of 'PillPall', a platform that allows users to record and assess their medical history and medications. By submitting this report directly to doctors, patients are able to avoid the repetitive task of recounting their medical history during each visit, and they are less likely to forget any important details. This can ultimately lead to more accurate diagnoses and better treatment outcomes. The use of this platform ensures that patients are able to receive more personalized and effective care, while also streamlining the process of accessing medical records for healthcare professionals." />
    
          <TouchableOpacity onPress={handleEditPress}> 
                <Text style={styles.editText}>**Press me to Edit**</Text>
          </TouchableOpacity>

          <View>
            <DisplayData title='Name' value={result.name} />
            <DisplayData title='Email' value={result.email} />
            <DisplayData title='Phone Number' value={result && result.patients_info ? result.patients_info.phone_number : ''} />
            <DisplayData title='Date of Birth' value={result.patients_info.dob} />
            <DisplayData title='Address' value={result.patients_info.address} />
            <DisplayData title='Gender' value={result.patients_info.gender} />
          </View>
    
          <View>
            <DisplayData title='Blood Type' value={result.patients_info.blood_type} />
            <DisplayData title='Height' value={`${result.patients_info.height} cm`} />
            <DisplayData title='Weight' value={`${result.patients_info.weight} kg`} />
          </View>
    
          <View>
            <DisplayData
              title='Emergency Contact Name'
              value={result.patients_info.emergency_name}
            />
            <DisplayData
              title='Emergency Contact Number'
              value={result.patients_info.emergency_number}
            />
            <DisplayData
              title='Emergency Contact Email'
              value={result.patients_info.emergency_email}
            />
            <DisplayData
              title='Emergency Contact Relation'
              value={result.patients_info.emergency_contact_relation}
            />
          </View>
    
          <View>
            <DisplayData
              title='Body Temperature'
              value={`${result.patients_info.body_temperature} °C`}
            />
            <DisplayData
              title='Pulse Rate'
              value={`${result.patients_info.pulse_rate} bpm`}
            />
            <DisplayData
              title='Respiration Rate'
              value={`${result.patients_info.respiration_rate} breaths/min`}
            />
            <DisplayData
              title='Systolic Blood Pressure'
              value={`${result.patients_info.systolic_blood_pressure} mmHg`}
            />
          </View>
    
          <View>
            <DisplayData
              title='Chronic Conditions or Illness'
              value={result.patients_info.chronic_conditions}
            />
            <DisplayData
              title='Past Surgeries'
              value={result.patients_info.past_surgeries}
            />
            <DisplayData
              title='Family Medical History'
              value={result.patients_info.family_medical_history}
            />
            <DisplayData
              title='Allergies'
              value={result.patients_info.allergies}
            />
          </View>

          <View>
            <DisplayData
              title='Medications'
              value={result.patients_info.medications}
            />
          </View>

          <View>
            <DisplayData
              title='Life Style Habits'
              value={result.patients_info.life_style_habits}
            />
          </View>
        <CustomButton containerStyle={{ alignSelf: 'center', marginTop: 40 }} buttonprops={{ title: "Edit", onPress: handleEditPress}}  />
        </ScrollView>  
      </View>
      ) : (
      <View style={appStyles.body1}>
        <Body1Text context="The purpose of this report is to provide doctors with a comprehensive overview of a patient's medical history and current medications. The report is generated through the use of 'PillPall', a platform that allows users to record and assess their medical history and medications. By submitting this report directly to doctors, patients are able to avoid the repetitive task of recounting their medical history during each visit, and they are less likely to forget any important details. This can ultimately lead to more accurate diagnoses and better treatment outcomes. The use of this platform ensures that patients are able to receive more personalized and effective care, while also streamlining the process of accessing medical records for healthcare professionals." />

        <Body1Text context='No report.' />
      </View>
      )}
  </SafeAreaView>
  );
};

export default Report;