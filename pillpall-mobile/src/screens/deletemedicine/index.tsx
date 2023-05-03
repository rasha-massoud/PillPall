import React, { FC, useState } from 'react'
import { SafeAreaView, Alert, Image, ActivityIndicator  } from 'react-native';
import { colors } from '../../constants/palette';
import NavBar from '../../components/NavBar';
import axios from 'axios';
import styles from './styles';
import TextInputwithLabel from '../../components/TextInputwithLabel';
import DaySelector from '../../components/DaySelector';
import TimingChecklist from '../../components/TimingCheckList';
import TwoCustomButton from '../../components/TwoCustomButton';
import { useNavigation } from '@react-navigation/native';
import API_URL from '../../constants/url';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DAYS: Day[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'None', 'Everyday'];
const TIMINGS: Timing[] = ['6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];

type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday' | 'None' | 'Everyday';
type Timing = '6:00' | '8:00' | '10:00' | '12:00' | '14:00' | '16:00' | '18:00' | '20:00' | '22:00';


const DeleteMedicine: FC = () => {

    const [processing, setProcessing] = useState<boolean>(false);
    const [selectedDay, setSelectedDay] = useState<Day>();
    const [selectedTiming, setSelectedTiming] = useState<Timing>();
    const [name, setName] = useState<string>('');
    const [quantity, setQuantity] = useState<string>('');
    

    const handleMedicineNameChange = (value: string) => {
        setName(value);
    }

    const handleDoseQuantityChange = (value: string) => {
        setQuantity(value);
    }

    const handleDaySelect = (day: Day) => {
        setSelectedDay(day);
    };

    const handleSelectTiming = (timing: Timing) => {
        setSelectedTiming(timing);
    };

    const handleDeletePress = async () => {
        setProcessing(true);

        const data = new FormData();
        data.append('name', name);
        data.append('dose_quantity', quantity);

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

        const token = await AsyncStorage.getItem('token');
  
        const endpoint = 'med/delete_medicine';
        await axios.post(`${API_URL}${endpoint}`, data, {
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`,
              'Content-Type': "multipart/form-data",
            },
        })
        .then((response) => {
            console.log(response.data);
            if (response.data.status == 'success'){
                Alert.alert(
                    'Success',
                    'Medicine deleted successfully.',
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
                'Delete Process Fails.',
                [
                    { text: 'OK' }
                ],
                { cancelable: false }
            );
            console.error('An error occurred while deleting a medication');
        });
    };


    const handleCancelPress = () => {
  
    };

    return (
    
        <SafeAreaView style={styles.container}>
            <NavBar
                title="Medication Schedule"
            />
            <Image
                source={require('../../../assets/deletemedicinescreen.png')}
                style={styles.image}
            />

            <TextInputwithLabel label='Name' placeholder='Enter the Medicine Name' textinputprops={{ secureTextEntry: false}} onChangeText= {handleMedicineNameChange} />
            <TextInputwithLabel label='Dose Quantity' keyboardType="numeric" placeholder='Enter the Intake Dose Quantity as prescribed' textinputprops={{ secureTextEntry: false}} onChangeText= {handleDoseQuantityChange} />
            <DaySelector days={['Everyday', 'None', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']} selectedDay={selectedDay ?? null} onSelectDay={handleDaySelect} />
            <TimingChecklist
                timings={['6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00']}
                selectedTiming={selectedTiming ?? null}
                onSelectTiming={handleSelectTiming}
            />  

            {processing && <ActivityIndicator />}

            <TwoCustomButton containerStyle={{ alignSelf: 'center'}} buttonprops2={{ title: "Cancel", onPress: handleCancelPress }} buttonprops1={{ title: "Delete", onPress: handleDeletePress }} />

        </SafeAreaView>
    );
};

export default DeleteMedicine;