import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import styles from './styles';

type FileNumberProps = {
  doctorName: string;
  location: string;
  fileNumber: string;
}

const FileNumberCard: FC<FileNumberProps> = ({ doctorName, location, fileNumber }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.doctorName}>{doctorName}</Text>
        <Text style={styles.location}>{location}</Text>
      </View>
      <View style={styles.fileNumberContainer}>
        <Text style={styles.fileNumber}>{fileNumber}</Text>
      </View>
    </View>
  );
};

export default FileNumberCard;
