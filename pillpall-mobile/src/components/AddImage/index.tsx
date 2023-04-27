import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerResult } from 'expo-image-picker/build/ImagePicker.types';
import { Ionicons } from '@expo/vector-icons';

import styles from './styles';

const AddImage = () => {
    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        let result: ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        console.log(result);

        if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
        {image ? (
            <Image source={{ uri: image }} style={styles.image} />
        ) : (
            <TouchableOpacity onPress={pickImage}>
            <View style={styles.editIconContainer}>
                <Ionicons name="pencil" size={24} color="#fff" />
            </View>
            </TouchableOpacity>
        )}
        </View>
    );
};

export default AddImage;
