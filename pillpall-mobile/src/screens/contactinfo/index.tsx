import React, { FC } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import CustomButton from '../../components/CustomButton';
import PageTitle from '../../components/PageTitle';
import SubTitleText from '../../components/SubTitleText';
import Body1Text from '../../components/Body1Text';
import { colors } from '../../constants/palette';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import AddImage from '../../components/AddImage';

import styles from './styles';

const ContactInfo: FC = () => {

    return (
    
    <SafeAreaView style={styles.container}>
        <PageTitle title='Contact Information' color= {colors.blue} />
        <SubTitleText title='Step 1' color={colors.blue}></SubTitleText>

        <Body1Text context="To provide you with the best care possible, we need your contact information, such as your phone number, date of birth, address, and gender. This information helps us keep in touch with you and keep your medical records up-to-date."></Body1Text>

        <AddImage></AddImage>

        <TextInputwithLabel label="Phone Number" placeholder='Enter your Email' textinputprops={{ secureTextEntry: false }}/>

        <TextInputwithLabel label="Date of Birth" placeholder='Enter your Password' textinputprops={{ secureTextEntry: true }} />

        <TextInputwithLabel label="Address" placeholder='Enter your Email' textinputprops={{ secureTextEntry: false }}/>

        <CustomButton containerStyle={{ alignSelf: 'center', marginTop: 40 }} buttonprops={{ title: "Continue", onPress: () => console.log('Continue') }}  />

    </SafeAreaView>
  );
};

export default ContactInfo;