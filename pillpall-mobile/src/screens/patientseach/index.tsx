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

export type SearchByOption = 'name' | 'major';

interface Doctor {
    id: number;
    name: string;
    email: string;
    role: string;
    doctors_info: {
        major: string;
    }
}

const PatientSearch: FC = () => {
    const [searchFor, setSearchFor] = useState('');
    const [searchBy, setSearchBy] = useState<SearchByOption | null>(null);
    const [doctorsData, setDoctorsData] = useState<Doctor[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSearchForChange = (text: string) => {
        setSearchFor(text);
    };

    const handleSearchPress = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post('/api/search_for_doctor', {
                search_by: searchBy,
                search_for: searchFor,
            });
            setDoctorsData(response.data.doctors);
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
                            <Text>Name: {item.name}</Text>
                            <Text>Email: {item.email}</Text>
                            <Text>Role: {item.role}</Text>
                            <Text>Major: {item.doctors_info.major}</Text>
                        </Card>
                    )}
                />
            )}
        </SafeAreaView>
    );
};

export default PatientSearch;
