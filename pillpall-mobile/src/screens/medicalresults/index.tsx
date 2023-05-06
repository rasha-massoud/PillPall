import React, { FC, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, FlatList, Alert, TouchableOpacity, Linking  } from 'react-native';
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
    file_name: string;
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
  
      await axios
        .get(`${API_URL}${endpoint}`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          console.log(response.data);
          setIsLoading(false);
          if (response.data.status === 'success') {
            const formattedResults = response.data.results.map((result: MedicalResult) => ({
              ...result,
              uri: `${API_URL}${endpoint}/${result.file_name}?id=${result.id}`,
            }));
            setResults(formattedResults);
            setIsSuccess(true);
          } else {
            setIsSuccess(false);
            setIsLoading(true);
            Alert.alert(
              'Failure',
              'Request Fails.',
              [{ text: 'OK' }],
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
  
  

  const handleOpenFile = (uri: string) => {
    Linking.canOpenURL(uri)
      .then((supported) => {
        if (supported) {
          Linking.openURL(uri);
        } else {
          console.error('Cannot open URL:', uri);
        }
      })
      .catch((error) => {
        console.error('An error occurred while opening the file:', error);
      });
  };
  

  const renderItem = ({ item }: { item: MedicalResult }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => handleOpenFile(item.uri)}
    >
      <View>
        <Text style={styles.testingDate}>{item.testing_date}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </TouchableOpacity>
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
        <CustomButton
          containerStyle={{ alignSelf: 'center' }}
          buttonprops={{ title: "ADD", onPress: handleAddPress }}
        />
      </View>
    )}

    {results.length !== 0 && isSuccess && (
      <>
        <CustomButton
          containerStyle={styles.btn}
          buttonprops={{ title: "Add Medical Result", onPress: handleAddPress }}
        />

        <FlatList
          data={results}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.resultsList}
          showsVerticalScrollIndicator={true}
          scrollEnabled={true}
        />
      </>
    )}
  </SafeAreaView>
);
};

export default MedicalResults;
