import React, { FC, useState } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { colors } from '../../constants/palette';
import NavBar3 from '../../components/NavBar3';
import PageTitle from '../../components/PageTitle';

import styles from './styles';

const MedicationSchedule: FC = () => {
   
    const handleImage1Press = () => {
        // navigate to screen 1
    }

    const handleImage2Press = () => {
        // navigate to screen 2
    }

    const handleImage3Press = () => {
        // navigate to screen 3
    }

    return (
    
        <SafeAreaView style={styles.container}>
        <NavBar3
            title="Medication Schedule"
            image1={{ source: require('../../../assets/addmed.png'), onPress: handleImage1Press }}
            image2={{ source: require('../../../assets/budget.png'), onPress: handleImage2Press }}
            image3={{ source: require('../../../assets/rename.png'), onPress: handleImage3Press }}
        />
        <Text>Content of my screen goes here</Text>
        </SafeAreaView>
    );
};

export default MedicationSchedule;