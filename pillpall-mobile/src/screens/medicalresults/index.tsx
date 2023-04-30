import React, { FC, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import axios from 'axios';
import NavBar3 from '../../components/NavBar3';
import CustomButton from '../../components/CustomButton';
import MedicalResultCard from '../../components/MedicalResultCard';

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

  const handleAddPress = () => {
    // TODO: Implement handleAddPress
  };

  const renderItem = ({ item }: { item: MedicalResult }) => (
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
