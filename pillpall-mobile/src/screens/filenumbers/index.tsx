import React, { FC, useEffect, useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import axios from 'axios';
import FileNumberCard from '../../components/FileNumberCards';
import NavBar3 from '../../components/NavBar3';
import CustomButton from '../../components/CustomButton';

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
    axios
      .get('http://192.168.0.103:8000/api/v0.0.0/get_file_numbers')
      .then((response) => {
        setFileNumbers(response.data.file_numbers);
      })
      .catch((error) => {
        console.error(error);
      });
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
