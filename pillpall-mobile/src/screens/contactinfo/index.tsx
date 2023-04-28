import React, { FC, useState } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import CustomButton from '../../components/CustomButton';
import PageTitle from '../../components/PageTitle';
import Body1Text from '../../components/Body1Text';
import { colors } from '../../constants/palette';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import AddImage from '../../components/AddImage';
import GenderCheckBox from '../../components/GenderCheckBox';
import StepText from '../../components/StepText';

import styles from './styles';

const ContactInfo: FC = () => {
  const [gender, setGender] = useState<string | undefined>();

  const handleGenderSelect = (selectedGender: string) => {
    setGender(selectedGender);
  };
  return (
  
  <SafeAreaView style={styles.container}>
    <PageTitle title='Contact Information' />
    <StepText title='Step 1' color={colors.blue}></StepText>

    <Body1Text context="To provide you with the best care possible, we need your contact information, such as your phone number, date of birth, address, and gender. This information helps us keep in touch with you and keep your medical records up-to-date."></Body1Text>

    <AddImage></AddImage>

    <TextInputwithLabel label="Phone Number" keyboardType="numeric" placeholder='Enter your Phone Number' textinputprops={{ secureTextEntry: false }}/>

    <TextInputwithLabel label="Date of Birth" placeholder='YYYY-MM-DD' textinputprops={{ secureTextEntry: false }} />

    <TextInputwithLabel label="Address" placeholder='Enter your Address' textinputprops={{ secureTextEntry: false }}/>

    <GenderCheckBox selectedGender={gender} onGenderSelect={handleGenderSelect} />
    <CustomButton containerStyle={{ alignSelf: 'center', marginTop: 20 }} buttonprops={{ title: "Continue", onPress: () => console.log('Continue') }}  />

  </SafeAreaView>
  );
};

export default ContactInfo;