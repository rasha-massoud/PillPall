import React, { FC, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import styles from './styles';

interface MedicalResultCardProps {
    file: {
        name?: string;
        type?: string;
        uri?: string;
    };
    testingDate: string;
    fileName: string;
    description: string;
}

const MedicalResultCard: FC<MedicalResultCardProps> = (props) => {
  const [showResult, setShowResult] = useState<boolean>(false);

  const handlePress = () => {
    setShowResult(!showResult);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.header}>
        <Image source={{ uri: props.file.uri }} style={styles.headerImage} />
        <Text style={styles.headerText}>{props.fileName}</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.details}>
          <View style={styles.row}>
            <Text style={styles.label}>Testing Date:</Text>
            <Text style={styles.text}>{props.testingDate}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>File Name:</Text>
            <Text style={styles.text}>{props.file.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Description:</Text>
            <Text style={styles.text}>{props.description}</Text>
          </View>
        </View>
        {showResult && (
          <View style={styles.result}>
            <Image source={{ uri: props.file.uri }} style={styles.image} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default MedicalResultCard;
