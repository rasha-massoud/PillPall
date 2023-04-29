import React, { FC } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native';
import PageTitle from '../PageTitle';

import styles from './styles';

interface NavBar3Props {
    title: string;
    image1: { source: any, onPress: () => void };
}

const NavBar3: FC<NavBar3Props> = (props) => {

  return (
  
    <View style={styles.container}>
        <PageTitle title={props.title} />
        <View style={styles.imagesContainer}>
            <TouchableOpacity onPress={props.image1.onPress} style={styles.imageContainer}>
                <Image source={props.image1.source} style={styles.image} />
            </TouchableOpacity>
        </View>
    </View>

  );
};

export default NavBar3;