import React, { FC, useEffect, useState } from 'react';
import { View, Alert, SafeAreaView, FlatList, Linking, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import NavBar from '../../components/NavBar';
import MedicalResultCard from '../../components/MedicalResultCard';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../../constants/url';

import styles from './styles';

interface PatientReportProps {
    route: {
        params: {
          patientId: number;
        };
    };
  }

interface PatientResultData {
    id: number;
    name: string;
    type: string;
    uri: string;
    testing_date: string;
    description: string;
    file_name: string;
}

const PatientResult: FC<PatientReportProps> = ({route}) => {

    const { patientId } = route.params;

    const navigation = useNavigation();

    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSuccess, setIsSuccess] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
        
            const token = await AsyncStorage.getItem('token');
        
            const endpoint = 'doctor/get_patient_results';
        
            await axios
                .get(`${API_URL}${endpoint}/${patientId}`, {
                    headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                    },
                })
                .then((response) => {
                    setIsLoading(false);
                    if (response.data.status === 'success') {
                        const formattedResults = response.data.results.map((result: PatientResultData) => ({
                            ...result,
                            uri: `http://192.168.0.100:8000/storage/storage/images/${result.file_name}`,
                        }));
                        setResults(formattedResults);
                        setIsSuccess(true);
                    } else {
                        setIsSuccess(false);
                        setIsLoading(false);
                        Alert.alert(
                            'Failure',
                            'Request Fails.',
                            [{ text: 'OK' }],
                            { cancelable: false }
                        );
                    }
                })
                .catch((error) => {
                    console.error('An error occurred while getting the medical results');
                });
            };
        
            fetchData();
        }, []);

    const handleOpenFile = (uri: string) => {
        Linking.canOpenURL(uri)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(uri);
                } else {
                    console.error('Cannot open URL:', uri);
                }
            })
            .catch((error) => {
                console.error('An error occurred while opening the file:', error);
            });
    };

    const renderItem = ({ item }: { item: PatientResultData }) => (
        <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => handleOpenFile(item.uri)}
        >
            <View>
            <Text style={styles.testingDate}>{item.testing_date}</Text>
            <Text style={styles.description}>{item.description}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <NavBar title="Medical Results"/>

            {isLoading ? (
                <Text>Loading...</Text>
            ) : isSuccess && results.length > 0 ? (
                <FlatList style={styles.flatList}
                    data={results}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            ) : (
                <View style={styles.empty}>
                    <Text>This user has no posted results</Text>
                </View>
            )}
        </SafeAreaView>

    );
};

export default PatientResult;
