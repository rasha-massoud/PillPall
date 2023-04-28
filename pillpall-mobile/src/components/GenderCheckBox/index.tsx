import React, { FC, useState } from 'react';
import { View } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';
import appStyles from '../../constants/appStyles';

import styles from './styles';

interface GenderCheckBoxProps {
  selectedGender: string | undefined;
  onGenderSelect: (gender: string) => void;
}

const GenderCheckBox: FC<GenderCheckBoxProps> = (props) => {
  const genderOptions = [
    { label: 'Female', value: 'female' },
    { label: 'Male', value: 'male' },
    { label: 'Other', value: 'other' },
  ];

  return (
    <View style={styles.container}>
      <Text style={[styles.title, appStyles.body1]}>Gender</Text>
      <View style={styles.checkboxes}>
        {genderOptions.map((option) => (
        <View key={option.value} style={styles.checkboxContainer}>
          <View style={[styles.circle, props.selectedGender === option.value && styles.checkedCircle]}>
            <Checkbox
              status={props.selectedGender === option.value ? 'checked' : 'unchecked'}
              onPress={() => props.onGenderSelect(option.value)}
            />
          </View>
          <Text style={styles.checkboxLabel}>{option.label}</Text>
        </View>
        ))}
      </View>
    </View>
  );
};

export default GenderCheckBox;