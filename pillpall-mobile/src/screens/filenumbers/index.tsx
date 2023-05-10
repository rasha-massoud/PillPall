import React, { FC, useEffect, useState } from 'react';
import { Alert, SafeAreaView, Text, View, FlatList } from 'react-native';
import axios from 'axios';
import FileNumberCard from '../../components/FileNumberCards';
import NavBar3 from '../../components/NavBar3';
import CustomButton from '../../components/CustomButton';
import API_URL from '../../constants/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import { colors } from '../../constants/palette';

import styles from './styles';

type FileNumber = {
  id: number;
  doctor_name: string;
  address: string;
  file_number: string;
};

const FileNum: FC = () => {

  const navigation = useNavigation();
  const [fileNumbers, setFileNumbers] = useState<FileNumber[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(true);

  const handleFileNumberPress = () => {}

  const handleResultPress = () => {
    navigation.navigate("MedicalResults" as never, {} as never);
  }

  const handleSearchDoctorPress = () => {
    navigation.navigate("PatientSearch" as never, {} as never);
  }

  const handleAddPress = () => {
    navigation.navigate("AddFileNumber" as never, {} as never);
  }

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem('token');
  
      const endpoint = 'med/get_file_numbers';
  
      await axios.get(`${API_URL}${endpoint}`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        setFileNumbers(response.data.file_numbers);
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
          console.error('An error occurred while getting the File numbers');
      });
    };
  
    fetchData();
  }, []);
  
  const renderFileNumber = ({ item }: { item: FileNumber }) => (
    <FileNumberCard
      key={item.id}
      doctorName={item.doctor_name}
      location={item.address}
      fileNumber={item.file_number}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
        <NavBar3
            title="File Numbers"
            image1={{ source: require('../../../assets/filenumberfocused.png'), onPress: handleFileNumberPress }}
            image2={{ source: require('../../../assets/results.png'), onPress: handleResultPress }}
            image3={{ source: require('../../../assets/searchdoc.png'), onPress: handleSearchDoctorPress }}
        />
  
        {fileNumbers.length === 0 && isSuccess && (
          <View style={styles.noDataContainer}>
            <View>
              <Text style={styles.noDataText}>There is no data yet.</Text>
            </View>
            <CustomButton containerStyle={{ alignSelf: 'center' }} buttonprops={{ title: "ADD", onPress: handleAddPress }}  />
          </View>
        )}
  
          {fileNumbers.length !== 0 && isSuccess && (
            <>
            <CustomButton
              containerStyle={styles.btn}
              buttonprops={{ title: "Add File Number", onPress: handleAddPress }}
            />
            <FlatList
              data={fileNumbers}
              renderItem={renderFileNumber}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.fileNumberList}
              showsVerticalScrollIndicator={true}
              scrollEnabled={true}
            />
            </>
          )}
    </SafeAreaView>
  );
};
        
export default FileNum;
        