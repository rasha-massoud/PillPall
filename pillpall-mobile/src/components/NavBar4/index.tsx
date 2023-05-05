import React, { FC } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native';
import PageTitle from '../PageTitle';

import styles from './styles';

interface NavBar4Props {
    title: string;
    image1: { source: any, onPress: () => void };
    image2: { source: any, onPress: () => void };
    image3: { source: any, onPress: () => void };
    image4: { source: any, onPress: () => void };
}

const NavBar4: FC<NavBar4Props> = (props) => {

  return (
  
    <View style={styles.container}>
        <PageTitle title={props.title} />
        <View style={styles.imagesContainer}>
            <TouchableOpacity onPress={props.image1.onPress} style={styles.imageContainer}>
                <Image source={props.image1.source} style={styles.image} />
            </TouchableOpacity>
            <TouchableOpacity onPress={props.image2.onPress} style={styles.imageContainer}>
                <Image source={props.image2.source} style={styles.image} />
            </TouchableOpacity>
            <TouchableOpacity onPress={props.image3.onPress} style={styles.imageContainer}>
                <Image source={props.image3.source} style={styles.image} />
            </TouchableOpacity>
            <TouchableOpacity onPress={props.image4.onPress} style={styles.imageContainer}>
                <Image source={props.image4.source} style={styles.image} />
            </TouchableOpacity>
        </View>
    </View>

  );
};

export default NavBar4;