import React, { FC, useState } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import NavBar from '../../components/NavBar';
import axios from 'axios';
import TwoCustomButton from '../../components/TwoCustomButton';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import AddImage from '../../components/AddImage';

import styles from './styles';

const AddMedicalResult: FC = () => {
  
    const handleTestingDateChange = () => {

    }

    const handleFileNameChange = () => {

    }

    const handleDescriptionChange = () => {

    }

    const handleAddPress = () => {

    };

    const handleCancelPress = () => {
  
    };

    return (
    
        <SafeAreaView style={styles.container}>
            <NavBar
                title="Add Medical Results"
            />

            <AddImage/>

            <TextInputwithLabel label='Testing Date' placeholder="YYYY-MM-DD" textinputprops={{ secureTextEntry: false}} onChangeText= {handleTestingDateChange} />
            <TextInputwithLabel label='File Name' placeholder='Enter the File Name' textinputprops={{ secureTextEntry: false}} onChangeText= {handleFileNameChange} />
            <TextInputwithLabel label='Description' placeholder='Enter Description' textinputprops={{ secureTextEntry: false}} onChangeText= {handleDescriptionChange} />

            <TwoCustomButton containerStyle={{ alignSelf: 'center'}} buttonprops2={{ title: "Cancel", onPress: handleCancelPress }} buttonprops1={{ title: "Add", onPress: handleAddPress  }}></TwoCustomButton>

        </SafeAreaView>
    );
};

export default AddMedicalResult;