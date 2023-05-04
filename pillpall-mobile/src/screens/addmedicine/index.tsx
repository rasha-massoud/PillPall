import React, { FC, useState } from 'react'
import { SafeAreaView, ScrollView, Alert } from 'react-native';
import NavBar from '../../components/NavBar';
import axios from 'axios';
import styles from './styles';
import AddImage from '../../components/AddImage';
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

    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleImageSelected = (file: File | null) => {
      setImageFile(file);
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

    const handleAddPress = async () => {

        setProcessing(true);

        if( !name && !quantity && !price && !instructions && !onDemand && !firstOfEachMonth){
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

        if (imageFile) {
            data.append('image', imageFile);
        } 
        if (selectedMonth !== undefined) {
            data.append('month', selectedMonth);
        } else {
            data.append('month', '');
        }

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
            if (response.data== 'success'){
                setProcessing(false);
                Alert.alert(
                    'Success',
                    'Medicine added successfully.',
                    [
                      { text: 'OK' }
                    ],
                    { cancelable: false }
                );
            }
            else{
                Alert.alert(
                    'Failure',
                    'Add Medicine fails.',
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
                        navigation.navigate("Login" as never, {} as never);
                    },
                },
            ]
        );   
    };

    return (
    
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <NavBar
                    title="Add Medicine"
                />
                <AddImage onImageSelected={handleImageSelected} />
                
                <TextInputwithLabel label='Name' placeholder='Enter the Medicine Name' textinputprops={{ secureTextEntry: false}} onChangeText= {handleMedicineNameChange} />
                <TextInputwithLabel label='Dose Quantity' keyboardType="numeric" placeholder='Enter the Intake Dose Quantity as prescribed' textinputprops={{ secureTextEntry: false}} onChangeText= {handleDoseQuantityChange} />
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