import React, { FC, useState } from 'react';
import { SafeAreaView, View, Text, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavBar4 from '../../components/NavBar4';
import MyCalendar from '../../components/MyCalendar';
import MedicationItem from '../../components/MedicationItem';
import styles from './styles';
import API_URL from '../../constants/url';

type MedicationProps = {
  name: string;
  dosage: string;
  timing: string;
  image: string;
};

type MedicationResponse = {
  medications: Array<{
    name: string;
    dose_quantity: number;
    timing: string;
    image: string;
  }>;
};

const MedicationSchedule: FC = () => {
  const navigation = useNavigation();

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [selectedDay, setSelectedDay] = useState('');
  const [successState, setSuccessState] = useState('');
  const [medications, setMedications] = useState<MedicationProps[]>([]);

  const handleAddMedPress = () => {
    navigation.navigate('AddMedicine' as never, {} as never);
  };

  const handleDeleteMedPress = () => {
    navigation.navigate('DeleteMedicine' as never, {} as never);
  };

  const handleBudgetTrackerPress = () => {
    navigation.navigate('BudgetTracker' as never, {} as never);
  };

  const handlePharmPress = () => {
    navigation.navigate('NearbyPharms' as never, {} as never);
  };

  const handleSelectDate = async (date: string) => {
    setSelectedDay(date);

    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const selectedDateObj = new Date(date);
    const dayOfWeek = daysOfWeek[selectedDateObj.getDay()];

    setSelectedDay(dayOfWeek);

    const data = new FormData();
    data.append('day', dayOfWeek);
    data.append('date', date);

    const token = await AsyncStorage.getItem('token');

    const endpoint = 'med/get_medications';
    await axios
      .post(`${API_URL}${endpoint}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.status == 'success') {
          const medicationData: MedicationResponse = response.data;
          const mappedMedications: MedicationProps[] = medicationData.medications.map(
            (medication) => ({
              name: medication.name,
              dosage: medication.dose_quantity.toString(),
              timing: medication.timing,
              image: medication.image,
            })
          );
          setSuccessState('success');
          setMedications(mappedMedications);
        }
      })
      .catch((error) => {
        console.error('An error occurred when getting the medications');
      });
  };

    return (
        <SafeAreaView style={styles.container}>
        <NavBar4
        title="Medication Schedule"
        image1={{ source: require('../../../assets/addmed.png'), onPress: handleAddMedPress }}
        image2={{ source: require('../../../assets/deletemed.png'), onPress: handleDeleteMedPress }}
        image3={{ source: require('../../../assets/budget.png'), onPress: handleBudgetTrackerPress }}
        image4={{ source: require('../../../assets/rename.png'), onPress: handlePharmPress }}
        />
        <MyCalendar onSelectDate={handleSelectDate} />
        

          <View>
            {successState === 'success' ? (
              medications.length > 0 ? (
                <FlatList
                  data={medications}
                  keyExtractor={(medication) => medication.name}
                  renderItem={({ item }) => (
                    <MedicationItem
                      name={item.name}
                      dosage={item.dosage}
                      timing={item.timing}
                      image={item.image}
                    />
                  )}
                />
              ) : (
                <Text style={styles.result}>No medication for {selectedDay}.</Text>
              )
            ) : (
              <Text style={styles.result}>Fetching medication list...</Text>
            )}
          </View>
        </SafeAreaView>
        );
      };
        
export default MedicationSchedule;