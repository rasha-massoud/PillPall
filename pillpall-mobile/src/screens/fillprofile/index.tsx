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
import axios from 'axios';
import API_URL from '../../constants/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from "react-redux";
import { setFirstLogin, setName, setEmail, setPhoneNumber, setImage, setDob, setAddress, setGender, setWorkingHours, setMajor, setCertificates, setExpertise } from "../../store/slices/reportSlice";
import { useNavigation } from '@react-navigation/core';

import styles from './styles';
import SubTitleText from '../../components/SubTitleText';


interface RootState {
    report: {
      image: string;
    }
}

interface FillProfileData {
    gender: string | undefined;
}

const FillProfile: FC = () => {
    
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState<boolean>(false);

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
    const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

    const handleImageSelected = (imageFile: File | null) => {
        setSelectedImageFile(imageFile);
        dispatch(setImage(imageFile ? URL.createObjectURL(imageFile) : ""));
    };

    const [contactInfoData, setContactInfoData] = useState<FillProfileData>({
        gender: undefined,
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
        setContactInfoData({
            ...contactInfoData,
            gender: selectedGender,
        });
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

    
    const image = useSelector(
        (state: RootState) => state.report.image
    );

    const handleSubmitPress = async () => {

        if(!selectedImageFile && !username && !emailAddress && !location && !DOB && !chosenGender && !phone && !hours && !education && !cert && !exp){
            Alert.alert(
                'Fails',
                'Missing Field. Please make sure to fill all fields.',
                [
                  { text: 'OK' }
                ],
                { cancelable: false }
            );
            return;
        }

        setIsLoading(true);

        const data = new FormData();
        if (selectedImageFile) {
            data.append('image', selectedImageFile);
        }
        data.append('name', username);
        data.append('email', emailAddress);
        data.append('phone_number', phone);
        data.append('address', location);
        data.append('dob', DOB);
        data.append('gender', chosenGender);
        data.append('working_hours', hours);
        data.append('major', education);
        data.append('certificates', cert);
        data.append('expertise', exp);

        const token = await AsyncStorage.getItem('token');
        console.log(token);
        const endpoint = 'doctor/report';
        await axios.post(`${API_URL}${endpoint}`, data, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Content-Type': "multipart/form-data",
            },
        })
        .then((response) => {
            if(response.data.status == 'success'){
                dispatch(setFirstLogin('0'));
                Alert.alert(
                    'Success',
                    'The report is successfully created.',
                    [
                        { text: 'OK' }
                    ],
                    { cancelable: false }
                );
                navigation.navigate("Report" as never, {} as never);
            }
            else{
                console.log(response.data);
                Alert.alert(
                    'Fails',
                    'Request Fails.',
                    [
                        { text: 'OK' }
                    ],
                    { cancelable: false }
                );
            }
        })
        .catch((error) => {
            console.error('An error occurred while creating the report', error);
        });
        setIsLoading(false);

    }

  return (
  
    <SafeAreaView style={styles.container}>
      <PageTitle title='Profile' />
      <StepText title='Step 1' color={colors.blue}></StepText>

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

      <CustomButton containerStyle={{ alignSelf: 'center', marginTop: 20 }} buttonprops={{ title: "Submit", onPress: handleSubmitPress }} />

    </SafeAreaView>
  );
};

export default FillProfile;