import React, { FC, useState } from 'react'
import { SafeAreaView, Alert, Image } from 'react-native';
import NavBar1 from '../../components/NavBar1';
import axios from 'axios';
import TwoCustomButton from '../../components/TwoCustomButton';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../../constants/url';

import styles from './styles';

const AddFileNumber: FC = () => {
  
    const navigation = useNavigation();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [doctorName, setDoctorName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [fileNumber, setFileNumber] = useState<string>('');

    const handleDoctorNameChange = (value: string) => {
        setDoctorName(value);
    }

    const handleAddressChange = (value: string) => {
        setAddress(value);
    }

    const handleFileNumberChange = (value: string) => {
        setFileNumber(value);
    }

    const handleAddPress = async () => {
        if (!doctorName && !address && !fileNumber){
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
        data.append('doctor_name ', doctorName);
        data.append('address', address);
        data.append('file_number', fileNumber);

        const token = await AsyncStorage.getItem('token');
        
        const endpoint = 'med/add_file_number';
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
                    'The file number is successfully added.',
                    [
                        { 
                            text: 'OK',
                            onPress: () => {
                                navigation.navigate("FileNum" as never, {} as never);
                            },
                        }
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
            console.error('An error occurred while adding the file number');
        });
        setIsLoading(false);

    };

    const handleBackPress = () => {
        navigation.navigate("FileNum" as never, {} as never);
    }

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
                        navigation.navigate("FileNum" as never, {} as never);
                    },
                },
            ]
        ); 
    };

    return (
    
        <SafeAreaView style={styles.container}>
            <NavBar1
                title="Add File Number"
                image1={{ source: require('../../../assets/back.png'), onPress: handleBackPress }}
            />
            <Image
                source={require('../../../assets/filenumberscreen.png')}
                style={styles.image}
            />

            <TextInputwithLabel label="Doctor's Name" placeholder="Enter your Doctor's Name" textinputprops={{ secureTextEntry: false}} onChangeText= {handleDoctorNameChange} />
            <TextInputwithLabel label='Address' placeholder="Enter the Doctor's Address" textinputprops={{ secureTextEntry: false}} onChangeText= {handleAddressChange} />
            <TextInputwithLabel label='File Number' keyboardType="numeric" placeholder='Enter the File Number' textinputprops={{ secureTextEntry: false}} onChangeText= {handleFileNumberChange} />

            <TwoCustomButton containerStyle={{ alignSelf: 'center'}} buttonprops2={{ title: "Cancel", onPress: handleCancelPress }} buttonprops1={{ title: "Add", onPress: handleAddPress  }}></TwoCustomButton>

        </SafeAreaView>
    );
};

export default AddFileNumber;