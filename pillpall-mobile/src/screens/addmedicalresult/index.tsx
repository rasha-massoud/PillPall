import React, { FC, useState } from 'react'
import { SafeAreaView, Alert } from 'react-native';
import NavBar1 from '../../components/NavBar1';
import axios from 'axios';
import TwoCustomButton from '../../components/TwoCustomButton';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import AddDocument from '../../components/AddDocument';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../../constants/url';

import styles from './styles';

const AddMedicalResult: FC = () => {
      
    const navigation = useNavigation();

    const [file, setFile] = useState<File | null>(null);
    const [testingDate, setTestingDate] = useState('');
    const [fileName, setFileName] = useState('');
    const [description, setDescription] = useState('');

    const handleTestingDateChange = (value: string) => {
        setTestingDate(value);
    };

    const handleFileNameChange = (value: string) => {
        setFileName(value);
    };

    const handleDescriptionChange = (value: string) => {
        setDescription(value);
    };

    const handleAddPress = async () => {
        if (!file) {
            alert('Please select a file');
            return;
        }
        
        try {
            const data = new FormData();
            data.append('file', file);
            data.append('testing_date', testingDate);
            data.append('fileName', file);
            data.append('description', description);
        
            const token = await AsyncStorage.getItem('token');

            const endpoint= 'med/add_medical_result';
            await axios.post(`${API_URL}${endpoint}`, data, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': "multipart/form-data",
                },
            })
            .then((response) => {
                console.log(response.data);
                if(response.data.status == 'success'){
                    Alert.alert(
                        'Success',
                        'The medical result is successfully added.',
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
        } catch (error) {
            console.error(error);
        }
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
                        navigation.navigate("MedicalResults" as never, {} as never);
                    },
                },
            ]
        ); 
    };


    const handleDocumentSelected = (document: File) => {
        setFile(document);
    };

    const handleBackPress = () => {
        navigation.navigate("MedicalResults" as never, {} as never);
    }

    return (
    
        <SafeAreaView style={styles.container}>
            <NavBar1
                title="Add Medical Results"
                image1={{ source: require('../../../assets/back.png'), onPress: handleBackPress }}
            />

            <AddDocument onDocumentSelected={handleDocumentSelected} />

            <TextInputwithLabel label='Testing Date' placeholder="YYYY-MM-DD" textinputprops={{ secureTextEntry: false}} onChangeText= {handleTestingDateChange} />
            <TextInputwithLabel label='File Name' placeholder='Enter the File Name' textinputprops={{ secureTextEntry: false}} onChangeText= {handleFileNameChange} />
            <TextInputwithLabel label='Description' placeholder='Enter Description' textinputprops={{ secureTextEntry: false}} onChangeText= {handleDescriptionChange} />

            <TwoCustomButton containerStyle={{ alignSelf: 'center'}} buttonprops2={{ title: "Cancel", onPress: handleCancelPress }} buttonprops1={{ title: "Add", onPress: handleAddPress  }}></TwoCustomButton>

        </SafeAreaView>
    );
};

export default AddMedicalResult;