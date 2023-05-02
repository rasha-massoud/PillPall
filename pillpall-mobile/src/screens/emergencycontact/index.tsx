import React, { FC, useState } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import CustomButton from '../../components/CustomButton';
import PageTitle from '../../components/PageTitle';
import Body1Text from '../../components/Body1Text';
import { colors } from '../../constants/palette';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import StepText from '../../components/StepText';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import API_URL from '../../constants/url';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles';

interface EmergencyContactData {
  emergency_name: string;
  emergency_number: string;
  emergency_email: string;
  emergency_contact_relation: string;
}

const EmergencyContact: FC = () => {

  const [emergencyContactData, setEmergencyContactData] = useState<EmergencyContactData>({
    emergency_name: '',
    emergency_number: '',
    emergency_email: '',
    emergency_contact_relation: '',
  });

  const handleNameChange = async (value: string) => {
    setEmergencyContactData({...emergencyContactData, emergency_name: value});
    await AsyncStorage.setItem('emergency_name', value);
  }

  const handlePhoneNumberChange = async (value: string) => {
    setEmergencyContactData({...emergencyContactData, emergency_number: value});
    await AsyncStorage.setItem('emergency_number', value);
  }

  const handleEmailChange = async(value: string) => {
    setEmergencyContactData({...emergencyContactData, emergency_email: value});
    await AsyncStorage.setItem('emergency_email', value);
  }

  const handleRelationChange = async (value: string) => {
    setEmergencyContactData({...emergencyContactData, emergency_contact_relation: value});
    await AsyncStorage.setItem('emergency_contact_relation', value);
  }

  const handleContinuePress = () => {
    console.log("success");
    AsyncStorage.getAllKeys().then(keys => {
      AsyncStorage.multiGet(keys).then((result) => {
        console.log(result);
      });
    });    
    // Navigate to Step 4
  }

  return (
  
  <SafeAreaView style={styles.container}>
    <PageTitle title='Emergency Contact Info' />
    <StepText title='Step 3' color={colors.blue}></StepText>

    <Body1Text context="In case of an emergency, we need the name, phone number, email address, and relation of a trusted friend or family member who we can contact. Providing this information helps us ensure your safety and well-being."></Body1Text>

    <TextInputwithLabel label="Name" placeholder='Enter your Name' textinputprops={{ secureTextEntry: false }} onChangeText= {handleNameChange} />

    <TextInputwithLabel label="Phone Number" keyboardType="numeric" placeholder='Enter your Phone Number' textinputprops={{ secureTextEntry: false }} onChangeText= {handlePhoneNumberChange} />

    <TextInputwithLabel label="Email" keyboardType="email-address" placeholder='Enter your Email' textinputprops={{ secureTextEntry: false }} onChangeText= {handleEmailChange} />
    
    <TextInputwithLabel label="Relation" placeholder='Enter your Relation with the Contact' textinputprops={{ secureTextEntry: false }} onChangeText= {handleRelationChange} />

    <CustomButton containerStyle={{ alignSelf: 'center', marginTop: 40 }} buttonprops={{ title: "Continue", onPress: handleContinuePress }}  />

  </SafeAreaView>
  );
};

export default EmergencyContact;