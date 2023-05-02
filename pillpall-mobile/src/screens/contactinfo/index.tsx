import React, { FC, useState } from 'react'
import { SafeAreaView, TouchableOpacity, Image } from 'react-native';
import CustomButton from '../../components/CustomButton';
import PageTitle from '../../components/PageTitle';
import Body1Text from '../../components/Body1Text';
import { colors } from '../../constants/palette';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import AddImage from '../../components/AddImage';
import GenderCheckBox from '../../components/GenderCheckBox';
import StepText from '../../components/StepText';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import API_URL from '../../constants/url';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles';

interface ContactInfoData {
  address: string;
  dob: string;
  phoneNumber: string;
  gender: string | undefined;
}

const ContactInfo: FC = () => {

  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleImageSelected = async (uri: string | null) => {
    setImageUri(uri);
    if (imageUri) {
      await AsyncStorage.setItem('imageUri', imageUri);
    } else {
      await AsyncStorage.setItem('imageUri', '');
    }  
  };

  const [contactInfoData, setContactInfoData] = useState<ContactInfoData>({
    address: '',
    dob: '',
    phoneNumber: '',
    gender: undefined
  });

  // const navigation = useNavigation();

  const handlePhoneNumberChange = async (value: string) => {
    setContactInfoData({...contactInfoData, phoneNumber: value});
    await AsyncStorage.setItem('phoneNumber', value);
  }

  const handleAddressChange = async (value: string) => {
    setContactInfoData({...contactInfoData, address: value});
    await AsyncStorage.setItem('address', value);
  }

  const handleDoBChange = async (value: string) => {
    setContactInfoData({...contactInfoData, dob: value});
    await AsyncStorage.setItem('dob', value);
  }

  const handleGenderSelect = async (selectedGender: string) => {
    setContactInfoData({...contactInfoData, gender: selectedGender});
    await AsyncStorage.setItem('gender', selectedGender);
  };

const handleContinuePress = async () => {

  console.log("success");
  AsyncStorage.getAllKeys().then(keys => {
    AsyncStorage.multiGet(keys).then((result) => {
      console.log(result);
    });
  });    
  // Navigate to Step 2
  }

  return (
  
    <SafeAreaView style={styles.container}>
      <PageTitle title='Contact Information' />
      <StepText title='Step 1' color={colors.blue}></StepText>

      <Body1Text context="To provide you with the best care possible, we need your contact information, such as your phone number, date of birth, address, and gender. This information helps us keep in touch with you and keep your medical records up-to-date."></Body1Text>

      <AddImage onImageSelected={handleImageSelected} />

      <TextInputwithLabel label="Phone Number" keyboardType="numeric" placeholder='Enter your Phone Number' textinputprops={{ secureTextEntry: false }} onChangeText= {handlePhoneNumberChange} />

      <TextInputwithLabel label="Date of Birth" placeholder='YYYY-MM-DD' textinputprops={{ secureTextEntry: false }} onChangeText= {handleDoBChange} />

      <TextInputwithLabel label="Address" placeholder='Enter your Address' textinputprops={{ secureTextEntry: false }} onChangeText= {handleAddressChange} />

      <GenderCheckBox selectedGender={contactInfoData.gender} onGenderSelect={handleGenderSelect} />

      <CustomButton containerStyle={{ alignSelf: 'center', marginTop: 20 }} buttonprops={{ title: "Continue", onPress: handleContinuePress }} />

    </SafeAreaView>
  );
};

export default ContactInfo;