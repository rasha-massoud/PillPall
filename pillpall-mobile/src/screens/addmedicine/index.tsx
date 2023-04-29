import React, { FC, useState } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import NavBar1 from '../../components/NavBar1';
import axios from 'axios';
import styles from './styles';
import AddImage from '../../components/AddImage';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import DaySelector from '../../components/DaySelector';
import MonthSelector from '../../components/MonthSelector';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'None', 'Everyday'];
const MONTHS = ['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const AddMedicine: FC = () => {
    
    const [selectedDay, setSelectedDay] = useState<Day | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<Month | null>(null);

    const handleDeleteMedPress = () => {
        // navigate to Delete Medicine Screen
    }

    const handleMedicineNameChange = () => {

    }

    const handleDoseQuantityChange = () => {

    }

    const handleMedicinePriceChange = () => {

    }

    const handleInstructionsChange = () => {

    }

    const handleSelectDay = (day: Day) => {
        setSelectedDay(day);
    };

    const handleSelectMonth = (month: Month) => {
        setSelectedMonth(month);
    };

    const handleSelectDate = async (date: string) => {
         
        const token = localStorage.getItem('token');

        // await axios.post('http://192.168.0.103:8000/api/v0.0.0/get_medications', data, {
        //     headers: {
        //         'Content-Type': "multipart/form-data",
        //         'Accept': 'application/json',
        //         'Authorization': `Bearer ${token}`,
        //     },
        // })
        // .then((response) => {
        //     console.log(response.data);
        // })
        // .catch((error) => {
        //     console.error('An error occurred when getting the medications');
        // });

    };

    return (
    
        <SafeAreaView style={styles.container}>
            <NavBar1
                title="Medication Schedule"
                image1={{ source: require('../../../assets/deletemed.png'), onPress: handleDeleteMedPress }}
            />
            <AddImage></AddImage>
            <TextInputwithLabel label='Name' placeholder='Enter the Medicine Name' textinputprops={{ secureTextEntry: false}} onChangeText= {handleMedicineNameChange} />
            <TextInputwithLabel label='Dose Quantity' placeholder='Enter the Intake Dose Quantity as prescribed' textinputprops={{ secureTextEntry: false}} onChangeText= {handleDoseQuantityChange} />
            <TextInputwithLabel label='Price per month (in $)' placeholder='Enter the Medicine Price per month' textinputprops={{ secureTextEntry: false}} onChangeText= {handleMedicinePriceChange} />
            <TextInputwithLabel label='Instructions' placeholder='Enter the Medicine Intake Instructions' textinputprops={{ secureTextEntry: false}} onChangeText= {handleInstructionsChange} />

            <DaySelector days={DAYS} selectedDay={selectedDay} onSelectDay={handleSelectDay} />
            <MonthSelector months={MONTHS} selectedMonth={selectedMonth} onSelectMonth={handleSelectMonth} />

        </SafeAreaView>
    );
};

export default AddMedicine;