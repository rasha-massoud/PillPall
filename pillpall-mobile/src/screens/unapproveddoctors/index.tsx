import React, { FC, useEffect, useState } from 'react';
import { Alert, SafeAreaView, Text, View, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import NavBar1 from '../../components/NavBar1';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import API_URL from '../../constants/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn } from "../../store/slices/reportSlice";
import SubTitleText from '../../components/SubTitleText';
import { colors } from '../../constants/palette';

import styles from './styles';

type Doctor = {
    id: number;
    name: string;
    email: string;
    onApprove: () => void;
};
  
const ApprovedDoctors: FC = () => {

    const dispatch = useDispatch();

    const navigation = useNavigation();
    const [unapprovedDoctors, setUnapprovedDoctors] = useState<Doctor[]>([]);
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
        
            const endpoint = 'admin/get_unapproved_doctors';
        
            await axios.get(`${API_URL}${endpoint}`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': "multipart/form-data",
                },
            })
            .then((response) => {
                console.log(response.data);
                const unapprovedDoctorsData = response.data.user.map((doctor: Doctor) => ({
                    ...doctor,
                    onApprove: () => approveDoctor(doctor.id),
                }));
                
                setUnapprovedDoctors(unapprovedDoctorsData);
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
                console.error('An error occurred while getting unapproved doctors');
            });
        };
  
        fetchData();
    }, []);
  

    const approveDoctor = async (doctorId: number) => {
        try {
            const data = new FormData();
            data.append('doctor_id', doctorId.toString());

            const token = await AsyncStorage.getItem('token');
            const endpoint = "admin/approve";
        
            await axios.post(`${API_URL}${endpoint}`, data, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                console.log(response.data);
                if (response.data.status == "success"){
                    Alert.alert('Success', 'Doctor approved successfully');
                }
            })
        } catch (error) {
            console.error('An error occurred while approving the doctor');
        }
    };
      
    return (
        <SafeAreaView style={styles.container}>
            <NavBar1
                title="Unapproved Doctors"
                image1={{ source: require('../../../assets/logout.png'), onPress: handleLogoutPress }}
            />
            <SubTitleText title="Press on the card to view the report"/>

            {unapprovedDoctors.length === 0 && isSuccess && (
                <View style={styles.noDataContainer}>
                    <View>
                        <Text style={styles.noDataText}>No Unapproved Doctors.</Text>
                    </View>
                </View>
            )}
    
            {unapprovedDoctors.length !== 0 && isSuccess && (
                <FlatList
                    data={unapprovedDoctors}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                            navigation.navigate('UnapprovedDoctorReportByAdmin' as never, { doctorId: item.id } as never);
                            }}
                        >
                            <View style={styles.card}>
                                <Text style={styles.nameText}>{item.name}</Text>
                                <Text style={styles.emailText}>{item.email}</Text>
                                <IconButton
                                    icon={() => <Icon name="check" size={30} color={colors.blue} />}
                                    onPress={item.onApprove}
                                />
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}
    
    
        </SafeAreaView>
    );
};
        
export default ApprovedDoctors;
        