import React, { FC, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import axios from 'axios';
import NavBar1 from '../../components/NavBar1';
import CustomButton from '../../components/CustomButton';
import MedicalResultCard from '../../components/MedicalResultCard';
import { useNavigation } from '@react-navigation/core';

import styles from './styles';

interface MedicalResult {
    id: number;
    name: string;
    type: string;
    uri: string;
    testingDate: string;
    description: string;
}

const MedicalResults: FC = () => {

  const navigation = useNavigation();

  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .get('/api/get_medical_results')
      .then(response => {
        setResults(response.data.results);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const renderItem = ({ item }: { item: MedicalResult }) => (
    <MedicalResultCard
      file={item}
      testingDate="YYYY-MM-DD"
      fileName={item.name}
      description=""
    />
  );

  const handleBackPress = () => {
    navigation.navigate("MedicationSchedule" as never, {} as never);
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavBar1
        title="Medical Results1"
          image1={{ source: require('../../../assets/back.png'), onPress: handleBackPress }}
        />

      <FlatList
        style={styles.flatList}
        data={results}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

    </SafeAreaView>
  );
};

export default MedicalResults;
