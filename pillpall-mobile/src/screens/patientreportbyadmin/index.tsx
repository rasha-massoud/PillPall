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

interface PatientReportByAdminProps {
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

const PatientReportByAdmin: FC<PatientReportByAdminProps> = ({route }) => {

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
        const endpoint = 'admin/get_patient_report';
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
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  const handleBackPress = () => {
    navigation.navigate("Patients" as never, {} as never);
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

        {allResult && allResult.status === 'success' && allResult.report.length > 0 ? (

        <View>
          <ScrollView>
            <Body1Text context="As an admin, you are currently viewing the comprehensive report of a patient within our system." />

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
            <View style = {styles.emptyText}>
              <Body1Text context={`No report yet for ${allResult?.patient?.name}`} />
              <CustomButton containerStyle={{ alignSelf: 'center', height: 30, marginTop: 10 }} buttonprops={{ title: "Back", onPress: handleBackPress }} />
            </View>
          )}        
  </SafeAreaView>
  );
};

export default PatientReportByAdmin;