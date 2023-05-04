import React, { FC, useState } from 'react'
import { SafeAreaView, ScrollView, Alert } from 'react-native';
import PageTitle from '../../components/PageTitle';
import { colors } from '../../constants/palette';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import AddImage from '../../components/AddImage';
import GenderCheckBox from '../../components/GenderCheckBox';
import axios from 'axios';
import { useNavigation } from '@react-navigation/core';
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
    const navigation = useNavigation();

    const [imageUri, setImageUri] = useState<string | null>(null);

    const [username, setUsername] = useState<string>("");
    const [emailAddress, setEmailAddress] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [DOB, setDOB] = useState<string>("");
    const [chosenGender, setChosenGender] = useState<string>("");
    const [hours, setHours] = useState<string>("");
    const [education, setEducation] = useState<string>("");
    const [cert, setCert] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [exp, setExp] = useState<string>("");

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

    const handleNameChange = async (value: string) => {
        setUsername(value);
        dispatch(setName(value));
    };

    const handleEmailChange = async (value: string) => {
        setEmailAddress(value);
        dispatch(setEmail(value));
    };

    const handlePhoneNumberChange = async (value: string) => {
        setPhone(value);
        dispatch(setPhoneNumber(value));
    };

    const handleAddressChange = async (value: string) => {
        setLocation(value);
        dispatch(setAddress(value));
    };

    const handleDoBChange = async (value: string) => {
        setDOB(value);
        dispatch(setDob(value));
    };

    const handleGenderSelect = async (selectedGender: string) => {
        setChosenGender(selectedGender);
        dispatch(setGender(selectedGender));
    };

    const handleWorkingHoursChange = async (value: string) => {
        setHours(value);
        dispatch(setWorkingHours(value));
    };

    const handleMajorChange = async (value: string) => {
        setEducation(value);
        dispatch(setMajor(value));
    };

    const handleCertificatesChange = async (value: string) => {
        setCert(value);
        dispatch(setCertificates(value));
    };

    const handleExpertiseChange = async (value: string) => {
        setExp(value);
        dispatch(setExpertise(value));
    };

    const handleCancelPress = () => {
        Alert.alert(
            "Confirmation",
            "Are you sure you want to cancel? Any unsaved data will be lost.",
            [
                {
                    text: "Stay",
                    style: "cancel",
                },
                {
                    text: "Accept",
                    onPress: () => {
                        navigation.navigate("Profile" as never, {} as never);
                    },
                },
            ]
        ); 
    };

    const handleSavePress = () => {
        if(!username && !emailAddress && !location && !DOB && !chosenGender && !phone && !hours && !education && !cert && !exp){
            Alert.alert(
                'Fails',
                'Missing Field. Please make sure to fill all fields.',
                [
                  { text: 'OK' }
                ],
                { cancelable: false }
            );
        }
        
        //AXIOS REQUEST AND THE BELOW
        // if(Response.data.status == "success"){
        //     navigation.navigate("Profile" as never, {} as never);
        // }
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