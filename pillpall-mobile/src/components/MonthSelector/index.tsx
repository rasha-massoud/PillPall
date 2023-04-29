import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
    setShowSelector(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setShowSelector(!showSelector)}>
        <Text style={styles.monthsTitle}>Months</Text>
      </TouchableOpacity>
      {showSelector && (
        <View>
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