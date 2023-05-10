import React, { FC, useState } from 'react'
import { SafeAreaView, Alert } from 'react-native';
import CustomButton from '../../components/CustomButton';
import PageTitle from '../../components/PageTitle';
import Body1Text from '../../components/Body1Text';
import { colors } from '../../constants/palette';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import StepText from '../../components/StepText';
import { useNavigation } from '@react-navigation/core'; 
import { useDispatch, useSelector } from 'react-redux';
import { setEmergencyName, setEmergencyNumber, setEmergencyEmail, setEmergencyContactRelation } from '../../store/slices/reportSlice';

import styles from './styles';

interface EmergencyContactData {
  emergency_name: string;
  emergency_number: string;
  emergency_email: string;
  emergency_contact_relation: string;
}

const EmergencyContact: FC = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [name, setName] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [relation, setRelation] = useState<string>("");

  const handleNameChange = async (value: string) => {
    setName(value);
    dispatch(setEmergencyName(value));
  }

  const handlePhoneNumberChange = async (value: string) => {
    setNumber(value);
    dispatch(setEmergencyNumber(value));
  }

  const handleEmailChange = async(value: string) => {
    setEmail(value);
    dispatch(setEmergencyEmail(value));
  }

  const handleRelationChange = async (value: string) => {
    setRelation(value);
    dispatch(setEmergencyContactRelation(value));
  }

  const handleContinuePress = () => {
    if(name && email && number && relation){
      navigation.navigate("VitalSigns" as never, {} as never);
    }
    else{
      Alert.alert(
        'Fails',
        'Missing Field. Please may sure to fill all fields.',
        [
          { text: 'OK' }
        ],
        { cancelable: false }
      );
    }
  }

  return (
  
    <SafeAreaView style={styles.container}>
      <PageTitle title='Emergency Contact Info' />
      <StepText title='Step 3' color={colors.blue} />

      <Body1Text context="Guard your peace of mind! Provide us with the contact details of a trusted friend or family member. In times of need, we'll be there, prioritizing your safety and well-being." />

      <TextInputwithLabel label="Name" placeholder='Enter your Name' textinputprops={{ secureTextEntry: false }} onChangeText= {handleNameChange} />

      <TextInputwithLabel label="Phone Number" keyboardType="numeric" placeholder='Enter your Phone Number' textinputprops={{ secureTextEntry: false }} onChangeText= {handlePhoneNumberChange} />

      <TextInputwithLabel label="Email" keyboardType="email-address" placeholder='Enter your Email' textinputprops={{ secureTextEntry: false }} onChangeText= {handleEmailChange} />
    
      <TextInputwithLabel label="Relation" placeholder='Enter your Relation with the Contact' textinputprops={{ secureTextEntry: false }} onChangeText= {handleRelationChange} />

      <CustomButton containerStyle={{ alignSelf: 'center', marginTop: 40 }} buttonprops={{ title: "Continue", onPress: handleContinuePress }}  />

    </SafeAreaView>
  );
};

export default EmergencyContact;