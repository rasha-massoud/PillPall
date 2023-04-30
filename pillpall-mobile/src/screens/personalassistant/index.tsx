import React, { FC, useState, useEffect } from 'react'
import { SafeAreaView, Image } from 'react-native';
import NavBar from '../../components/NavBar';
import axios from 'axios';

import styles from './styles';

const PersonalAssitant: FC = () => {

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

export default PersonalAssitant;