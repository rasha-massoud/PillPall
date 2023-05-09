import React, { FC, useEffect, useState } from 'react';
import { Alert, SafeAreaView, Text, View, FlatList } from 'react-native';
import axios from 'axios';
import NavBar1 from '../../components/NavBar1';
import CustomButton from '../../components/CustomButton';
import API_URL from '../../constants/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import { colors } from '../../constants/palette';
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn } from "../../store/slices/reportSlice";

import styles from './styles';

type Patient = {
    id: number;
    name: string;
    email: string;
};

const Patients: FC = () => {

    const dispatch = useDispatch();

    const navigation = useNavigation();
    const [allPatients, setAllPatients] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSuccess, setIsSuccess] = useState<boolean>(true);

    const handleLogoutPress = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const endpoint = 'logout';
            
            const headers = {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            };
            
            await axios.post(`${API_URL}${endpoint}`, {}, { headers })
            .then(async (response) => {
                await AsyncStorage.clear();            
                    if (response.data.status === 'success') {
                        dispatch(setIsLoggedIn('0'));
                        Alert.alert(
                        'Bye bye Admin',
                        'Wishing you good health and safety!',
                        [
                            {
                                text: 'Accept',
                                onPress: () => {
                                    navigation.navigate('Login' as never, {} as never);
                                },
                            },
                        ]
                        );
                    }
            })
            .catch((error) => {
                console.error('An error occurred during logout');
            });
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        const fetchData = async () => {
        const token = await AsyncStorage.getItem('token');
    
        const endpoint = 'admin/get_patients';
    
        await axios.get(`${API_URL}${endpoint}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Content-Type': "multipart/form-data",
            },
        })
        .then((response) => {
            console.log(response.data);
            // setAllPatients(response.data.file_numbers);
            setIsLoading(false);
            if (response.data.status !== "success"){
                setIsSuccess(true);
                setIsLoading(true);
                Alert.alert(
                    'Failure',
                    'Request Fails.',
                    [
                        { text: 'OK' }
                    ],
                    { cancelable: false }
                );
            }
        })
        .catch((error) => {
            console.error('An error occurred while getting all patients');
        });
        };
  
        fetchData();
    }, []);
  

  return (
    <SafeAreaView style={styles.container}>
        <NavBar1
            title="All Patients"
            image1={{ source: require('../../../assets/logout.png'), onPress: handleLogoutPress }}
        />
  
        {allPatients.length === 0 && isSuccess && (
            <View style={styles.noDataContainer}>
                <View>
                    <Text style={styles.noDataText}>No Patients yet.</Text>
                </View>
            </View>
        )}
  
        {allPatients.length !== 0 && isSuccess && (
            //Display the data is flatList
        )}
  
  
    </SafeAreaView>
  );
};
        
export default Patients;
        