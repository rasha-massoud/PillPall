import React, { FC, useState } from 'react'
import { SafeAreaView, ScrollView, Image } from 'react-native';
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
import { useDispatch, useSelector } from "react-redux";
import { setFirstLogin, setName, setEmail, setPhoneNumber, setImage, setDob, setAddress, setGender, setWorkingHours, setMajor, setCertificates, setExpertise } from "../../store/slices/reportSlice";
import SubTitleText from '../../components/SubTitleText';
import TwoCustomButton from '../../components/TwoCustomButton';

import styles from './styles';

interface EditProfileData {
    name: string;
    email: string;
    address: string;
    dob: string;
    phoneNumber: string;
    gender: string | undefined;
    working_hours: string,
    major: string,
    certificates: string,
    expertise: string,
}

const EditProfile: FC = () => {

    const dispatch = useDispatch();

    const [imageUri, setImageUri] = useState<string | null>(null);

    const handleImageSelected = async (imageFile: File | null) => {
        if (imageFile) {
        const url = URL.createObjectURL(imageFile);
        setImageUri(url);
        dispatch(setImage(url));
        } else {
        setImageUri(null);
        dispatch(setImage(null));
        }
    };
    
    const [contactInfoData, setContactInfoData] = useState<EditProfileData>({
            name: '',
            email: '',
            address: '',
            dob: '',
            phoneNumber: '',
            gender: undefined,
            working_hours: '',
            major: '',
            certificates: '',
            expertise: '',
    });

    // const navigation = useNavigation();

    const handleNameChange = async (value: string) => {
        dispatch(setName(value));
    };

    const handleEmailChange = async (value: string) => {
        dispatch(setEmail(value));
    };

    const handlePhoneNumberChange = async (value: string) => {
        dispatch(setPhoneNumber(value));
    };

    const handleAddressChange = async (value: string) => {
        dispatch(setAddress(value));
    };

    const handleDoBChange = async (value: string) => {
        dispatch(setDob(value));
    };

    const handleGenderSelect = async (selectedGender: string) => {
        dispatch(setGender(selectedGender));
    };

    const handleWorkingHoursChange = async (value: string) => {
        dispatch(setWorkingHours(value));
    };

    const handleMajorChange = async (value: string) => {
        dispatch(setMajor(value));
    };

    const handleCertificatesChange = async (value: string) => {
        dispatch(setCertificates(value));
    };

    const handleExpertiseChange = async (value: string) => {
        dispatch(setExpertise(value));
    };

    const handleSubmitPress = async () => {
        //Linking here
        ////////SAVE FIRST TIME LOG IN AS 0////////
        setFirstLogin('0');
    }

    const handleCancelPress = () => {
    };

    const handleSavePress = () => {
    };

    return (
  
    <SafeAreaView style={styles.container}>
        <PageTitle title='Profile' />

        <AddImage onImageSelected={handleImageSelected} />

        <ScrollView>
            <TextInputwithLabel label='Name' placeholder='Enter your Username' textinputprops={{ secureTextEntry: false}} onChangeText= {handleNameChange} />
            <TextInputwithLabel label='Email' keyboardType="email-address" placeholder='Enter your Email' textinputprops={{ secureTextEntry: false}} onChangeText= {handleEmailChange} />
            <TextInputwithLabel label="Phone Number" keyboardType="numeric" placeholder='Enter your Phone Number' textinputprops={{ secureTextEntry: false }} onChangeText= {handlePhoneNumberChange} />
            <TextInputwithLabel label="Date of Birth" placeholder='YYYY-MM-DD' textinputprops={{ secureTextEntry: false }} onChangeText= {handleDoBChange} />
            <GenderCheckBox selectedGender={contactInfoData.gender} onGenderSelect={handleGenderSelect} />

            <SubTitleText title="Profession Details" />
            <TextInputwithLabel label="Address" placeholder='Enter your Clinic Address' textinputprops={{ secureTextEntry: false }} onChangeText= {handleAddressChange} />
            <TextInputwithLabel label="Working Hours" placeholder='Enter your Working Hours' textinputprops={{ secureTextEntry: false }} onChangeText= {handleWorkingHoursChange} />

            <SubTitleText title="Education" />
            <TextInputwithLabel label="Major" placeholder='Enter your Major' textinputprops={{ secureTextEntry: false }} onChangeText= {handleMajorChange} />
            <TextInputwithLabel label="Certificates" placeholder='List your Certificates' textinputprops={{ secureTextEntry: false }} onChangeText= {handleCertificatesChange} />
            <TextInputwithLabel label="Expertise" placeholder='List your Expertise' textinputprops={{ secureTextEntry: false }} onChangeText= {handleExpertiseChange} />

        </ScrollView>

        <TwoCustomButton containerStyle={{ alignSelf: 'center'}} buttonprops2={{ title: "Cancel", onPress: handleCancelPress }} buttonprops1={{ title: "Save", onPress: handleSavePress  }} />

    </SafeAreaView>
  );
};

export default EditProfile;