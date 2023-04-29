import React, { FC, useState } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import PageTitle from '../../components/PageTitle';
import { colors } from '../../constants/palette';

import styles from './styles';

interface NavBar3Props {
    title: string;
    image1: { source: string, onPress: () => void };
    image2: { source: string, onPress: () => void };
    image3: { source: string, onPress: () => void };
}

const NavBar3: FC<NavBar3Props> = (props) => {

  return (
  
    <SafeAreaView style={styles.container}>
        <PageTitle title={props.title} />

        <View style={styles.images}>
            <TouchableOpacity onPress={props.image1.onPress}>
                <Image source={{ uri: props.image1.source }} style={styles.image} />
            </TouchableOpacity>

            <TouchableOpacity onPress={props.image2.onPress}>
                <Image source={{ uri: props.image2.source }} style={styles.image} />
            </TouchableOpacity>

            <TouchableOpacity onPress={props.image3.onPress}>
                <Image source={{ uri: props.image3.source }} style={styles.image} />
            </TouchableOpacity>
        </View>

    </SafeAreaView>
  );
};

export default NavBar3;