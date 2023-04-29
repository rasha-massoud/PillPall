import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import appStyles from '../../constants/appStyles';

import styles from './styles';

type Month = 'All' | 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';

type MonthSelectorProps = {
  months: Month[];
  selectedMonth: Month | null;
  onSelectMonth: (month: Month) => void;
};

const MonthSelector: React.FC<MonthSelectorProps> = (props) => {
  const [showSelector, setShowSelector] = useState(false);

  const handleMonthPress = (month: Month) => {
    if (month !== props.selectedMonth) {
        props.onSelectMonth(month);
    }
  };

  const toggleSelector = () => {
    setShowSelector(!showSelector);
  };

  return (
    <View style={styles.container}>
      <Text style={appStyles.body1}>Month</Text>
      <TouchableOpacity onPress={toggleSelector}>
        <View style={styles.monthTitle}>
          <Text style={styles.monthTitleText}>{props.selectedMonth || 'Month'}</Text>
          <MaterialIcons name={showSelector ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={24} color="black" />
        </View>
      </TouchableOpacity>
      {showSelector && (
        <View style={styles.monthList}>
          {props.months.map((month) => (
            <TouchableOpacity key={month} onPress={() => handleMonthPress(month)}>
              <View style={[styles.monthItem, month === props.selectedMonth && styles.selectedMonthItem]}>
                <Text style={[styles.monthText, month === props.selectedMonth && styles.selectedMonthText]}>{month}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default MonthSelector;
