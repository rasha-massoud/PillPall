import React, { FC, useState, useEffect } from 'react'
import { SafeAreaView, Image } from 'react-native';
import NavBar from '../../components/NavBar';
import axios from 'axios';
import QuestionTypeSelector from '../../components/QuestionTypeSelector';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import DisplayData from '../../components/DisplayData';
import CustomButton from '../../components/CustomButton';

import styles from './styles';

const PatientSearch: FC = () => {

    const [searchFor, setSearchFor] = useState('');
    const [searchBy, setSearchBy] = useState('');

    const handleSearchForChange = (text: string) => {
        setSearchFor(text);
    };

    const handleSearchByChange = (text: string) => {
        setSearchBy(text);
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

            <TextInputwithLabel label="Search For" placeholder="Enter the Doctor's Name or the Major based on your Search by Selection" textinputprops={{ secureTextEntry: false }} onChangeText={handleSearchForChange}/>
            <CustomButton containerStyle={{ alignSelf: 'center' }} buttonprops={{ title: "Send", onPress: handleSendPress }}  />

        </SafeAreaView>
    );
};

export default PatientSearch;
