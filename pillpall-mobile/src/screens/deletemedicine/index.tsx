import React, { FC, useState } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { colors } from '../../constants/palette';
import NavBar from '../../components/NavBar';
import axios from 'axios';
import styles from './styles';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import DaySelector from '../../components/DaySelector';
import TimingChecklist from '../../components/TimingCheckList';
import TwoCustomButton from '../../components/TwoCustomButton';

const DAYS: Day[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'None', 'Everyday'];
const TIMINGS: Timing[] = ['6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];

type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday' | 'None' | 'Everyday';
type Timing = '6:00' | '8:00' | '10:00' | '12:00' | '14:00' | '16:00' | '18:00' | '20:00' | '22:00';


const DeleteMedicine: FC = () => {
    const [selectedDay, setSelectedDay] = useState<Day | null>(null);
    const [selectedTiming, setSelectedTiming] = useState<Timing | null>(null);


    const handleMedicineNameChange = () => {

    }

    const handleDoseQuantityChange = () => {

    }

    const handleSelectDay = (day: Day) => {
        setSelectedDay(day);
    };

    const handleSelectTiming = (timing: Timing) => {
        setSelectedTiming(timing);
    };

    const handleAddPress = () => {

    };

    const handleCancelPress = () => {
  
    };

    return (
    
        <SafeAreaView style={styles.container}>
            <NavBar
                title="Medication Schedule"
            />

            <Image
                source={require('../../../assets/deletemedicinescreen.gif')}
                style={styles.image}
            />

            <TextInputwithLabel label='Name' placeholder='Enter the Medicine Name' textinputprops={{ secureTextEntry: false}} onChangeText= {handleMedicineNameChange} />
            <TextInputwithLabel label='Dose Quantity' keyboardType="numeric" placeholder='Enter the Intake Dose Quantity as prescribed' textinputprops={{ secureTextEntry: false}} onChangeText= {handleDoseQuantityChange} />
            <DaySelector days={DAYS} selectedDay={selectedDay} onSelectDay={handleSelectDay} />
            <TimingChecklist timings={TIMINGS} selectedTiming={selectedTiming} onSelectTiming={handleSelectTiming} />

            <TwoCustomButton containerStyle={{ alignSelf: 'center'}} buttonprops2={{ title: "Cancel", onPress: handleCancelPress }} buttonprops1={{ title: "Add", onPress: handleAddPress  }}></TwoCustomButton>

        </SafeAreaView>
    );
};

export default DeleteMedicine;