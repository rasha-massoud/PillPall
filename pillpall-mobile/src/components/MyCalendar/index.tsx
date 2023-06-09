import React, { FC, useState, useEffect } from 'react';
import { Calendar } from 'react-native-calendars';

import styles from './styles';

type MyCalendarProps = {
  onSelectDate: (date: string) => void;
}

const MyCalendar: FC<MyCalendarProps> = (props) => {
    const [selectedDate, setSelectedDate] = useState('');
    
    useEffect(() => {
        setSelectedDate(new Date().toISOString().slice(0, 10));
    }, []);

    const handleSelectDate = (date: string) => {
        setSelectedDate(date);
        props.onSelectDate(date);
    };

    return (
        <Calendar style={styles.calendar}
        onDayPress={(day) => handleSelectDate(day.dateString)}
        markedDates={{ [selectedDate]: { selected: true } }}
        />
    );
};

export default MyCalendar;
