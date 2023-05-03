import React, { FC, useState } from 'react';
import { SafeAreaView, Image, FlatList } from 'react-native';
import { Text } from 'react-native-elements';
import axios from 'axios';
import { Card } from '@rneui/base';

import NavBar from '../../components/NavBar';
import QuestionTypeSelector from '../../components/QuestionTypeSelector';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import SearchBySelector from '../../components/SearchBySelector'; 
import CustomButton from '../../components/CustomButton';

import styles from './styles';

interface Patient {
    id: number;
    email: string;
}

const DoctorSearch: FC = () => {

    const [name, setName] = useState('');
    const [patientData, setPatientData] = useState<Patient[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleNameChange = (value: string) => {

    };

    const handleSearchPress = async () => {
        try {
            setIsLoading(true);
            
            // setPatientData(response.data.doctors);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('An error occurred while searching.');
            console.log(error);
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
