import React, { FC, useState } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import NavBar from '../../components/NavBar';
import styles from './styles';
import Config from 'react-native-config';

const hereApiKey = Config.HERE_API_KEY;
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

            <Map apiKey={hereApiKey || ''} />

        </SafeAreaView>
    );
};

export default NearbyPharms;