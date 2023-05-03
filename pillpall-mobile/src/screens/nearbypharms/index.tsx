import React, { FC, useState } from 'react'
import { SafeAreaView, Image } from 'react-native';
import NavBar from '../../components/NavBar';
import styles from './styles';
import PharmacyMap from '../../components/PharmacyMap';

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

            <PharmacyMap />
        </SafeAreaView>
    );
};

export default NearbyPharms;