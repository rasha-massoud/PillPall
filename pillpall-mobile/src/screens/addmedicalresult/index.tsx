import React, { FC, useState } from 'react';
import { SafeAreaView, Alert, View, Text, Image } from 'react-native';
import NavBar1 from '../../components/NavBar1';
import axios from 'axios';
import TwoCustomButton from '../../components/TwoCustomButton';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import AddDocument from '../../components/AddDocument';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../../constants/url';
import * as DocumentPicker from 'expo-document-picker';
import DisplayData from '../../components/DisplayData';
import styles from './styles';
import CustomButton from '../../components/CustomButton';

const AddMedicalResult: FC = () => {
  const navigation = useNavigation();

  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [testingDate, setTestingDate] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const selectFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: false,
      });
  
      if (result.type === 'success') {
        setSelectedFile(result.uri);
      }
    } catch (error) {
      console.log('Error selecting file:', error);
    }
  };

  const handleTestingDateChange = (value: string) => {
    setTestingDate(value);
  };

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
  };

  const handleAddPress = async () => {
    if (!selectedFile && !testingDate && !description) {
        Alert.alert(
            'Fails',
            'Missing Field. Please make sure to fill all fields.',
            [
              { text: 'OK' }
            ],
            { cancelable: false }
        );
        return;
    }

    try {
        setLoading(true);

        const fileUri = selectedFile;
        const fileExtension = fileUri!.split('.').pop();

        const data = new FormData();
        data.append('file', {
            uri: fileUri!,
            name: `medical_result.${fileExtension}`,
            type: 'application/pdf',
        } as any);        
        data.append('testing_date', testingDate);
        data.append('description', description);

        const token = await AsyncStorage.getItem('token');

        console.log(data);
        const endpoint = 'med/add_medical_result';
        await axios.post(`${API_URL}${endpoint}`, data, {
            headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
            },
        }).then((response) => {
            console.log(response.data);
            if (response.data.status == 'success') {
            Alert.alert(
                'Success',
                'The medical result is successfully added.',
                [
                {
                    text: 'OK',
                    onPress: () => {
                    navigation.navigate('FileNum' as never, {} as never);
                    },
                },
                ],
                { cancelable: false }
            );
            navigation.navigate('Profile' as never, {} as never);
            } else {
            Alert.alert(
                'Fails',
                'Request Fails.',
                    [
                        { text: 'OK' }
                    ],
                { cancelable: false }
            );
            }
        });
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
  };

  const handleCancelPress = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to cancel? Any unsaved data will be lost.',
      [
        {
          text: 'Stay',
          style: 'cancel',
        },
        {
          text: 'Accept',
          onPress: () => {
            navigation.navigate('MedicalResults' as never, {} as never);
          },
        },
      ]
    );
  };

  const handleBackPress = () => {
    navigation.navigate('MedicalResults' as never, {} as never);
  };

  return (
    <SafeAreaView style={styles.container}>
        <NavBar1
            title="Add Medical Results"
            image1={{ source: require('../../../assets/back.png'), onPress: handleBackPress }}
        />
        
        <Image
            source={require('../../../assets/addresultscreen.png')}
            style={styles.image}
        />        
        
        <CustomButton containerStyle={ styles.btn} buttonprops={{ title: "Select File", onPress: selectFile }}  />

        {selectedFile && (
            <View style={styles.selectedFileContainer}>
                <DisplayData title='File Selected' value='Success'/>
            </View>
        )}

        <TextInputwithLabel
            label='Testing Date'
            placeholder="YYYY-MM-DD"
            textinputprops={{ secureTextEntry: false }}
            onChangeText={handleTestingDateChange}
        />
        <TextInputwithLabel
            label='Description'
            placeholder='Enter Description'
            textinputprops={{ secureTextEntry: false }}
            onChangeText={handleDescriptionChange}
        />
            
        <TwoCustomButton
            containerStyle={{ alignSelf: 'center' }}
            buttonprops2={{ title: 'Cancel', onPress: handleCancelPress }}
            buttonprops1={{ title: 'Add', onPress: handleAddPress }}
        />

        {statusMessage ? <Text style={styles.statusMessage}>{statusMessage}</Text> : null}

    </SafeAreaView>
  );
}

export default AddMedicalResult;
  