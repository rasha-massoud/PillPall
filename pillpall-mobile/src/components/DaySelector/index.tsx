import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import styles from './styles';

type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday' | 'None' | 'Everyday';

type DaySelectorProps = {
  days: Day[];
  selectedDay: Day | null;
  onSelectDay: (day: Day) => void;
};

const DaySelector: React.FC<DaySelectorProps> = (props) => {
  const handleDayPress = (day: Day) => {
    if (day !== props.selectedDay) {
      props.onSelectDay(day);
    }
  };

  return (
    <View>
      {props.days.map((day) => (
        <TouchableOpacity key={day} onPress={() => handleDayPress(day)}>
          <View style={[styles.dayItem, day === props.selectedDay && styles.selectedDayItem]}>
            <Text style={[styles.dayText, day === props.selectedDay && styles.selectedDayText]}>{day}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default DaySelector;
