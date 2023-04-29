import React, { FC, useState } from 'react'
import { SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import NavBar1 from '../../components/NavBar1';
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

const DAYS: Day[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'None', 'Everyday'];
const MONTHS: Month[] = ['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const TIMINGS: Timing[] = ['6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];

type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday' | 'None' | 'Everyday';
type Month = 'All' | 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';
type Timing = '6:00' | '8:00' | '10:00' | '12:00' | '14:00' | '16:00' | '18:00' | '20:00' | '22:00';

const AddMedicine: FC = () => {
    
    const [onDemand, setOnDemand] = useState<string>('No');
    const [firstOfEachMonth, setFirstOfEachMonth] = useState<string>('No');
    onDemand
    const [selectedDay, setSelectedDay] = useState<Day | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<Month | null>(null);
    const [selectedTiming, setSelectedTiming] = useState<Timing | null>(null);

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

    const handleSelectTiming = (timing: Timing) => {
        setSelectedTiming(timing);
    };

    const handleFirstOfEachMonthSelect = (firstOfEachMonth: string) => {
        setFirstOfEachMonth(firstOfEachMonth);
    };

    const handleOnDemandSelect = (onDemand: string) => {
        setOnDemand(onDemand);
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

    const handleAddPress = () => {
    };

    const handleCancelPress = () => {
  
    };

    return (
    
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <NavBar1
                    title="Medication Schedule"
                    image1={{ source: require('../../../assets/deletemed.png'), onPress: handleDeleteMedPress }}
                />
                <AddImage></AddImage>
                <TextInputwithLabel label='Name' placeholder='Enter the Medicine Name' textinputprops={{ secureTextEntry: false}} onChangeText= {handleMedicineNameChange} />
                <TextInputwithLabel label='Dose Quantity' keyboardType="numeric" placeholder='Enter the Intake Dose Quantity as prescribed' textinputprops={{ secureTextEntry: false}} onChangeText= {handleDoseQuantityChange} />
                <TextInputwithLabel label='Price per month (in $)' keyboardType="numeric" placeholder='Enter the Medicine Price per month' textinputprops={{ secureTextEntry: false}} onChangeText= {handleMedicinePriceChange} />
                <TextInputwithLabel label='Instructions' placeholder='Enter the Medicine Intake Instructions' textinputprops={{ secureTextEntry: false}} onChangeText= {handleInstructionsChange} />

                <DaySelector days={DAYS} selectedDay={selectedDay} onSelectDay={handleSelectDay} />
                <MonthSelector months={MONTHS} selectedMonth={selectedMonth} onSelectMonth={handleSelectMonth} />
                <TimingChecklist timings={TIMINGS} selectedTiming={selectedTiming} onSelectTiming={handleSelectTiming} />
            
                <OnDemandCheckBox selectedOnDemand={onDemand} onDemandSelect={handleOnDemandSelect} />
                <FirstOfEachMonth selectedFirstOfEachMonth={firstOfEachMonth} firstOfEachMonthSelect={handleFirstOfEachMonthSelect} />

                <TwoCustomButton containerStyle={{ alignSelf: 'center'}} buttonprops2={{ title: "Cancel", onPress: handleCancelPress }} buttonprops1={{ title: "Add", onPress: handleAddPress  }}></TwoCustomButton>

            </ScrollView>

        </SafeAreaView>
    );
};

export default AddMedicine;