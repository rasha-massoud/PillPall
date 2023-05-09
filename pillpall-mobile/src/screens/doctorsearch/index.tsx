import React, { FC, useState } from 'react';
import { SafeAreaView, Image, FlatList, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import axios from 'axios';
import { View } from 'react-native';
import NavBar from '../../components/NavBar';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import CustomButton from '../../components/CustomButton';
import API_URL from '../../constants/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import { useDispatch, useSelector } from "react-redux";
import { colors } from '../../constants/palette';
import styles from './styles';
import Body1Text from '../../components/Body1Text';
import SubTitleText from '../../components/SubTitleText';

interface Patient {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
    patients_info: {
        id: number;
        address: string;
        created_at: string;
        dob: string;
        gender: string;
        image: string;
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

    const navigation = useNavigation();

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

        if (response.data.patient) {
            const patient = response.data.patient;
            const patientData: Patient = {
                id: patient.id,
                name: patient.name,
                email: patient.email,
                role: patient.role,
                created_at: patient.created_at,
                patients_info: {
                    id: patient.patients_info.id,
                    address: patient.patients_info.address,
                    created_at: patient.patients_info.created_at,
                    dob: patient.patients_info.dob,
                    gender: patient.patients_info.gender,
                    image: patient.patients_info.image,
                    phone_number: patient.patients_info.phone_number,
                    blood_type: patient.patients_info.blood_type,
                    height: patient.patients_info.height,
                    weight: patient.patients_info.weight,
                    emergency_name: patient.patients_info.emergency_name,
                    emergency_number: patient.patients_info.emergency_number,
                    emergency_email: patient.patients_info.emergency_email,
                    emergency_contact_relation: patient.patients_info.emergency_contact_relation,
                    body_temperature: patient.patients_info.body_temperature,
                    pulse_rate: patient.patients_info.pulse_rate,
                    respiration_rate: patient.patients_info.respiration_rate,
                    systolic_blood_pressure: patient.patients_info.systolic_blood_pressure,
                    chronic_conditions: patient.patients_info.chronic_conditions,
                    past_surgeries: patient.patients_info.past_surgeries,
                    family_medical_history: patient.patients_info.family_medical_history,
                    allergies: patient.patients_info.allergies,
                    life_style_habits: patient.patients_info.life_style_habits,
                    medications: patient.patients_info.medications,
                },
            };
            setPatientData([patientData]);
        }
        } catch (error) {
            setErrorMessage('An error occurred while searching.');
        } finally {
            setIsLoading(false);
        }

    };
    
    const handleReportPress = (patientId: number) => {
        navigation.navigate('PatientReport' as never, { patientId } as never);
    };

    const handleResultPress = (patientId: number) => {
        navigation.navigate('PatientResult' as never, { patientId } as never);
    };
    
    return (
        <SafeAreaView style={styles.container}>
            <NavBar title="Patient Search" />
            <Image source={require('../../../assets/search3.jpg')} style={styles.image} />
    
            <Text style={styles.details}>To ensure security and privacy, only approved doctors have the privilege to utilize this particular feature. Furthermore, they can only view the data of the patients who are directly connected to them.</Text>
            <TextInputwithLabel
                label="Name"
                placeholder="Enter the Connected Patient's Name"
                textinputprops={{ secureTextEntry: false }}
                onChangeText={handleNameChange}
            />
            <CustomButton containerStyle={{ alignSelf: 'center', marginTop: 35 }} buttonprops={{ title: "Search", onPress: handleSearchPress }} />
    
            {isLoading ? (
                <Text style={{ alignSelf: 'center', marginVertical: 20 }}>Loading...</Text>
            ) : (
                <>
                    {patientData.length === 0 ? (
                        <Text style={{ alignSelf: 'center', marginVertical: 20 }}>No connected patient found.</Text>
                    ) : (
                        <FlatList
                            data={patientData}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.card}>
                                    <Image source={{ uri: `http://192.168.0.100:8000/storage/${item.patients_info.image}` }} style={styles.img} />
                                    <View style={styles.data}>
                                        <Text>{item.name}</Text>
                                        <Text>{item.email}</Text>
                                        <Text>{item.patients_info.address}</Text>
                                        <Text>{item.patients_info.phone_number}</Text>
                                        <View style={styles.buttons}>
                                            <TouchableOpacity onPress={() => handleReportPress(item.id)}>
                                                <Text style={styles.btnText}> Report</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => handleResultPress(item.id)}>
                                                <Text style={styles.btnText}> Result</Text>
                                            </TouchableOpacity>
                                        </View>
                                    
                                    </View>
                              </View>
                            )}
                        />
                    )}
                </>
            )}
        </SafeAreaView>
    );
    
};

export default DoctorSearch;
