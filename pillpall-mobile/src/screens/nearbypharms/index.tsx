import React, { FC, useState } from 'react'
import { SafeAreaView } from 'react-native';
import NavBar1 from '../../components/NavBar1';
import styles from './styles';
import Config from 'react-native-config';
import { useNavigation } from '@react-navigation/core';

import Map from '../../components/Map'

const hereApiKey = Config.HERE_API_KEY;

const NearbyPharms: FC = () => {
    
    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.navigate("MedicationSchedule" as never, {} as never);
    }

    return (
    
        <SafeAreaView style={styles.container}>
            <NavBar1
                title="Nearby Pharmacies"
                image1={{ source: require('../../../assets/back.png'), onPress: handleBackPress }}
            />

            <Map apiKey={hereApiKey || ''} />

        </SafeAreaView>
    );
};

export default NearbyPharms;