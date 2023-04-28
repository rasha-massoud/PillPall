import React, { FC, useState, useEffect } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import CustomButton from '../../components/CustomButton';
import SubTitleText from '../../components/SubTitleText';
import Body1Text from '../../components/Body1Text';
import { colors } from '../../constants/palette';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import StepText from '../../components/StepText';
// import axios from 'axios';
import DisplayData from '../../components/DisplayData';
import firebase from 'firebase';
type timestamp = firebase.firestore.Timestamp;
import styles from './styles';

interface Patient {
  name: string;
  email: string;
  updated_at: timestamp;
}

const Report: FC = () => {
  const [generalData, setGeneralData] = useState<Patient[]>([]);
  const [reportData, setReportData] = useState<Patient[]>([]);

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
    <View style={styles.top}>
      <View style= {styles.topLeft}>
          <SubTitleText title='PILL PALL' />
          {generalData.map(user => (
            <StepText title={user.updated_at}></StepText>
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

    <SubTitleText title='Anthropometric Measurements' />

    <SubTitleText title='Emergency Contact Info' />
    <SubTitleText title='Vital Signs' />
    <SubTitleText title='Medical History' />
    <SubTitleText title='Current Medications' />
    <SubTitleText title='Life Style Habits' />

    
    <CustomButton containerStyle={{ alignSelf: 'center', marginTop: 40 }} buttonprops={{ title: "Edit", onPress: () => console.log('Edit') }}  />

  </SafeAreaView>
  );
};

export default Report;