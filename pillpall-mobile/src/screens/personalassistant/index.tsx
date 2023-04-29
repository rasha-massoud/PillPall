import React, { FC, useState, useEffect } from 'react'
import { SafeAreaView, Image } from 'react-native';
import NavBar from '../../components/NavBar';
import SubTitleText from '../../components/SubTitleText';
import BudgetPieChart from '../../components/BudgetPieChart';
import axios from 'axios';

import styles from './styles';

const BudgetTracker: FC = () => {


    return (
    
        <SafeAreaView style={styles.container}>
            <NavBar
                title="Personal Assistant"
            />
            <Image
                source={require('../../../assets/robot.png')}
                style={styles.image}
            />

          

        </SafeAreaView>
    );
};

export default BudgetTracker;