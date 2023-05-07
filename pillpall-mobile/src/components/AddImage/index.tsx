import React, { FC, useState } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerResult } from 'expo-image-picker/build/ImagePicker.types';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';

import styles from './styles';

type AddImageProps = {
  onImageSelected: (imageFile: File | null) => void;
  selectedFile: File | null;
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

    console.log(result);
    if (!result.canceled && result.uri) {
      const imageName = result.uri.split('/').pop() || '';
      const destinationPath = `${FileSystem.documentDirectory}${imageName}.jpg`;

      try {
        await FileSystem.copyAsync({
          from: result.uri,
          to: destinationPath,
        });

        const copiedImageInfo = await FileSystem.getInfoAsync(destinationPath);
        if (copiedImageInfo.exists && copiedImageInfo.size > 0) {
          const file = new File([destinationPath], imageName);
          onImageSelected(file);
          console.log('file', file);
        } else {
          console.log('Error: Copied image file is empty');
          onImageSelected(null);
        }
      } catch (error) {
        console.log('Error copying file:', error);
        onImageSelected(null);
      }
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
          <TouchableOpacity onPress={clearImage}>
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
