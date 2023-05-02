import React, { FC, useState } from 'react'
import { SafeAreaView, ScrollView, Alert } from 'react-native';
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
import { useNavigation } from '@react-navigation/native';
import API_URL from '../../constants/url';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MONTHS: Month[] = ['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday' | 'None' | 'Everyday';
type Month = 'All' | 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';
type Timing = '6:00' | '8:00' | '10:00' | '12:00' | '14:00' | '16:00' | '18:00' | '20:00' | '22:00';

const AddMedicine: FC = () => {
    
    const [name, setName] = useState<string>('');
    const [quantity, setQuantity] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [instructions, setInstructions] = useState<string>('');

    const [onDemand, setOnDemand] = useState<string>('No');
    const [firstOfEachMonth, setFirstOfEachMonth] = useState<string>('No');
    
    const [selectedDay, setSelectedDay] = useState<Day | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<Month | null>(null);
    const [selectedTiming, setSelectedTiming] = useState<Timing | null>(null);

    const [imageUri, setImageUri] = useState<string | null>(null);

    const handleDeleteMedPress = () => {
        // navigate to Delete Medicine Screen
    }

    const handleImageSelected = async (imageFile: File | null) => {
        if (imageFile) {
          const formData = new FormData();
          formData.append('image', imageFile);
      
          const blobUrl = URL.createObjectURL(imageFile);
          setImageUri(blobUrl);
        } else {
          setImageUri(null);
        }
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
        const data = new FormData();
        data.append('name', name);
        data.append('dose_quantity', quantity);
        data.append('price_per_month', price);
        data.append('instructions', instructions);
        data.append('on_demand', onDemand);
        data.append('first_of_each_month', firstOfEachMonth);
        data.append('days', JSON.stringify({ day: selectedDay }));
        data.append('timing', JSON.stringify({timing: selectedTiming}));
        if (imageUri) {
            data.append('image', imageUri);
        }       
        else {
            data.append('image', "");
        } 
        data.append('month', JSON.stringify({selectedMonth}));

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
            if (response.data== 'success'){
                Alert.alert(
                    'Success',
                    'The report is successfully created.',
                    [
                      { text: 'OK' }
                    ],
                    { cancelable: false }
                );
            }
        })
        .catch((error) => {
            console.error('An error occurred while creating the report', error);
        });
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
                <AddImage onImageSelected={handleImageSelected} />
                
                <TextInputwithLabel label='Name' placeholder='Enter the Medicine Name' textinputprops={{ secureTextEntry: false}} onChangeText= {handleMedicineNameChange} />
                <TextInputwithLabel label='Dose Quantity' keyboardType="numeric" placeholder='Enter the Intake Dose Quantity as prescribed' textinputprops={{ secureTextEntry: false}} onChangeText= {handleDoseQuantityChange} />
                <TextInputwithLabel label='Price per month (in $)' keyboardType="numeric" placeholder='Enter the Medicine Price per month' textinputprops={{ secureTextEntry: false}} onChangeText= {handleMedicinePriceChange} />
                <TextInputwithLabel label='Instructions' placeholder='Enter the Medicine Intake Instructions' textinputprops={{ secureTextEntry: false}} onChangeText= {handleInstructionsChange} />

                <DaySelector days={['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']} selectedDay={selectedDay} onSelectDay={handleDaySelect} />
                <MonthSelector
                    months={['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']}
                    selectedMonth={selectedMonth}
                    onSelectMonth={handleSelectMonth}
                />                
                <TimingChecklist
                    timings={['6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00']}
                    selectedTiming={selectedTiming}
                    onSelectTiming={handleSelectTiming}
                />            
                <OnDemandCheckBox selectedOnDemand={onDemand} onDemandSelect={handleOnDemandSelect} />
                <FirstOfEachMonth selectedFirstOfEachMonth={firstOfEachMonth} firstOfEachMonthSelect={handleFirstOfEachMonthSelect} />

                <TwoCustomButton containerStyle={{ alignSelf: 'center'}} buttonprops2={{ title: "Cancel", onPress: handleCancelPress }} buttonprops1={{ title: "Add", onPress: handleAddPress  }} />

            </ScrollView>

        </SafeAreaView>
    );
};

export default AddMedicine;