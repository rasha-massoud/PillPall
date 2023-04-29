import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Body1Text from '../Body1Text';

import styles from './styles';

type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday' | 'None' | 'Everyday';

type DaySelectorProps = {
  days: Day[];
  selectedDay: Day | null;
  onSelectDay: (day: Day) => void;
};

const DaySelector: React.FC<DaySelectorProps> = (props) => {
  const [showDays, setShowDays] = useState(false);

  const handleDayPress = (day: Day) => {
    if (day !== props.selectedDay) {
      props.onSelectDay(day);
    }
  };

  const toggleDays = () => {
    setShowDays(!showDays);
  };

  return (
    <View style={styles.container}>
      <Body1Text context='Day'></Body1Text>
      <TouchableOpacity onPress={toggleDays}>
        <View style={styles.daysTitle}>
          <Text style={styles.daysTitleText}>{props.selectedDay || 'Months'}</Text>
          <MaterialIcons name={showDays ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={24} color="black" />
        </View>
      </TouchableOpacity>
      {showDays && (
        <View style={styles.dayList}>
          {props.days.map((day) => (
            <TouchableOpacity key={day} onPress={() => handleDayPress(day)}>
              <View style={[styles.dayItem, day === props.selectedDay && styles.selectedDayItem]}>
                <Text style={[styles.dayText, day === props.selectedDay && styles.selectedDayText]}>{day}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default DaySelector;
