import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import FILE_URL from '../../constants/files';

import styles from './styles';

type MedicationItemProps = {
  name: string;
  dosage: string;
  timing: string;
  image: string;
};

const MedicationItem: React.FC<MedicationItemProps> = ({
  name,
  dosage,
  timing,
  image,
}) => {
  console.log(image)
  return (
    <View style={styles.container}>

      <Text style={styles.name}>{name}</Text>
      <Text style={styles.dosage}>{dosage} unit</Text>
      <Text style={styles.timing}>{timing}</Text>
      <View style={styles.IMG}>
        {image && 
          <Image
            source={{ uri: FILE_URL+`storage/${image}` }}
            style={styles.image}
          />
        }
      </View>
 
    </View>
  );
};

export default MedicationItem;
