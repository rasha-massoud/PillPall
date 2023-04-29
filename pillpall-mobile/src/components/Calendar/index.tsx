import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

  const onDayPress = (day: any) => {
    setSelectedDate(day.dateString);
  };

  const markedDates = {
    [selectedDate]: { selected: true }
  };

  return (
    <Calendar
      markedDates={markedDates}
      onDayPress={onDayPress}
    />
  );
};

export default MyCalendar;
