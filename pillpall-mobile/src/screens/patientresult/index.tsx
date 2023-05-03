import React, { FC, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import axios from 'axios';
import NavBar from '../../components/NavBar';
import MedicalResultCard from '../../components/MedicalResultCard';

import styles from './styles';

interface PatientResultData {
    id: number;
    name: string;
    type: string;
    uri: string;
    testingDate: string;
    description: string;
}

const PatientResult: FC = () => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        // axios
        //   .get('*******************************************')
        //   .then(response => {
        //     setResults(response.data.results);
        //   })
        //   .catch(error => {
        //     console.error(error);
        //   });
    }, []);

    const renderItem = ({ item }: { item: PatientResultData }) => (
        <MedicalResultCard
        file={item}
        testingDate="April 30, 2023"
        fileName={item.name}
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        />
    );

    function handleSearchDoctorPress(): void {
    }

    function handleFileNumberPress(): void {
    }

    function handleResultPress(): void {
    }

    return (
        <SafeAreaView style={styles.container}>
        <NavBar title="Medical Results"/>

        <FlatList
            style={styles.flatList}
            data={results}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
        />

        </SafeAreaView>
    );
};

export default PatientResult;
