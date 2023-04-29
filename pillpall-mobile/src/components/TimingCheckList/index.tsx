import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Body1Text from '../Body1Text';

import styles from './styles';
import appStyles from '../../constants/appStyles';

type Timing = '6:00' | '8:00' | '10:00' | '12:00' | '14:00' | '16:00' | '18:00' | '20:00' | '22:00';

type ChecklistProps = {
  timings: Timing[];
  selectedTiming: Timing | null;
  onSelectTiming: (timing: Timing) => void;
};

const Checklist: React.FC<ChecklistProps> = ({ timings, selectedTiming, onSelectTiming }) => {
    const handleTimingPress = (timing: Timing) => {
        if (timing !== selectedTiming) {
        onSelectTiming(timing);
        }
    };

    return (
        <View>
            <Body1Text context='Timing' />
            {timings.map((timing) => (
                <TouchableOpacity key={timing} onPress={() => handleTimingPress(timing)}>
                <View style={[styles.timingItem, timing === selectedTiming && styles.selectedTimingItem]}>
                    <Text style={[styles.timingText, appStyles.body2,  timing === selectedTiming && styles.selectedTimingText]}>
                    {timing}
                    </Text>
                </View>
                </TouchableOpacity>
            ))}
        </View>
  );
};

export default Checklist;
