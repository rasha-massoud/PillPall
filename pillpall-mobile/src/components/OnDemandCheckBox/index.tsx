import React, { FC, useState } from 'react';
import { View } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';
import appStyles from '../../constants/appStyles';

import styles from './styles';

interface OnDemandCheckBoxProps {
    selectedOnDemand: string | undefined;
    onDemandSelect: (role: string) => void;
}

const OnDemandCheckBox: FC<OnDemandCheckBoxProps> = (props) => {
  const roleOptions  = [
    { label: 'Yes', value: '1' },
    { label: 'No', value: '0' },
  ];

  return (
    <View style={styles.container}>
      <Text style={[styles.title, appStyles.body1]}>On Demand</Text>
      <View style={styles.checkboxes}>
        {roleOptions.map((option) => (
        <View key={option.value} style={styles.checkboxContainer}>
          <View style={[styles.circle, props.selectedOnDemand === option.value && styles.checkedCircle]}>
            <Checkbox
              status={props.selectedOnDemand  === option.value ? 'checked' : 'unchecked'}
              onPress={() => props.onDemandSelect(option.value)}
            />
          </View>
          <Text style={styles.checkboxLabel}>{option.label}</Text>
        </View>
        ))}
      </View>
    </View>
  );
};

export default OnDemandCheckBox;