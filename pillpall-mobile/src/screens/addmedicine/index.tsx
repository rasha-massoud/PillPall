import React, { FC, useState } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import NavBar1 from '../../components/NavBar1';
import axios from 'axios';
import styles from './styles';
import AddImage from '../../components/AddImage';
import TextInputwithLabel from '../../components/TextInputwithLabel';

const AddMedicine: FC = () => {
   
    const handleDeleteMedPress = () => {
        // navigate to Delete Medicine Screen
    }

    const handleMedicineNameChange = () => {

    }

    const handleDoseQuantityChange = () => {

    }

    const handleMedicinePriceChange = () => {

    }

    const handleInstructionsChange = () => {

    }

    const handleSelectDate = async (date: string) => {
         
        const token = localStorage.getItem('token');

        // await axios.post('http://192.168.0.103:8000/api/v0.0.0/get_medications', data, {
        //     headers: {
        //         'Content-Type': "multipart/form-data",
        //         'Accept': 'application/json',
        //         'Authorization': `Bearer ${token}`,
        //     },
        // })
        // .then((response) => {
        //     console.log(response.data);
        // })
        // .catch((error) => {
        //     console.error('An error occurred when getting the medications');
        // });

    };

    return (
    
        <SafeAreaView style={styles.container}>
            <NavBar1
                title="Medication Schedule"
                image1={{ source: require('../../../assets/deletemed.png'), onPress: handleDeleteMedPress }}
            />
            <AddImage></AddImage>
            <TextInputwithLabel label='Name' placeholder='Enter the Medicine Name' textinputprops={{ secureTextEntry: false}} onChangeText= {handleMedicineNameChange} />
            <TextInputwithLabel label='Dose Quantity' placeholder='Enter the Intake Dose Quantity as prescribed' textinputprops={{ secureTextEntry: false}} onChangeText= {handleDoseQuantityChange} />
            <TextInputwithLabel label='Price per month (in $)' placeholder='Enter the Medicine Price per month' textinputprops={{ secureTextEntry: false}} onChangeText= {handleMedicinePriceChange} />
            <TextInputwithLabel label='Instructions' placeholder='Enter the Medicine Intake Instructions' textinputprops={{ secureTextEntry: false}} onChangeText= {handleInstructionsChange} />


        </SafeAreaView>
    );
};

export default AddMedicine;