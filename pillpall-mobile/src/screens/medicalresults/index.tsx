import React, { FC, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, FlatList, Alert } from 'react-native';
import axios from 'axios';
import CustomButton from '../../components/CustomButton';
import MedicalResultCard from '../../components/MedicalResultCard';
import { useNavigation } from '@react-navigation/core';
import API_URL from '../../constants/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import NavBar3 from '../../components/NavBar3';
import { colors } from '../../constants/palette';

interface MedicalResult {
    id: number;
    name: string;
    type: string;
    uri: string;
    testing_date: string;
    description: string;
}

const MedicalResults: FC = () => {

  const navigation = useNavigation();

  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(true);

  useEffect(() => {

    const fetchData = async () => {
      setIsLoading(true);

      const token = await AsyncStorage.getItem('token');
  
      const endpoint = 'med/get_medical_results';
  
      await axios.get(`${API_URL}${endpoint}`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': "multipart/form-data",
        },
      })
      .then((response) => {
        setResults(response.data.results);
        setIsLoading(false);
        if (response.data.status !== "success"){
          setIsLoading(true);
          Alert.alert(
            'Failure',
            'Request Fails.',
            [
              { text: 'OK' }
            ],
            { cancelable: false }
          );
        }
      })
      .catch((error) => {
          console.error('An error occurred while getting the medical results');
      });
    };
  
    fetchData();
  }, []);

  const renderItem = ({ item }: { item: MedicalResult }) => (
    <MedicalResultCard
      file={item}
      testingDate={item.testing_date}
      fileName={item.name}
      description={item.description}
    />
  );

  const handleFileNumberPress = () => {
    navigation.navigate("FileNum" as never, {} as never);
  }

  const handleResultPress = () => {
    navigation.navigate("MedicalResults" as never, {} as never);
  }

  const handleSearchDoctorPress = () => {
    navigation.navigate("PatientSearch" as never, {} as never);
  }

  const handleAddPress = () => {
    navigation.navigate("AddMedicalResult" as never, {} as never);
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavBar3
        title="Medical Results"
        image1={{ source: require('../../../assets/filenumber.png'), onPress: handleFileNumberPress }}
        image2={{ source: require('../../../assets/results.png'), onPress: handleResultPress }}
        image3={{ source: require('../../../assets/searchdoc.png'), onPress: handleSearchDoctorPress }}
    />

      {results.length === 0 && isSuccess && (
        <View style={styles.noDataContainer}>
          <View>
            <Text style={styles.noDataText}>There is no data yet.</Text>
          </View>
          <CustomButton containerStyle={{ alignSelf: 'center' }} buttonprops={{ title: "ADD", onPress: handleAddPress }}  />
        </View>
      )}

  
        {results.length !== 0 && isSuccess && (
          <FlatList
            data={results}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.resultsList}
            showsVerticalScrollIndicator={true}
            scrollEnabled={true}
          />
        )}

        {results.length !== 0 && isSuccess && (
          <CustomButton containerStyle={{ alignSelf: 'center', width: 55, margin: 5, backgroundColor: colors.darker_gray }} buttonprops={{ title: "+", onPress: handleAddPress }}  />
        )}

    </SafeAreaView>
  );
};

export default MedicalResults;
