import React, { FC, useState } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import NavBar from '../../components/NavBar';
import axios from 'axios';
import TwoCustomButton from '../../components/TwoCustomButton';
import TextInputwithLabel from '../../components/TextInputwithLabel';

import styles from './styles';
const AddFileNumber: FC = () => {
  
    const handleDoctorNameChange = () => {

    }

    const handleLocationChange = () => {

    }

    const handleFileNumberChange = () => {

    }

    const handleAddPress = () => {

    };

    const handleCancelPress = () => {
  
    };

    return (
    
        <SafeAreaView style={styles.container}>
            <NavBar
                title="Add File Number"
            />
            <Image
                source={require('../../../assets/filenumberscreen.png')}
                style={styles.image}
            />

            <TextInputwithLabel label="Doctor's Name" placeholder="Enter your Doctor's Name" textinputprops={{ secureTextEntry: false}} onChangeText= {handleDoctorNameChange} />
            <TextInputwithLabel label='Location' placeholder="Enter the Doctor's Location" textinputprops={{ secureTextEntry: false}} onChangeText= {handleLocationChange} />
            <TextInputwithLabel label='File Number' keyboardType="numeric" placeholder='Enter the File Number' textinputprops={{ secureTextEntry: false}} onChangeText= {handleFileNumberChange} />

            <TwoCustomButton containerStyle={{ alignSelf: 'center'}} buttonprops2={{ title: "Cancel", onPress: handleCancelPress }} buttonprops1={{ title: "Add", onPress: handleAddPress  }}></TwoCustomButton>

        </SafeAreaView>
    );
};

export default AddFileNumber;