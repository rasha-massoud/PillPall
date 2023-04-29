import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import appStyles from '../../constants/appStyles';

import styles from './styles';

type Timing = '6:00' | '8:00' | '10:00' | '12:00' | '14:00' | '16:00' | '18:00' | '20:00' | '22:00';

type TimingChecklistProps = {
  timings: Timing[];
  selectedTiming: Timing | null;
  onSelectTiming: (timing: Timing) => void;
};

const TimingChecklist: React.FC<TimingChecklistProps> = (props) => {
    const [showSelector, setShowSelector] = useState(false);

    const handleTimingPress = (timing: Timing) => {
        if (timing !==props.selectedTiming) {
            props.onSelectTiming(timing);
        }
    };

    const toggleSelector = () => {
        setShowSelector(!showSelector);
    };

    return (
        <View style={styles.container}>
            <Text style={appStyles.body1}>Timing</Text>
            <TouchableOpacity onPress={toggleSelector}>
                <View style={styles.timingTitle}>
                    <Text style={styles.timingTitleText}>{props.selectedTiming || 'Timing'}</Text>
                    <MaterialIcons name={showSelector ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={24} color="black" />
                </View>
            </TouchableOpacity>
            {showSelector && (
            <View style={styles.timingList}>
                {props.timings.map((timing) => (
                <TouchableOpacity key={timing} onPress={() => handleTimingPress(timing)}>
                    <View style={[styles.timingItem, timing === props.selectedTiming && styles.selectedTimingItem]}>
                        <Text style={[styles.timingText, timing === props.selectedTiming && styles.selectedTimingText]}>{timing}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
      )}
    </View>
  );
};

export default TimingChecklist;
