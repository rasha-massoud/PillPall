import React, { FC, useState } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import NavBar from '../../components/NavBar';
import styles from './styles';
import { HERE_API_KEY } from '../../../config';


const BudgetTracker: FC = () => {
    
    return (
    
        <SafeAreaView style={styles.container}>
            <NavBar
                title="Budget Tracker"
            />
            <Image
                source={require('../../../assets/budgettrackerscreen.png')}
                style={styles.image}
            />


        </SafeAreaView>
    );
};

export default BudgetTracker;