import React, { FC, useEffect, useState } from 'react';
import { Alert, SafeAreaView } from 'react-native';
import axios from 'axios';
import FileNumberCard from '../../components/FileNumberCards';
import NavBar3 from '../../components/NavBar3';
import CustomButton from '../../components/CustomButton';
import API_URL from '../../constants/url';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles';

type FileNumber = {
  id: number;
  doctor_name: string;
  location: string;
  number: string;
};

const FileNum: FC = () => {
  const [fileNumbers, setFileNumbers] = useState<FileNumber[]>([]);

  const handleFileNumberPress = () => {}
  const handleResultPress = () => {}
  const handleSearchDoctorPress = () => {}

  const handleAddPress = () => {}

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem('token');
  
      const endpoint = 'med/get_file_numbers';
  
      await axios.post(`${API_URL}${endpoint}`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': "multipart/form-data",
        },
      })
      .then((response) => {
        setFileNumbers(response.data.file_numbers);
        Alert.alert(
          'Success',
          'The report is successfully created.',
          [
            { text: 'OK' }
          ],
          { cancelable: false }
        );
      })
      .catch((error) => {
          console.error('An error occurred while getting the File numbers');
      });
    };
  
    fetchData();
  }, []);
  

  return (

    <SafeAreaView style={styles.container}>
        <NavBar3
            title="File Numbers"
            image1={{ source: require('../../../assets/filenumber.png'), onPress: handleFileNumberPress }}
            image2={{ source: require('../../../assets/results.png'), onPress: handleResultPress }}
            image3={{ source: require('../../../assets/searchdoc.png'), onPress: handleSearchDoctorPress }}
        />

        {fileNumbers.map((fileNumber) => (
            <FileNumberCard
                key={fileNumber.id}
                doctorName={fileNumber.doctor_name}
                location={fileNumber.location}
                fileNumber={fileNumber.number}
            />
        ))}

        <CustomButton containerStyle={{ alignSelf: 'center' }} buttonprops={{ title: "Add", onPress: handleAddPress }}  />

    </SafeAreaView>
  );
};

export default FileNum;
