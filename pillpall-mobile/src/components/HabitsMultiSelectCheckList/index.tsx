import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import appStyles from '../../constants/appStyles';

import styles from './styles';

interface HabitsMultiSelectChecklistProps {
  selectedOptions: string[];
  onSelectOption: (option: string) => void;
}

const HabitsMultiSelectChecklist: React.FC<HabitsMultiSelectChecklistProps> = (props) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleSelectOption = (option: string) => {
    props.onSelectOption(option);
  };

  return (
    <View style={styles.container}>
        <Text style={ appStyles.body1}>Life Style Habits</Text>

        <TouchableOpacity style={styles.header} onPress={toggleExpanded}>
            <Text style={styles.headerText}>{`Selected: ${props.selectedOptions.length}`}</Text>
            <Text>{expanded ? '-' : '+'}</Text>
        </TouchableOpacity>
        {expanded && (
        <View style={styles.optionsContainer}>
            <TouchableOpacity
                style={[styles.option, props.selectedOptions.includes('Alcohol Consumption') && styles.selectedOption]}
                onPress={() => handleSelectOption('Alcohol Consumption')}
            >
                <Text>Alcohol Consumption</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.option, props.selectedOptions.includes('Diet') && styles.selectedOption]}
                onPress={() => handleSelectOption('Diet')}
            >
                <Text>Diet</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.option, props.selectedOptions.includes('Exercise') && styles.selectedOption]}
                onPress={() => handleSelectOption('Exercise')}
            >
                <Text>Exercise</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.option, props.selectedOptions.includes('Smoking') && styles.selectedOption]}
                onPress={() => handleSelectOption('Smoking')}
            >
                <Text>Smoking</Text>
            </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default HabitsMultiSelectChecklist;
