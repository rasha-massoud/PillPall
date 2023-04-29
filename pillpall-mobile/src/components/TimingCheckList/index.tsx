import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Body1Text from '../Body1Text';

import styles from './styles';
import appStyles from '../../constants/appStyles';

type Timing = '6:00' | '8:00' | '10:00' | '12:00' | '14:00' | '16:00' | '18:00' | '20:00' | '22:00';

type TimingChecklistProps = {
  timings: Timing[];
  selectedTiming: Timing | null;
  onSelectTiming: (timing: Timing) => void;
};

const TimingChecklist: React.FC<TimingChecklistProps> = (props) => {
    const handleTimingPress = (timing: Timing) => {
        if (timing !==props.selectedTiming) {
            props.onSelectTiming(timing);
        }
    };

    return (
        <View>
            <Body1Text context='Timing' />
            {props.timings.map((timing) => (
                <TouchableOpacity key={timing} onPress={() => handleTimingPress(timing)}>
                <View style={[styles.timingItem, timing === props.selectedTiming && styles.selectedTimingItem]}>
                    <Text style={[styles.timingText, appStyles.body2,  timing === props.selectedTiming && styles.selectedTimingText]}>
                    {timing}
                    </Text>
                </View>
                </TouchableOpacity>
            ))}
        </View>
  );
};

export default TimingChecklist;
