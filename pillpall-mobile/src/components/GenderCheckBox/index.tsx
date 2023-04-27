import React, { useState } from 'react';
import { View } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';

interface GenderCheckBoxProps {
  selectedGender: string | undefined;
  onGenderSelect: (gender: string) => void;
}

const GenderCheckBox: React.FC<GenderCheckBoxProps> = ({ selectedGender, onGenderSelect }) => {
  const genderOptions = [
    { label: 'Female', value: 'female' },
    { label: 'Male', value: 'male' },
    { label: 'Other', value: 'other' },
  ];

  return (
    <View>
      {genderOptions.map(option => (
        <View key={option.value} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Checkbox
            status={selectedGender === option.value ? 'checked' : 'unchecked'}
            onPress={() => onGenderSelect(option.value)}
          />
          <Text>{option.label}</Text>
        </View>
      ))}
    </View>
  );
};

export default GenderCheckBox;