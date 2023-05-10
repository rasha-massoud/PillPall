import React, { FC, useState, useEffect } from 'react';
import { SafeAreaView, Image, Alert, View, Text } from 'react-native';
import NavBar1 from '../../components/NavBar1';
import BudgetPieChart from '../../components/BudgetPieChart';
import axios from 'axios';
import API_URL from '../../constants/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';

import styles from './styles';

interface BudgetPieChartProps {
  data: { [month: string]: number };
}

const BudgetTracker: FC = () => {
  const navigation = useNavigation();

  const [budgetData, setBudgetData] = useState<BudgetPieChartProps['data']>({});
  const [successState, setSuccessState] = useState('');

  const handleBackPress = () => {
    navigation.navigate('MedicationSchedule' as never, {} as never);
  };

  useEffect(() => {
    const fetchBudgetData = async () => {
      const token = await AsyncStorage.getItem('token');
      const endpoint = 'budget/tracker';
      const response = await axios.get(`${API_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status === 'success') {
        setSuccessState('success');
        setBudgetData(response.data.prices);
      } else {
        Alert.alert('Failure', 'Request fails.', [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('MedicationSchedule ' as never, {} as never);
            },
          },
        ]);
      }
    };

    fetchBudgetData();
  }, []);

  const renderNoExpensesMessage = () => {
    return (
      <View>
        <Text style={styles.noExpensesText}>There are no expenses yet.</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavBar1 title="Budget Tracker" image1={{ source: require('../../../assets/back.png'), onPress: handleBackPress }} />
      <Image source={require('../../../assets/budgettrackerscreen.png')} style={styles.image} />
      {successState === 'success' ? (
        Object.values(budgetData).every((value) => value === 0) ? (
          renderNoExpensesMessage()
        ) : (
          <BudgetPieChart data={budgetData} />
        )
      ) : null}
    </SafeAreaView>
  );
};

export default BudgetTracker;
