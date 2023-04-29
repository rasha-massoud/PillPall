import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import styles from './styles';

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
      {timings.map((timing) => (
        <TouchableOpacity key={timing} onPress={() => handleTimingPress(timing)}>
          <View style={[styles.timingItem, timing === selectedTiming && styles.selectedTimingItem]}>
            <Text style={[styles.timingText, timing === selectedTiming && styles.selectedTimingText]}>
              {timing}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Checklist;
