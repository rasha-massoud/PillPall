import React, { FC, useState } from 'react'
import { SafeAreaView, ScrollView, Alert } from 'react-native';
import CustomButton from '../../components/CustomButton';
import PageTitle from '../../components/PageTitle';
import Body1Text from '../../components/Body1Text';
import { colors } from '../../constants/palette';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import AddImage from '../../components/AddImage';
import GenderCheckBox from '../../components/GenderCheckBox';
import StepText from '../../components/StepText';
import { useNavigation } from '@react-navigation/core';
import { useDispatch, useSelector } from "react-redux";
import { setName, setEmail, setPhoneNumber, setImage, setDob, setAddress, setGender, } from "../../store/slices/reportSlice";

import styles from './styles';

interface ContactInfoData {
  gender: string | undefined;
}

const ContactInfo: FC = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  const handleImageSelected = (imageFile: File | null) => {
      setSelectedImageFile(imageFile);
      dispatch(setImage(imageFile ? URL.createObjectURL(imageFile) : ""));
  };
  
  const [contactInfoData, setContactInfoData] = useState<ContactInfoData>({
    gender: undefined
  });

  const [username, setUsername] = useState<string>("");
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [DOB, setDOB] = useState<string>("");
  const [chosenGender, setChosenGender] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  const handleNameChange = async (value: string) => {
    setUsername(value);
    dispatch(setName(value));
  }

  const handleEmailChange = async (value: string) => {
    setEmailAddress(value);
    dispatch(setEmail(value));
  }

  const handlePhoneNumberChange = async (value: string) => {
    setPhone(value);
    dispatch(setPhoneNumber(value));
  }

  const handleAddressChange = async (value: string) => {
    setLocation(value);
    dispatch(setAddress(value));
  }

  const handleDoBChange = async (value: string) => {
    setDOB(value);
    dispatch(setDob(value));
  }

  const handleGenderSelect = async (selectedGender: string) => {
    setChosenGender(selectedGender);
    dispatch(setGender(selectedGender));
    setContactInfoData({
      ...contactInfoData,
      gender: selectedGender,
    });
  };

  const handleContinuePress = async () => {
    if(selectedImageFile && username && emailAddress && location && DOB && chosenGender && phone){
      navigation.navigate("AnthropometricMeasurements" as never, {} as never);
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
      <PageTitle title='Contact Information' />
      <StepText title='Step 1' color={colors.blue}></StepText>

      <Body1Text context="To provide you with the best care possible, we need your contact information, such as your phone number, date of birth, address, and gender. This information helps us keep in touch with you and keep your medical records up-to-date."></Body1Text>

      <AddImage onImageSelected={handleImageSelected} />

      <ScrollView>
        <TextInputwithLabel label='Name' placeholder='Enter your Username' textinputprops={{ secureTextEntry: false}} onChangeText= {handleNameChange} />
        <TextInputwithLabel label='Email' keyboardType="email-address" placeholder='Enter your Email' textinputprops={{ secureTextEntry: false}} onChangeText= {handleEmailChange} />

        <TextInputwithLabel label="Phone Number" keyboardType="numeric" placeholder='Enter your Phone Number' textinputprops={{ secureTextEntry: false }} onChangeText= {handlePhoneNumberChange} />

        <TextInputwithLabel label="Date of Birth" placeholder='YYYY-MM-DD' textinputprops={{ secureTextEntry: false }} onChangeText= {handleDoBChange} />

        <TextInputwithLabel label="Address" placeholder='Enter your Address' textinputprops={{ secureTextEntry: false }} onChangeText= {handleAddressChange} />

        <GenderCheckBox selectedGender={contactInfoData.gender} onGenderSelect={handleGenderSelect} />
      </ScrollView>

      <CustomButton containerStyle={{ alignSelf: 'center', marginTop: 20 }} buttonprops={{ title: "Continue", onPress: handleContinuePress }} />

    </SafeAreaView>
  );
};

export default ContactInfo;