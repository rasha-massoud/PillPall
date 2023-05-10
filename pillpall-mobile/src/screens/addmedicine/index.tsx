import React, { FC, useState } from 'react'
import { SafeAreaView, ScrollView, Alert, View, TouchableOpacity, Image, Text } from 'react-native';
import NavBar1 from '../../components/NavBar1';
import axios from 'axios';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import DaySelector from '../../components/DaySelector';
import MonthSelector from '../../components/MonthSelector';
import TimingChecklist from '../../components/TimingCheckList';
import OnDemandCheckBox from '../../components/OnDemandCheckBox';
import FirstOfEachMonth from '../../components/FirstOfEachMonth';
import TwoCustomButton from '../../components/TwoCustomButton';
import { useNavigation } from '@react-navigation/core';
import API_URL from '../../constants/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerResult } from 'expo-image-picker/build/ImagePicker.types';
import { Ionicons } from '@expo/vector-icons';
import SubTitleText from '../../components/SubTitleText';

import styles from './styles';

const MONTHS: Month[] = ['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday' | 'None' | 'Everyday';
type Month = 'All' | 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';
type Timing = '6:00' | '8:00' | '10:00' | '12:00' | '14:00' | '16:00' | '18:00' | '20:00' | '22:00';

 
const AddMedicine: FC = () => {
    
    const navigation = useNavigation();

    const [processing, setProcessing] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [quantity, setQuantity] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [instructions, setInstructions] = useState<string>('');

    const [onDemand, setOnDemand] = useState<string>('No');
    const [firstOfEachMonth, setFirstOfEachMonth] = useState<string>('No');
    
    const [selectedDay, setSelectedDay] = useState<Day>();
    const [selectedMonth, setSelectedMonth] = useState<Month>();
    const [selectedTiming, setSelectedTiming] = useState<Timing>();

    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const pickImage = async () => {
        let result: ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
        setSelectedImage(result.uri);
    };
    
      const clearImage = () => {
        setSelectedImage(null);
    };
      
    const handleMedicineNameChange = (value: string) => {
        setName(value);
    }

    const handleDoseQuantityChange = (value: string) => {
        setQuantity(value);
    }

    const handleMedicinePriceChange = (value: string) => {
        setPrice(value);
    }

    const handleInstructionsChange = (value: string) => {
        setInstructions(value);
    }

    const handleDaySelect = (day: Day) => {
        setSelectedDay(day);
      };

    const handleSelectMonth = (month: Month) => {
        setSelectedMonth(month);
    };

    const handleSelectTiming = (timing: Timing) => {
        setSelectedTiming(timing);
    };

    const handleFirstOfEachMonthSelect = (firstOfEachMonth: string) => {
        setFirstOfEachMonth(firstOfEachMonth);
    };

    const handleOnDemandSelect = (onDemand: string) => {
        setOnDemand(onDemand);
    };

    const handleBackPress = () => {
        navigation.navigate("MedicationSchedule" as never, {} as never);
    }

    const handleAddPress = async () => {

        setProcessing(true);

        if( !selectedImage && !name && !quantity && !price && !instructions && !onDemand && !firstOfEachMonth){
            Alert.alert(
                'Fails',
                'Missing Field. Please may sure to fill all fields.',
                [
                  { text: 'OK' }
                ],
                { cancelable: false }
            );
        }

        const data = new FormData();
        data.append('name', name);
        data.append('dose_quantity', quantity);
        data.append('price_per_month', price);
        data.append('instructions', instructions);
        data.append('on_demand', onDemand);
        data.append('first_of_each_month', firstOfEachMonth);

        if (selectedDay !== undefined) {
            data.append('days', selectedDay);
        } else {
            data.append('days', '');
        }

        if (selectedTiming !== undefined) {
            data.append('timing', selectedTiming);
        } else {
            data.append('timing', '');
        }

        if (selectedMonth !== undefined) {
            data.append('month', selectedMonth);
        } else {
            data.append('month', '');
        }

        const fileExtension = selectedImage.split('.').pop() || '';
        const fileName = `image_${Date.now()}.${fileExtension}`;
    
        const file = {
          uri: selectedImage,
          name: fileName,
          type: `image/${fileExtension}`,
        };
          
        data.append('image', file);

        console.log(data);

        const token = await AsyncStorage.getItem('token');
  
        const endpoint = 'med/add_medicine';
        await axios.post(`${API_URL}${endpoint}`, data, {
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`,
              'Content-Type': "multipart/form-data",
            },
        })
        .then((response) => {
            if (response.data.status == 'success'){
                setProcessing(false);
                Alert.alert(
                    'Success',
                    'Medicine added successfully.',
                    [
                        { 
                            text: 'OK',
                            onPress: () => {
                                navigation.navigate("MedicationSchedule" as never, {} as never);
                            },
                        }
                    ],
                    { cancelable: false }
                );
            }
            else{
                console.log(response.data);
                Alert.alert(
                    'Failure',
                    'Add Medicine fails or medicine already exists.',
                    [
                      { text: 'OK' }
                    ],
                    { cancelable: false }
                );
            }
        })
        .catch((error) => {
            setProcessing(false);
            Alert.alert(
                'Fails',
                'Add Process Fails.',
                [
                    { text: 'OK' }
                ],
                { cancelable: false }
            );
            console.error('An error occurred adding a medicine');
        });
    };

    const handleCancelPress = () => {
        Alert.alert(
            "Confirmation",
            "Are you sure you want to cancel? All unsaved data will be lost.",
            [
                {
                    text: "Stay",
                    style: "cancel",
                },
                {
                    text: "Accept",
                    onPress: () => {
                        navigation.navigate("MedicationSchedule" as never, {} as never);
                    },
                },
            ]
        );   
    };

    return (
    
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <NavBar1
                    title="Add Medicine"
                    image1={{ source: require('../../../assets/back.png'), onPress: handleBackPress }}
                />
                <SubTitleText title='Same medication with a different schedule should be entered separately.' />

                <View style={styles.container1}>
                    {selectedImage ? (
                        <>
                        <TouchableOpacity onPress={pickImage} style={styles.changeImage}>
                            <Ionicons name="camera-outline" size={24} color="#fff" />
                            <Text style={styles.changeImageText}>Change Image</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={clearImage}>
                            <Image source={{ uri: selectedImage }} style={styles.image} />
                        </TouchableOpacity>
                        </>
                    ) : (
                        <TouchableOpacity onPress={pickImage} style={styles.addImage}>
                        <Ionicons name="add-outline" size={24} color="#fff" />
                        <Text style={styles.addImageText}>Add Image</Text>
                        </TouchableOpacity>
                    )}
                </View>                
                <TextInputwithLabel label='Name' placeholder='Enter the Medicine Name' textinputprops={{ secureTextEntry: false}} onChangeText= {handleMedicineNameChange} />
                <TextInputwithLabel label='Dose Quantity' keyboardType="numeric" placeholder='Enter the Prescribed Intake Dose' textinputprops={{ secureTextEntry: false}} onChangeText= {handleDoseQuantityChange} />
                <TextInputwithLabel label='Price per month (in $)' keyboardType="numeric" placeholder='Enter the Medicine Price per month' textinputprops={{ secureTextEntry: false}} onChangeText= {handleMedicinePriceChange} />
                <TextInputwithLabel label='Instructions' placeholder='Enter the Medicine Intake Instructions' textinputprops={{ secureTextEntry: false}} onChangeText= {handleInstructionsChange} />

                <DaySelector days={['Everyday', 'None', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']} selectedDay={selectedDay ?? null} onSelectDay={handleDaySelect} />
                <MonthSelector
                    months={['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']}
                    selectedMonth={selectedMonth ?? null}
                    onSelectMonth={handleSelectMonth}
                />                
                <TimingChecklist
                    timings={['6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00']}
                    selectedTiming={selectedTiming ?? null}
                    onSelectTiming={handleSelectTiming}
                />            
                <OnDemandCheckBox selectedOnDemand={onDemand} onDemandSelect={handleOnDemandSelect} />
                <FirstOfEachMonth selectedFirstOfEachMonth={firstOfEachMonth} firstOfEachMonthSelect={handleFirstOfEachMonthSelect} />


            </ScrollView>
            <TwoCustomButton containerStyle={{ alignSelf: 'center'}} buttonprops2={{ title: "Cancel", onPress: handleCancelPress }} buttonprops1={{ title: "Add", onPress: handleAddPress  }} />

        </SafeAreaView>
    );
};

export default AddMedicine;