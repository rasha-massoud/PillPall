import React, { FC, useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import SubTitleText from '../../components/SubTitleText';
import { PieChart } from 'react-native-chart-kit';
import axios from 'axios';
import API_URL from '../../constants/url';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles';

interface BudgetPieChartProps {
  data: { [month: string]: number };
}

const BudgetPieChart: FC<BudgetPieChartProps> = (props) => {
  const [budgetData, setBudgetData] = useState<{ [month: string]: number }>({});

  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const endpoint = 'budget/tracker';
        const response = await axios.get(`${API_URL}${endpoint}`, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        setBudgetData(response.data.prices);
      } catch (error) {
        console.log('An error occurred while fetching budget data');
      }
    };
    fetchBudgetData();
  }, []);

  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  const months = [
    new Date(Date.now() - 31 * 24 * 60 * 60 * 1000).toLocaleString('default', { month: 'long' }),
    new Date(Date.now() - 62 * 24 * 60 * 60 * 1000).toLocaleString('default', { month: 'long' }),
    currentMonth,
  ];

  const lastThreeMonthsData = Object.fromEntries(
    Object.entries(budgetData).filter(([key, value]) => months.includes(key)),
  );

  const totalValue = Object.values(lastThreeMonthsData).reduce((acc, curr) => acc + curr, 0);

  const chartData = Object.entries(lastThreeMonthsData).map(([month, value], index) => ({
    name: `${month} (${value})`,
    value: value / totalValue,
    color: index === 0 ? '#FFFF9F' : index === 1 ? '#B2FFAE' : '#ADD8E6',
  }));

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textTitle}>Last Three Months</Text>

      <PieChart
        data={chartData}
        width={360}
        height={270}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        accessor="value"
        backgroundColor="transparent"
        paddingLeft="15"
        // absolute
      />


    </SafeAreaView>
  );
};

export default BudgetPieChart;