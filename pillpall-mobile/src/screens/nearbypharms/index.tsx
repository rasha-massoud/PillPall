import React, { FC, useState } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import NavBar from '../../components/NavBar';
import styles from './styles';
import { HERE_API_KEY } from '../../../config';

import Map from '../../components/Map'

const NearbyPharms: FC = () => {
    
    return (
    
        <SafeAreaView style={styles.container}>
            <NavBar
                title="Nearby Pharmacies"
            />
            <Image
                source={require('../../../assets/nearbyPharm.png')}
                style={styles.image}
            />

            <Map apiKey={HERE_API_KEY || ''} />

        </SafeAreaView>
    );
};

export default NearbyPharms;