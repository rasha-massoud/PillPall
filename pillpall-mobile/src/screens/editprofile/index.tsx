import React, { FC, useState } from 'react'
import { SafeAreaView, ScrollView, Alert, View, TouchableOpacity, Image, Text } from 'react-native';
import PageTitle from '../../components/PageTitle';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import GenderCheckBox from '../../components/GenderCheckBox';
import axios from 'axios';
import { useNavigation } from '@react-navigation/core';
import API_URL from '../../constants/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setName, setEmail, setPhoneNumber, setImage, setDob, setAddress, setGender, setWorkingHours, setMajor, setCertificates, setExpertise } from '../../store/slices/reportSlice';
import TwoCustomButton from '../../components/TwoCustomButton';
import FormTitle from '../../components/FormTitle';
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerResult } from 'expo-image-picker/build/ImagePicker.types';
import { Ionicons } from '@expo/vector-icons';

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
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const pickImage = async () => {
        let result: ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        setSelectedImage(result.uri);
    };
    
    const clearImage = () => {
        setSelectedImage(null);
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

    const handleSavePress = async () => {
        if(!selectedImage && !username && !emailAddress && !location && !DOB && !chosenGender && !phone && !hours && !education && !cert && !exp){
            Alert.alert(
                'Fails',
                'Missing Field. Please make sure to fill all fields.',
                [
                    { text: 'OK' }
                ],
                { cancelable: false }
            );
        }
        setIsLoading(true);

        
        const data = new FormData();
        const fileExtension = selectedImage.split('.').pop() || '';
        const fileName = `image_${Date.now()}.${fileExtension}`;
    
        const file = {
          uri: selectedImage,
          name: fileName,
          type: `image/${fileExtension}`,
        };
          
        data.append('image', file);
        data.append('phone_number', phone);
        data.append('address', location);
        data.append('dob', DOB);
        data.append('gender', chosenGender);
        data.append('working_hours', hours);
        data.append('major', education);
        data.append('certificates', cert);
        data.append('expertise', exp);

        const token = await AsyncStorage.getItem('token');
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
                Alert.alert(
                    'Success',
                    'The report is successfully updated.',
                    [
                        { text: 'OK' }
                    ],
                    { cancelable: false }
                );
                navigation.navigate("Profile" as never, {} as never);
            }
            else{
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
            console.error('An error occurred while updating the report');
        });
        setIsLoading(false);
    };

    return (
  
    <SafeAreaView style={styles.container}>
        <PageTitle title='Profile' />

        <View style={styles.container1}>
        {selectedImage ? (
          <>
            <TouchableOpacity onPress={pickImage} style={styles.changeImage}>
                <Ionicons name="camera-outline" size={24} color="#fff" />
                <Text style={styles.changeImageText}>Change Image</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={clearImage}>
                <Image source={{ uri: selectedImage }} style={styles.image} />
            </TouchableOpacity>
          </>
          ) : (
            <TouchableOpacity onPress={pickImage} style={styles.addImage}>
              <Ionicons name="add-outline" size={24} color="#fff" />
              <Text style={styles.addImageText}>Add Image</Text>
            </TouchableOpacity>
          )
        } 
      </View>
        <ScrollView>
            <TextInputwithLabel label='Name' placeholder='Enter your Username' textinputprops={{ secureTextEntry: false}} onChangeText= {handleNameChange} />
            <TextInputwithLabel label='Email' keyboardType="email-address" placeholder='Enter your Email' textinputprops={{ secureTextEntry: false}} onChangeText= {handleEmailChange} />
            <TextInputwithLabel label="Phone Number" keyboardType="numeric" placeholder='Enter your Phone Number' textinputprops={{ secureTextEntry: false }} onChangeText= {handlePhoneNumberChange} />
            <TextInputwithLabel label="Date of Birth" placeholder='YYYY-MM-DD' textinputprops={{ secureTextEntry: false }} onChangeText= {handleDoBChange} />
            <GenderCheckBox selectedGender={contactInfoData.gender} onGenderSelect={handleGenderSelect} />

            <FormTitle title="Profession Details" />
            <TextInputwithLabel label="Address" placeholder='Enter your Clinic Address' textinputprops={{ secureTextEntry: false }} onChangeText= {handleAddressChange} />
            <TextInputwithLabel label="Working Hours" placeholder='Enter your Working Hours' textinputprops={{ secureTextEntry: false }} onChangeText= {handleWorkingHoursChange} />

            <FormTitle title="Education" />
            <TextInputwithLabel label="Major" placeholder='Enter your Major' textinputprops={{ secureTextEntry: false }} onChangeText= {handleMajorChange} />
            <TextInputwithLabel label="Certificates" placeholder='List your Certificates' textinputprops={{ secureTextEntry: false }} onChangeText= {handleCertificatesChange} />
            <TextInputwithLabel label="Expertise" placeholder='List your Expertise' textinputprops={{ secureTextEntry: false }} onChangeText= {handleExpertiseChange} />

        </ScrollView>

        <TwoCustomButton containerStyle={{ alignSelf: 'center'}} buttonprops2={{ title: "Cancel", onPress: handleCancelPress }} buttonprops1={{ title: "Save", onPress: handleSavePress  }} />

    </SafeAreaView>
  );
};

export default EditProfile;