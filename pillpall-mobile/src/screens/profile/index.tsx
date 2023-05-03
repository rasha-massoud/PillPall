import React, { FC, useState, useEffect } from 'react'
import { SafeAreaView, View, Text, Image , TouchableOpacity, ScrollView} from 'react-native';
import CustomButton from '../../components/CustomButton';
import Body1Text from '../../components/Body1Text';
import axios from 'axios';
import DisplayData from '../../components/DisplayData';
import appStyles from '../../constants/appStyles';
import { useNavigation } from '@react-navigation/native';
import API_URL from '../../constants/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PageTitle from '../../components/PageTitle';

import styles from './styles';

interface Doctor {
    name: string;
    email: string;
    updated_at: Date;
    doctors_info: {
        phone_number: string;
        dob: string;
        address: string;
        gender: string;
        working_hours: string,
        major: string,
        certificates: string,
        expertise: string,
    }
}

const Profile: React.FC = () => {

    // const navigation = useNavigation();
    const [allResult, setAllResult] = useState<any>();
    const [result, setResult] = useState<Doctor>();
    
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const getData = async () => {
        const token = await AsyncStorage.getItem('token');
        setLoading(true);
        try {
            const endpoint = 'doctor/get_report';   //Create it 
            const response = await axios.get<{ user: Doctor }>(
            `${API_URL}${endpoint}`,
            {
                headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                },
            }
            );
            setAllResult(response.data);
            setResult(response.data.user);
        } catch (error) {
            console.error('An error occurred while getting the report');
        } finally {
            setLoading(false);
        }
        };
        getData();
    }, []);

    const handleEditPress = () => {
        //Navigate to Edit Screen
    }

    if (loading) {
        return (
        <View>
            <Text>Loading...</Text>
        </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.top}>
                <View style={styles.topLeft}>
                <PageTitle title='PILL PALL' />
                </View>
                <View style={styles.topRight}>
                <Image
                    source={require('../../../assets/logo.png')}
                    style={styles.image}
                />
                </View>
            </View>

            {result && allResult.status === 'success' ? (

            <View>
                <ScrollView>
                <Body1Text context="It has been brought to our attention that the doctor’s contact information listed on the “PillPall” platform have been provided through a verified source. Any unauthorized access or misuse of this information will be monitored and dealt with in accordance with applicable laws and regulations." />
            
                <TouchableOpacity onPress={handleEditPress}> 
                        <Text style={styles.editText}>**Press me to Edit**</Text>
                </TouchableOpacity>

                <View>
                    <DisplayData title='Name' value={result.name} />
                    <DisplayData title='Email' value={result.email} />
                    <DisplayData title='Phone Number' value={result.doctors_info.phone_number} />
                    <DisplayData title='Date of Birth' value={result.doctors_info.dob} />
                    <DisplayData title='Gender' value={result.doctors_info.gender} />
                </View>
            
                <View>
                    <DisplayData title='Blood Type' value={result.doctors_info.address} />
                    <DisplayData title='Height' value={`${result.doctors_info.working_hours} cm`} />
                </View>
            
                <View>
                    <DisplayData
                    title='Emergency Contact Name'
                    value={result.doctors_info.major}
                    />
                    <DisplayData
                    title='Emergency Contact Number'
                    value={result.doctors_info.certificates}
                    />
                    <DisplayData
                    title='Emergency Contact Email'
                    value={result.doctors_info.expertise}
                    />
                    </View>
                <CustomButton containerStyle={{ alignSelf: 'center', marginTop: 40 }} buttonprops={{ title: "Edit", onPress: () => console.log('Edit') }}  />
                </ScrollView>  
            </View>
            ) : (
                <View style={appStyles.body1}>
                    <Body1Text context="It has been brought to our attention that the doctor’s contact information listed on the “PillPall” platform have been provided through a verified source. Any unauthorized access or misuse of this information will be monitored and dealt with in accordance with applicable laws and regulations." />

                    <Body1Text context='No report.' />
                </View>
            )}
        </SafeAreaView>
    );
};

export default Profile;