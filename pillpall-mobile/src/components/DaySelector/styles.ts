import { StyleSheet } from 'react-native';
import appStyles from '../../constants/appStyles';

const styles = StyleSheet.create({
    dayItem: {
      padding: 10,
      marginVertical: 5,
      borderWidth: 1,
      borderColor: 'black',
    },
    selectedDayItem: {
      backgroundColor: 'blue',
    },
    dayText: {
        ...appStyles.body2,
    },
    selectedDayText: {
      color: 'white',
    },
});

export default styles;