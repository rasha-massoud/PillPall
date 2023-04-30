import React, { FC, useState } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import NavBar from '../../components/NavBar';
import axios from 'axios';
import TwoCustomButton from '../../components/TwoCustomButton';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import AddDocument from '../../components/AddDocument';

import styles from './styles';

const AddMedicalResult: FC = () => {
      
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
  
    };


    const handleDocumentSelected = (document: File) => {
      setFile(document);
    };

    return (
    
        <SafeAreaView style={styles.container}>
            <NavBar
                title="Add Medical Results"
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