import React, { FC, useState } from 'react';
import { View } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';
import appStyles from '../../constants/appStyles';

import styles from './styles';

interface FirstOfEachMonthProps {
    selectedFirstOfEachMonth: string | undefined;
    firstOfEachMonthSelect: (role: string) => void;
}

const FirstOfEachMonth: FC<FirstOfEachMonthProps> = (props) => {
  const roleOptions  = [
    { label: 'Yes', value: '1' },
    { label: 'No', value: '0' },
  ];

  return (
    <View style={styles.container}>
      <Text style={[styles.title, appStyles.body1]}>First of each Month</Text>
      <View style={styles.checkboxes}>
        {roleOptions.map((option) => (
        <View key={option.value} style={styles.checkboxContainer}>
          <View style={[styles.circle, props.selectedFirstOfEachMonth === option.value && styles.checkedCircle]}>
            <Checkbox
              status={props.selectedFirstOfEachMonth  === option.value ? 'checked' : 'unchecked'}
              onPress={() => props.firstOfEachMonthSelect(option.value)}
            />
          </View>
          <Text style={styles.checkboxLabel}>{option.label}</Text>
        </View>
        ))}
      </View>
    </View>
  );
};

export default FirstOfEachMonth;