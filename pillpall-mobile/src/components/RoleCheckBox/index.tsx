import React, { FC, useState } from 'react';
import { View } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';
import appStyles from '../../constants/appStyles';

import styles from './styles';

interface RoleCheckBoxProps {
    selectedRole: string | undefined;
    onRoleSelect: (role: string) => void;
}

const RoleCheckBox: FC<RoleCheckBoxProps> = ({ selectedRole, onRoleSelect }) => {
  const roleOptions  = [
    { label: 'Patient', value: 'patient' },
    { label: 'Doctor', value: 'doctor' },
  ];

  return (
    <View style={styles.container}>
      <Text style={[styles.title, appStyles.body1]}>Role</Text>
      <View style={styles.checkboxes}>
        {roleOptions.map((option) => (
        <View key={option.value} style={styles.checkboxContainer}>
          <View style={[styles.circle, selectedRole === option.value && styles.checkedCircle]}>
            <Checkbox
              status={selectedRole  === option.value ? 'checked' : 'unchecked'}
              onPress={() => onRoleSelect(option.value)}
            />
          </View>
          <Text style={styles.checkboxLabel}>{option.label}</Text>
        </View>
        ))}
      </View>
    </View>
  );
};

export default RoleCheckBox;