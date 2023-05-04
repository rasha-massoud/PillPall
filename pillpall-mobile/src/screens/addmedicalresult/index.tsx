import React, { FC, useState } from 'react'
import { SafeAreaView, Alert } from 'react-native';
import NavBar1 from '../../components/NavBar1';
import axios from 'axios';
import TwoCustomButton from '../../components/TwoCustomButton';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import AddDocument from '../../components/AddDocument';
import { useNavigation } from '@react-navigation/core';

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
            const formData = new FormData();
            formData.append('file', file);
            formData.append('testingDate', testingDate);
            formData.append('fileName', fileName);
            formData.append('description', description);
        
            // const response = await axios.post('https://example.com/api/add-medical-result', formData);
        
            // console.log(response.data);
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