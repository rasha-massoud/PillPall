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

import styles from './styles';

interface PatientReportProps {
  route: {
      params: {
        patientId: number;
      };
  };
}

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

const PatientReport: FC<PatientReportProps> = ({route }) => {

  const { patientId } = route.params;

  const navigation = useNavigation();

  const [allResult, setAllResult] = useState<any>();
  const [result, setResult] = useState<Patient>();
  
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      const token = await AsyncStorage.getItem('token');
      setLoading(true);
      try {
        const endpoint = 'doctor/get_patient_report';
        const response = await axios.get<any>(
          `${API_URL}${endpoint}/${patientId}`,
          {
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setAllResult(response.data);
      } catch (error) {
        console.error('An error occurred while getting the report', error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const handleBackPress = () => {
    navigation.navigate("DoctorSearch" as never, {} as never);
  }

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.top}>
            <View style={styles.topLeft}>
            <PageTitle title='PILLPALL' />
            </View>
            <View style={styles.topRight}>
            <Image
                source={require('../../../assets/logo.png')}
                style={styles.image}
            />
            </View>
        </View>

        {allResult && allResult.status === 'success' ? (

        <View>
          <ScrollView>
            <Body1Text context="This report provides you, as the doctor, with a concise summary of your patient's medical history and current medications." />

            <View>
                <DisplayData title='Name' value={allResult.patient.name} />
                <DisplayData title='Email' value={allResult.patient.email} />
                <DisplayData title='Phone Number' value={allResult.report[0].phone_number} />
                <DisplayData title='Date of Birth' value={allResult.report[0].dob} />
                <DisplayData title='Address' value={allResult.report[0].address} />
                <DisplayData title='Gender' value={allResult.report[0].gender} />
            </View>
        
            <View>
                <DisplayData title='Blood Type' value={allResult.report[0].blood_type} />
                <DisplayData title='Height' value={`${allResult.report[0].height} cm`} />
                <DisplayData title='Weight' value={`${allResult.report[0].weight} kg`} />
            </View>
        
            <View>
                <DisplayData
                title='Emergency Contact Name'
                value={allResult.report[0].emergency_name}
                />
                <DisplayData
                title='Emergency Contact Number'
                value={allResult.report[0].emergency_number}
                />
                <DisplayData
                title='Emergency Contact Email'
                value={allResult.report[0].emergency_email}
                />
                <DisplayData
                title='Emergency Contact Relation'
                value={allResult.report[0].emergency_contact_relation}
                />
            </View>
        
            <View>
                <DisplayData
                title='Body Temperature'
                value={`${allResult.report[0].body_temperature} °C`}
                />
                <DisplayData
                title='Pulse Rate'
                value={`${allResult.report[0].pulse_rate} bpm`}
                />
                <DisplayData
                title='Respiration Rate'
                value={`${allResult.report[0].respiration_rate} breaths/min`}
                />
                <DisplayData
                title='Systolic Blood Pressure'
                value={`${allResult.report[0].systolic_blood_pressure} mmHg`}
                />
            </View>
        
            <View>
                <DisplayData
                title='Chronic Conditions or Illness'
                value={allResult.report[0].chronic_conditions}
                />
                <DisplayData
                title='Past Surgeries'
                value={allResult.report[0].past_surgeries}
                />
                <DisplayData
                title='Family Medical History'
                value={allResult.report[0].family_medical_history}
                />
                <DisplayData
                title='Allergies'
                value={allResult.report[0].allergies}
                />
            </View>

            <View>
                <DisplayData
                title='Medications'
                value={allResult.report[0].medications}
                />
            </View>

            <View>
                <DisplayData
                title='Life Style Habits'
                value={allResult.report[0].life_style_habits}
                />
            </View>
          </ScrollView>  
          <CustomButton containerStyle={{ alignSelf: 'center', marginTop: 20 }} buttonprops={{ title: "Back", onPress: handleBackPress }} />

        </View>
        ) : (
        <View style={appStyles.body1}>
            <Body1Text context="The purpose of this report is to provide doctors with a comprehensive overview of a patient's medical history and current medications. The report is generated through the use of 'PillPall', a platform that allows users to record and assess their medical history and medications. By submitting this report directly to doctors, patients are able to avoid the repetitive task of recounting their medical history during each visit, and they are less likely to forget any important details. This can ultimately lead to more accurate diagnoses and better treatment outcomes. The use of this platform ensures that patients are able to receive more personalized and effective care, while also streamlining the process of accessing medical records for healthcare professionals." />

            <Body1Text context='No report.' />

            <CustomButton containerStyle={{ alignSelf: 'center', marginTop: 20 }} buttonprops={{ title: "Back", onPress: handleBackPress }} />

        </View>
        )}
  </SafeAreaView>
  );
};

export default PatientReport;