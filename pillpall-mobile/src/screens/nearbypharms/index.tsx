import React, { FC, useState } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import NavBar from '../../components/NavBar';
import styles from './styles';

import Map from '../../components/Map'
import 'dotenv/config';

const NearbyPharms: FC = () => {
    
    return (
    
        <SafeAreaView style={styles.container}>
            <NavBar
                title="Nearby Pharmacies"
            />
            <Image
                source={require('../../../assets/deletemedicinescreen.png')}
                style={styles.image}
            />

            <Map apiKey={process.env.HERE_API_KEY ?? ''}/>

        </SafeAreaView>
    );
};

export default NearbyPharms;