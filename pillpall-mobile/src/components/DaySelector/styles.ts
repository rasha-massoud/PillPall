import { StyleSheet } from 'react-native';
import appStyles from '../../constants/appStyles';
import { colors } from '../../constants/palette';

const styles = StyleSheet.create({
  daysTitle: {
    ...appStyles.body1,
    marginTop: 10,
    marginBottom: 20,
  },
  dayItem: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 0.5,
    borderColor: colors.black,
  },
  selectedDayItem: {
    backgroundColor: colors.blue,
  },
  dayText: {
    ...appStyles.body2,
  },
  selectedDayText: {
    color: colors.white,
  },
});

export default styles;
