import React, { useState } from 'react';
import { Button, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';

interface Props {
  onImageSelected: (imageUri: string) => void;
}

const AddImage: React.FC<Props> = ({ onImageSelected }) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = () => {
    ImagePicker.showImagePicker({ mediaType: 'photo' }, response => {
      if (!response.didCancel && !response.error) {
        setImageUri(response.uri);
        onImageSelected(response.uri);
      }
    });
  };

  return (
    <>
      {imageUri && (
        <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
      )}
      <Button title="Select Image" onPress={pickImage} />
    </>
  );
};

export default AddImage;