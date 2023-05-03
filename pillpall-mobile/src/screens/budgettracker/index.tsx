import React, { FC, useState, useEffect } from 'react'
import { SafeAreaView, Image } from 'react-native';
import NavBar from '../../components/NavBar';
import SubTitleText from '../../components/SubTitleText';
import BudgetPieChart from '../../components/BudgetPieChart';
import axios from 'axios';
import API_URL from '../../constants/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

interface BudgetPieChartProps {
  data: { [month: string]: number };
}

const BudgetTracker: FC = () => {

  const [budgetData, setBudgetData] = useState<BudgetPieChartProps['data']>({});
  const [successState, setSuccessState] = useState('');

    useEffect(() => {

      const fetchBudgetData = async () => {
            const token = await AsyncStorage.getItem('token');

            const endpoint = 'budget/tracker';
            const response = await axios.get(`${API_URL}${endpoint}`, {
                headers: {
                    'Content-Type': "multipart/form-data",
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.data.status === 'success') {
              setSuccessState('success');
              setBudgetData(response.data.prices);
            }
      };

      fetchBudgetData();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <NavBar title="Budget Tracker" />
            <Image source={require('../../../assets/budgettrackerscreen.png')} style={styles.image} />
            {successState === 'success' ? <BudgetPieChart data={budgetData} /> : null}
        </SafeAreaView>
    );
};

export default BudgetTracker;
