import React, { FC, useState, useEffect } from 'react'
import { SafeAreaView, Image } from 'react-native';
import NavBar from '../../components/NavBar';
import SubTitleText from '../../components/SubTitleText';
import BudgetPieChart from '../../components/BudgetPieChart';
import axios from 'axios';

import styles from './styles';

const BudgetTracker: FC = () => {

    const [budgetData, setBudgetData] = useState<{ [month: string]: number }>({});

    useEffect(() => {
      const fetchBudgetData = async () => {
        try {
          const response = await axios.get('http://192.168.0.103:8000/api/v0.0.0/budget_tracker');
          setBudgetData(response.data.prices);
        } catch (error) {
          console.log('An Error occured');
        }
      };
      fetchBudgetData();
    }, []);

    return (
    
        <SafeAreaView style={styles.container}>
            <NavBar
                title="Budget Tracker"
            />
            <Image
                source={require('../../../assets/budgettrackerscreen.png')}
                style={styles.image}
            />
            <SubTitleText title='Last Three Months' />

            <BudgetPieChart data={budgetData} />


        </SafeAreaView>
    );
};

export default BudgetTracker;