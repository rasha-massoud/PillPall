import React, { FC, useState, useEffect } from 'react'
import { SafeAreaView, Image } from 'react-native';
import NavBar from '../../components/NavBar';
import axios from 'axios';
import QuestionTypeSelector from '../../components/QuestionTypeSelector';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import SearchBySelector from '../../components/SearchBySelector'; 
import CustomButton from '../../components/CustomButton';

import styles from './styles';

export type SearchByOption = 'name' | 'major';

const PatientSearch: FC = () => {

    const [searchFor, setSearchFor] = useState('');
    const [searchBy, setSearchBy] = useState<SearchByOption | null>(null);

    const handleSearchForChange = (text: string) => {
        setSearchFor(text);
    };

    const handleSearchPress = () => {
    };
    

    return (
  
        <SafeAreaView style={styles.container}>
            <NavBar
                title="Patient Search"
            />
            <Image
                source={require('../../../assets/searchdoctorscreen.png')}
                style={styles.image}
            />

            <SearchBySelector
                searchByOptions={['name', 'major']}
                selectedSearchBy={searchBy}
                onSelectSearchBy={setSearchBy}
            />
            <TextInputwithLabel label="Search For" placeholder="Enter the Doctor's Name or the Major based on your Search by Selection" textinputprops={{ secureTextEntry: false }} onChangeText={handleSearchForChange}/>
            <CustomButton containerStyle={{ alignSelf: 'center' }} buttonprops={{ title: "Search", onPress: handleSearchPress }}  />

        </SafeAreaView>
    );
};

export default PatientSearch;
