import React, { FC } from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

type MedicationItemProps = {
  name: string;
  dosage: string;
  timing: string;
};

const MedicationItem: FC<MedicationItemProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.medicationName}>{props.name}</Text>
      <Text style={styles.dosage}>{props.dosage}</Text>
      <Text style={styles.timing}>{props.timing}</Text>
    </View>
  );
};

export default MedicationItem;
