import React, { FC, useState } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { colors } from '../../constants/palette';
import NavBar3 from '../../components/NavBar3';
import MyCalendar from '../../components/MyCalendar';
import axios from 'axios';
import styles from './styles';

const MedicationSchedule: FC = () => {
   
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().substring(0, 10));
    const [selectedDay, setSelectedDay] = useState('');

    const handleAddMedPress = () => {
        // navigate to Add Medicine Screen
    }

    const handleBudgetTrackerPress = () => {
        // navigate to Buget Tracker Screen
    }

    const handlePharmPress = () => {
        // navigate to Nearby Pharm Screen
    }

    const handleSelectDate = async (date: string) => {
        setSelectedDay(date);
      
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const selectedDateObj = new Date(date);
        const dayOfWeek = daysOfWeek[selectedDateObj.getDay()];

        setSelectedDay(dayOfWeek);
        console.log(date);
        console.log(dayOfWeek);

        const data = new FormData();
        data.append('day', dayOfWeek);
        data.append('date', date);
         
        const token = localStorage.getItem('token');

        await axios.post('http://192.168.0.103:8000/api/v0.0.0/get_medications', data, {
            headers: {
                'Content-Type': "multipart/form-data",
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error('An error occurred when getting the medications');
        });

    };

    return (
    
        <SafeAreaView style={styles.container}>
            <NavBar3
                title="Medication Schedule"
                image1={{ source: require('../../../assets/addmed.png'), onPress: handleAddMedPress }}
                image2={{ source: require('../../../assets/budget.png'), onPress: handleBudgetTrackerPress }}
                image3={{ source: require('../../../assets/rename.png'), onPress: handlePharmPress }}
            />
            <MyCalendar onSelectDate={handleSelectDate} />
        </SafeAreaView>
    );
};

export default MedicationSchedule;