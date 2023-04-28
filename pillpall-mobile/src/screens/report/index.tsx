import React, { FC, useState, useEffect } from 'react'
import { SafeAreaView, View, Text, Image , ScrollView} from 'react-native';
import CustomButton from '../../components/CustomButton';
import SubTitleText from '../../components/SubTitleText';
import Body1Text from '../../components/Body1Text';
// import axios from 'axios';
import DisplayData from '../../components/DisplayData';
import appStyles from '../../constants/appStyles';

import styles from './styles';

interface Patient {
  id: number;
  name: string;
  email: string;
}

interface ReportData {
  id: number;
  image: string;
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
  updated_at: Date;
}

const Report: FC = () => {
  const [generalData, setGeneralData] = useState<Patient[]>([]);
  const [reportData, setReportData] = useState<ReportData[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const [response1, response2] = await Promise.all([
  //       axios.get('https://api.example.com/api1'),
  //       axios.get('https://api.example.com/api2'),
  //     ]);

  //     setGeneralData(response1.data);
  //     setReportData(response2.data);
  //   };

  //   fetchData();
  // }, []);

  return (
  
  <SafeAreaView style={styles.container}>
    <ScrollView>
      <View style={styles.top}>
        <View style= {styles.topLeft}>
            <SubTitleText title='PILL PALL' />
            {reportData.map(user => (
              <Text style={appStyles.subTitle2}>
                {user.updated_at.toLocaleString()}
              </Text>
            ))}
        </View>
        <View style= {styles.topRight}>
        <Image
              source={require('../../../assets/logo.png')}
              style={styles.image}
          />
        </View>
      </View>


      <Body1Text context="The purpose of this report is to provide doctors with a comprehensive overview of a patient's medical history and current medications. The report is generated through the use of 'PillPall', a platform that allows users to record and assess their medical history and medications. By submitting this report directly to doctors, patients are able to avoid the repetitive task of recounting their medical history during each visit, and they are less likely to forget any important details. This can ultimately lead to more accurate diagnoses and better treatment outcomes. The use of this platform ensures that patients are able to receive more personalized and effective care, while also streamlining the process of accessing medical records for healthcare professionals."></Body1Text>

      <SubTitleText title='Contact Information' />
      {generalData.map((user) => (
        <View>
          <DisplayData title='Name' value={user.name} />
          <DisplayData title='Email' value={user.email} />
        </View>
      ))}
      {reportData.map((user) => (
        <View>
          <DisplayData title='Phone Number' value={user.phone_number} />
          <DisplayData title='Date of Birth' value={user.dob} />
          <DisplayData title='Address' value={user.address} />
          <DisplayData title='Gender' value={user.gender} />
        </View>
      ))}

      <SubTitleText title='Anthropometric Measurements' />
      {reportData.map((user) => (
        <View>
          <DisplayData title='Gender' value={user.gender} />
          <DisplayData title='Blood Type' value={user.blood_type} />
          <DisplayData title='Height' value={`${user.height} cm`} />
          <DisplayData title='Weight' value={`${user.weight} kg`} />
        </View>
      ))}

      <SubTitleText title='Emergency Contact Info' />
      {reportData.map((user) => (
        <View>
          <DisplayData
            title='Emergency Contact Name'
            value={user.emergency_name}
          />
          <DisplayData
            title='Emergency Contact Number'
            value={user.emergency_number}
          />
          <DisplayData
            title='Emergency Contact Email'
            value={user.emergency_email}
          />
          <DisplayData
            title='Emergency Contact Relation'
            value={user.emergency_contact_relation}
          />
        </View>
      ))}

      <SubTitleText title='Vital Signs' />
      {reportData.map((user) => (
      <View>
        <DisplayData
          title='Body Temperature'
          value={`${user.body_temperature} °C`}
        />
        <DisplayData
          title='Pulse Rate'
          value={`${user.pulse_rate} bpm`}
        />
        <DisplayData
          title='Respiration Rate'
          value={`${user.respiration_rate} breaths/min`}
        />
        <DisplayData
          title='Systolic Blood Pressure'
          value={`${user.systolic_blood_pressure} mmHg`}
        />
      </View>
      ))}

      <SubTitleText title='Medical History' />
      {reportData.map((user) => (
      <View>
        <DisplayData
          title='Chronic Conditions or Illness'
          value={user.chronic_conditions}
        />
        <DisplayData
          title='Past Surgeries or Hospitalizations'
          value={user.past_surgeries}
        />
        <DisplayData
          title='Family Medical History'
          value={user.family_medical_history}
        />
        <DisplayData
          title='Allergies'
          value={user.allergies}
        />
      </View>
      ))}

      <SubTitleText title='Current Medications' />
      {reportData.map((user) => (
      <View>
        <DisplayData
          title='Medications'
          value={user.medications}
        />
      </View>
      ))}

      <SubTitleText title='Life Style Habits' />
      {reportData.map((user) => (
      <View>
        <DisplayData
          title='Life Style Habits'
          value={user.life_style_habits}
        />
      </View>
      ))}

      
      <CustomButton containerStyle={{ alignSelf: 'center', marginTop: 40 }} buttonprops={{ title: "Edit", onPress: () => console.log('Edit') }}  />
    </ScrollView>
  </SafeAreaView>
  );
};

export default Report;