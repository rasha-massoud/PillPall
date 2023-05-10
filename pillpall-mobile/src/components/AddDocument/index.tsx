import React, { FC, useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons } from '@expo/vector-icons';

import styles from './styles';

interface AddDocumentProps {
  onDocumentSelected: (file: File) => void;
}

const AddDocument: FC<AddDocumentProps> = (props) => {
  const [document, setDocument] = useState<string | null>(null);

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
      copyToCacheDirectory: false,
    });

    console.log(result);

    if (result.type === 'success') {
      const file = new File([result.uri], result.name, { type: 'application/pdf' });
      setDocument(result.uri);
      props.onDocumentSelected(file);
    }
  };

  return (
    <View style={styles.container}>
      {document ? (
        <Text>{document}</Text>
      ) : (
        <TouchableOpacity onPress={pickDocument}>
          <View style={styles.editIconContainer}>
            <Ionicons name="pencil" size={24} color="#fff" />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AddDocument;
