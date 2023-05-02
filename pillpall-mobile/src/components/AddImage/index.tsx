import React, { FC, useState } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerResult } from 'expo-image-picker/build/ImagePicker.types';
import { Ionicons } from '@expo/vector-icons';

import styles from './styles';

type AddImageProps = {
  onImageSelected: (imageFile: File | null) => void;
};

const AddImage: FC<AddImageProps> = ({ onImageSelected }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result: ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();
      const file = new File([blob], result.assets[0].uri);
      onImageSelected(file);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    onImageSelected(null);
  };

  return (
    <View style={styles.container}>
      {selectedImage ? (
        <>
          <TouchableOpacity onPress={pickImage} style={styles.changeImage}>
            <Ionicons name="camera-outline" size={24} color="#fff" />
            <Text style={styles.changeImageText}>Change Image</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={pickImage}>
            <Image source={{ uri: selectedImage }} style={styles.image} />
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity onPress={pickImage} style={styles.addImage}>
          <Ionicons name="add-outline" size={24} color="#fff" />
          <Text style={styles.addImageText}>Add Image</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AddImage;
