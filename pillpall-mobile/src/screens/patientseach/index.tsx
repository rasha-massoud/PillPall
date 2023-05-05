import React, { FC, useState } from 'react';
import { SafeAreaView, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Text } from 'react-native-elements';
import axios from 'axios';
import { Card } from '@rneui/base';
import { useNavigation } from '@react-navigation/core';
import NavBar3 from '../../components/NavBar3';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import SearchBySelector from '../../components/SearchBySelector'; 
import CustomButton from '../../components/CustomButton';
import API_URL from '../../constants/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DisplayData from '../../components/DisplayData';

import styles from './styles';

export type SearchByOption = 'name' | 'major';

interface Doctor {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
    doctors_info: {
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
    };
}
  
const PatientSearch: FC = () => {

    const navigation = useNavigation();

    const [searchFor, setSearchFor] = useState('');
    const [searchBy, setSearchBy] = useState<SearchByOption | null>(null);
    const [doctorsData, setDoctorsData] = useState<Doctor[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSearchForChange = (text: string) => {
        setSearchFor(text);
    };

    const handleFileNumberPress = () => {
        navigation.navigate("FileNum " as never, {} as never);
    }

    const handleResultPress = () => {
        navigation.navigate("MedicalResults " as never, {} as never);
    }

    const handleSearchDoctorPress = () => {}

    const handleSearchPress = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
      
          const data = new FormData();
          data.append('search_for', searchFor);
          if (searchBy !== null) {
            data.append('search_by', searchBy);
          }

          const endpoint = 'patient/search';
          setIsLoading(true);
      
          const response = await axios.post(`${API_URL}${endpoint}`, data, {
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log(response.data);
          if (Array.isArray(response.data.doctors) && response.data.doctors.length > 0) {
            setDoctorsData(response.data.doctors.map((doctor: any) => ({
                id: doctor.id,
                name: doctor.name,
                email: doctor.email,
                role: doctor.role,
                created_at: doctor.created_at,
                doctors_info: {
                    id: doctor.doctors_info.id,
                    address: doctor.doctors_info.address,
                    certificates: doctor.doctors_info.certificates,
                    created_at: doctor.doctors_info.created_at,
                    dob: doctor.doctors_info.dob,
                    expertise: doctor.doctors_info.expertise,
                    gender: doctor.doctors_info.gender,
                    image: doctor.doctors_info.image,
                    major: doctor.doctors_info.major,
                    phone_number: doctor.doctors_info.phone_number,
                },
            })));
          } else {
                setErrorMessage('No approved doctors found based on your selection.');
          }
        } catch (error) {
            setErrorMessage('An error occurred while searching.');
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
      
    const handleConnectPress = async (id: number) => {

        try {
            const token = await AsyncStorage.getItem('token');

            const endpoint = 'patient/connect';
            setIsLoading(true);
        
            const response = await axios.post(`${API_URL}${endpoint}`, { doctor_id: id }, {
                headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            if (response.data.status == 'success'){
                setIsLoading(false);
                Alert.alert(
                    'Success',
                    'Connected successfully.',
                    [
                        { 
                            text: 'OK',
                        }
                    ],
                    { cancelable: false }
                );
            }
            else{
                setIsLoading(false);
                Alert.alert(
                    'Failure',
                    'Coonection Fails.',
                    [
                        { 
                            text: 'OK',
                        }
                    ],
                    { cancelable: false }
                );
            }
        } 
        catch (error) {
            setErrorMessage('An error occurred while connecting.');
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <NavBar3
                title="Patient Search"
                image1={{ source: require('../../../assets/filenumber.png'), onPress: handleFileNumberPress }}
                image2={{ source: require('../../../assets/results.png'), onPress: handleResultPress }}
                image3={{ source: require('../../../assets/searchdoc.png'), onPress: handleSearchDoctorPress }}
            />
            <Image source={require('../../../assets/searchdoctorscreen.png')} style={styles.image} />
            <SearchBySelector
                searchByOptions={['name', 'major']}
                selectedSearchBy={searchBy}
                onSelectSearchBy={setSearchBy}
            />
            <TextInputwithLabel
                label="Search For"
                placeholder="Enter the Doctor's Name or the Major based on your Search by Selection"
                textinputprops={{ secureTextEntry: false }}
                onChangeText={handleSearchForChange}
            />
            <CustomButton containerStyle={{ alignSelf: 'center' }} buttonprops={{ title: "Search", onPress: handleSearchPress }} />

            {isLoading ? (
                <Text style={{ alignSelf: 'center', marginVertical: 20 }}>Loading...</Text>
            ) : errorMessage ? (
                <Text style={{ alignSelf: 'center', marginVertical: 20, color: 'red' }}>{errorMessage}</Text>
            ) : doctorsData.length === 0 ? (
                <Text style={{ alignSelf: 'center', marginVertical: 20 }}>No doctors found.</Text>
            ) : (
                <FlatList
                    data={doctorsData}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Card>
                            <DisplayData title='Name' value={item.name} />
                            <DisplayData title='Email' value={item.email} />
                            <DisplayData title='Role' value={item.role} />
                            <DisplayData title='Major' value={item.doctors_info.major} />
                        
                            <TouchableOpacity onPress={() => handleConnectPress(item.id)}> 
                                <Text style={styles.editText}>**Press me to Connect**</Text>
                            </TouchableOpacity>
                        </Card>
                    )}
                />
            )}
        </SafeAreaView>

    );
};

export default PatientSearch;
