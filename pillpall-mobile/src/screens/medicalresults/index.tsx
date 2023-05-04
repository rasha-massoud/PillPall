import React, { FC, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import axios from 'axios';
import NavBar3 from '../../components/NavBar3';
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

  const handleFileNumberPress = () => {
    navigation.navigate("FileNum " as never, {} as never);
  }

  const handleResultPress = () => {}

  const handleSearchDoctorPress = () => {
    navigation.navigate("PatientSearch " as never, {} as never);
  }

  const handleAddPress = () => {
    navigation.navigate("AddMedicalResult " as never, {} as never);
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavBar3
        title="Medical Results"
        image1={{ source: require('../../../assets/filenumber.png'), onPress: handleFileNumberPress }}
        image2={{ source: require('../../../assets/results.png'), onPress: handleResultPress }}
        image3={{ source: require('../../../assets/searchdoc.png'), onPress: handleSearchDoctorPress }}
      />

      <FlatList
        style={styles.flatList}
        data={results}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

      <CustomButton
        containerStyle={{ alignSelf: 'center' }}
        buttonprops={{ title: "Add", onPress: handleAddPress }}
      />
    </SafeAreaView>
  );
};

export default MedicalResults;
