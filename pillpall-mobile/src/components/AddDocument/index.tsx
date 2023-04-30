import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { MaterialIcons } from '@expo/vector-icons';

import styles from './styles';

const AddDocument = () => {
  const [document, setDocument] = useState<string | null>(null);

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
    });

    console.log(result);

    if (!result.cancelled && result.uri) {
      setDocument(result.uri);
    }
  };

  return (
    <View style={styles.container}>
        {document ? (
            <View style={styles.docView}>
            <MaterialIcons
                name="description"
                size={30}
                color="white"
                style={{ marginRight: 10 }}
            />
            <Text style={styles.docName} numberOfLines={1}>
                {document.split('/').pop()}
            </Text>
            </View>
        ) : (
            <TouchableOpacity onPress={pickDocument}>
            <View style={styles.editIconContainer}>
                <MaterialIcons name="file-upload" size={30} color="#fff" />
            </View>
            </TouchableOpacity>
        )}
    </View>
  );
};

export default AddDocument;


