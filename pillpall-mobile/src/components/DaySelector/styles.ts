
import { StyleSheet } from 'react-native';
import appStyles from '../../constants/appStyles';
import { colors } from '../../constants/palette';

const styles = StyleSheet.create({
  container: {
    marginTop: 9,
  },
  daysTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    height: 43,
    borderColor: colors.dark_gray,
  },
  daysTitleText: {
    color: colors.darker_gray,
    ...appStyles.body2,
  },
  dayList: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.dark_gray,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  dayItem: {
    padding: 10,
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
