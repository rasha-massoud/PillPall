import React, { FC, useState } from 'react';
import { SafeAreaView, Image, FlatList } from 'react-native';
import { Text } from 'react-native-elements';
import axios from 'axios';
import { Card } from '@rneui/base';
import NavBar from '../../components/NavBar';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import CustomButton from '../../components/CustomButton';
import API_URL from '../../constants/url';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles';

interface Patient {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
    patients_info: {
        id: number;
        address: string;
        certificates: string;
        created_at: string;
        dob: string;
        expertise: string;
        gender: string;
        image: string;
        major: string;
        phone_number: string;
        blood_type: string;
        height: string;
        weight: string;
        emergency_name: string;
        emergency_number: string;
        emergency_email: string;
        emergency_contact_relation: string;
        body_temperature: string;
        pulse_rate: string;
        respiration_rate: string;
        systolic_blood_pressure: string;
        chronic_conditions: string;
        past_surgeries: string;
        family_medical_history: string;
        allergies: string;
        life_style_habits: string;
        medications: string;
    };
}

const DoctorSearch: FC = () => {

    const [name, setName] = useState('');
    const [patientData, setPatientData] = useState<Patient[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleNameChange = (value: string) => {
        setName(value);
    };

    const handleSearchPress = async () => {
        try {

            const token = await AsyncStorage.getItem('token');
      
            const data = new FormData();
            data.append('name', name);

            const endpoint = 'doctor/search';
            setIsLoading(true);
        
            const response = await axios.post(`${API_URL}${endpoint}`, data, {
              headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
              },
            });
            console.log(response.data);
            // if (Array.isArray(response.data.patients) && response.data.patients.length > 0) {
            //     setPatientData(response.data.patients.map((patient: any) => ({
            //       id: patient.id,
            //       name: patient.name,
            //       email: patient.email,
            //       role: patient.role,
            //       created_at: patient.created_at,
            //       patients_info: {
            //           id: patient.patients_info.id,
            //           address: patient.patients_info.address,
            //           certificates: patient.doctors_info.certificates,
            //           created_at: patient.patients_info.created_at,
            //           dob: patient.patients_info.dob,
            //           expertise: patient.patients_info.expertise,
            //           gender: patient.patients_info.gender,
            //           image: patient.patients_info.image,
            //           major: patient.patients_info.major,
            //           phone_number: patient.patients_info.phone_number,
            //       },
            //   })));
            // } else {
            //       setErrorMessage('No patient with the name provided.');
            // }

        } catch (error) {
            setErrorMessage('An error occurred while searching.');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <SafeAreaView style={styles.container}>
            <NavBar title="Patient Search" />
            <Image source={require('../../../assets/doctorsearchscreen.png')} style={styles.image} />
   
            <TextInputwithLabel
                label="Name"
                placeholder="Enter the Doctor's Name or the Major based on your Search by Selection"
                textinputprops={{ secureTextEntry: false }}
                onChangeText={handleNameChange}
            />
            <CustomButton containerStyle={{ alignSelf: 'center' }} buttonprops={{ title: "Search", onPress: handleSearchPress }} />

            {isLoading ? (
                <Text style={{ alignSelf: 'center', marginVertical: 20 }}>Loading...</Text>
            ) : errorMessage ? (
                <Text style={{ alignSelf: 'center', marginVertical: 20, color: 'red' }}>{errorMessage}</Text>
            ) : patientData.length === 0 ? (
                <Text style={{ alignSelf: 'center', marginVertical: 20 }}>No doctors found.</Text>
            ) : (
                <FlatList
                    data={patientData}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Card>
                            <Text>Email: {item.email}</Text>
                        </Card>
                    )}
                />
            )}
        </SafeAreaView>
    );
};

export default DoctorSearch;
