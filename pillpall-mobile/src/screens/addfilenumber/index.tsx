import React, { FC, useState } from 'react'
import { SafeAreaView, Alert, Image } from 'react-native';
import NavBar1 from '../../components/NavBar1';
import axios from 'axios';
import TwoCustomButton from '../../components/TwoCustomButton';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import { useNavigation } from '@react-navigation/core';

import styles from './styles';

const AddFileNumber: FC = () => {
  
    const navigation = useNavigation();

    const handleDoctorNameChange = () => {

    }

    const handleLocationChange = () => {

    }

    const handleFileNumberChange = () => {

    }

    const handleAddPress = () => {

    };

    const handleBackPress = () => {
        navigation.navigate("PatientSearch" as never, {} as never);
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
            <TextInputwithLabel label='Location' placeholder="Enter the Doctor's Location" textinputprops={{ secureTextEntry: false}} onChangeText= {handleLocationChange} />
            <TextInputwithLabel label='File Number' keyboardType="numeric" placeholder='Enter the File Number' textinputprops={{ secureTextEntry: false}} onChangeText= {handleFileNumberChange} />

            <TwoCustomButton containerStyle={{ alignSelf: 'center'}} buttonprops2={{ title: "Cancel", onPress: handleCancelPress }} buttonprops1={{ title: "Add", onPress: handleAddPress  }}></TwoCustomButton>

        </SafeAreaView>
    );
};

export default AddFileNumber;