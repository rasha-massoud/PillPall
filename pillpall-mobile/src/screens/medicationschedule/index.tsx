import React, { FC, useState } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { colors } from '../../constants/palette';
import NavBar3 from '../../components/NavBar3';

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
            <View>
                <NavBar3
                    title="Medication Schedule"
                    image1={{ uri: "https://example.com/image1.png", onPress: handleImage1Press }}
                    image2={{ uri: "https://example.com/image2.png", onPress: handleImage2Press }}
                    image3={{ uri: "https://example.com/image3.png", onPress: handleImage3Press }}
                />
            </View>
        </SafeAreaView>
    );
};

export default MedicationSchedule;